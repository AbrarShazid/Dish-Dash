import { env } from "@/env";

 const CLOUD_NAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
 const UPLOAD_PRESET = env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
 
 
 export const uploadImageCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }
    const result = await res.json();
    return result.secure_url;
  };