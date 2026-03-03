# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TechRex Website is a content hub for the TechRex YouTube channel (@The_TechRex). The site showcases video tutorials on AI tools, local AI models, developer tools, and hardware comparisons. Currently in planning and asset collection phase.

**Project Stage:** Planning and asset preparation (no framework code yet)
**Recommended Tech Stack:** Astro + Vercel (as documented in PROJECT_PLAN.md)

## Key Project Documents

- **`plan/PROJECT_PLAN.md`** - Complete website strategy, design direction, implementation timeline, and technical recommendations
- **`ASSETS.md`** - Inventory of downloaded channel assets (avatar, thumbnails, metadata)
- **`content/videos.json`** - Video metadata (title, description, category, thumbnail path, publish date)
- **`content/channel-info.json`** - Channel branding info (tagline, social links, The REX Method, statistics)
- **`assets/`** - Channel avatar and video thumbnail images

## Content Structure

### Video Data Schema
Videos are stored in `content/videos.json` with the following structure:
```json
{
  "id": "YouTube video ID",
  "title": "Video title",
  "thumbnail": "relative path to thumbnail image",
  "category": "Local AI|AI Tools|AI Assistants|Hardware",
  "publishedAt": "ISO timestamp",
  "description": "Video description"
}
```

### Channel Data Schema
Channel metadata is in `content/channel-info.json`:
- `channel` - Name, handle, statistics, YouTube thumbnails
- `socialLinks` - Links to YouTube, Instagram, Medium, LinkedIn, GitHub, portfolio, email
- `branding` - Tagline, catchphrase, and The REX Method (Resources, Experiments, eXecution)

### Asset Locations
- **Channel Avatar:** `assets/channel-avatar.jpg` (800x800px)
- **Video Thumbnails:** `assets/thumbnails/[01-10]-*.jpg` (numbered sequentially)

## Next Steps (Setup Phase)

When implementing the website:

1. **Initialize Framework** - Set up Astro project (recommended in PROJECT_PLAN.md)
   - Install dependencies
   - Configure project structure

2. **Import Content** - Data files are already prepared for consumption
   - JSON is ready to import into components
   - Assets are organized and cataloged in `ASSETS.md`

3. **Implement Pages** - According to PROJECT_PLAN.md structure:
   - Homepage (hero, latest videos, categories, newsletter signup)
   - Videos page (grid with category filters)
   - About page (The REX Method, channel story)
   - Resources page (tools, links, guides)

4. **Design System** - Follow visual direction from PROJECT_PLAN.md:
   - Color palette: Tech blue/dino green primary, orange accent
   - Typography: Bold sans-serif headings, clean body font
   - Dark mode friendly with high contrast

## Video Categories

The 10 current videos are organized into 4 categories:

- **Local AI** (4 videos) - LLMfit tool, Qwen integration, model compatibility
- **AI Tools** (1 video) - Claude Office integration
- **AI Assistants** (2 videos) - OpenClaw reviews and tutorials
- **Hardware** (3 videos) - NVIDIA vs Apple M chips, CUDA explainers

## Brand Identity

- **Tagline:** "Learn. Build. Launch without the struggle."
- **Catchphrase:** "Evolve or Get Extinct 🦖"
- **Theme:** Dinosaur/evolution theme with practical tech focus
- **Content Style:** Tutorial-focused, hands-on implementations, practical guides

## Important Paths

```
techrex-website/
├── plan/
│   └── PROJECT_PLAN.md          # Full implementation strategy
├── content/
│   ├── videos.json              # Video metadata (10 entries)
│   └── channel-info.json        # Channel branding & social links
├── assets/
│   ├── channel-avatar.jpg       # Logo
│   └── thumbnails/              # 10 video thumbnails
└── ASSETS.md                    # Asset inventory & usage guide
```

## Development Considerations

- **No existing framework code** - This is a greenfield project
- **Static content focus** - All data is pre-organized in JSON files
- **SEO priority** - The Astro recommendation reflects SEO importance for a content site
- **Dynamic potential** - If future YouTube API integration is needed, data structure supports it

For detailed implementation guidance, design specifications, and development timeline, refer to `plan/PROJECT_PLAN.md`.
