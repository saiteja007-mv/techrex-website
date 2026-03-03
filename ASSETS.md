# TechRex Website Assets

## Downloaded Files

### Channel Assets
| File | Location | Size | Description |
|------|----------|------|-------------|
| Channel Avatar | `assets/channel-avatar.jpg` | 82 KB | TechRex channel logo (800x800px) |

### Video Thumbnails (All 19 Videos)
| # | File | Video ID | Video Title | Size |
|---|------|----------|-------------|------|
| 1 | `thumbnails/01-llmfit-guide.jpg` | 3LmVGpGCwpc | How to Know Which AI Models YOUR Computer Can Run | 147 KB |
| 2 | `thumbnails/02-claude-office.jpg` | iMbbXtQGtq8 | Claude Just Got Microsoft Office Integration! | 67 KB |
| 3 | `thumbnails/03-qwen-claude.jpg` | 7zw4IKx7iPI | I Connected Qwen 3.5 to Claude Code for Free Local AI Coding | 82 KB |
| 4 | `thumbnails/04-llmfit-preview.jpg` | Huy6k8aYnME | This Tool Checks If Your PC Can Run AI Models | 91 KB |
| 5 | `thumbnails/05-openclaw-apps.jpg` | 8Iwcx2zQ5Gs | The Creator of OpenClaw Was Right 80% of Apps will be Dead | 231 KB |
| 6 | `thumbnails/06-cuda-standard.jpg` | vmIvWfl_pxk | Why CUDA Became the AI Industry Standard | 63 KB |
| 7 | `thumbnails/07-apple-nvidia.jpg` | JaSfVpM0kjE | Apple M Chips vs NVIDIA Part 2 | 83 KB |
| 8 | `thumbnails/08-why-nvidia.jpg` | rU_KNvgTXVo | Why AI Companies Use NVIDIA GPUs Part 1 | 81 KB |
| 9 | `thumbnails/09-openclaw-jarvis.jpg` | Ha1lcfB99yw | Openclaw is literally Jarvis | 83 KB |
| 10 | `thumbnails/10-ai-models-pc.jpg` | zy2BnC7J2Sc | AI Models in Windows and MAC | 66 KB |
| 11 | `thumbnails/11-free-claude-code.jpg` | BExnbxEQJxs | Free alternative for Claude Code | 58 KB |
| 12 | `thumbnails/12-china-ai-coding.jpg` | dMxJ4zFCZSw | China's new AI coding model is a game changer | 80 KB |
| 13 | `thumbnails/13-claude-code-assistant.jpg` | 0UIXP4qjvZI | Claude Code is your ultimate coding assistant | 40 KB |
| 14 | `thumbnails/14-generate-images-offline.jpg` | _FCP24CX93c | Generate Images without Internet | 46 KB |
| 15 | `thumbnails/15-chat-ai-offline.jpg` | aazk0T848b4 | Chat with AI without Internet | 29 KB |
| 16 | `thumbnails/16-use-claude-code.jpg` | xJhEl0DHZk0 | Use Claude Code Better | 76 KB |
| 17 | `thumbnails/17-generate-offline.jpg` | 24ImPc3hrkA | Generate Images and Videos without Internet | 136 KB |
| 18 | `thumbnails/18-chat-llms-offline.jpg` | Va82ixUEKpw | Chat with LLMs without Internet | 128 KB |
| 19 | `thumbnails/19-welcome-techrex.jpg` | JSKYUcBLYuk | Welcome to TechRex | 87 KB |

**Total Thumbnails:** 19 files (~1.6 MB total)

### Content Data Files
| File | Description |
|------|-------------|
| `content/videos.json` | Video metadata with thumbnails, categories, descriptions (all 19 videos) |
| `content/channel-info.json` | Channel stats, social links, branding info |

---

## Folder Structure

```
techrex-website/
├── plan/
│   └── PROJECT_PLAN.md       # Complete website strategy
├── assets/
│   ├── channel-avatar.jpg    # Channel logo
│   └── thumbnails/           # All 19 video thumbnails
│       ├── 01-llmfit-guide.jpg
│       ├── 02-claude-office.jpg
│       ├── 03-qwen-claude.jpg
│       ├── 04-llmfit-preview.jpg
│       ├── 05-openclaw-apps.jpg
│       ├── 06-cuda-standard.jpg
│       ├── 07-apple-nvidia.jpg
│       ├── 08-why-nvidia.jpg
│       ├── 09-openclaw-jarvis.jpg
│       ├── 10-ai-models-pc.jpg
│       ├── 11-free-claude-code.jpg
│       ├── 12-china-ai-coding.jpg
│       ├── 13-claude-code-assistant.jpg
│       ├── 14-generate-images-offline.jpg
│       ├── 15-chat-ai-offline.jpg
│       ├── 16-use-claude-code.jpg
│       ├── 17-generate-offline.jpg
│       ├── 18-chat-llms-offline.jpg
│       └── 19-welcome-techrex.jpg
└── content/
    ├── videos.json           # Video metadata (19 videos)
    └── channel-info.json     # Channel data
```

---

## Usage in Website

### Channel Avatar
```html
<img src="/assets/channel-avatar.jpg" alt="TechRex Logo" />
```

### Video Thumbnails
```html
<img src="/assets/thumbnails/01-llmfit-guide.jpg" alt="Video thumbnail" />
```

### Video Data (JSON)
```javascript
import videos from './content/videos.json';
// videos.videos[0].title, .thumbnail, .category, etc.
```

---

## Categories Breakdown

Based on video content, the categories are:

| Category | Count | Videos |
|----------|-------|--------|
| **Local AI** | 7 | LLMfit, Qwen, offline image/LLM generation |
| **AI Tools** | 5 | Claude Code, Claude Office, AI coding models |
| **AI Assistants** | 2 | OpenClaw tutorials |
| **Hardware** | 3 | NVIDIA, CUDA, Apple M chips |
| **About** | 1 | Welcome to TechRex (channel intro) |

---

## Video Resolution Notes

All thumbnails are downloaded in **maxresdefault.jpg** format (1280x720px) which is the highest quality available from YouTube. This resolution works for:
- Website video grids
- Featured video sections
- High-DPI displays

For faster loading on mobile, consider creating WebP versions or using `srcset` for responsive images.

---

*Downloaded: March 2, 2026*
*Source: YouTube Data API v3*
*Channel: @The_TechRex*
*Total Videos: 19*
