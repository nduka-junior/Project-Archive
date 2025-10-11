import { cloudinary } from "@/lib/cloud";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: folder || "uploads", resource_type: "raw" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ Cloudinary upload failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
