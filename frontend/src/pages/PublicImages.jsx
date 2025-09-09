import { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const PublicImages = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/image/images`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setImages(resp.data);
      } catch (err) {
        toast.error(err.resp?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-900 text-gray-200 p-4 sm:p-8 font-[Poppins]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center mt-16">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Public Gallery
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            From countless imaginations, one gallery.
          </p>
        </div>

        {isLoading && images.length === 0 ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
            <Loader size="45" color="royalblue" />
          </div>
        ) : images.length > 0 ? (
          // --- Image Grid ---
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-slate-800 p-6">
              <FiImage className="text-5xl text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              The Gallery is Empty
            </h2>
            <p className="mt-2 text-slate-400">
              Looks like nobody generated any images yet. Be the first one.
            </p>
            <Link
              to="/generate"
              className="mt-6 inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700 hover:scale-105"
            >
              Start Generating Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicImages;
