# TechRex Website Assets

## Downloaded Files

### Channel Assets
| File | Location | Size | Description |
|------|----------|------|-------------|
| Channel Avatar | `assets/channel-avatar.jpg` | 82 KB | TechRex channel logo (800x800px) |

### Video Thumbnails
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

**Total Thumbnails:** 10 files (994 KB total)

### Content Data Files
| File | Description |
|------|-------------|
| `content/videos.json` | Video metadata with thumbnails, categories, descriptions |
| `content/channel-info.json` | Channel stats, social links, branding info |

---

## Folder Structure

```
techrex-website/
├── plan/
│   └── PROJECT_PLAN.md       # Complete website strategy
├── assets/
│   ├── channel-avatar.jpg    # Channel logo
│   └── thumbnails/           # Video thumbnails
│       ├── 01-llmfit-guide.jpg
│       ├── 02-claude-office.jpg
│       ├── 03-qwen-claude.jpg
│       ├── 04-llmfit-preview.jpg
│       ├── 05-openclaw-apps.jpg
│       ├── 06-cuda-standard.jpg
│       ├── 07-apple-nvidia.jpg
│       ├── 08-why-nvidia.jpg
│       ├── 09-openclaw-jarvis.jpg
│       └── 10-ai-models-pc.jpg
└── content/
    ├── videos.json           # Video metadata
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

- **Local AI** (4 videos) - LLMfit, Qwen, local model guides
- **AI Tools** (1 video) - Claude integrations
- **AI Assistants** (2 videos) - OpenClaw tutorials
- **Hardware** (3 videos) - NVIDIA, CUDA, Apple M chips

---

*Downloaded: March 2, 2026*
*Source: YouTube Data API v3*
*Channel: @The_TechRex*
