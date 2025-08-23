// 🖼️ IMAGE DISPLAY ADDON - Simple image display with URL configuration
class ImageDisplayAddon {
    constructor() {
        this.imageElement = document.getElementById('displayImage')
        this.loadingSpinner = document.getElementById('loadingSpinner')
        this.errorMessage = document.getElementById('errorMessage')
        
        // Default settings
        this.settings = {
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            altText: 'Display Image',
            borderRadius: 8,
            borderWidth: 0,
            borderColor: '#FFFFFF',
            shadowBlur: 10,
            shadowColor: '#000000', 
            shadowOpacity: 30,
            fitMode: 'cover',
            enableHover: true,
            hoverScale: 1.05
        }
        
        this.setupEventListeners()
        this.loadImage()
        
        console.log('🖼️ Image Display Addon initialized')
    }
    
    setupEventListeners() {
        // Settings updates from MyWallpaper
        window.addEventListener('message', (event) => {
            if (event.data?.type === 'SETTINGS_UPDATE' && event.data?.settings) {
                this.updateSettings(event.data.settings)
            }
        })
        
        // Image load events
        this.imageElement.addEventListener('load', () => this.onImageLoad())
        this.imageElement.addEventListener('error', () => this.onImageError())
        
        // Window resize handling
        window.addEventListener('resize', () => this.updateImageStyles())
    }
    
    updateSettings(newSettings) {
        console.log('🔧 Updating image settings:', newSettings)
        
        const oldUrl = this.settings.imageUrl
        Object.assign(this.settings, newSettings)
        
        // Update alt text
        this.imageElement.alt = this.settings.altText
        
        // Update visual styles
        this.updateImageStyles()
        
        // Reload image if URL changed
        if (oldUrl !== this.settings.imageUrl) {
            this.loadImage()
        }
    }
    
    updateImageStyles() {
        const img = this.imageElement
        const shadow = this.settings
        
        // Convert hex to rgba for shadow
        const shadowRgba = this.hexToRgba(shadow.shadowColor, shadow.shadowOpacity / 100)
        
        // Apply styles
        img.style.borderRadius = `${shadow.borderRadius}px`
        img.style.border = `${shadow.borderWidth}px solid ${shadow.borderColor}`
        img.style.boxShadow = `0 4px ${shadow.shadowBlur}px ${shadowRgba}`
        img.style.objectFit = shadow.fitMode
        
        // Hover effects
        if (shadow.enableHover) {
            img.classList.add('hover-enabled')
            img.style.setProperty('--hover-scale', shadow.hoverScale)
            
            // Update hover CSS dynamically
            this.updateHoverStyles()
        } else {
            img.classList.remove('hover-enabled')
        }
    }
    
    updateHoverStyles() {
        // Create or update dynamic style element
        let styleEl = document.getElementById('dynamic-hover-styles')
        if (!styleEl) {
            styleEl = document.createElement('style')
            styleEl.id = 'dynamic-hover-styles'
            document.head.appendChild(styleEl)
        }
        
        const shadowRgba = this.hexToRgba(this.settings.shadowColor, (this.settings.shadowOpacity + 20) / 100)
        
        styleEl.textContent = `
            #displayImage.hover-enabled:hover {
                transform: scale(${this.settings.hoverScale}) !important;
                box-shadow: 0 8px ${this.settings.shadowBlur + 15}px ${shadowRgba} !important;
            }
        `
    }
    
    loadImage() {
        if (!this.settings.imageUrl) {
            this.showError('No image URL provided')
            return
        }
        
        // Show loading state
        this.showLoading()
        
        // Load image directly without CORS precheck
        this.imageElement.crossOrigin = null // Remove crossOrigin to avoid CORS preflight
        this.imageElement.src = this.settings.imageUrl
        
        console.log('📸 Loading image:', this.settings.imageUrl)
    }
    
    showLoading() {
        this.imageElement.style.opacity = '0'
        this.imageElement.classList.remove('loaded')
        this.loadingSpinner.style.display = 'flex'
        this.errorMessage.classList.remove('show')
    }
    
    onImageLoad() {
        console.log('✅ Image loaded successfully')
        
        this.loadingSpinner.style.display = 'none'
        this.errorMessage.classList.remove('show')
        
        // Apply styles and show image
        this.updateImageStyles()
        
        // Smooth fade in
        requestAnimationFrame(() => {
            this.imageElement.classList.add('loaded')
        })
    }
    
    onImageError() {
        console.warn('⚠️ Image load failed, trying fallback methods:', this.settings.imageUrl)
        
        // Try loading with a proxy service for CORS-blocked images
        this.tryProxyLoad()
    }
    
    tryProxyLoad() {
        // Try using a CORS proxy service
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(this.settings.imageUrl)}`
        
        console.log('🔄 Trying proxy load:', proxyUrl)
        
        this.imageElement.src = proxyUrl
        
        // If proxy also fails, show final error
        this.imageElement.onerror = () => {
            console.error('❌ Both direct and proxy load failed for:', this.settings.imageUrl)
            this.loadingSpinner.style.display = 'none'
            this.showError('Failed to load image - CORS blocked')
        }
    }
    
    showError(message) {
        this.errorMessage.querySelector('span').textContent = `❌ ${message}`
        this.errorMessage.classList.add('show')
        this.imageElement.style.opacity = '0'
        this.imageElement.classList.remove('loaded')
    }
    
    hexToRgba(hex, alpha) {
        // Handle both #RGB and #RRGGBB formats
        hex = hex.replace('#', '')
        
        let r, g, b
        
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16)
            g = parseInt(hex[1] + hex[1], 16) 
            b = parseInt(hex[2] + hex[2], 16)
        } else {
            r = parseInt(hex.slice(0, 2), 16)
            g = parseInt(hex.slice(2, 4), 16)
            b = parseInt(hex.slice(4, 6), 16)
        }
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    
    // Utility method for testing different image URLs
    testImage(url) {
        console.log('🧪 Testing image URL:', url)
        this.settings.imageUrl = url
        this.loadImage()
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageDisplay = new ImageDisplayAddon()
    
    // Development helper - uncomment to test different images
    /*
    setTimeout(() => {
        const testUrls = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop'
        ]
        
        let index = 0
        setInterval(() => {
            window.imageDisplay.testImage(testUrls[index])
            index = (index + 1) % testUrls.length
        }, 5000)
    }, 2000)
    */
})