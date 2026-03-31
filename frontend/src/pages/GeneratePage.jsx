import { useRef, useState, useEffect } from "react";
import {
  FaSpinner,
  FaDownload,
  FaBrain,
  FaExclamationTriangle,
} from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "../context/LoginContext";

const AI_MODELS = [
  {
    value: "google/nano-banana-2:free",
    label: "Nano Banana 2 (New)",
  },
  {
    value: "google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash (New)",
  },
  {
    value: "black-forest-labs/FLUX-2-klein-4b:free",
    label: "Flux.2 Klein 4B (New)",
  },
  {
    value: "openai/gpt-image-1.5:free",
    label: "GPT Image 1.5 (Free)",
  },
  {
    value: "bytedance/seedream-4",
    label: "Seedream 4 (New)",
  },
  {
    value: "fal-ai/nano-banana",
    label: "Nano Banana (New)",
  },
  {
    value: "black-forest-labs/FLUX.1-krea-dev",
    label: "Flux.1 Krea Dev (New)",
  },
  {
    value: "black-forest-labs/FLUX-1-schnell:free",
    label: "Flux.1 Schnell (Free)",
  },
  { value: "black-forest-labs/FLUX.1-dev", label: "Flux.1 Dev" },
  {
    value: "black-forest-labs/FLUX.1-depth",
    label: "Flux.1 Depth",
  },
  {
    value: "stabilityai/sdxl-turbo:free",
    label: "SDXL Turbo (Free)",
  },
  {
    value: "lodestones/Chroma:free",
    label: "Chroma - Free (Unstable)",
  },
  {
    value: "HiDream-ai/HiDream-I1-Full:free",
    label: "HiDream i1 Full (Free)",
  },
  {
    value: "fal-ai/minimax/image-01",
    label: "Minimax Image-01",
  },
];

const ASPECTS = [
  { label: "Square (1:1)", w: 1792, h: 1792, key: "1:1" },
  { label: "Landscape (4:3)", w: 1792, h: 1344, key: "4:3" },
  { label: "Landscape (16:9)", w: 1792, h: 1008, key: "16:9" },
  { label: "Portrait (3:4)", w: 1344, h: 1792, key: "3:4" },
  { label: "Portrait (9:16)", w: 1008, h: 1792, key: "9:16" },
];

const LOW_ASPECTS = [
  { label: "Square (1:1)", w: 1024, h: 1024, key: "1:1" },
  { label: "Landscape (4:3)", w: 1024, h: 768, key: "4:3" },
  { label: "Landscape (16:9)", w: 1024, h: 576, key: "16:9" },
  { label: "Portrait (3:4)", w: 768, h: 1024, key: "3:4" },
  { label: "Portrait (9:16)", w: 576, h: 1024, key: "9:16" },
];

const GeneratePage = () => {
  const { currentUser, updateUserCredits, isLogin, isLoading } = useAuth();
  const COST_PER_GENERATION = 2;

  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const [model, setModel] = useState(AI_MODELS[0].value);
  const [aspect, setAspect] = useState(ASPECTS[0].key);
  const [isPublic, setIsPublic] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("User not found. Please log in again.");
      return;
    }

    if (!prompt) {
      toast.error("Please enter a prompt to generate an image.");
      return;
    }

    if (COST_PER_GENERATION > currentUser.credits) {
      toast.error("You don't have enough credits to generate an image.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      let response = "";

      if (
        model.includes(":free") ||
        model.includes("seedream") ||
        model.includes("gemini-2.5-flash")
      ) {
        const selectedAspect = LOW_ASPECTS.find((a) => a.key === aspect);
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/image/generate`,
          {
            prompt: prompt,
            model,
            width: selectedAspect.w,
            height: selectedAspect.h,
            isPublic,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else if (model.includes("fal-ai")) {
        const selectedAspect = ASPECTS.find((a) => a.key === aspect);
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/image/generate`,
          {
            prompt: prompt,
            model,
            aspect_ratio: aspect,
            width: selectedAspect.w,
            height: selectedAspect.h,
            isPublic,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else if (model.includes("black-forest-labs/")) {
        const selectedAspect = ASPECTS.find((a) => a.key === aspect);
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/image/generate`,
          {
            prompt: prompt,
            isPublic,
            model,
            width: selectedAspect.w,
            height: selectedAspect.h,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        toast.error("An unknown model was selected.");
        setIsGenerating(false);
        return;
      }

      setGeneratedImage(response.data?.result?.imageUrl);
      updateUserCredits(response.data?.credits);
    } catch (err) {
      toast.error(
        err.message || err.response?.data?.message || "An error occurred",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setGeneratedImage(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <FaSpinner className="text-4xl text-white animate-spin" />
      </div>
    );
  }

  if (!isLogin) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] text-white text-center">
        <p>Please log in to generate images.</p>
      </div>
    );
  }

  const renderResultContent = () => {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <FaSpinner className="text-4xl text-[#8A4FFF] animate-spin" />
          <p className="mt-4 text-lg text-gray-300 font-['Inter']">
            Your vision is materializing...
          </p>
        </div>
      );
    }

    if (generatedImage) {
      const aspectRatio = aspect.replace(":", " / ");
      return (
        <div className="flex flex-col items-center animate-fade-in">
          <h3 className="text-2xl font-bold text-white font-['Poppins'] mb-4">
            Your Creation
          </h3>
          <img
            src={generatedImage}
            alt="Generated art based on prompt"
            className="rounded-lg shadow-2xl shadow-black/50 w-full max-w-lg border-2 border-white/10"
            style={{ aspectRatio: aspectRatio }}
          />
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={generatedImage}
              download="imagiverse-creation.png"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
            >
              <FaDownload />
              Download
            </a>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
            >
              <BiRefresh />
              Generate Another
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center text-gray-400">
        <FaBrain className="text-6xl text-white/20" />
        <p className="mt-4 text-lg font-['Inter']">
          Your generated image will appear here.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-[#202142] min-h-[calc(100vh-80px)] p-4 sm:p-8 text-white font-['Poppins']">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/20 p-6 rounded-xl border border-white/10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Describe Your Vision
          </h1>
          <p className="text-center text-gray-400 mt-2 font-['Inter']">
            What do you want to create?
          </p>

          <form onSubmit={handleGenerate} className="mt-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A cinematic shot of a raccoon in a library, reading a book, soft lighting..."
                className="w-full h-28 p-4 bg-[#2D2E55] rounded-lg border border-white/20 focus:ring-2 focus:ring-[#8A4FFF] focus:outline-none transition-all duration-300 resize-none font-['JetBrains_Mono'] text-gray-200"
                disabled={isGenerating}
              />
            </div>
            <button
              type="submit"
              disabled={isGenerating || !prompt}
              className="w-full mt-4 flex items-center justify-center gap-3 bg-[#8A4FFF] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#7b46e5] transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <BsStars />
                  Generate Image
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-black/20 p-6 rounded-xl border border-white/10 shadow-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Model
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isGenerating || generatedImage}
                className="w-full flex items-center justify-between bg-[#2D2E55] border border-white/20 rounded-lg p-3 text-left focus:ring-2 focus:ring-[#8A4FFF] focus:outline-none transition disabled:opacity-50"
              >
                <span className="truncate text-gray-200">
                  {AI_MODELS.find((m) => m.value === model)?.label}
                </span>
                <MdKeyboardArrowDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-[#2D2E55] border border-white/10 rounded-xl shadow-2xl">
                  <ul className="max-h-60 overflow-y-auto p-1">
                    {AI_MODELS.map((option) => (
                      <li key={option.value}>
                        <button
                          type="button"
                          onClick={() => {
                            setModel(option.value);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md ${
                            option.value === model
                              ? "bg-[#8A4FFF] text-white"
                              : "text-gray-300 hover:bg-[#8A4FFF]/20"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {model.includes("black-forest-labs/") && (
              <div className="md:col-span-2">
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
                  <FaExclamationTriangle className="text-amber-400 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-300 font-semibold text-sm mb-1">
                      Temporary Storage Warning
                    </h4>
                    <p className="text-amber-200/90 text-sm leading-relaxed">
                      Images generated with Flux models are stored temporarily
                      and will be automatically deleted after some time.
                      <strong className="text-amber-100">
                        {" "}
                        Please download or save your image immediately
                      </strong>{" "}
                      after generation to avoid losing it.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Aspect Ratio
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {ASPECTS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setAspect(item.key)}
                    disabled={isGenerating || generatedImage}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50
                      ${
                        aspect === item.key
                          ? "bg-[#8A4FFF] text-white"
                          : "bg-[#2D2E55] hover:bg-[#3c3d6d] text-gray-300"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-300">
                  Visibility
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Make image public in the community gallery.
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  disabled={isGenerating || generatedImage}
                />
                <div className="relative w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#8A4FFF]/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8A4FFF]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 min-h-[300px] flex items-center justify-center bg-black/10 border-2 border-dashed border-white/10 rounded-xl p-8">
          {renderResultContent()}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
