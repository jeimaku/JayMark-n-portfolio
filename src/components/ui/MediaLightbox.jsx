import { X } from "lucide-react";

export default function MediaLightbox({ media, onClose }) {
  if (!media) return null;

  const isVideo = media.type === "video";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-cyan-300/40 hover:bg-white/[0.1]"
        aria-label="Close media preview"
      >
        <X size={20} />
      </button>

      <div className="w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/50">
        <div className="border-b border-white/10 p-5">
          <p className="text-lg font-semibold text-white">{media.title}</p>

          {media.description && (
            <p className="mt-1 text-sm leading-6 text-slate-400">
              {media.description}
            </p>
          )}
        </div>

        <div className="bg-black">
          {isVideo ? (
            <video
              src={media.src}
              className="max-h-[75vh] w-full object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={media.src}
              alt={media.title}
              className="max-h-[75vh] w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}