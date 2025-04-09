"use server";
import {
  S3Client,
  PutObjectCommand,
  S3ServiceException,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

export const uploadToCloudflare = async (filename: string, contentType: string, body: Buffer) => {
  if (
    !process.env.R2_region ||
    !process.env.R2_ENDPOINT ||
    !process.env.R2_ACCESS_KEY_ID ||
    !process.env.R2_SECRET_ACCESS_KEY
  ) {
    return;
  }

  const client = new S3Client({
    region: process.env.R2_region,
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  const bucketName = process.env.R2_BUCKET_NAME;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: filename,
    Body: body,
    ContentType: contentType,
  });

  try {
    // throw "test";
    return await client.send(command);
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      // TODO Unlikely that confirmation pdfs are larger than 5GB.
      //   console.error(
      //     `Error from S3 while uploading object to ${bucketName}. \
      // The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
      // or the multipart upload API (5TB max).`,
      //   );
    } else if (caught instanceof S3ServiceException) {
      throw `Error uploading`;
    } else {
      throw caught;
    }
  }
};