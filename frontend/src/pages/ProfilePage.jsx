import { IoIosArrowBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Loader from "../components/Loader";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [featuredCreation, setFeaturedCreation] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/${username}`
        );
        setUserData(response.data.data);
        toast.success("User Profile Loaded.");
      } catch (error) {
        toast.error("Failed to load profile or it doesn't exist");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username, navigate]);

  useEffect(() => {
    if (!userData || !userData.creations || userData.creations.length === 0) {
      return;
    }
    const checkOwnership = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (resp.ok) {
            const loggedInUser = await resp.json();
            setIsOwner(loggedInUser._id === userData._id);
          }
          if (userData && userData.username) {
            const feature = userData.featuredImage;

            setFeaturedCreation(feature);
          }
        } catch (error) {
          console.error("Failed to fetch logged-in user:", error);
        }
      }
    };

    checkOwnership();
  }, [userData]);

  const handleFeaturedCreation = async (imageId) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/image/featured-image`,
        {
          imageId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const feature = userData.creations.filter((data) => data._id === imageId);
      setFeaturedCreation(feature[0].imageUrl);
    } catch (error) {
      console.error("Failed to update featured image:", error);
      toast.error("Failed to update featured image.");
    }

    toast.success("Featured Creation Updated.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#202142]">
        <Loader />
      </div>
    );
  }

  const handleChangeAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelClick = () => {
    setAvatarFile("");
    setAvatarPreview("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const uploadAvatar = axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/user/change-avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.promise(uploadAvatar, {
      loading: "Uploading new avatar...",
      success: <b>Avatar updated!</b>,
      error: <b>Could not upload avatar.</b>,
    });

    uploadAvatar
      .then((response) => {
        const changedAvatar = response.data.newImageUrl;
        setUserData((prevData) => ({
          ...prevData,
          image: changedAvatar,
        }));
        handleCancelClick();
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        toast.error(error.message || "Upload failed.");
        handleCancelClick();
      });
  };

  return (
    <div className="bg-[#202142] min-h-screen text-white font-['Inter'] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-8 space-y-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <IoIosArrowBack size={20} />
              Back
            </button>

            <div className="avatar-div flex flex-col justify-center items-center">
              <img
                src={
                  avatarPreview ||
                  userData.image ||
                  `https://ui-avatars.com/api/?name=${userData.name}&background=8B5CF6&color=fff&size=144`
                }
                alt="User Avatar"
                className="w-36 h-36 rounded-full border-4 border-gray-700 object-cover block mb-4"
              />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                style={{ display: "none" }}
              />
            </div>

            {isOwner && (
              <>
                {avatarPreview ? (
                  <div className="w-full flex gap-2">
                    <button
                      onClick={handleUploadAvatar}
                      className="flex-1 text-sm bg-purple-600 border border-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="flex-1 text-sm bg-transparent border border-gray-700 text-gray-400 py-2 px-4 rounded-md hover:bg-gray-700 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleChangeAvatarClick}
                    className="w-full text-sm bg-transparent border border-gray-700 text-gray-400 py-2 px-4 rounded-md hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Change Avatar
                  </button>
                )}
              </>
            )}

            <div className="space-y-1">
              <h1 className="font-['Poppins'] text-3xl font-bold text-white">
                {userData.name}
              </h1>
              <p className="text-gray-400 pb-2">@{userData.username}</p>
              {isOwner && (
                <p className="text-purple-400 text-sm">{userData.email}</p>
              )}
              <p className="text-sm text-gray-400">
                Creative since{" "}
                {new Date(userData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <hr className="border-gray-700 my-8" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-['Poppins'] text-3xl font-bold">
                  {userData.creations?.length}
                </p>
                <p className="text-sm text-gray-400">Creations</p>
              </div>
              <div>
                <p className="font-['Poppins'] text-3xl font-bold">
                  {userData.creations?.filter((c) => c.isPublic).length || 0}
                </p>
                <p className="text-sm text-gray-400">Public</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8 xl:col-span-9">
          <section className="mb-12">
            <div className="rounded-xl overflow-hidden relative border border-gray-700 bg-gray-800">
              <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm py-1 px-3 rounded-md text-sm z-10">
                Featured Creation
              </span>
              <img
                src={featuredCreation || "no-image.jpg"}
                alt="Featured Creation"
                className="w-full aspect-[16/8] object-cover"
              />
            </div>
          </section>

          <section>
            <h2 className="font-['Poppins'] text-2xl text-white pb-4 border-b border-gray-700 mb-6">
              All Creations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {userData.creations?.map((creation) => (
                <div
                  key={creation._id}
                  className="relative rounded-lg overflow-hidden aspect-square group cursor-pointer"
                >
                  <img
                    src={creation.imageUrl}
                    alt="Generated Art"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {isOwner && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end items-start p-3">
                      <button
                        onClick={() => handleFeaturedCreation(creation._id)}
                        title="Set as Featured Creation"
                        className="bg-black/40 backdrop-blur-sm border border-white/20 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-purple-500 hover:border-purple-500 transition-all"
                      >
                        <FaStar size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
