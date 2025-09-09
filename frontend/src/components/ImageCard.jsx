import { FiDownload, FiCopy, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ImageCard = ({ image, onDelete }) => {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    toast.success("Prompt copied to clipboard!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.imageUrl;
    link.download = `imagiverse-${image.prompt.slice(0, 20)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image download started!");
  };

  const handleDelete = () => {
    onDelete(image._id);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg border border-slate-800 transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/50">
      <Link to={`/image/${image._id}`}>
        <img
          src={image.imageUrl}
          alt="Image"
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
        />
      </Link>
      <div className="absolute bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 w-full max-w-full">
        <div className="flex h-full flex-col justify-end p-4 text-white">
          <p className="text-sm font-light text-slate-300 line-clamp-3 mb-2">
            {image.prompt}
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCopyPrompt}
              title="Copy Prompt"
              className="rounded-full bg-slate-700/50 p-2 backdrop-blur-sm transition-all hover:bg-purple-600 hover:scale-110"
            >
              <FiCopy size={18} />
            </button>
            <button
              onClick={handleDownload}
              title="Download Image"
              className="rounded-full bg-slate-700/50 p-2 backdrop-blur-sm transition-all hover:bg-purple-600 hover:scale-110"
            >
              <FiDownload size={18} />
            </button>
            <button
              onClick={handleDelete}
              title="Delete Image"
              className="rounded-full bg-slate-700/50 p-2 backdrop-blur-sm transition-all hover:bg-red-600 hover:scale-110"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
