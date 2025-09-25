import { useState } from "react";
import { axiosInstance } from "@/services/axiosInstance";

export const useS3Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileToS3 = async (file) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 && response.data) {
        return response.data.path;
      }
    } catch (err) {
      console.error("Error uploading file:", err);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const removeUploadedFileFromS3 = async (fileKey) => {
    if (!fileKey) return null;

    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(`/upload/${fileKey}`);
      if (response.status === 201 && response.data) {
        return response.data;
      }
    } catch (err) {
      console.error("Error removing file:", err);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const getFileTypeFromS3 = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const contentType = response.headers.get("content-type");

      if (!contentType) return "unknown";
      if (contentType.startsWith("image")) return "image";
      if (contentType.startsWith("video")) return "video";
      if (
        contentType === "application/pdf" ||
        contentType === "application/msword" ||
        contentType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      )
        return "document";

      return "unknown";
    } catch (error) {
      console.error("Error fetching file type:", error);
      return "unknown";
    }
  };

  return {
    uploadFileToS3,
    removeUploadedFileFromS3,
    getFileTypeFromS3,
    isLoading,
  };
};
