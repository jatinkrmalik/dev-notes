#!/bin/bash

# Terminal Blog Setup Script
# This script helps you set up your retro CRT terminal blog

set -e

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ASCII Art Header
echo -e "${GREEN}"
cat << "EOF"
 ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
    ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                                                                   
 ██████╗ ██╗      ██████╗  ██████╗                                
 ██╔══██╗██║     ██╔═══██╗██╔════╝                                
 ██████╔╝██║     ██║   ██║██║  ███╗                               
 ██╔══██╗██║     ██║   ██║██║   ██║                               
 ██████╔╝███████╗╚██████╔╝╚██████╔╝                               
 ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝                                

EOF
echo -e "${NC}"

echo -e "${GREEN}🖥️  Terminal Blog Setup${NC}"
echo -e "${YELLOW}Setting up your retro CRT-style Jekyll blog...${NC}"
echo ""

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
    echo -e "${RED}❌ Ruby is not installed. Please install Ruby 2.7+ first.${NC}"
    exit 1
fi

# Check if Bundler is installed
if ! command -v bundle &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Bundler...${NC}"
    gem install bundler
fi

# Configure Bundler to install gems locally
echo -e "${YELLOW}⚙️  Configuring Bundler...${NC}"
bundle config set --local path 'vendor/bundle'

# Install dependencies
echo -e "${YELLOW}📚 Installing Jekyll and dependencies...${NC}"
bundle install

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo -e "${YELLOW}📝 Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata
vendor/
.bundle/
*.gem
*.rbc
/.config
/coverage/
/InstalledFiles
/pkg/
/spec/reports/
/spec/examples.txt
/test/tmp/
/test/version_tmp/
/tmp/

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF
fi

# Prompt for blog customization
echo ""
echo -e "${GREEN}🎨 Let's customize your blog!${NC}"
echo ""

read -p "Enter your blog title (default: Terminal Blog): " blog_title
blog_title=${blog_title:-"Terminal Blog"}

read -p "Enter your name (default: Terminal User): " author_name
author_name=${author_name:-"Terminal User"}

read -p "Enter your blog description: " blog_description
blog_description=${blog_description:-"A retro CRT-style blog with phosphorescent glow"}

read -p "Enter your GitHub username (for URLs): " github_username
github_username=${github_username:-"username"}

# Update _config.yml with user input
echo -e "${YELLOW}📝 Updating configuration...${NC}"
sed -i.bak "s/title: \"Terminal Blog\"/title: \"$blog_title\"/" _config.yml
sed -i.bak "s/author: \"Your Name\"/author: \"$author_name\"/" _config.yml
sed -i.bak "s/description: \"A retro CRT-style blog with phosphorescent glow\"/description: \"$blog_description\"/" _config.yml
sed -i.bak "s/username.github.io/$github_username.github.io/" _config.yml

# Remove backup file
rm _config.yml.bak

# Create first post if none exist
if [ ! "$(ls -A _posts 2>/dev/null)" ]; then
    echo -e "${YELLOW}✍️  Creating your first post...${NC}"
    today=$(date +%Y-%m-%d)
    cat > "_posts/${today}-hello-terminal-world.md" << EOF
---
layout: post
title: "Hello Terminal World!"
date: $(date +"%Y-%m-%d %H:%M:%S %z")
categories: [blog, welcome]
tags: [first-post, terminal, retro]
author: "$author_name"
---

Welcome to your new Terminal Blog! 🖥️

This is your first post in this retro CRT-style blog. Here are some things you can do:

## Getting Started

### Writing Posts
Create new posts in the \`_posts\` directory with the naming convention:
\`YYYY-MM-DD-title.md\`

### Terminal Commands
You can use terminal-style code blocks:

\`\`\`bash
$ ls -la
$ git status
$ echo "Hello Terminal World!"
\`\`\`

### Themes
Toggle between dark (green phosphor) and light (amber) themes using the toggle in the header or press \`Ctrl+Shift+T\`.

### Customization
- Edit \`_config.yml\` for site settings
- Modify colors in \`_sass/_themes.scss\`
- Add new pages in the root directory

## Features

- 🎨 Dual CRT themes (green phosphor & amber)
- ⚡ Fast loading with optimized assets
- 📱 Fully responsive design
- 🔍 SEO optimized
- ♿ Accessible with reduced motion support
- 🚀 GitHub Pages compatible

Happy blogging in the terminal! 💚

\`\`\`
$ echo "Welcome to the retro computing experience!"
Welcome to the retro computing experience!
$ █
\`\`\`
EOF
fi

# Test the blog
echo ""
echo -e "${GREEN}🚀 Testing your blog...${NC}"
echo -e "${YELLOW}Starting Jekyll server...${NC}"

# Start Jekyll in the background
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --detach

# Wait a moment for server to start
sleep 3

# Test if server is running
if curl -s -o /dev/null -w "%{http_code}" http://localhost:4000 | grep -q "200"; then
    echo -e "${GREEN}✅ Blog is running successfully!${NC}"
    echo ""
    echo -e "${GREEN}🎉 Setup Complete!${NC}"
    echo ""
    echo -e "${YELLOW}Your Terminal Blog is ready:${NC}"
    echo -e "🌐 Local: http://localhost:4000"
    echo -e "📁 Posts: Add new posts to _posts/"
    echo -e "⚙️  Config: Edit _config.yml"
    echo -e "🎨 Themes: Modify _sass/_themes.scss"
    echo ""
    echo -e "${YELLOW}Useful commands:${NC}"
    echo -e "🔄 Restart server: bundle exec jekyll serve"
    echo -e "🛑 Stop server: pkill -f jekyll"
    echo -e "📦 Update gems: bundle update"
    echo ""
    echo -e "${GREEN}Happy blogging! 🖥️💚${NC}"
else
    echo -e "${RED}❌ Server failed to start. Check the logs above.${NC}"
    exit 1
fi 