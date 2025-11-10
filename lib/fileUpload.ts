import cloudinary from "@/lib/cloudinary";

export async function fileUpload(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "myfolder" }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
      .end(buffer);
  });
  return result;
}
