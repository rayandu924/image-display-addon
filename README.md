# 🖼️ Image Display Addon

A simple yet powerful image display addon for MyWallpaper. Show any image from a URL with customizable styling, borders, shadows, and hover effects.

## ✨ Features

- **URL-Based Images** - Display any image from a direct URL
- **Customizable Styling** - Border radius, width, colors, and shadows  
- **Multiple Fit Modes** - Cover, contain, fill, or scale-down options
- **Hover Effects** - Optional scale and shadow animations
- **Loading States** - Smooth loading spinner and error handling
- **Responsive Design** - Adapts to container size automatically
- **CORS Compatible** - Works with most image hosting services

## ⚙️ Configuration Options

| Setting | Type | Description | Range/Options | Default |
|---------|------|-------------|---------------|---------|
| **Image URL** | URL | Direct link to image | Any valid image URL | Unsplash sample |
| **Alt Text** | Text | Accessibility description | Any text | "Display Image" |
| **Border Radius** | Range | Corner roundness | 0-50px | 8px |
| **Border Width** | Range | Border thickness | 0-20px | 0px |
| **Border Color** | Color | Border color | Any hex color | #FFFFFF |
| **Shadow Blur** | Range | Shadow softness | 0-50px | 10px |
| **Shadow Color** | Color | Shadow color | Any hex color | #000000 |
| **Shadow Opacity** | Range | Shadow transparency | 0-100% | 30% |
| **Image Fit** | Select | How image fits container | Cover/Contain/Fill/Scale-down | Cover |
| **Hover Effects** | Checkbox | Enable hover animations | On/Off | On |
| **Hover Scale** | Range | Scale factor on hover | 0.8-1.5x | 1.05x |

## 🎨 Image Fit Modes

- **Cover** - Crops image to fill container (default)
- **Contain** - Fits entire image within container  
- **Fill** - Stretches image to exact container size
- **Scale-down** - Like contain but never enlarges

## 🌐 Supported Image Sources

### ✅ Compatible Services
- **Unsplash** - `https://images.unsplash.com/...`
- **Imgur** - `https://i.imgur.com/...`
- **GitHub** - `https://raw.githubusercontent.com/...`
- **Direct URLs** - Any direct image link

### 📝 URL Examples
```
https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop
https://i.imgur.com/abc123.jpg
https://raw.githubusercontent.com/user/repo/main/image.png
```

## 💡 Usage Tips

### 🖼️ Art Gallery
- Use high border radius for modern look
- Add subtle shadow for depth
- Enable hover effects for interactivity

### 📱 Profile Pictures  
- Use circular border radius (50px)
- Contain fit mode to avoid cropping
- Light border for definition

### 🏞️ Landscape Photos
- Cover fit mode for full container fill
- Minimal border radius for natural look
- Darker shadow for dramatic effect

### 🎨 Design Mockups
- Use exact dimensions with Fill mode
- No border or shadow for clean presentation
- Disable hover for static display

## 🔧 Technical Details

- **CORS Handling** - Built-in cross-origin support
- **Error Recovery** - Graceful handling of failed loads
- **Memory Efficient** - Single image element with dynamic updates
- **Performance Optimized** - Hardware-accelerated transforms
- **Accessibility** - Proper alt text and screen reader support

## 🚀 Advanced Usage

### Dynamic Content
Perfect for displaying:
- Daily photos from APIs
- User avatars
- Product images  
- Weather backgrounds
- Art of the day

### Integration Examples
- **Weather Apps** - Show weather-appropriate backgrounds
- **News Widgets** - Display article featured images
- **Social Feeds** - Show latest post images
- **Portfolio Sites** - Rotating artwork display

## 📝 Version History

- **1.0.0** - Initial release with full image display functionality