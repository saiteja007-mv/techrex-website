// YouTube Embed Helper for TechRex Blog
// Usage: Import and use getEmbedHtml() to generate iframe embeds

export interface VideoEmbed {
  videoId: string;
  title: string;
  embedUrl: string;
  watchUrl: string;
  thumbnailUrl: string;
  embedHtml: string;
}

export function getEmbedData(videoId: string, title: string): VideoEmbed {
  return {
    videoId,
    title,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    embedHtml: getEmbedHtml(videoId, title)
  };
}

export function getEmbedHtml(videoId: string, title: string): string {
  return `<iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/${videoId}" 
  title="${title.replace(/"/g, '&quot;')}" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen
  style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);"
></iframe>`;
}

// Blog posts with video data
export const blogVideos = {
  "01-llmfit-guide": {
    videoId: "3LmVGpGCwpc",
    title: "How to Know Which AI Models YOUR Computer Can Run | @The_TechRex"
  },
  "02-claude-office": {
    videoId: "iMbbXtQGtq8",
    title: "Claude Just Got Microsoft Office Integration! Excel + PowerPoint AI"
  },
  "03-qwen-claude": {
    videoId: "7zw4IKx7iPI",
    title: "I Connected Qwen 3.5 (35B) to Claude Code for Free Local AI Coding"
  },
  "04-llmfit-preview": {
    videoId: "Huy6k8aYnME",
    title: "This Tool Checks If Your PC Can Run AI Models (Before You Download)"
  },
  "05-openclaw-apps": {
    videoId: "8Iwcx2zQ5Gs",
    title: "The Creator of OpenClaw Was Right 80% of Apps will be Dead | @The_TechRex"
  },
  "06-cuda-standard": {
    videoId: "vmIvWfl_pxk",
    title: "Why CUDA Became the AI Industry Standard"
  },
  "07-apple-nvidia": {
    videoId: "JaSfVpM0kjE",
    title: "Apple M Chips vs NVIDIA | Part 2"
  },
  "08-why-nvidia": {
    videoId: "rU_KNvgTXVo",
    title: "Why AI Companies Use NVIDIA GPUs | Part 1"
  },
  "09-openclaw-jarvis": {
    videoId: "Ha1lcfB99yw",
    title: "Openclaw is literally Jarvis which can do any kind of task with ease"
  },
  "10-ai-models-pc": {
    videoId: "zy2BnC7J2Sc",
    title: "AI Models in Windows and MAC"
  },
  "11-free-claude-code": {
    videoId: "BExnbxEQJxs",
    title: "Free alternative for Claude Code"
  },
  "12-china-ai-coding": {
    videoId: "dMxJ4zFCZSw",
    title: "China's new AI coding model is a game changer in building websites"
  },
  "13-claude-code-assistant": {
    videoId: "0UIXP4qjvZI",
    title: "Claude Code is your ultimate coding assistant"
  },
  "14-generate-images-offline": {
    videoId: "_FCP24CX93c",
    title: "Generate Images without Internet"
  },
  "15-chat-ai-offline": {
    videoId: "aazk0T848b4",
    title: "Chat with AI without Internet"
  },
  "16-use-claude-code": {
    videoId: "xJhEl0DHZk0",
    title: "Use Claude Code Better | @The_TechRex"
  },
  "17-generate-offline": {
    videoId: "24ImPc3hrkA",
    title: "Generate Images and Videos without Internet | @The_TechRex"
  },
  "18-chat-llms-offline": {
    videoId: "Va82ixUEKpw",
    title: "Chat with LLMs without Internet | @The_TechRex"
  },
  "19-welcome-techrex": {
    videoId: "JSKYUcBLYuk",
    title: "Welcome to TechRex | @The_TechRex"
  }
};

// Generate all embeds
export function generateAllEmbeds(): Record<string, VideoEmbed> {
  const embeds: Record<string, VideoEmbed> = {};
  
  for (const [blogId, data] of Object.entries(blogVideos)) {
    embeds[blogId] = getEmbedData(data.videoId, data.title);
  }
  
  return embeds;
}

export default {
  getEmbedData,
  getEmbedHtml,
  blogVideos,
  generateAllEmbeds
};
