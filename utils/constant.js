export const NEXT_PUBLIC_S3_BASE_URL =
  process.env.NEXT_PUBLIC_S3_BUCKET_BASE_URL;

export const NEXT_PUBLIC_WEBSITE_BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

export const acceptedDocsExtensions = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

export const removeBaseUrl = (imageUrl) => {
  if (!imageUrl) return imageUrl || "";
  const baseUrl = `${REACT_APP_S3_BASE_URL}/`;
  const regex = new RegExp(`^${baseUrl}`);
  return imageUrl?.replace(regex, "");
};

export const getImageUrl = (data) => {
  if (!data) return "";

  if (isArray(data)) {
    return data.length > 0 ? removeBaseUrl(data[0]) : "";
  }

  return removeBaseUrl(data);
};

export const WEBSITE_MAIN_LOGO = `https://s3.ap-south-1.amazonaws.com/aaa-cms/Img/b8e7ef92-8b7f-48a3-bd4e-a50cc6e06d93/6e0a049c-e430-416e-b312-b51d1ee661e5`;
export const TITLE_METADATA = "AAA";
export const DESCRIPTION_METADATA = `Innovative architectural firm specializing in product design, master planning, landscape architecture, interior design, and cutting-edge architectural solutions to shape inspiring environments.`;
