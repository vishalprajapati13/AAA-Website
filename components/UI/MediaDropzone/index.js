import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Box, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import { NEXT_PUBLIC_S3_BASE_URL } from "@/utils/constant";
import uploadIcon from "../../../public/images/upload-icon.svg";
import { useS3Uploader } from "@/hooks/useS3Uploader";

export default function MediaDropzone({
  value,
  onChange,
  acceptExtensions = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  label,
  errorMsg,
  maxSize,
  fileType = "Document",
  isLoading,
  uploadType,
  noteMsg = "",
}) {
  const { uploadFileToS3, removeUploadedFileFromS3 } = useS3Uploader();
  const [fileName, setFileName] = useState(null);
  const [docsName, setDocsName] = useState(null);
  const [localError, setLocalError] = useState("");

  const getBytes = (size, type) => {
    if (type === "MB") return size * 1024 * 1024;
    if (type === "KB") return size * 1024;
    return 0;
  };

  const handleRemove = async (value) => {
    if (value) {
      try {
        await removeUploadedFileFromS3(value?.url);
      } catch (err) {
        console.error("Failed to delete file from S3:", err);
      }
    }
    setFileName(null);
    setDocsName(null);
    onChange("");
    setLocalError("");
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      const maxBytes = maxSize ? getBytes(maxSize.size, maxSize.type) : 0;

      const acceptedTypes = Object.keys(acceptExtensions || {});
      const isAccepted = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          return file.type.startsWith(type.replace("/*", "/"));
        }
        return file.type === type;
      });

      if (!isAccepted) {
        setLocalError(
          `Only the following file types are accepted: ${acceptedTypes.join(
            ", "
          )}`
        );
        return;
      }

      if (maxBytes && file.size > maxBytes) {
        setLocalError(
          `${fileType} must be less than ${maxSize.size}${maxSize.type}`
        );
        return;
      }

      if (value) {
        await removeUploadedFileFromS3(value);
      }

      try {
        const uploadedUrl = await uploadFileToS3(file, uploadType);
        if (uploadedUrl) {
          const fullUrl = `${NEXT_PUBLIC_S3_BASE_URL}/${uploadedUrl}`;
          setFileName({ url: fullUrl, name: file.name, type: file.type });
          setDocsName({ name: file.name });
          onChange(uploadedUrl);
          setLocalError("");
        }
      } catch (error) {
        console.error("Failed to upload:", error);
      }
    },
    [
      value,
      onChange,
      maxSize,
      removeUploadedFileFromS3,
      uploadType,
      uploadFileToS3,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptExtensions,
    multiple: false,
  });

  useEffect(() => {
    if (value) {
      setFileName({
        url: `${value}`,
        name: value.split("/").pop() || "",
        type: "application/pdf",
      });
    } else {
      setFileName(null);
    }
  }, [value]);

  const combinedError = localError || errorMsg;

  return (
    <div className="space-y-2">
      {label && <label className="block font-medium">{label}</label>}
      <Stack
        {...getRootProps()}
        sx={{
          background: "#FFFFFF0F",
          border: `1px dashed ${errorMsg ? "#FF5630" : "black"}`,
          borderRadius: "4px",
          padding: "25px 15px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>
            {isLoading ? (
              "Uploading..."
            ) : (
              <>
                <label className="upload_icon"></label>
                <Image
                  src={uploadIcon}
                  width={18}
                  height={18}
                  alt="Logo"
                  className="img-fluid me-2"
                />
                Upload a File <label className="divider_line"></label>
                <Box
                  component="span"
                  sx={{ color: "#5F7EEF", textDecoration: "underline" }}
                >
                  Drag & Drop Files Here
                </Box>
              </>
            )}
          </p>
        )}
      </Stack>
      {noteMsg && <p className="upload_note_text">{noteMsg}</p>}

      {combinedError && (
        <div
          style={{
            color: "#FF5630",
            fontSize: "0.75rem",
            margin: "8px 14px 0",
          }}
        >
          {combinedError}
        </div>
      )}

      {/* File Preview Section */}
      {fileName?.url
        ? `${NEXT_PUBLIC_S3_BASE_URL}/${fileName?.url}` && (
            <div className="file_upload_file_div">
              <Stack direction="row" alignItems="center">
                <Icon icon="mdi:file-pdf" width="24px" color="white" />
                <span style={{ color: "white" }}>{docsName?.name}</span>
                <Icon
                  icon="mdi:close-circle"
                  width="24px"
                  color="white"
                  style={{ cursor: "pointer" }}
                  className="close_icon_div"
                  onClick={() => handleRemove(fileName)}
                />
              </Stack>
            </div>
          )
        : null}
    </div>
  );
}
