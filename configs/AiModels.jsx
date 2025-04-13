const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Based on Logo of type App Logo Generate a text prompt to create Logo for Logo title/Brand name : TechUs with decription: We will find you and refering to prompt: Create a vibrant and playful 3D logo for an app. The design should feature bold, colorful text with a glossy finish. Include an icon relevant to the apps theme above the text and a background that complements the concept, such as a bright outdoor scene with natural elements like green grass, a blue sky, and fluffy white clouds. Use a rounded square frame with a yellow border and subtle shadows for a polished and inviting look. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "logo_type": "App Logo",\n  "logo_title": "TechUs",\n  "description": "We will find you",\n  "reference_prompt": "Create a vibrant and playful 3D logo for an app. The design should feature bold, colorful text with a glossy finish. Include an icon relevant to the app\'s theme above the text and a background that complements the concept, such as a bright outdoor scene with natural elements like green grass, a blue sky, and fluffy white clouds. Use a rounded square frame with a yellow border and subtle shadows for a polished and inviting look.",\n  "logo_ideas": [\n    {\n      "idea1": "Magnifying glass over globe"\n    },\n    {\n      "idea2": "Connected nodes network symbol"\n    },\n    {\n      "idea3": "Pinpoint location marker icon"\n    },\n    {\n      "idea4": "Searching radar, satellite dish"\n    },\n     {\n      "idea5": "Abstract, interconnected people figures"\n    }\n  ],\n  "prompt_suggestions":[\n      {\n      "prompt1": "Create a vibrant, playful 3D app logo for \'TechUs\'. Feature bold, colorful text \'TechUs\' with a glossy finish. Above the text, place a magnifying glass over a stylized globe icon. Use a bright outdoor scene background: green grass, blue sky, white clouds. Frame with a rounded yellow border, subtle shadows."\n      },\n      {\n      "prompt2": "Design a 3D app logo for \'TechUs\'. Use glossy, bold, and colorful \'TechUs\' text. Incorporate a connected nodes network symbol above the text.  Background: bright outdoor, green grass, blue sky, white clouds. Rounded square frame with yellow border and subtle shadows for a polished look."\n      },\n    {\n      "prompt3": "Generate a playful, vibrant 3D app logo for \'TechUs\'. Text: \'TechUs\' in bold, colorful, glossy font.  Include a pinpoint location marker icon above the text. Background: bright outdoor, with green grass, blue sky, fluffy clouds. Enclose in a rounded square frame, yellow border, soft shadows."\n      },\n       {\n      "prompt4": "3D app logo for \'TechUs\', vibrant and playful. Bold, colorful, and glossy text that reads \'TechUs\'. Place a searching radar or satellite dish icon above the text.  Use a bright, sunny background: green grass, blue sky, white clouds.  Frame with a yellow rounded square border and soft shadows."\n      },\n        {\n      "prompt5": "Create a vibrant and playful 3D app logo for \'TechUs\', featuring abstract, interconnected people figures icon placed centrally above the text \'TechUs\' which is stylized using,bold, colorful letters, and a glossy finish. The backdrop should include a bright outdoor scene complete with green grass, a blue sky, and white fluffy clouds, all encased within a yellow rounded-square frame with soft shadows."\n      }\n]\n}\n```\n',
        },
      ],
    },
  ],
});

export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a text prompt to create Logo for Logo Title/Brand name : dharma,with description: dharma, with Color combination of Earthy Browns and include Minimalists And Elegants Logos design idea and Referring to this Logo Prompt:Create a sophisticated and elegant logo design that is inspired by nature and vintage aesthetics. The logo should incorporate elements of symbolism, intricate details, and a touch of mystery. Use a combination of typography, line art, and subtle color palettes to create a timeless and visually striking design. The logo should convey a sense of luxury, tradition, and quality.  Give me result in JSON portal with prompt field only",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "The user wants a JSON output containing a text prompt for generating a logo.\n\nHere's the breakdown of the requirements:\n1.  **Logo Title/Brand Name:** dharma\n2.  **Description:** dharma\n3.  **Color Combination:** Earthy Browns\n4.  **Design Idea:** Minimalist and Elegant\n5.  **Reference Prompt Analysis:** The reference prompt emphasizes:\n    *   Sophistication and elegance\n    *   Nature inspiration\n    *   Vintage aesthetics\n    *   Symbolism\n    *   Intricate details (contradicts minimalist?)\n    *   Mystery\n    *   Typography, line art, subtle colors\n    *   Timeless, visually striking\n    *   Luxury, tradition, quality\n\n6.  **Output Format:** JSON with a single field named \"prompt\".\n\n**Constraint Checklist & Confidence Score:**\n1.  Logo Title: Yes\n2.  Description: Yes\n3.  Color Combination: Yes\n4.  Design Idea: Yes\n5.  Reference Prompt Incorporation: Yes\n6.  JSON Output: Yes\n7.  Prompt Field Only: Yes\n\nConfidence Score: 5/5\n\n**Mental Sandbox Simulation:**\n*   **Attempt 1 (Direct combination):** \"Minimalist and elegant logo for 'dharma', using earthy browns. Inspired by nature, vintage aesthetics, symbolism, intricate details, mystery. Combine typography, line art, subtle colors for a timeless, luxury, tradition, quality feel.\" -> This feels a bit clunky and potentially contradictory (minimalist vs. intricate details).\n*   **Attempt 2 (Refining based on 'minimalist'):** \"Create a minimalist and elegant logo for the brand 'dharma'. Utilize a color palette of earthy browns. Draw inspiration from nature and subtle vintage aesthetics, focusing on clean lines and symbolic representation rather than intricate details. The typography should be sophisticated and timeless. The overall design should convey a sense of understated luxury, tradition, quality, and a touch of refined mystery. Focus on simplicity and balance.\" -> This seems better aligned with the 'minimalist' requirement while still incorporating elements from the reference prompt.\n*   **Attempt 3 (Focusing on core elements):** \"Minimalist and elegant logo design for 'dharma'. Feature clean lines and symbolic elements representing 'dharma'. Use an earthy brown color palette. Incorporate sophisticated typography. The design should evoke a sense of understated luxury, timelessness, and quality, with a subtle nod to natural or traditional elements. Ensure the final logo is balanced and visually striking in its simplicity.\" -> This is concise and hits the key points.\n\n**Key Learnings from Sandbox:**\n*   The core request is for a *minimalist and elegant* logo.\n*   The reference prompt provides *inspirational keywords* (nature, vintage, symbolism, mystery, luxury, tradition, quality, timeless) but not all need to be literally translated, especially if they conflict with 'minimalist' (like 'intricate details').\n*   Focus on translating the *essence* of the reference prompt (sophistication, timelessness, quality) into a minimalist context.\n*   Earthy browns are a key constraint.\n\n**Final Prompt Construction Strategy:**\n1.  Start with the core request: Minimalist, elegant logo for 'dharma'.\n2.  Incorporate the color: Earthy brown palette.\n3.  Add key design elements: Clean lines, subtle symbolism (perhaps related to the concept of 'dharma' itself - balance, path, wheel?).\n4.  Include typography requirement: Sophisticated, elegant typography.\n5.  Infuse desired feelings/qualities (inspired by reference): Understated luxury, timelessness, quality, natural/traditional feel, balance.\n6.  Ensure it fits the JSON structure.\n\nOkay, constructing the final prompt based on Attempt 3 seems best.",
        },
        {
          text: "```json\n{\n  \"prompt\": \"Create a minimalist and elegant logo for the brand name 'dharma'. The design should primarily use a color palette of earthy browns. Focus on clean lines, subtle symbolism related to the concept of 'dharma' (e.g., balance, path, continuity), and sophisticated typography. While minimalist, the logo should still evoke a sense of understated luxury, timelessness, tradition, and quality, drawing inspiration from nature and refined aesthetics. Aim for a visually balanced and elegant mark suitable for a high-quality brand.\"\n}\n```",
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
