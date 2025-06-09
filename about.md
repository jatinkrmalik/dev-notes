---
layout: page
title: About
description: "System information and blog details"
permalink: /about/
---

```
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
```

## System Information

Welcome to **Terminal Blog** - a retro CRT-style blogging platform that brings back the nostalgic feel of classic computer terminals with modern web technologies.

### Features

- **Dual Theme System**: Switch between dark (green phosphor) and light (amber) terminal themes
- **CRT Visual Effects**: Authentic scan lines, phosphor glow, and screen curvature
- **Responsive Design**: Works perfectly on all devices while maintaining retro aesthetics
- **Modern Jekyll**: Built with the latest Jekyll version and GitHub Pages compatibility
- **Terminal Typography**: Monospace fonts and authentic terminal-style text rendering
- **Interactive Elements**: Typing animations, blinking cursors, and power-on effects

### Technical Specifications

```bash
$ system --info
```

| Component | Details |
|-----------|---------|
| **Generator** | Jekyll {{ jekyll.version }} |
| **Theme** | Custom CRT Terminal |
| **Fonts** | JetBrains Mono, Fira Code |
| **Highlighting** | Rouge with custom terminal colors |
| **Hosting** | GitHub Pages Compatible |
| **Performance** | Optimized CSS/JS, fast loading |

### Color Schemes

#### Dark Theme (Phosphor)
- Background: `#000000` (True Black)
- Primary Text: `#00ff00` (Bright Green)
- Accent: `#00ff41` (Electric Green)
- Glow Effects: Multi-layer green shadows

#### Light Theme (Amber)
- Background: `#fdf6e3` (Warm Cream)
- Primary Text: `#ff8c00` (Amber Orange)
- Accent: `#ff9500` (Bright Orange)
- Glow Effects: Warm amber shadows

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+T` | Toggle theme |
| `Ctrl+Shift+D` | Toggle debug info |

### Blog Statistics

```bash
$ ls -la ./blog/
```

- **Posts**: {{ site.posts.size }}
- **Pages**: {{ site.pages.size }}
- **Last Updated**: {{ site.time | date: "%Y-%m-%d %H:%M:%S" }}
- **Build Version**: {{ site.time | date: "%Y.%m.%d" }}

### About the Author

This terminal blog was created to demonstrate the perfect blend of retro aesthetics and modern web development. It captures the essence of classic CRT monitors and terminal interfaces while providing a fast, accessible, and SEO-optimized blogging platform.

The design philosophy focuses on:
- **Nostalgia**: Authentic retro computing experience
- **Accessibility**: Proper contrast ratios and screen reader support
- **Performance**: Fast loading despite visual effects
- **Usability**: Modern UX patterns in a retro wrapper

### Contact Information

```bash
$ whoami
user@terminal:~/blog$ echo "Feel free to explore the blog and enjoy the retro computing experience!"
```

---

*This blog respects user preferences for reduced motion and provides fallbacks for all visual effects.* 