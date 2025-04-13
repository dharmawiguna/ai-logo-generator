import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import axios from "axios";
import Prompt from "@/app/_data/Prompt";
import { Loader2Icon } from "lucide-react";

function LogoIdea({ formData, onHandleInputChange }) {
  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState();
  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  const generateLogoDesignIdea = async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design?.title
    )
      .replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoPrompt}", formData.design.prompt);

    const result = await axios.post("/api/ai-design-ideas", {
      prompt: PROMPT,
    });

    const transformedData = transformResponse(result.data);
    setIdeas(transformedData.ideas);
    setLoading(false);
  };

  const transformResponse = (response) => {
    return {
      logo_type: response.logo_type,
      logo_title: response.logo_title,
      description: response.description,
      reference_prompt: response.reference_prompt,
      ideas: response.logo_ideas.map((idea) => Object.values(idea)[0]),
      prompt_suggestions: response.prompt_suggestions.map(
        (prompt) => Object.values(prompt)[0]
      ),
    };
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />

      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas &&
          ideas?.map((item, index) => (
            <h2
              onClick={() => {
                setSelectedOption(item);
                onHandleInputChange(item);
              }}
              key={index}
              className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
                selectedOption == item && "border-primary"
              }`}
            >
              {item}
            </h2>
          ))}
        <h2
          onClick={() => {
            setSelectedOption("Let AI Select the best idea");
            onHandleInputChange("Let AI Select the best idea");
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary ${
            selectedOption == "Let AI Select the best idea" && "border-primary"
          }`}
        >
          Let AI Select the best idea
        </h2>
      </div>
    </div>
  );
}

export default LogoIdea;
