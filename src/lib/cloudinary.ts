// lib/cloudinary.ts
"use server"
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// lib/cloudinary-client.ts
export async function uploadFileToCloudinary(file: File, folder: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
  formData.append("folder", folder);

  const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
}


// export async function uploadToCloudinary(file: File, folder: string) {
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         resource_type: "auto",
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     uploadStream.end(buffer);
//   });
// }
