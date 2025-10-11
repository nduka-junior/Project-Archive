


    export async function uploadFileToCloudinary(file: File, folder: string) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Cloudinary upload error:", data);
        throw new Error(data.error || "Cloudinary upload failed");
      }

      return data.secure_url as string;
    }


// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

    

// lib/cloudinary-client.ts
// export async function uploadFileToCloudinary(file: File, folder: string) {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
//   formData.append("folder", folder);

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   if (!res.ok) throw new Error("Cloudinary upload failed");

//   const data = await res.json();
//   return data;
// }

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
