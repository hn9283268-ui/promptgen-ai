const idea = document.getElementById("idea");
const category = document.getElementById("category");
const generateBtn = document.getElementById("generateBtn");
const againBtn = document.getElementById("againBtn");
const copyBtn = document.getElementById("copyBtn");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");

const templates = {
  image: (x) => `Create a highly detailed AI image of ${x}. Photorealistic quality, cinematic composition, natural lighting, realistic textures, strong subject focus, professional photography, high detail, visually engaging, 4K look.`,

  video: (x) => `Create a cinematic AI video showing ${x}. Use smooth camera movement, realistic motion, atmospheric lighting, detailed environment, natural physics, cinematic composition, consistent characters and objects, professional film quality.`,

  shorts: (x) => `Create a short-form YouTube video about ${x}. Start with a strong hook in the first 2 seconds, keep the pacing fast, use visually interesting scenes, simple storytelling, a clear payoff, and an engaging ending.`,

  horror: (x) => `Write a suspenseful horror concept about ${x}. Build mystery gradually, create an unsettling atmosphere, use unexpected but non-graphic twists, memorable characters, and finish with a strong suspenseful ending.`,

  gaming: (x) => `Create an engaging gaming content concept about ${x}. Include a strong hook, exciting gameplay moments, a clear objective, entertaining commentary opportunities, and a memorable ending suitable for short-form content.`,

  product: (x) => `Create a professional product advertisement concept for ${x}. Show the product clearly, highlight its main benefit, use attractive cinematic visuals, clean composition, persuasive but accurate messaging, and a strong call to action.`,

  story: (x) => `Create an original short story based on ${x}. Give it a strong opening, clear characters, a simple but engaging conflict, emotional progression, and a satisfying ending.`
};

function generate() {
  const text = idea.value.trim();

  if (!text) {
    idea.focus();
    idea.placeholder = "Please enter an idea first...";
    return;
  }

  resultText.textContent = templates[category.value](text);
  resultBox.classList.remove("hidden");
}

generateBtn.addEventListener("click", generate);
againBtn.addEventListener("click", generate);

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultText.textContent);
    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);

  } catch {
    alert("Copy failed. Please copy the prompt manually.");
  }
});
