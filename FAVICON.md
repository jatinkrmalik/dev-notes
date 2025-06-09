# Terminal Blog Favicon

This directory contains a comprehensive favicon implementation for the Terminal Blog, designed to represent a retro CRT terminal window.

## 🎨 Design Features

The favicon features:
- **Terminal Window**: Classic macOS-style window with traffic light controls (red, yellow, green)
- **CRT Aesthetic**: Black background with phosphor green text (`#00ff00`)
- **Terminal Prompt**: Shows `$ blog` with a blinking cursor
- **Scan Lines**: Subtle horizontal lines for authentic CRT effect
- **Phosphor Glow**: Green border glow effect

## 📁 Generated Files

### Core Files
- `favicon.ico` - Multi-resolution ICO file for legacy browsers
- `assets/favicon.svg` - Animated SVG with blinking cursor
- `assets/favicon-simple.svg` - Simple SVG without animations

### PNG Variants
- `assets/images/favicon-*.png` - Standard favicon sizes (16x16 to 256x256)
- `assets/images/apple-touch-icon*.png` - Apple iOS icons
- `assets/images/mstile-*.png` - Microsoft Windows tile icons

### Configuration Files
- `assets/site.webmanifest` - Web app manifest for PWA support
- `assets/browserconfig.xml` - Microsoft browser configuration

## 🛠️ Generation Process

1. **Source SVG**: Created two SVG versions:
   - `favicon.svg`: Animated version with CSS animations
   - `favicon-simple.svg`: Static version for better compatibility

2. **Automated Generation**: Use the `generate-favicons.sh` script:
   ```bash
   chmod +x generate-favicons.sh
   ./generate-favicons.sh
   ```

3. **HTML Integration**: Automatically added to `_layouts/default.html` with:
   - Standard favicon links
   - Apple Touch Icons
   - Web App Manifest
   - Microsoft tile configuration
   - Theme colors and meta tags

## 🎯 Browser Support

The favicon implementation supports:
- ✅ **Modern Browsers**: PNG and SVG favicons
- ✅ **Safari/iOS**: Apple Touch Icons
- ✅ **Edge/Windows**: Microsoft tiles and theme colors
- ✅ **Legacy Browsers**: ICO fallback
- ✅ **PWA**: Web App Manifest support

## 🔧 Customization

To customize the favicon:

1. **Modify the SVG**: Edit `assets/favicon-simple.svg`
2. **Update Colors**: Change the phosphor green (`#00ff00`) to your preferred color
3. **Regenerate**: Run `./generate-favicons.sh` to update all formats
4. **Clear Cache**: Hard refresh browsers to see changes

## 📱 Testing

The favicon has been tested across:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Windows tile previews
- PWA installation prompts

## 🎨 Design Rationale

The terminal window design was chosen to:
- Instantly communicate the blog's retro computing theme
- Work well at small sizes (16x16 pixels)
- Maintain visual consistency with the site's CRT aesthetic
- Stand out in browser tabs and bookmarks

The phosphor green color (`#00ff00`) matches the blog's primary theme color and provides excellent contrast against typical browser UI backgrounds. 