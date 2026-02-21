// // lib/upload-image.ts
// import { env } from "@/env";
// import sharp from "sharp";

// const imgBBKey = env.IMGBB_API_KEY;

// export async function uploadProfileImage(file: File) {
//   try {
//     console.log("Starting image optimization...");


//     // Convert File → Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Optimize + convert to webp
//     const optimizedBuffer = await sharp(buffer)
//       .resize({ width: 400, height: 400, fit: "cover" }) // Profile picture size
//       .webp({ quality: 80 }) // Good quality but smaller size
//       .toBuffer();

//     console.log("Image optimized, size:", optimizedBuffer.length);

//     // Convert to base64 for ImgBB
//     const base64Image = optimizedBuffer.toString("base64");

//     // Upload to ImgBB
//     const formData = new FormData();
//     formData.append("key", imgBBKey);
//     formData.append("image", base64Image);
//     formData.append("name", `profile-${Date.now()}`); // Optional: give it a name

//     console.log("Uploading to ImgBB...");

//     const response = await fetch("https://api.imgbb.com/1/upload", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("ImgBB response error:", errorText);
//       throw new Error(`Upload failed: ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log("ImgBB upload successful:", result.data.url);

//     if (result.success) {
//       return {
//         url: result.data.url, // Direct image URL
//         display_url: result.data.display_url, // ImgBB page URL
//         publicId: result.data.id,
//         delete_url: result.data.delete_url, // URL to delete image if needed
//       };
//     } else {
//       throw new Error(result.error?.message || "Upload failed");
//     }
//   } catch (error: any) {
//     console.error("Upload function error:", error);
//     throw new Error(`Failed to upload image: ${error.message}`);
//   }
// }
