"use client";
import React, { useState } from "react";
import LogoTitle from "./_components/LogoTitle";
import HeadingDescription from "./_components/HeadingDescription";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDesc from "./_components/LogoDesc";
import LogoColorPalette from "./_components/LogoColorPalette";
import LogoDesign from "./_components/LogoDesign";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";

function CreateLogo() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mt-28 p-10 border rounded-xl 2xl:mx-72">
      {step == 1 ? (
        <LogoTitle
          onHandleInputChange={(value) => onHandleInputChange("title", value)}
          formData={formData}
        />
      ) : step == 2 ? (
        <LogoDesc
          onHandleInputChange={(value) => onHandleInputChange("desc", value)}
          formData={formData}
        />
      ) : step == 3 ? (
        <LogoColorPalette
          onHandleInputChange={(value) => onHandleInputChange("palette", value)}
          formData={formData}
        />
      ) : step == 4 ? (
        <LogoDesign
          onHandleInputChange={(value) => onHandleInputChange("design", value)}
          formData={formData}
        />
      ) : step == 5 ? (
        <LogoIdea
          onHandleInputChange={(value) => onHandleInputChange("idea", value)}
          formData={formData}
        />
      ) : step == 6 ? (
        <PricingModel
          onHandleInputChange={(value) => onHandleInputChange("pricing", value)}
          formData={formData}
        />
      ) : null}

      <div className="flex items-center justify-between mt-2">
        {step != 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft /> Previous
          </Button>
        )}
        <Button onClick={() => setStep(step + 1)}>
          {" "}
          Continue <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default CreateLogo;
