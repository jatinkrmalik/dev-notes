---
layout: post
title: "Welcome to Terminal Blog"
date: 2024-01-15 10:30:00 +0000
categories: [blog, retro, terminal]
tags: [jekyll, crt, design, web-development]
author: "Terminal User"
---

Welcome to **Terminal Blog** - where retro meets modern in perfect harmony! This blog combines the nostalgic aesthetics of classic CRT terminals with cutting-edge web technologies.

## What Makes This Blog Special?

### 🖥️ Authentic CRT Experience

This isn't just another dark theme. We've recreated the authentic feel of classic computer terminals:

- **Phosphor Glow**: Text has that characteristic green or amber glow
- **Scan Lines**: Subtle horizontal lines simulate old CRT displays
- **Screen Curvature**: Gentle border radius mimics vintage monitor curves
- **Power-On Animation**: Experience the nostalgic boot-up sequence

### 🎨 Dual Theme System

Switch between two carefully crafted terminal themes:

#### Dark Theme (Green Phosphor)
```bash
$ theme --set dark
Setting theme to: PHOSPHOR_GREEN
Background: #000000
Text: #00ff00
Accent: #00ff41
```

#### Light Theme (Amber Terminal)
```bash
$ theme --set light  
Setting theme to: AMBER_TERMINAL
Background: #fdf6e3
Text: #ff8c00
Accent: #ff9500
```

### ⌨️ Terminal-Style Typography

Everything uses authentic monospace fonts with proper terminal spacing:

- **Primary**: JetBrains Mono
- **Fallback**: Fira Code, Source Code Pro
- **Characteristics**: Perfect letter spacing, authentic glow effects

## Code Highlighting

Check out how code looks in our terminal environment:

```javascript
// JavaScript with terminal styling
function initializeTerminal() {
  const terminal = new Terminal({
    theme: 'phosphor',
    fontSize: 14,
    fontFamily: 'JetBrains Mono'
  });
  
  terminal.write('\r\n$ Welcome to Terminal Blog!\r\n');
  terminal.write('$ Everything glows with authentic phosphor light\r\n');
}
```

```python
# Python code with retro highlighting
import sys
import terminal_blog

def main():
    print(">>> Initializing retro blog system...")
    blog = terminal_blog.CRTBlog(theme="phosphor")
    blog.power_on()
    print(">>> System ready. Enjoy the nostalgia!")

if __name__ == "__main__":
    main()
```

```bash
# Bash commands look perfectly at home
$ ls -la ./blog/
drwxr-xr-x  2 user user 4096 Jan 15 10:30 _posts/
drwxr-xr-x  2 user user 4096 Jan 15 10:30 _layouts/
drwxr-xr-x  2 user user 4096 Jan 15 10:30 assets/
-rw-r--r--  1 user user 1234 Jan 15 10:30 _config.yml

$ git status
On branch main
Your branch is up to date with 'origin/main'.

$ echo "Perfect terminal aesthetics!"
Perfect terminal aesthetics!
```

## Interactive Features

### Keyboard Shortcuts
- `Ctrl+Shift+T` - Toggle between themes
- `Ctrl+Shift+D` - Show debug information

### Terminal Commands
Click on any terminal command in the blog to see console output!

### Responsive Design
The blog adapts beautifully to all screen sizes while maintaining its retro character.

## Performance & Accessibility

Despite all the visual effects, this blog is:

- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessible**: Respects reduced motion preferences
- **GitHub Pages Compatible**: Deploy anywhere Jekyll runs

## Technical Implementation

### CSS Custom Properties
We use CSS custom properties for theme switching:

```css
:root[data-theme="dark"] {
  --text-primary: #00ff00;
  --bg-primary: #000000;
  --glow-text: 0 0 5px #00ff00, 0 0 10px #00ff00;
}
```

### Modern JavaScript
Clean, modular JavaScript for all interactive features:

```javascript
const ThemeManager = {
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }
};
```

## What's Next?

This blog will feature posts about:

- **Retro Computing**: Deep dives into vintage technology
- **Terminal Applications**: Cool CLI tools and tips
- **Web Development**: Modern techniques with retro style
- **Design Philosophy**: Balancing nostalgia with usability

---

**System Status**: All systems operational 🟢  
**Last Boot**: {{ page.date | date: "%Y-%m-%d %H:%M:%S" }}  
**Uptime**: Running since page load  

*Happy browsing, and welcome to the terminal!* 