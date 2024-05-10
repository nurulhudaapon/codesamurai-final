import { env } from "@/env";

export const upload = async (base64file: string) => {
  return new Promise<string>((resolve, reject) => {
    let data = {
      file: base64file,
      upload_preset: env.CLOUDINARY_UPLOAD_PRESET,
    };
    fetch(env.CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then((r) => r.json())
      .then((data) => resolve(data.secure_url))
      .catch((err) => reject(err));
  });
};
