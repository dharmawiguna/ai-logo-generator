import { AILogoPrompt } from "@/configs/AiModels";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  const { prompt, desc, title, email, type, userCredits } = await req.json();

  let base64ImageWithMime = "";

  const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_TOKEN,
  });
  try {
    // generate ai text prompt for logo
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const AIPrompt = JSON.parse(AiPromptResult.response.text()).prompt;

    // generate logo from AI Modal
    if (type == "Free") {
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
        AIPrompt,
        {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_HUGGING_FACE_KEY,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      // convert to base64 image
      const buffer = Buffer.from(response.data, "binary");
      const base64Image = buffer.toString("base64");

      base64ImageWithMime = `data:image/png;base64,${base64Image}`;
    } else {
      // REPLICATE API END POINT
      const output = await replicate.run(
        "bytedance/hyper-flux-8step:16084e9731223a4367228928a6cb393b21736da2a0ca6a5a492ce311f0a97143",
        {
          input: {
            prompt: AIPrompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "png",
            guidance_scale: 3.5,
            output_quality: 80,
            num_inference_steps: 8,
          },
        }
      );
      base64ImageWithMime = await ConvertImageToBase64(output);

      const docRef = doc(db, "users", email);
      await updateDoc(docRef, {
        credits: Number(userCredits) - 1,
      });
    }

    try {
      // save to firebase Database
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64ImageWithMime,
        title: title,
        desc: desc,
      });
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

async function ConvertImageToBase64(image) {
  const resp = await axios.get(image, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return `data:image/png;base64,${base64ImageRaw}`;
}
