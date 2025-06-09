# Quick Reference

Essential commands and information for rapid development of jatin's dev notes blog.

## 🚀 Essential Commands

### Start Development
```bash
# Quick start (most common)
bundle exec jekyll serve --host 0.0.0.0 --port 4000

# With incremental builds (faster)
bundle exec jekyll serve --incremental

# Clean start (if issues)
rm -rf _site .jekyll-cache && bundle exec jekyll serve
```

### Build & Deploy
```bash
# Production build
JEKYLL_ENV=production bundle exec jekyll build

# Generate favicons
./generate-favicons.sh

# Commit changes
git add . && git commit -m "Description of changes"
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `_config.yml` | Jekyll configuration |
| `_sass/_layout.scss` | Main styling (metadata fixes here) |
| `index.html` | Homepage with post listings |
| `_layouts/default.html` | Base template |
| `assets/js/theme-manager.js` | Theme and interactions |

## 📝 Content Creation

### New Blog Post
1. Create file: `_posts/YYYY-MM-DD-title-slug.md`
2. Add front matter:
```yaml
---
layout: post
title: "Your Title"
date: 2024-MM-DD HH:MM:SS -0600
categories: [category1, category2]
tags: [tag1, tag2]
description: "SEO description"
---
```
3. Write content in Markdown
4. Test locally before committing

### New Page
1. Create file: `pagename.md` in root
2. Add front matter:
```yaml
---
layout: page
title: "Page Title"
permalink: /custom-url/
---
```

## 🎨 Styling Quick Fixes

### Theme Colors
```scss
// Dark theme
--bg-primary: #000000;
--text-primary: #00ff00;
--text-accent: #00ff41;

// Light theme  
--bg-primary: #fdf6e3;
--text-primary: #212529;
--text-accent: #ff8c00;
```

### Common CSS Classes
```scss
.post-meta          // Post metadata styling
.post-list          // Homepage post listings
.site-title         // Main site title
.theme-toggle       // Theme switch button
.crt-screen         // CRT effect container
```

## 🔧 Troubleshooting

### Server Won't Start
```bash
# Check dependencies
bundle install --path vendor/bundle

# Kill existing processes
pkill -f jekyll

# Check port
lsof -ti:4000
```

### CSS Not Updating
```bash
# Clear cache
rm -rf .jekyll-cache

# Force rebuild
touch _sass/_base.scss
```

### Build Errors
```bash
# Verbose output
bundle exec jekyll build --verbose

# Check configuration
bundle exec jekyll doctor
```

## ⌨️ Keyboard Shortcuts

- `Ctrl+Shift+T` - Toggle theme
- `Ctrl+Shift+D` - Debug mode
- Standard browser shortcuts work

## 📊 Project Status

### ✅ Working Features
- Retro terminal blog ✓
- Dual theme system ✓
- Responsive design ✓
- Jekyll server running ✓
- 4 sample blog posts ✓
- Comprehensive favicons ✓
- Clean UI with inline metadata ✓
- Clickable site title ✓

### 📂 File Count
- **Total**: 50+ files
- **SCSS**: 5 modular files
- **Templates**: 3 layouts + 3 includes
- **Posts**: 4 technical articles
- **Documentation**: 6 comprehensive guides
- **Assets**: 12+ favicon formats

## 🔗 Quick Links

### Documentation
- **[README.md](README.md)** - Project overview
- **[SESSION_HISTORY.md](SESSION_HISTORY.md)** - What we built
- **[FEATURES.md](FEATURES.md)** - All features
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Dev workflow
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - File organization

### External Resources
- **Jekyll Docs**: https://jekyllrb.com/docs/
- **GitHub Pages**: https://docs.github.com/en/pages
- **Markdown Guide**: https://www.markdownguide.org/
- **SCSS Guide**: https://sass-lang.com/guide

## 🎯 Next Session Checklist

### Before Starting
1. Pull latest changes: `git pull`
2. Start server: `bundle exec jekyll serve --incremental`
3. Verify site loads: `http://localhost:4000`
4. Check documentation: Review relevant docs/ files

### Development Flow
1. Make changes to files
2. Test in browser (auto-reload enabled)
3. Commit frequently: `git add . && git commit -m "Description"`
4. Push when ready: `git push`

### Common Tasks
- **Add post**: Create in `_posts/` with proper front matter
- **Style changes**: Edit files in `_sass/`
- **Fix metadata**: Look in `_sass/_layout.scss`
- **Update theme**: Modify `_sass/_themes.scss`
- **Add features**: Update `assets/js/theme-manager.js`

---

**💡 Pro Tip**: Keep this file open during development for quick reference to commands and file locations! 