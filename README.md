# 💻 jatin's dev notes

Raw technical explorations and dev notes from a Principal Engineer. Unpolished thoughts on distributed systems, cloud architecture, home lab experiments, and everything in between.

This is my personal technical blog where I document my engineering journey, share deep dives into complex systems, and explore the intersection of professional backend engineering with personal technical experiments.

**Live Site**: [dev.j47.in](https://dev.j47.in)

## 👨‍💻 About Me

I'm **Jatin K Malik**, a Principal Engineer at Atlassian with deep expertise in distributed systems, cloud architecture, and performance engineering. Based in Chicago, I specialize in building scalable, high-throughput applications and have previously worked at companies like Uber, Adobe, and various startups.

**Background**: 
- **Principal Engineer** at [Atlassian](https://www.atlassian.com/)
- **Software Architect** at [Uber](https://www.uber.com/)
- Expert in distributed systems, performance optimization, and system design
- Passionate about home labs, machine learning experiments, and hardware tinkering

**Find me online**: [Portfolio](https://jatinkrmalik.com/) • [LinkedIn](https://linkedin.com/in/jatinkrmalik) • [GitHub](https://github.com/jatinkrmalik) • [Twitter](https://x.com/intent/user?screen_name=jatinkrmalik)


## 🎨 About This Site

This blog uses a custom **retro CRT terminal theme** built with Jekyll, featuring:

- **Authentic terminal aesthetics** with green phosphor and amber themes
- **CRT visual effects** including scan lines and phosphor glow
- **Fast, optimized performance** for GitHub Pages
- **Responsive design** that works on all devices
- **Terminal-style interactions** and keyboard shortcuts



## 🚀 Local Development

Want to run this blog locally or use the theme for your own project?

### Prerequisites
- Ruby 2.7+ and Bundler
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/jatinkrmalik/dev-notes.git
cd dev-notes

# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Open in browser
open http://localhost:4000
```

### Configuration
The site is configured in `_config.yml`:
```yaml
title: "jatin's dev notes"
description: "Raw technical explorations and dev notes from a Principal Engineer"
url: "https://dev.j47.in"
author: "@jatinkrmalik"
```

## 📁 Project Structure

```
dev-notes/
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page templates (default, post, page)
├── _includes/            # Reusable components (header, footer, theme-toggle)
├── _sass/               # Stylesheets (themes, CRT effects, syntax highlighting)
├── assets/              # CSS, JS, and images
├── _posts/              # Blog posts in Markdown
├── docs/                # Additional documentation
└── index.html           # Homepage
```

## 🎨 Customization

### Theme Colors
Modify `_sass/_themes.scss` to customize the terminal colors:
```scss
:root[data-theme="dark"] {
  --text-primary: #00ff00;      // Main terminal green
  --text-accent: #00ff41;       // Highlighted text
  --bg-primary: #000000;        // Terminal background
}
```

### CRT Effects
Adjust visual effects in `_sass/_crt-effects.scss`:
```scss
.scanlines {
  background-size: 100% 4px;    // Scan line spacing
}

.phosphor-glow {
  text-shadow: var(--glow-text); // Glow intensity
}
```

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own technical blog or modify it to suit your needs.

## 🤝 Connect & Contribute

- **Issues/Suggestions**: Open an issue on GitHub
- **Technical Discussions**: Find me on [Twitter/X](https://x.com/intent/user?screen_name=jatinkrmalik)

---

**Built with** 💚 **and terminal nostalgia**

```bash
$ echo "Welcome to my dev notes!"
Welcome to my dev notes!
$ █
```
