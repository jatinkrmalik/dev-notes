# 🖥️ Terminal Blog - Retro CRT Jekyll Theme

A nostalgic Jekyll blog theme that recreates the authentic feel of classic CRT terminals with modern web technologies. Experience the phosphorescent glow of green and amber terminal displays with responsive design and GitHub Pages compatibility.

![Terminal Blog Preview](https://via.placeholder.com/800x400/000000/00ff00?text=TERMINAL+BLOG)

## ✨ Features

### 🎨 Authentic CRT Experience
- **Dual Theme System**: Switch between dark (green phosphor) and light (amber) terminal themes
- **CRT Visual Effects**: Scan lines, phosphor glow, and subtle screen curvature
- **Power-On Animation**: Nostalgic boot-up sequence on page load
- **Terminal Typography**: JetBrains Mono and Fira Code monospace fonts

### 📱 Modern Web Standards
- **Responsive Design**: Works perfectly on all devices
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: Respects reduced motion preferences
- **GitHub Pages Compatible**: Deploy anywhere Jekyll runs

### ⌨️ Interactive Features
- **Theme Toggle**: Switch between phosphor and amber themes
- **Typing Animations**: Realistic terminal typing effects
- **Keyboard Shortcuts**: `Ctrl+Shift+T` for theme toggle
- **Terminal Commands**: Click on commands for console output
- **Debug Mode**: `Ctrl+Shift+D` for system information

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7+ and Bundler
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/terminal-blog.git
   cd terminal-blog
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Serve locally**:
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open in browser**:
   ```
   http://localhost:4000
   ```

### Customization

1. **Edit `_config.yml`**:
   ```yaml
   title: "Your Terminal Blog"
   description: "Your retro CRT-style blog"
   url: "https://yourusername.github.io"
   author: "Your Name"
   ```

2. **Update site colors** in `_sass/_themes.scss`:
   ```scss
   :root[data-theme="dark"] {
     --text-primary: #00ff00; // Change to your preferred color
   }
   ```

3. **Create your first post**:
   ```bash
   touch _posts/2024-01-15-my-first-post.md
   ```

## 📁 Project Structure

```
terminal-blog/
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page templates
│   ├── default.html      # Main layout with CRT effects
│   ├── post.html         # Blog post layout
│   └── page.html         # Static page layout
├── _includes/            # Reusable components
│   ├── header.html       # Terminal-style header
│   ├── footer.html       # System information footer
│   └── theme-toggle.html # Theme switching component
├── _sass/               # Stylesheets
│   ├── _base.scss       # Base styles and typography
│   ├── _themes.scss     # Color themes and variables
│   ├── _crt-effects.scss # CRT visual effects
│   ├── _layout.scss     # Layout and components
│   └── _syntax-highlighting.scss # Code highlighting
├── assets/
│   ├── css/
│   │   └── main.scss    # Main stylesheet
│   └── js/
│       └── main.js      # Interactive functionality
├── _posts/              # Blog posts
├── pages/               # Static pages
└── index.html           # Homepage
```

## 🎨 Themes

### Dark Theme (Green Phosphor)
- Background: `#000000` (True Black)
- Primary Text: `#00ff00` (Bright Green)
- Accent: `#00ff41` (Electric Green)
- Perfect for late-night coding sessions

### Light Theme (Amber Terminal)
- Background: `#fdf6e3` (Warm Cream)
- Primary Text: `#ff8c00` (Amber Orange)
- Accent: `#ff9500` (Bright Orange)
- Easier on the eyes in bright environments

## 📝 Writing Posts

Create posts in the `_posts` directory with the naming convention: `YYYY-MM-DD-title.md`

### Front Matter Example
```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15 10:30:00 +0000
categories: [category1, category2]
tags: [tag1, tag2, tag3]
author: "Your Name"
---

Your post content here...
```

### Terminal-Style Elements

**Code blocks** with terminal prompts:
```bash
$ ls -la
$ git status
$ echo "Hello Terminal!"
```

**Terminal commands** in text:
Use `<span class="command">ls -la</span>` for inline commands.

**File listings**:
```
-rw-r--r--  1 user user 1234 Jan 15 10:30 file.txt
drwxr-xr-x  2 user user 4096 Jan 15 10:30 directory/
```

## 🛠️ Customization Guide

### Changing Colors

Edit `_sass/_themes.scss` to modify theme colors:

```scss
:root[data-theme="dark"] {
  --bg-primary: #000000;        // Background color
  --text-primary: #00ff00;      // Main text color
  --text-accent: #00ff41;       // Links and highlights
  --glow-color: #00ff00;        // Glow effect color
}
```

### Adding New Pages

1. Create a new file in the root directory or `pages/` folder
2. Add front matter:
   ```yaml
   ---
   layout: page
   title: "Page Title"
   permalink: /page-url/
   ---
   ```

### Modifying CRT Effects

Adjust visual effects in `_sass/_crt-effects.scss`:

```scss
.scanlines {
  background-size: 100% 4px;    // Scan line spacing
  animation: scanlines 0.1s;    // Animation speed
}

.phosphor-glow {
  text-shadow: var(--glow-text); // Glow intensity
}
```

## 🚢 Deployment

### GitHub Pages

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from a branch"
   - Choose "main" branch

3. **Update `_config.yml`**:
   ```yaml
   url: "https://yourusername.github.io"
   baseurl: "/repository-name"
   ```

### Custom Domain

Add a `CNAME` file to the root directory:
```
yourdomain.com
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+T` | Toggle theme (dark/light) |
| `Ctrl+Shift+D` | Toggle debug information |
| Click commands | Execute terminal commands |

## 🎯 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Load Time**: < 2 seconds on fast connections
- **Bundle Size**: Optimized CSS/JS under 50KB
- **SEO Ready**: Structured data and meta tags

## 🧪 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (basic styling only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic DEC VT100 terminals
- Typography: [JetBrains Mono](https://www.jetbrains.com/mono/)
- Built with [Jekyll](https://jekyllrb.com/)
- CRT effect inspiration from retro computing communities

## 📞 Support

- 📖 [Documentation](https://github.com/username/terminal-blog/wiki)
- 🐛 [Report Issues](https://github.com/username/terminal-blog/issues)
- 💬 [Discussions](https://github.com/username/terminal-blog/discussions)

---

**Made with** 💚 **and nostalgia for the golden age of computing**

```
$ echo "Happy blogging in the terminal!"
Happy blogging in the terminal!
$ █
``` 