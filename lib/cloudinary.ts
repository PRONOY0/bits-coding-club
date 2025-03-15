import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto", // Make sure to automatically detect image type
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(new Error("Image upload failed"));
        } else {
          if (result?.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Image upload failed: No secure URL returned"));
          }
        }
      }
    );
    uploadStream.end(buffer); // Make sure buffer is properly passed
  });
};
