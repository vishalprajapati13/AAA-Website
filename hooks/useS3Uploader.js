import { axiosInstance } from "@/services/axiosInstance";
import { useState } from "react";

export const useS3Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getS3Post = async (type) =>
    new Promise((resolve, reject) =>
      axiosInstance
        .get(`/s3/generate/presigned-post-url-S3?fileType=${type}`)
        .then((response) => {
          resolve(response?.data?.data);
        })
        .catch((error) => {
          reject(error);
        })
    );

  const getPresignedUrl = async (uploadType, fileType) =>
    new Promise((resolve, reject) =>
      axiosInstance
        .post(`/s3/generate/job/presigned-post-url-S3`, {
          uploadType,
          fileType,
        })
        .then((response) => {
          resolve(response?.data?.data);
        })
        .catch((error) => {
          reject(error);
        })
    );

  const uploadJobFileToS3 = async (file, uploadType) => {
    setIsLoading(true);
    try {
      const presignedPostUrl = ["portfolio", "resume"].includes?.(uploadType)
        ? await getPresignedUrl(uploadType, file.type)
        : await getS3Post(file.type);

      if (presignedPostUrl) {
        const formData = new FormData();
        formData.append("Content-Type", file.type);
        Object.entries(presignedPostUrl?.fields).forEach(([key, value]) => {
          formData.append(key, value);
        });

        formData.append("file", file);

        const fileKey = await uploadToS3(presignedPostUrl, formData);
        return fileKey;
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToS3 = async (presignedPostUrl, formData) => {
    setIsLoading(true);

    return axiosInstance
      .post(presignedPostUrl.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          acl: "public-read",
        },
      })
      .then((response) => {
        if (response.status) {
          return presignedPostUrl?.fields?.key;
        }
        return "";
      })
      .catch(() => {
        return "";
      });
  };

  const uploadFileToS3 = async (file) => {
    const { type } = file;

    try {
      const presignedPostUrl = await getS3Post(type);
      const formData = new FormData();
      formData.append("Content-Type", type);
      Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
        formData.append(k, v);
      });
      formData.append("file", file);

      if (presignedPostUrl.url) {
        const url = await uploadToS3(presignedPostUrl, formData);
        setIsLoading(false);
        return url;
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
    return null;
  };

  const removeUploadedFileFromS3 = async (fileKey) => {
    if (!fileKey) return null;

    const data = { files: [fileKey] };

    try {
      const response = await axiosInstance.post(
        `/s3/remove/file-from-S3`,
        data
      );
      return response;
    } catch (err) {
      console.error("Error removing file from S3:", err);
      return null;
    }
  };

  const getFileTypeFromS3 = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const contentType = response.headers.get("content-type");

      if (contentType?.startsWith("image")) {
        return "image";
      }
      if (contentType?.startsWith("video")) {
        return "video";
      }
      return "unknown";
    } catch (error) {
      console.error("Error fetching file type:", error);
      return "unknown";
    }
  };

  return {
    uploadFileToS3,
    uploadJobFileToS3,
    removeUploadedFileFromS3,
    getFileTypeFromS3,
    isLoading,
  };
};
