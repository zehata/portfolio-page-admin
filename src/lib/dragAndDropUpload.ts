"use server";

import { randomUUID } from "node:crypto";
import { uploadToCloudflare } from "./uploadToCloudflare";

export const dragAndDropUpload = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const filenameArray = file.name.split(".");
  const fileExtension = filenameArray[filenameArray.length - 1];
  const filename = `${randomUUID()}.${fileExtension}`;
  const uploadResult = await uploadToCloudflare(
    filename,
    file.type,
    Buffer.from(await file.arrayBuffer()),
  );
  
  return {
    filename,
    environment: {
      region: process.env.R2_region,
      endpoint: process.env.R2_ENDPOINT,
      keyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    uploadResult,
  }
  if (!uploadResult) return Promise.reject(uploadResult);
  return Promise.resolve(`https://images.zehata.dev/${filename}`);
};
