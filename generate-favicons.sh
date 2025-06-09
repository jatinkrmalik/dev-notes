#!/bin/bash

# Favicon Generator Script for Terminal Blog
# Requires ImageMagick (install with: sudo apt-get install imagemagick)

set -e

echo "🖥️  Generating Terminal Blog Favicons..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Create assets directory if it doesn't exist
mkdir -p assets/images

# Generate PNG favicons from SVG
echo "📱 Generating PNG favicons..."

# Convert the simple SVG to various PNG sizes
convert -background transparent assets/favicon.svg -resize 16x16 assets/images/favicon-16x16.png
convert -background transparent assets/favicon.svg -resize 32x32 assets/images/favicon-32x32.png
convert -background transparent assets/favicon.svg -resize 48x48 assets/images/favicon-48x48.png
convert -background transparent assets/favicon.svg -resize 64x64 assets/images/favicon-64x64.png
convert -background transparent assets/favicon.svg -resize 96x96 assets/images/favicon-96x96.png
convert -background transparent assets/favicon.svg -resize 128x128 assets/images/favicon-128x128.png
convert -background transparent assets/favicon.svg -resize 192x192 assets/images/favicon-192x192.png
convert -background transparent assets/favicon.svg -resize 256x256 assets/images/favicon-256x256.png

# Generate Apple Touch Icons
echo "🍎 Generating Apple Touch Icons..."
convert -background transparent assets/favicon.svg -resize 180x180 assets/images/apple-touch-icon.png
convert -background transparent assets/favicon.svg -resize 152x152 assets/images/apple-touch-icon-152x152.png
convert -background transparent assets/favicon.svg -resize 144x144 assets/images/apple-touch-icon-144x144.png
convert -background transparent assets/favicon.svg -resize 120x120 assets/images/apple-touch-icon-120x120.png
convert -background transparent assets/favicon.svg -resize 114x114 assets/images/apple-touch-icon-114x114.png
convert -background transparent assets/favicon.svg -resize 76x76 assets/images/apple-touch-icon-76x76.png
convert -background transparent assets/favicon.svg -resize 72x72 assets/images/apple-touch-icon-72x72.png
convert -background transparent assets/favicon.svg -resize 60x60 assets/images/apple-touch-icon-60x60.png
convert -background transparent assets/favicon.svg -resize 57x57 assets/images/apple-touch-icon-57x57.png

# Generate Microsoft tile icons
echo "🪟 Generating Microsoft Tile Icons..."
convert -background "#000000" assets/favicon.svg -resize 144x144 assets/images/mstile-144x144.png
convert -background "#000000" assets/favicon.svg -resize 150x150 assets/images/mstile-150x150.png
convert -background "#000000" assets/favicon.svg -resize 310x310 assets/images/mstile-310x310.png
convert -background "#000000" assets/favicon.svg -resize 310x150 assets/images/mstile-310x150.png

# Generate ICO file (for older browsers)
echo "💾 Generating ICO file..."
convert assets/images/favicon-16x16.png assets/images/favicon-32x32.png assets/images/favicon-48x48.png assets/images/favicon-64x64.png assets/favicon.ico

# Copy the main favicon to root
cp assets/favicon.ico ./favicon.ico

# Generate Web App Manifest
echo "📋 Generating Web App Manifest..."
cat > assets/site.webmanifest << EOF
{
    "name": "Terminal Blog",
    "short_name": "Terminal",
    "description": "A retro CRT-style blog with phosphorescent glow",
    "icons": [
        {
            "src": "/assets/images/favicon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/assets/images/favicon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        }
    ],
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#000000",
    "orientation": "portrait-primary"
}
EOF

# Generate Browser Config for Microsoft
echo "⚙️  Generating Browser Config..."
cat > assets/browserconfig.xml << EOF
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="/assets/images/mstile-150x150.png"/>
            <square150x150logo src="/assets/images/mstile-150x150.png"/>
            <square310x310logo src="/assets/images/mstile-310x310.png"/>
            <wide310x150logo src="/assets/images/mstile-310x150.png"/>
            <TileColor>#000000</TileColor>
        </tile>
    </msapplication>
</browserconfig>
EOF

echo "✅ Favicons generated successfully!"
echo ""
echo "📁 Generated files:"
echo "   - favicon.ico (root)"
echo "   - assets/favicon.svg (animated)"
echo "   - assets/favicon.svg (simple)"
echo "   - assets/images/ (all PNG variants)"
echo "   - assets/site.webmanifest"
echo "   - assets/browserconfig.xml"
echo ""
echo "🔗 Add the favicon links to your HTML head section." 