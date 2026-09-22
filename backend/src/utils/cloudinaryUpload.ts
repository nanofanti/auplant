import type { UploadApiResponse } from "cloudinary";

import cloudinary from "../config/cloudinary.js";

export type UploadedImage = {
  url: string;
  publicId: string;
};

export const uploadImage = (
  file: Express.Multer.File,
  folder: string,
): Promise<UploadedImage> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload returned no result"));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    uploadStream.end(file.buffer);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};
