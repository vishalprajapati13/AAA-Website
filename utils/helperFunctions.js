export const getFileTypeFromExtension = (filename) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (!ext) return "unknown";

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoExtensions = ["mp4", "webm", "mov", "quicktime"];

  if (imageExtensions.includes(ext)) return "image";
  if (videoExtensions.includes(ext)) return "video";
  return "unknown";
};
