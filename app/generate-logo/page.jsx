"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Lookup from "../_data/Lookup";
import { DownloadIcon, LayoutDashboard, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

function GenerateLogo() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);
  const [logoImage, setLogoImage] = useState("");

  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");
  useEffect(() => {
    if (typeof window != undefined && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    if (modelType != "Free" && userDetail?.credits <= 0) {
      toast("Not enought credits!!!");
      return;
    }
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    // generate logo prompt from AI
    // generate logo image
    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData.title,
      desc: formData.desc,
      type: modelType,
      userCredits: userDetail?.credits,
    });

    setLogoImage(result?.data?.image);
    setLoading(false);
  };

  const handleDownload = (image) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = formData.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="flex items-center mt-14 flex-col gap-5">
      {loading ? (
        <>
          <h2 className="text-primary text-2xl text-center font-bold">
            {Lookup.LoadingWaitTitle}
          </h2>
          <p className="text-lg text-gray-500 text-center">
            {Lookup.LoadingWaitDesc}
          </p>
          <LoaderIcon className="animate-spin" />
          <Image src={"/loading.gif"} alt="loading" width={200} height={200} />
          <h2 className="mt-2 font-medium text-2xl text-gray-500">
            Do not refresh!
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-primary text-2xl text-center font-bold">
            {Lookup.LoadingWaitTitle}
          </h2>
          <Image src={logoImage} alt="logo" width={350} height={350} />
          <div className="flex items-center gap-2">
            <Button onClick={() => handleDownload(logoImage)}>
              <DownloadIcon /> Download
            </Button>
            <Link href={"/dashboard"}>
              <Button
                variant="outline"
                onClick={() => console.log("dashboard")}
              >
                <LayoutDashboard /> Dashboard
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default GenerateLogo;
