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
        
        // CORS fallback flag
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
            this.hasTriedProxy = false // Reset proxy flag for new URL
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
        this.hasTriedProxy = false
        this.imageElement.src = this.settings.imageUrl
        
        console.log('📸 Loading image:', this.settings.imageUrl)
    }
    
    showLoading() {
        this.imageElement.style.opacity = '0'
        this.imageElement.classList.remove('loaded')
        this.loadingSpinner.style.display = 'block'
        this.errorMessage.style.display = 'none'
    }
    
    onImageLoad() {
        console.log('✅ Image loaded successfully:', this.settings.imageUrl)
        
        this.loadingSpinner.style.display = 'none'
        this.errorMessage.style.display = 'none'
        
        this.updateImageStyles()
        this.imageElement.classList.add('loaded')
        
        console.log('🎯 Image should now be visible with class: loaded')
    }
    
    onImageError() {
        console.error('❌ Image load failed:', this.settings.imageUrl)
        
        // Try CORS proxy if we haven't tried it yet
        if (!this.hasTriedProxy) {
            console.log('🔄 Trying CORS proxy fallback...')
            this.tryProxyLoad()
        } else {
            this.showError()
        }
    }
    
    tryProxyLoad() {
        this.hasTriedProxy = true
        
        // Use a simple CORS proxy
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(this.settings.imageUrl)}`
        console.log('🌐 Loading via proxy:', proxyUrl)
        
        this.imageElement.src = proxyUrl
    }
    
    showError() {
        this.loadingSpinner.style.display = 'none'
        this.errorMessage.style.display = 'block'
        this.imageElement.style.opacity = '0'
        this.imageElement.classList.remove('loaded')
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageDisplay = new ImageDisplayAddon()
})