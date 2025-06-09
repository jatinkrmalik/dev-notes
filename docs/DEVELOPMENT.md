# Development Guide

Technical development workflow and guidelines for Jatin's Dev Notes blog.

## 🚀 Quick Start

### Prerequisites
- Ruby (version specified in `.ruby-version`)
- Bundler gem
- Git

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd blog-new

# Run setup script (recommended)
chmod +x setup.sh
./setup.sh

# Or manual setup
bundle install --path vendor/bundle
bundle exec jekyll serve
```

### Development Server
```bash
# Standard development server
bundle exec jekyll serve

# With network access
bundle exec jekyll serve --host 0.0.0.0 --port 4000

# With incremental builds (faster)
bundle exec jekyll serve --incremental

# Production build
bundle exec jekyll build
```

## 📁 Project Architecture

### Directory Structure
```
blog-new/
├── _config.yml              # Jekyll configuration
├── _includes/               # Reusable components
├── _layouts/                # Page templates
├── _posts/                  # Blog content
├── _sass/                   # Stylesheet modules
├── assets/                  # Static assets
├── docs/                    # Documentation
└── vendor/                  # Dependencies
```

### Key Configuration Files

#### `_config.yml`
```yaml
# Essential settings
title: "Jatin's Dev Notes"
description: "Raw technical explorations..."
url: ""  # Set for production
baseurl: ""  # Set if subdirectory

# Build settings
markdown: kramdown
highlighter: rouge
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Development settings
incremental: true
livereload: true
```

#### `Gemfile`
```ruby
source "https://rubygems.org"

# Use GitHub Pages for automatic compatibility
gem "github-pages", group: :jekyll_plugins

# Development server
gem "webrick", "~> 1.7"
```

## 🎨 Styling System

### SCSS Architecture
The styling system is modular and organized into 5 main files:

```scss
// assets/css/main.scss - Entry point
@import "themes";      // Color schemes and CSS variables
@import "base";        // Typography and base styles
@import "crt-effects"; // Terminal effects and animations
@import "layout";      // Component layouts and responsive design
@import "syntax-highlighting"; // Code syntax colors
```

### Theme System
```scss
// _sass/_themes.scss
:root[data-theme="dark"] {
  --bg-primary: #000000;
  --text-primary: #00ff00;
  --text-accent: #00ff41;
  --glow-text: 0 0 5px #00ff00;
  // ... more variables
}

:root[data-theme="light"] {
  --bg-primary: #fdf6e3;
  --text-primary: #212529;
  --text-accent: #ff8c00;
  --glow-text: 0 0 3px #ff8c00;
  // ... more variables
}
```

### CSS Custom Properties
All colors and spacing use CSS custom properties for easy theming:
```scss
.post-title {
  color: var(--text-accent);
  text-shadow: var(--glow-text);
  margin-bottom: var(--spacing-md);
}
```

### Responsive Design
```scss
// Breakpoints
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;

// Usage
@media (max-width: $mobile) {
  .post-list {
    padding: 1rem;
  }
}
```

## 🛠 Component Development

### Layout Components

#### `_layouts/default.html`
Base template with:
- HTML5 semantic structure
- Theme system integration
- CRT effects container
- Meta tags and favicons

#### `_layouts/post.html`
Blog post template with:
- Terminal-style header
- Post metadata display
- Content formatting
- Navigation elements

#### `_includes/header.html`
Site header with:
- Terminal navigation
- Theme toggle button
- Responsive menu

### Creating New Components
1. Add HTML to `_includes/` directory
2. Style in appropriate SCSS file
3. Include in layouts with `{% include component.html %}`

## 📝 Content Management

### Blog Posts

#### Front Matter Structure
```yaml
---
layout: post
title: "Your Post Title"
date: 2024-MM-DD HH:MM:SS -TZOFFSET
categories: [category1, category2]
tags: [tag1, tag2, tag3]
description: "SEO description for the post"
author: "Optional author name"
---
```

#### Filename Convention
```
_posts/YYYY-MM-DD-title-slug.md
```

#### Content Guidelines
- Use markdown for formatting
- Include code blocks with language specification
- Add images to `assets/images/`
- Keep paragraphs focused and readable

### Pages
Create static pages by adding markdown files to the root directory:
```yaml
---
layout: page
title: "Page Title"
permalink: /custom-url/
---
```

## ⚡ JavaScript Features

### Theme Management
```javascript
// assets/js/theme-manager.js
class ThemeManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.loadTheme();
    this.bindEvents();
  }
  
  toggleTheme() {
    // Theme switching logic
  }
}
```

### Adding New JavaScript Features
1. Add functions to `theme-manager.js`
2. Follow existing naming conventions
3. Use modern ES6+ syntax
4. Test across browsers

## 🧪 Testing and Quality

### Local Development Testing
```bash
# Test build process
bundle exec jekyll build

# Check for broken links (if using html-proofer)
bundle exec htmlproofer _site

# Validate HTML
bundle exec jekyll build && bundle exec htmlproofer _site --check-html

# Performance testing
bundle exec jekyll build && ls -la _site/assets/css/
```

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Guidelines
- Keep CSS under 50KB compressed
- Optimize images under 100KB each
- Minimize JavaScript dependencies
- Test on 3G connection speeds

## 🔧 Build Process

### Development Build
```bash
# Fast incremental builds
bundle exec jekyll serve --incremental

# Full rebuild
rm -rf _site .jekyll-cache
bundle exec jekyll serve
```

### Production Build
```bash
# Clean production build
rm -rf _site .jekyll-cache
JEKYLL_ENV=production bundle exec jekyll build

# Verify output
ls -la _site/
```

### Asset Generation
```bash
# Generate favicons
chmod +x generate-favicons.sh
./generate-favicons.sh

# Optimize images (manual process)
# Use tools like ImageOptim or online compressors
```

## 🚀 Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. GitHub automatically builds and deploys
3. Site available at `username.github.io/repository-name`

### Manual Deployment
```bash
# Build production site
JEKYLL_ENV=production bundle exec jekyll build

# Deploy _site directory to web server
rsync -avz _site/ user@server:/path/to/web/root/
```

### Environment Variables
```bash
# Production build
export JEKYLL_ENV=production

# Custom URL for production
export JEKYLL_URL=https://yourdomain.com
```

## 🐛 Debugging

### Common Issues

#### Server Won't Start
```bash
# Check Ruby version
ruby --version

# Reinstall dependencies
rm -rf vendor/bundle
bundle install --path vendor/bundle

# Check for port conflicts
lsof -ti:4000
```

#### CSS Not Updating
```bash
# Clear Jekyll cache
rm -rf .jekyll-cache

# Force SCSS recompilation
touch _sass/_base.scss
```

#### Build Errors
```bash
# Verbose build output
bundle exec jekyll build --verbose

# Check for syntax errors
bundle exec jekyll doctor
```

### Debug Mode
Enable debug mode with `Ctrl+Shift+D` for:
- Performance metrics
- Theme state information
- JavaScript error reporting
- Asset loading verification

## 📊 Performance Optimization

### CSS Optimization
- Use CSS custom properties for theming
- Minimize vendor prefixes
- Combine similar selectors
- Remove unused styles

### JavaScript Optimization
- Minimize DOM manipulation
- Use event delegation
- Lazy load non-critical features
- Optimize animations with CSS

### Image Optimization
- Use WebP when possible
- Compress PNG/JPEG images
- Optimize SVG files
- Implement lazy loading

### Build Optimization
```bash
# Exclude unnecessary files
# _config.yml
exclude:
  - docs/
  - vendor/
  - "*.sh"
  - Gemfile*
```

## 🔄 Maintenance

### Regular Tasks
- Update dependencies: `bundle update`
- Check for security issues: `bundle audit`
- Review performance metrics
- Update content regularly

### Monitoring
- Page load speeds
- Mobile responsiveness
- Accessibility compliance
- SEO performance

### Backup Strategy
- Regular git commits
- Remote repository backup
- Asset file backup
- Database backup (if applicable)

This development guide provides a comprehensive foundation for working with the retro terminal blog codebase efficiently and effectively. 