#!/usr/bin/env node
/**
 * Generate Blogger HTML with YouTube embeds
 * Usage: node generate-blogger-html.js [blog-id]
 * Example: node generate-blogger-html.js 01-llmfit-guide
 */

const blogPosts = require('./content/blog/posts.json').blogPosts;

// Video data mapping
const blogVideos = {
  "01-llmfit-guide": { videoId: "3LmVGpGCwpc", title: "How to Know Which AI Models YOUR Computer Can Run" },
  "02-claude-office": { videoId: "iMbbXtQGtq8", title: "Claude Just Got Microsoft Office Integration" },
  "03-qwen-claude": { videoId: "7zw4IKx7iPI", title: "I Connected Qwen 3.5 to Claude Code" },
  "04-llmfit-preview": { videoId: "Huy6k8aYnME", title: "This Tool Checks If Your PC Can Run AI Models" },
  "05-openclaw-apps": { videoId: "8Iwcx2zQ5Gs", title: "OpenClaw Review - 80% Apps Replaced" },
  "06-cuda-standard": { videoId: "vmIvWfl_pxk", title: "Why CUDA Became the AI Industry Standard" },
  "07-apple-nvidia": { videoId: "JaSfVpM0kjE", title: "Apple M Chips vs NVIDIA" },
  "08-why-nvidia": { videoId: "rU_KNvgTXVo", title: "Why AI Companies Use NVIDIA GPUs" },
  "09-openclaw-jarvis": { videoId: "Ha1lcfB99yw", title: "OpenClaw is Literally Jarvis" },
  "10-ai-models-pc": { videoId: "zy2BnC7J2Sc", title: "AI Models in Windows and MAC" },
  "11-free-claude-code": { videoId: "BExnbxEQJxs", title: "Free Alternative for Claude Code" },
  "12-china-ai-coding": { videoId: "dMxJ4zFCZSw", title: "China's New AI Coding Model" },
  "13-claude-code-assistant": { videoId: "0UIXP4qjvZI", title: "Claude Code - Ultimate Coding Assistant" },
  "14-generate-images-offline": { videoId: "_FCP24CX93c", title: "Generate Images without Internet" },
  "15-chat-ai-offline": { videoId: "aazk0T848b4", title: "Chat with AI without Internet" },
  "16-use-claude-code": { videoId: "xJhEl0DHZk0", title: "Use Claude Code Better" },
  "17-generate-offline": { videoId: "24ImPc3hrkA", title: "Generate Images and Videos without Internet" },
  "18-chat-llms-offline": { videoId: "Va82ixUEKpw", title: "Chat with LLMs without Internet" },
  "19-welcome-techrex": { videoId: "JSKYUcBLYuk", title: "Welcome to TechRex" }
};

function generateEmbedHtml(videoId, title) {
  return `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 20px 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    src="https://www.youtube.com/embed/${videoId}" 
    title="${title.replace(/"/g, '&quot;')}" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
</div>`;
}

function generateBloggerTemplate(post, videoData) {
  const embedHtml = generateEmbedHtml(videoData.videoId, videoData.title);
  
  return `<!-- TechRex Blog Post - ${post.title} -->
<div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto;">

<!-- YouTube Video Embed -->
${embedHtml}

<!-- Post Content -->
<h1 style="color: #27ae60; margin-top: 30px;">${post.title}</h1>

<p style="font-size: 16px; color: #666;">
  <strong>Category:</strong> ${post.category} | 
  <strong>Published:</strong> ${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
</p>

<hr style="border: none; border-top: 2px solid #27ae60; margin: 20px 0;" />

<p style="font-size: 18px;">${post.excerpt}</p>

<!-- Tags -->
<div style="margin-top: 30px;">
  <strong>Tags:</strong> 
  ${post.tags.map(tag => `<span style="background: #f0f0f0; padding: 5px 12px; border-radius: 15px; margin: 0 5px 5px 0; display: inline-block; font-size: 14px;">#${tag}</span>`).join(' ')}
</div>

<!-- Call to Action -->
<div style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 20px; border-radius: 12px; margin-top: 30px; text-align: center;">
  <h3 style="margin: 0 0 10px 0;">🦖 Evolve or Get Extinct</h3>
  <p style="margin: 0;">Subscribe to TechRex for more AI tutorials!</p>
  <a href="https://www.youtube.com/@The_TechRex?sub_confirmation=1" style="display: inline-block; background: #ff0000; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; margin-top: 15px; font-weight: bold;">Subscribe on YouTube →</a>
</div>

</div>`;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('🦖 TechRex Blogger HTML Generator\n');
  console.log('Usage: node generate-blogger-html.js [blog-id]');
  console.log('       node generate-blogger-html.js --all\n');
  console.log('Available blog posts:');
  blogPosts.forEach(post => {
    console.log(`  • ${post.id} - ${post.title}`);
  });
  process.exit(0);
}

if (args[0] === '--all') {
  console.log('🦖 Generating Blogger HTML for all posts...\n');
  
  const fs = require('fs');
  const path = require('path');
  
  const outputDir = path.join(__dirname, 'content/blog/blogger-html');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  blogPosts.forEach(post => {
    const videoData = blogVideos[post.id];
    if (videoData) {
      const html = generateBloggerTemplate(post, videoData);
      const outputFile = path.join(outputDir, `${post.id}.html`);
      fs.writeFileSync(outputFile, html);
      console.log(`✅ Generated: ${outputFile}`);
    }
  });
  
  console.log(`\n🎉 All ${blogPosts.length} Blogger HTML files generated!`);
  console.log(`📁 Location: ${outputDir}`);
} else {
  const blogId = args[0];
  const post = blogPosts.find(p => p.id === blogId);
  
  if (!post) {
    console.error(`❌ Error: Blog post "${blogId}" not found!`);
    console.log('\nAvailable posts:');
    blogPosts.forEach(p => console.log(`  • ${p.id}`));
    process.exit(1);
  }
  
  const videoData = blogVideos[blogId];
  if (!videoData) {
    console.error(`❌ Error: Video data for "${blogId}" not found!`);
    process.exit(1);
  }
  
  const html = generateBloggerTemplate(post, videoData);
  console.log(html);
  
  // Also save to file
  const fs = require('fs');
  const path = require('path');
  const outputDir = path.join(__dirname, 'content/blog/blogger-html');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputFile = path.join(outputDir, `${blogId}.html`);
  fs.writeFileSync(outputFile, html);
  console.log(`\n✅ Saved to: ${outputFile}`);
}
