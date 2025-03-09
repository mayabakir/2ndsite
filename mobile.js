/**
 * Mobile-specific JavaScript for Maya's Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile detection to include Arc browser and other modern browsers
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Arc/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Also check viewport width as a fallback for browsers that don't report accurate user agent
    const isMobileViewport = window.innerWidth <= 768;
    
    if (isMobile || isMobileViewport) {
        // Force mobile mode for all windows
        document.documentElement.classList.add('mobile-view');
        
        // Immediately show the about window to prevent flashing
        const aboutWindow = document.getElementById('about-window');
        if (aboutWindow) {
            aboutWindow.setAttribute('style', `
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                text-align: center !important;
                height: 80vh !important;
                max-height: 80vh !important;
                width: 85% !important;
                padding: 0 !important;
                box-sizing: border-box !important;
                top: 10vh !important;
                left: 0 !important;
                right: 0 !important;
                bottom: auto !important;
                margin: 0 auto !important;
                position: fixed !important;
                overflow: auto !important;
                z-index: 1000 !important;
                transform: none !important;
                border-radius: 8px !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                background-color: #f5f0e0 !important;
                border: 2px solid #d9d2c0 !important;
            `);
            aboutWindow.classList.add('active-mobile');
            
            // Style the window content
            const windowContent = aboutWindow.querySelector('.window-content');
            if (windowContent) {
                windowContent.setAttribute('style', `
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    align-items: center !important;
                    height: calc(80vh - 40px) !important;
                    padding: 20px !important;
                    box-sizing: border-box !important;
                    width: 100% !important;
                    overflow-y: auto !important;
                `);
            }
            
            // Style the about content
            const aboutContent = aboutWindow.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.setAttribute('style', `
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                    text-align: center !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    padding: 10px !important;
                    box-sizing: border-box !important;
                `);
            }
        }
        
        // Add mobile-specific event listeners and behaviors
        setupMobileNavigation();
        setupTouchInteractions();
        optimizeImagesForMobile();
        setupMobileWindowBehavior();
        setupMobileMusicPlayer();
        
        // Update active mobile icon
        updateActiveMobileIcon('about-window');
    }
    
    // Add resize listener to handle orientation changes and browser resizing
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.documentElement.classList.add('mobile-view');
            setupMobileWindowBehavior();
            
            // Show about window when resizing to mobile
            setTimeout(() => {
                showMobileWindow('about-window');
            }, 100);
        } else {
            document.documentElement.classList.remove('mobile-view');
        }
    });
});

/**
 * Sets up mobile navigation
 */
function setupMobileNavigation() {
    // Make mobile menu sticky at bottom
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        // Ensure it's visible
        mobileMenu.style.display = 'block';
        
        // Add active state to mobile icons
        const mobileIcons = document.querySelectorAll('.mobile-icon');
        mobileIcons.forEach(icon => {
            icon.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            });
            
            icon.addEventListener('touchend', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
    }
}

/**
 * Sets up touch interactions for mobile
 */
function setupTouchInteractions() {
    // Add touch feedback to all clickable elements
    const clickableElements = document.querySelectorAll('a, button, .icon, .mobile-icon');
    
    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

/**
 * Optimizes images for mobile
 */
function optimizeImagesForMobile() {
    // Find all images
    const images = document.querySelectorAll('img');
    
    // Add loading="lazy" attribute to all images
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Add a max-width to ensure images don't overflow
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

/**
 * Sets up mobile window behavior
 */
function setupMobileWindowBehavior() {
    // Get all windows
    const windows = document.querySelectorAll('.window');
    
    // Hide all windows initially
    windows.forEach(window => {
        // Make windows full screen on mobile with !important to override any browser-specific styles
        window.setAttribute('style', `
            width: 100% !important;
            height: calc(100vh - 60px) !important;
            max-height: calc(100vh - 60px) !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            border-radius: 0 !important;
            position: fixed !important;
            overflow-y: auto !important;
            transform: none !important;
            display: none !important;
            box-sizing: border-box !important;
            -webkit-overflow-scrolling: touch !important;
        `);
        
        // Hide resize handles
        const resizeHandles = window.querySelectorAll('.resize-handle');
        resizeHandles.forEach(handle => {
            handle.style.display = 'none';
        });
        
        // Make title bar sticky
        const titleBar = window.querySelector('.title-bar');
        if (titleBar) {
            titleBar.setAttribute('style', `
                position: sticky !important;
                top: 0 !important;
                z-index: 10 !important;
                height: 40px !important;
                display: flex !important;
                align-items: center !important;
                width: 100% !important;
                box-sizing: border-box !important;
            `);
            
            // Style title text
            const titleText = titleBar.querySelector('.title-bar-text');
            if (titleText) {
                titleText.setAttribute('style', `
                    font-size: 14px !important;
                    flex-grow: 1 !important;
                `);
            }
            
            // Style control buttons
            const controls = titleBar.querySelector('.title-bar-controls');
            if (controls) {
                controls.setAttribute('style', `
                    display: flex !important;
                    gap: 1px !important;
                `);
                
                // Style all buttons to match Windows 98 style
                const buttons = controls.querySelectorAll('button');
                buttons.forEach((button, index) => {
                    button.setAttribute('style', `
                        width: 13px !important;
                        height: 11px !important;
                        background-color: #c0c0c0 !important;
                        border: 1px solid !important;
                        border-color: #ffffff #808080 #808080 #ffffff !important;
                        font-size: 6px !important;
                        display: flex !important;
                        justify-content: center !important;
                        align-items: center !important;
                        cursor: pointer !important;
                        color: black !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        min-width: 0 !important;
                        min-height: 0 !important;
                        box-sizing: border-box !important;
                    `);
                });
                
                // Clear any existing event listeners
                const newControls = controls.cloneNode(true);
                controls.parentNode.replaceChild(newControls, controls);
                
                // Add event listeners for each button
                const newButtons = newControls.querySelectorAll('button');
                newButtons.forEach((button, index) => {
                    if (index === 0) {
                        // First button - Minimize
                        button.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const parentWindow = this.closest('.window');
                            if (parentWindow) {
                                minimizeWindow(parentWindow.id);
                            }
                        });
                    } else if (index === 1) {
                        // Second button - Maximize/Restore
                        button.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const parentWindow = this.closest('.window');
                            if (parentWindow) {
                                maximizeWindow(parentWindow.id);
                            }
                        });
                    } else if (index === 2) {
                        // Third button - Close
                        button.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const parentWindow = this.closest('.window');
                            if (parentWindow) {
                                closeWindow(parentWindow.id);
                            }
                        });
                    }
                });
            }
        }
        
        // Make window content scrollable
        const windowContent = window.querySelector('.window-content');
        if (windowContent) {
            windowContent.setAttribute('style', `
                height: calc(100% - 40px) !important;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch !important;
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 15px !important;
            `);
        }
    });
    
    // Show about window by default
    setTimeout(() => {
        showMobileWindow('about-window');
    }, 100);
}

/**
 * Sets up navigation between windows on mobile
 */
function setupMobileWindowNavigation() {
    // Get all mobile icons
    const mobileIcons = document.querySelectorAll('.mobile-icon');
    
    mobileIcons.forEach(icon => {
        // Get the onclick attribute value
        const onclickAttr = icon.getAttribute('onclick');
        
        // If it contains toggleWindow, extract the window ID
        if (onclickAttr && onclickAttr.includes('toggleWindow')) {
            // Extract window ID from toggleWindow('window-id')
            const windowId = onclickAttr.match(/toggleWindow\('([^']+)'\)/)[1];
            
            // Store window ID as data attribute
            icon.setAttribute('data-window-id', windowId);
            
            // Remove the original onclick
            icon.removeAttribute('onclick');
            
            // Add new click event listener
            icon.addEventListener('click', function() {
                showMobileWindow(windowId);
            });
        }
    });
    
    // Add click event to close buttons
    const closeButtons = document.querySelectorAll('.title-bar-controls button:last-child');
    closeButtons.forEach(button => {
        // Remove original onclick
        const parentWindow = button.closest('.window');
        if (parentWindow) {
            button.removeAttribute('onclick');
            
            // Add new click event
            button.addEventListener('click', function() {
                parentWindow.style.display = 'none';
                parentWindow.classList.remove('active-mobile');
                
                // Show the about window when closing other windows
                if (parentWindow.id !== 'about-window') {
                    showMobileWindow('about-window');
                } else {
                    // If closing the about window, just hide it
                    // This prevents repositioning issues when reopening
                    parentWindow.style.display = 'none';
                    
                    // After a brief delay, show it again properly positioned
                    setTimeout(() => {
                        showMobileWindow('about-window');
                    }, 100);
                }
            });
        }
    });
}

/**
 * Sets up mobile music player functionality
 */
function setupMobileMusicPlayer() {
    // Get music player elements
    const playButton = document.querySelector('.winamp-controls button:nth-child(2)');
    const stopButton = document.querySelector('.winamp-controls button:nth-child(3)');
    const prevButton = document.querySelector('.winamp-controls button:nth-child(1)');
    const nextButton = document.querySelector('.winamp-controls button:nth-child(4)');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    if (!playButton || !stopButton || !prevButton || !nextButton) {
        console.log('Music player controls not found');
        return;
    }
    
    // Make buttons larger and more touch-friendly
    [playButton, stopButton, prevButton, nextButton].forEach(button => {
        if (button) {
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.margin = '0 5px';
            button.style.fontSize = '18px';
        }
    });
    
    // Make playlist items more touch-friendly
    playlistItems.forEach(item => {
        item.style.padding = '12px 8px';
        item.style.fontSize = '14px';
        
        // Ensure click events work properly on mobile
        item.addEventListener('touchend', function(e) {
            e.preventDefault();
            // Trigger the click event that's already set up in desktop.html
            this.click();
        });
    });
    
    // Ensure audio context is resumed on user interaction for iOS
    document.addEventListener('touchstart', function() {
        // Check if audio context exists and is suspended
        if (window.audioContext && window.audioContext.state === 'suspended') {
            window.audioContext.resume();
        }
    }, { once: true });
    
    // Add special handling for the music window
    const winampWindow = document.getElementById('winamp-window');
    if (winampWindow) {
        // When the music window is shown, make sure it's properly sized
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'style' && 
                    winampWindow.style.display !== 'none') {
                    // Ensure the visualizer canvas is properly sized
                    const canvas = document.getElementById('visualizer');
                    if (canvas) {
                        setTimeout(() => {
                            canvas.width = canvas.offsetWidth;
                            canvas.height = canvas.offsetHeight;
                            // Redraw visualization if needed
                            if (typeof drawVisualization === 'function') {
                                drawVisualization();
                            }
                        }, 100);
                    }
                }
            });
        });
        
        observer.observe(winampWindow, { attributes: true });
    }
}

/**
 * Shows a specific window on mobile and hides others
 */
function showMobileWindow(windowId) {
    // Hide all windows first
    document.querySelectorAll('.window').forEach(window => {
        window.classList.remove('active-mobile');
        window.style.display = 'none';
    });
    
    // Show the target window
    const targetWindow = document.getElementById(windowId);
    if (targetWindow) {
        targetWindow.classList.add('active-mobile');
        targetWindow.style.display = 'flex';
        targetWindow.style.flexDirection = 'column';
        
        // Set height to 100vh for full screen windows
        targetWindow.style.height = '100vh';
        
        // Special handling for about window
        if (windowId === 'about-window') {
            // Apply specific styling for the welcome window
            targetWindow.style.height = '60vh';
            targetWindow.style.maxHeight = '60vh';
            targetWindow.style.width = '80%';
            targetWindow.style.top = '20vh';
            targetWindow.style.left = '0';
            targetWindow.style.right = '0';
            targetWindow.style.margin = '0 auto';
            targetWindow.style.borderRadius = '8px';
            targetWindow.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            targetWindow.style.backgroundColor = '#ffffff';
            targetWindow.style.border = '2px solid #F7C9C3';
            
            // Ensure the title bar has the pale pink color
            const titleBar = targetWindow.querySelector('.title-bar');
            if (titleBar) {
                titleBar.style.backgroundColor = '#F7C9C3';
                titleBar.style.padding = '3px 8px';
                titleBar.style.color = '#333';
            }
            
            // Adjust the window content
            const windowContent = targetWindow.querySelector('.window-content');
            if (windowContent) {
                windowContent.style.height = 'calc(60vh - 30px)';
                windowContent.style.display = 'flex';
                windowContent.style.flexDirection = 'column';
                windowContent.style.alignItems = 'center';
                windowContent.style.justifyContent = 'flex-start';
                windowContent.style.padding = '15px';
                windowContent.style.overflow = 'auto';
            }
            
            // Reduce spacing between title bar and profile picture
            const aboutHeader = targetWindow.querySelector('.about-header');
            if (aboutHeader) {
                aboutHeader.style.margin = '0';
                aboutHeader.style.padding = '0';
                aboutHeader.style.height = '0';
            }
            
            const aboutMain = targetWindow.querySelector('.about-main');
            if (aboutMain) {
                aboutMain.style.display = 'flex';
                aboutMain.style.flexDirection = 'column';
                aboutMain.style.alignItems = 'center';
                aboutMain.style.gap = '10px';
                aboutMain.style.width = '100%';
            }
            
            const profileSection = targetWindow.querySelector('.profile-section');
            if (profileSection) {
                profileSection.style.marginBottom = '10px';
                profileSection.style.padding = '0';
            }
            
            const profileBox = targetWindow.querySelector('.profile-box');
            if (profileBox) {
                profileBox.style.marginTop = '0';
            }
            
            // Adjust the about content
            const aboutContent = targetWindow.querySelector('.about-content');
            if (aboutContent) {
                aboutContent.style.padding = '0';
                aboutContent.style.justifyContent = 'flex-start';
            }
        } else {
            // For other windows, use full height
            targetWindow.style.height = 'calc(100vh - 60px)';
            targetWindow.style.maxHeight = 'calc(100vh - 60px)';
            targetWindow.style.width = '100%';
            targetWindow.style.top = '0';
            targetWindow.style.left = '0';
            targetWindow.style.borderRadius = '0';
        }
        
        // Update active mobile icon
        updateActiveMobileIcon(windowId);
    }
}

/**
 * Updates the active state on mobile icons
 */
function updateActiveMobileIcon(windowId) {
    // Remove active class from all icons
    const mobileIcons = document.querySelectorAll('.mobile-icon');
    mobileIcons.forEach(icon => {
        icon.classList.remove('active');
    });
    
    // Find the icon that corresponds to this window and add active class
    mobileIcons.forEach(icon => {
        const onclickAttr = icon.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(windowId)) {
            icon.classList.add('active');
        }
    });
    
    // For icons that have been updated with event listeners
    mobileIcons.forEach(icon => {
        // Check if this icon has a click event that shows the target window
        const iconWindowId = icon.getAttribute('data-window-id');
        if (iconWindowId === windowId) {
            icon.classList.add('active');
        }
    });
}

/**
 * Minimizes a window on mobile
 */
function minimizeWindow(windowId) {
    console.log('Minimizing window:', windowId);
    const window = document.getElementById(windowId);
    if (!window) return;
    
    // Check if window is already minimized
    const isMinimized = window.classList.contains('minimized');
    
    if (isMinimized) {
        // Restore window
        window.classList.remove('minimized');
        
        // Restore original size based on window type
        if (windowId === 'about-window') {
            window.style.height = '60vh';
            window.style.width = '80%';
            window.style.top = '20vh';
            
            const windowContent = window.querySelector('.window-content');
            if (windowContent) {
                windowContent.style.height = 'calc(60vh - 30px)';
                windowContent.style.display = 'flex';
            }
        } else {
            window.style.height = 'calc(100vh - 60px)';
            window.style.width = '100%';
            window.style.top = '0';
            
            const windowContent = window.querySelector('.window-content');
            if (windowContent) {
                windowContent.style.height = 'calc(100% - 40px)';
                windowContent.style.display = 'block';
            }
        }
    } else {
        // Minimize window
        window.classList.add('minimized');
        
        // Save current position and size
        window.dataset.originalHeight = window.style.height;
        window.dataset.originalWidth = window.style.width;
        window.dataset.originalTop = window.style.top;
        
        // Shrink window to just the title bar
        window.style.height = '40px';
        window.style.width = '200px';
        window.style.top = 'calc(100vh - 100px)';
        
        // Hide content
        const windowContent = window.querySelector('.window-content');
        if (windowContent) {
            windowContent.style.display = 'none';
        }
    }
}

/**
 * Maximizes a window on mobile
 */
function maximizeWindow(windowId) {
    console.log('Maximizing window:', windowId);
    const window = document.getElementById(windowId);
    if (!window) return;
    
    // Check if window is already maximized
    const isMaximized = window.classList.contains('maximized');
    
    if (isMaximized) {
        // Restore window
        window.classList.remove('maximized');
        
        // Restore original size based on window type
        if (windowId === 'about-window') {
            window.style.height = '60vh';
            window.style.width = '80%';
            window.style.top = '20vh';
            
            const windowContent = window.querySelector('.window-content');
            if (windowContent) {
                windowContent.style.height = 'calc(60vh - 30px)';
            }
        } else {
            window.style.height = 'calc(100vh - 60px)';
            window.style.width = '100%';
            window.style.top = '0';
            
            const windowContent = window.querySelector('.window-content');
            if (windowContent) {
                windowContent.style.height = 'calc(100% - 40px)';
            }
        }
    } else {
        // Maximize window
        window.classList.add('maximized');
        
        // Save current position and size
        window.dataset.originalHeight = window.style.height;
        window.dataset.originalWidth = window.style.width;
        window.dataset.originalTop = window.style.top;
        
        // Expand window to full screen
        window.style.height = '100vh';
        window.style.width = '100%';
        window.style.top = '0';
        
        // Adjust content
        const windowContent = window.querySelector('.window-content');
        if (windowContent) {
            windowContent.style.height = 'calc(100vh - 40px)';
        }
    }
}

/**
 * Closes a window on mobile
 */
function closeWindow(windowId) {
    console.log('Closing window:', windowId);
    const window = document.getElementById(windowId);
    if (!window) return;
    
    // Hide the window
    window.classList.remove('active-mobile');
    window.style.display = 'none';
} 