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
  )
  if (!uploadResult) return Promise.reject(uploadResult);
  return Promise.resolve(`https://images.zehata.dev/${filename}`);
};
