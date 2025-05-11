"use server";

import { randomUUID } from "node:crypto";
import { uploadToCloudflare } from "./uploadToCloudflare";

export const upload = async (
  fileType: string,
  fileExtension: string,
  arrayBuffer: ArrayBuffer,
) => {
  const filename = `${randomUUID()}.${fileExtension}`;
  const uploadResult = await uploadToCloudflare(
    filename,
    fileType,
    Buffer.from(arrayBuffer),
  );
  if (!uploadResult) throw "Upload failed";
  return Promise.resolve(`https://images.zehata.dev/${filename}`);
};
