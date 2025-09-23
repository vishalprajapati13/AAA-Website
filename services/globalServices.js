import { axiosInstance } from "./axiosInstance";

export const postContactUsService = (params) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .post("/contact-us", params)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const jobPositionData = () =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get("/job-position", { params: { is_open: true } })
      .then((response) => {
        resolve(response?.data?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const postJobApply = (params) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .post("/job-apply", params)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const categoriesData = () =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get("/category")
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const getPageBySlug = (slug) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get(`/page/slug/${slug}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const getFileTypeFromS3 = async (url) => {
  try {
    const response = await fetch(url, { mode: "cors" });

    if (!response.ok) {
      return "unknown";
    }

    const contentType = response.headers.get("content-type");

    if (contentType?.startsWith("image")) {
      return "image";
    } else if (contentType?.startsWith("video")) {
      return "video";
    } else {
      return "unknown";
    }
  } catch (error) {
    console.error("Error getting file type from S3:", error);
    return "unknown";
  }
};
