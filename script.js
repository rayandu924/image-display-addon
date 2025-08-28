// 🖼️ IMAGE DISPLAY ADDON - Simple and optimized
class ImageDisplayAddon {
    constructor() {
        this.imageElement = document.getElementById('displayImage')
        this.loadingSpinner = document.getElementById('loadingSpinner')
        this.errorMessage = document.getElementById('errorMessage')
        
        // Settings
        this.settings = {
            imageUrl: 'https://picsum.photos/400/300',
            borderRadius: 0
        }
        
        // Flags for preventing infinite loops
        this.isProxyAttempt = false
        this.hasTriedProxy = false
        
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
        
        // Image events
        this.imageElement.addEventListener('load', () => this.onImageLoad())
        this.imageElement.addEventListener('error', () => this.onImageError())
    }
    
    updateSettings(newSettings) {
        console.log('🔧 Updating image settings:', newSettings)
        
        const oldUrl = this.settings.imageUrl
        Object.assign(this.settings, newSettings)
        
        // Update styles
        this.updateImageStyles()
        
        // Reload image if URL changed
        if (oldUrl !== this.settings.imageUrl) {
            // Reset flags for new image
            this.isProxyAttempt = false
            this.hasTriedProxy = false
            this.loadImage()
        }
    }
    
    updateImageStyles() {
        this.imageElement.style.borderRadius = `${this.settings.borderRadius}px`
    }
    
    loadImage() {
        if (!this.settings.imageUrl) {
            this.showError()
            return
        }
        
        this.showLoading()
        
        // Reset flags for new image
        this.isProxyAttempt = false
        this.hasTriedProxy = false
        
        // Load image directly without CORS precheck
        this.imageElement.crossOrigin = null // Remove crossOrigin to avoid CORS preflight
        this.imageElement.src = this.settings.imageUrl
        
        console.log('📸 Loading image:', this.settings.imageUrl)
    }
    
    showLoading() {
        this.imageElement.style.opacity = '0'
        this.imageElement.classList.remove('loaded')
        this.loadingSpinner.style.display = 'flex'
        this.errorMessage.style.display = 'none'
    }
    
    onImageLoad() {
        console.log('✅ Image loaded successfully:', this.settings.imageUrl)
        
        // Reset flags on successful load
        this.isProxyAttempt = false
        
        this.loadingSpinner.style.display = 'none'
        this.errorMessage.style.display = 'none'
        
        // Apply styles and show image
        this.updateImageStyles()
        
        // Force visibility and add loaded class
        this.imageElement.style.opacity = '1'
        this.imageElement.style.visibility = 'visible'
        this.imageElement.classList.add('loaded')
        
        console.log('🎯 Image should now be visible with class:', this.imageElement.classList.toString())
    }
    
    onImageError() {
        // Prevent infinite loops
        if (this.isProxyAttempt) {
            console.error('❌ Both direct and proxy load failed for:', this.settings.imageUrl)
            this.loadingSpinner.style.display = 'none'
            this.showError('Failed to load image - CORS blocked')
            return
        }
        
        if (!this.hasTriedProxy) {
            console.warn('⚠️ Image load failed, trying proxy fallback:', this.settings.imageUrl)
            this.tryProxyLoad()
        } else {
            console.error('❌ Image load failed after all attempts:', this.settings.imageUrl)
            this.loadingSpinner.style.display = 'none'
            this.showError('Failed to load image')
        }
    }
    
    tryProxyLoad() {
        if (this.hasTriedProxy) {
            console.warn('🚫 Proxy already attempted, stopping')
            return
        }
        
        // Mark that we're trying proxy and have tried it
        this.isProxyAttempt = true
        this.hasTriedProxy = true
        
        // Try using a CORS proxy service
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(this.settings.imageUrl)}`
        
        console.log('🔄 Trying proxy load:', proxyUrl)
        
        this.imageElement.src = proxyUrl
    }
    
    showError(message = 'Failed to load image') {
        this.errorMessage.textContent = `❌ ${message}`
        this.errorMessage.style.display = 'block'
        this.imageElement.style.opacity = '0'
        this.imageElement.classList.remove('loaded')
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageDisplay = new ImageDisplayAddon()
})