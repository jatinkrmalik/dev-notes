# Project Structure

Complete file and directory structure of the retro terminal Jekyll blog.

## Root Directory

```
blog-new/
├── _config.yml              # Jekyll configuration
├── _includes/               # Reusable template components
├── _layouts/                # Page layouts
├── _posts/                  # Blog posts
├── _sass/                   # SCSS stylesheets
├── assets/                  # Static assets
├── docs/                    # Project documentation
├── vendor/                  # Vendor dependencies
├── Gemfile                  # Ruby dependencies
├── Gemfile.lock            # Locked dependency versions
├── README.md               # Project overview
├── about.md                # About page
├── archive.html            # Posts archive
├── favicon.ico             # Main favicon
├── FAVICON.md              # Favicon documentation
├── generate-favicons.sh    # Favicon generation script
├── index.html              # Homepage
└── setup.sh                # Initial setup script
```

## Detailed Breakdown

### Configuration Files

#### `_config.yml`
```yaml
# Site settings
title: "Jatin's Dev Notes"
email: your-email@example.com
description: Raw technical explorations from a Principal Engineer at Atlassian
baseurl: ""
url: ""

# Build settings
markdown: kramdown
highlighter: rouge
theme: minima
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Collections and defaults
permalink: /:year/:month/:day/:title/
paginate: 10
```

#### `Gemfile`
```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
gem "webrick", "~> 1.7"
```

### Templates and Layouts

#### `_layouts/`
- **`default.html`** - Main page template with CRT effects and theme system
- **`post.html`** - Blog post template with terminal-style headers
- **`page.html`** - Static page template

#### `_includes/`
- **`header.html`** - Site header with navigation and theme toggle
- **`footer.html`** - Footer with system info and links
- **`theme-toggle.html`** - Theme switching component

### Content

#### `_posts/`
- **`2024-12-15-home-lab-adventures-docker-to-ml.md`** - Docker and ML post
- **`2024-12-01-building-resilient-distributed-systems.md`** - Distributed systems post
- **`2024-11-15-multi-cloud-architecture-patterns.md`** - Multi-cloud architecture post
- **`2024-10-20-engineering-leadership-at-scale.md`** - Leadership post

Each post follows this front matter structure:
```yaml
---
layout: post
title: "Post Title"
date: 2024-MM-DD HH:MM:SS -TZOFFSET
categories: [category1, category2]
tags: [tag1, tag2, tag3]
description: "Post description for SEO"
---
```

#### Pages
- **`index.html`** - Homepage with post listings
- **`about.md`** - About page with ASCII art
- **`archive.html`** - Chronological post archive

### Styling System

#### `_sass/`
- **`_themes.scss`** - Dual theme system (dark/light)
- **`_base.scss`** - Typography and base styles
- **`_crt-effects.scss`** - Terminal effects and animations
- **`_layout.scss`** - Layout and component styles
- **`_syntax-highlighting.scss`** - Code syntax highlighting

#### Theme Variables
```scss
// Dark theme (green phosphor)
:root[data-theme="dark"] {
  --bg-primary: #000000;
  --text-primary: #00ff00;
  --text-accent: #00ff41;
  // ... more variables
}

// Light theme (amber)
:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --text-accent: #198754;
  // ... more variables
}
```

### Assets

#### `assets/`
```
assets/
├── css/
│   └── main.scss           # Main stylesheet import
├── images/                 # Image assets
├── js/
│   └── theme-manager.js    # Theme and interaction management
├── favicon.svg             # Animated SVG favicon
├── favicon-simple.svg      # Simple SVG favicon
├── favicon-16x16.png       # 16x16 PNG favicon
├── favicon-32x32.png       # 32x32 PNG favicon
├── apple-touch-icon.png    # Apple touch icon
├── android-chrome-192x192.png  # Android icon
├── android-chrome-256x256.png  # Android icon large
├── mstile-150x150.png      # Microsoft tile
├── safari-pinned-tab.svg   # Safari pinned tab
├── site.webmanifest        # Web app manifest
└── browserconfig.xml       # Browser configuration
```

### Documentation

#### `docs/`
- **`README.md`** - Main documentation entry point
- **`PROJECT_STRUCTURE.md`** - This file
- **`FEATURES.md`** - Feature documentation
- **`STYLING_GUIDE.md`** - CSS and theming guide
- **`CONTENT_GUIDE.md`** - Content creation guide
- **`DEVELOPMENT.md`** - Development workflow
- **`SESSION_HISTORY.md`** - Build history
- **`DEPLOYMENT.md`** - Deployment guide

### Scripts

#### `generate-favicons.sh`
Comprehensive favicon generation script using ImageMagick:
```bash
#!/bin/bash
# Generates all favicon formats from SVG source
# Creates PNG files in multiple sizes
# Generates Apple Touch Icons
# Creates Microsoft tiles
# Builds web manifest and browser config
```

#### `setup.sh`
Initial project setup script:
```bash
#!/bin/bash
# Installs Ruby dependencies
# Sets up local gem installation
# Configures Jekyll environment
# Runs initial build
```

### Generated Files (Git Ignored)

- **`_site/`** - Jekyll build output
- **`.jekyll-cache/`** - Jekyll cache directory
- **`vendor/bundle/`** - Local gem installation

## File Relationships

### Template Inheritance
```
default.html (base layout)
├── post.html (inherits from default)
└── page.html (inherits from default)
```

### SCSS Import Chain
```
assets/css/main.scss
├── _sass/_themes.scss
├── _sass/_base.scss
├── _sass/_crt-effects.scss
├── _sass/_layout.scss
└── _sass/_syntax-highlighting.scss
```

### JavaScript Dependencies
```
theme-manager.js
├── Theme switching logic
├── CRT effects management
├── Keyboard shortcuts
├── Local storage handling
└── Performance monitoring
```

## Build Process

1. **Jekyll Reads Configuration** (`_config.yml`)
2. **Processes Templates** (`_layouts/`, `_includes/`)
3. **Compiles SCSS** (`_sass/` → `assets/css/main.css`)
4. **Processes Content** (`_posts/`, `*.md` → HTML)
5. **Copies Assets** (`assets/` → `_site/assets/`)
6. **Generates Site** (`_site/` directory)

## Key Integrations

- **GitHub Pages** - Automatic deployment
- **Jekyll Feed** - RSS/Atom feed generation
- **Jekyll Sitemap** - XML sitemap
- **Jekyll SEO Tag** - Meta tags and structured data
- **Rouge** - Syntax highlighting
- **Kramdown** - Markdown processing 