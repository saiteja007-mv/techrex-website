#!/bin/bash
# Blogger Publishing Helper Script
# This script helps copy blog content for manual publishing to Blogger

echo "🦖 TechRex Blog Publisher Helper"
echo "================================"
echo ""

BLOG_DIR="content/blog"
BLOGGER_URL="https://www.blogger.com/blog/posts/1337"

echo "Blogger Blog URL: https://saitejatechrex.blogspot.com"
echo ""
echo "Instructions:"
echo "1. Open https://www.blogger.com"
echo "2. Create new post"
echo "3. Copy content from the markdown files"
echo "4. Switch to HTML view and paste"
echo "5. Add video embed code"
echo "6. Publish"
echo ""

echo "Available Blog Posts:"
echo "---------------------"

# List all markdown files
for file in $BLOG_DIR/*.md; do
    if [ "$file" != "$BLOG_DIR/README.md" ]; then
        filename=$(basename "$file" .md)
        # Extract title from frontmatter
        title=$(grep "^title:" "$file" | head -1 | sed 's/title: "//;s/"$//')
        echo "• $filename"
        echo "  Title: $title"
        echo ""
    fi
done

echo ""
echo "Video Embed Template:"
echo "---------------------"
echo '<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
echo ""

echo "Quick Commands:"
echo "---------------"
echo "cat content/blog/01-llmfit-guide.md    # View first blog post"
echo "ls -la content/blog/                    # List all blog posts"
echo ""
