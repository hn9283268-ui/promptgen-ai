// PromptGen AI - Prompt Generator

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("textarea");
  const categorySelect = document.querySelector("select");

  const generateButtons = [...document.querySelectorAll("button")].filter(
    btn => btn.textContent.toLowerCase().includes("generate prompt")
  );

  if (!input || !categorySelect || generateButtons.length === 0) {
    console.error("Prompt generator elements not found.");
    return;
  }

  // Create output box
  const outputBox = document.createElement("div");
  outputBox.id = "promptOutput";

  outputBox.style.marginTop = "20px";
  outputBox.style.padding = "20px";
  outputBox.style.borderRadius = "14px";
  outputBox.style.background = "#f8f7ff";
  outputBox.style.border = "1px solid #ddd";
  outputBox.style.display = "none";
  outputBox.style.lineHeight = "1.7";
  outputBox.style.whiteSpace = "pre-wrap";

  input.parentElement.parentElement.appendChild(outputBox);

  const prompts = {
    "AI Video": idea => `
Create a cinematic AI video based on this idea:

"${idea}"

Style: cinematic, realistic, highly detailed
Camera: smooth professional camera movement
Lighting: dramatic and atmospheric
Environment: detailed and immersive
Quality: 4K, high resolution
Motion: natural and realistic
Mood: visually engaging

Include strong composition, realistic textures, detailed backgrounds,
professional lighting and smooth transitions.
`,

    "AI Image": idea => `
Create a highly detailed AI image based on this idea:

"${idea}"

Style: photorealistic, cinematic and professional
Lighting: realistic soft lighting
Composition: balanced and visually appealing
Details: ultra-detailed textures and environment
Camera: professional photography
Quality: 4K, high resolution
Colors: natural and vibrant

Make the final image realistic, sharp and visually impressive.
`,

    "Horror": idea => `
Create a suspenseful horror scene based on this idea:

"${idea}"

Atmosphere: dark, mysterious and unsettling
Lighting: low-key cinematic lighting
Environment: detailed and abandoned
Camera: slow cinematic movement
Mood: suspenseful and mysterious
Style: realistic cinematic horror
Quality: 4K

Build tension through atmosphere, shadows, sound-design cues
and carefully composed visuals. Avoid excessive gore.
`,

    "Shorts": idea => `
Create a highly engaging YouTube Shorts concept based on:

"${idea}"

Duration: 30-60 seconds
Hook: extremely strong first 3 seconds
Style: fast-paced and entertaining
Visuals: eye-catching and dynamic
Structure: Hook → Build-up → Surprise → Ending
Audience: general YouTube viewers
Format: vertical 9:16

Make the concept easy to understand and optimized for viewer retention.
`,

    "Gaming": idea => `
Create an exciting gaming video concept based on:

"${idea}"

Style: energetic and entertaining
Opening: strong hook
Gameplay: exciting and easy to follow
Camera: dynamic gameplay perspective
Editing: fast cuts and engaging transitions
Sound: energetic gaming atmosphere
Quality: high resolution

Include a strong beginning, exciting middle and memorable ending.
`,

    "Product": idea => `
Create a professional product advertisement based on:

"${idea}"

Style: premium commercial
Lighting: studio-quality lighting
Camera: cinematic product shots
Background: clean and professional
Details: realistic materials and textures
Camera movement: smooth and elegant
Quality: 4K

Highlight the product's important features using visually attractive shots.
`
  };

  function getPrompt(idea, category) {
    // Exact category match
    if (prompts[category]) {
      return prompts[category](idea).trim();
    }

    // Partial category matching
    const key = Object.keys(prompts).find(
      k => category.toLowerCase().includes(k.toLowerCase())
    );

    if (key) {
      return prompts[key](idea).trim();
    }

    // Default prompt
    return `
Create a professional AI prompt based on this idea:

"${idea}"

Make it detailed, realistic, creative and visually engaging.
Use professional composition, lighting, camera direction,
environment details and high-quality output instructions.
`.trim();
  }

  function generatePrompt() {
    const idea = input.value.trim();
    const category = categorySelect.value.trim();

    if (!idea) {
      outputBox.style.display = "block";
      outputBox.innerHTML = `
        <strong>Please enter your idea first.</strong><br>
        Example: A mysterious abandoned house in a forest at night.
      `;
      return;
    }

    const finalPrompt = getPrompt(idea, category);

    outputBox.style.display = "block";
    outputBox.innerHTML = `
      <div style="font-size:18px;font-weight:700;margin-bottom:10px;">
        ✨ Your Generated Prompt
      </div>

      <div style="font-size:14px;color:#333;">
        ${finalPrompt}
      </div>

      <button id="copyPromptBtn"
        style="
          margin-top:16px;
          padding:10px 18px;
          border:0;
          border-radius:8px;
          background:#6c4cff;
          color:white;
          font-weight:600;
          cursor:pointer;
        ">
        📋 Copy Prompt
      </button>
    `;

    const copyButton = document.getElementById("copyPromptBtn");

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(finalPrompt);
        copyButton.textContent = "✅ Copied!";
        
        setTimeout(() => {
          copyButton.textContent = "📋 Copy Prompt";
        }, 2000);

      } catch (error) {
        copyButton.textContent = "Copy failed";
      }
    });
  }

  generateButtons.forEach(button => {
    button.addEventListener("click", generatePrompt);
  });
});
