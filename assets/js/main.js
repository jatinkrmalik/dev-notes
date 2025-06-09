// Minimal Terminal Blog JavaScript - Optimized for Legibility

(function() {
  'use strict';

  // Theme Management
  const ThemeManager = {
    init() {
      this.easterEggToggle = document.getElementById('retro-mode-toggle');
      this.currentTheme = localStorage.getItem('theme') || 'light';
      
      this.setTheme(this.currentTheme);
      this.bindEvents();
    },

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.currentTheme = theme;
      
      // Update current theme display
      const themeDisplay = document.getElementById('current-theme');
      if (themeDisplay) {
        themeDisplay.textContent = theme === 'dark' ? 'Retro' : 'Modern';
      }
      
      // Disable/enable animations based on theme
      this.handleThemeSpecificFeatures(theme);
    },

    handleThemeSpecificFeatures(theme) {
      const body = document.body;
      
      if (theme === 'light') {
        // Modern mode: disable all CRT effects and animations
        body.classList.add('modern-mode');
        body.classList.remove('retro-mode');
        
        // Hide/disable CRT specific elements
        const scanlines = document.querySelector('.scanlines');
        const powerOnEffect = document.querySelector('.power-on-effect');
        
        if (scanlines) scanlines.style.display = 'none';
        if (powerOnEffect) powerOnEffect.style.display = 'none';
        
      } else {
        // Retro mode: enable CRT effects
        body.classList.add('retro-mode');
        body.classList.remove('modern-mode');
        
        // Show CRT specific elements
        const scanlines = document.querySelector('.scanlines');
        const powerOnEffect = document.querySelector('.power-on-effect');
        
        if (scanlines) scanlines.style.display = 'block';
        if (powerOnEffect) powerOnEffect.style.display = 'block';
      }
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
      
      // Show easter egg toast when entering retro mode
      if (newTheme === 'dark') {
        this.triggerBoltBounce();
        ToastManager.showEasterEggToast();
      }
    },

    triggerBoltBounce() {
      if (this.easterEggToggle) {
        this.easterEggToggle.classList.add('clicked');
        setTimeout(() => {
          this.easterEggToggle.classList.remove('clicked');
        }, 600);
      }
    },

    bindEvents() {
      if (this.easterEggToggle) {
        this.easterEggToggle.addEventListener('click', () => {
          this.toggleTheme();
        });
      }
    }
  };

  // Toast Notification Manager
  const ToastManager = {
    init() {
      this.container = document.getElementById('toast-container');
    },

    showEasterEggToast() {
      this.showToast({
        icon: '⚡',
        title: 'Retro Mode Activated!',
        message: 'You\'ve unlocked the secret terminal experience! Enjoy the authentic 80s computing vibes!',
        duration: 7000
      });
    },

    showToast({ icon, title, message, duration = 4000 }) {
      if (!this.container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      
      toast.innerHTML = `
        <button class="toast-close" aria-label="Close notification">&times;</button>
        <div class="toast-header">
          <span class="toast-icon">${icon}</span>
          <span>${title}</span>
        </div>
        <div class="toast-message">${message}</div>
      `;

      // Add to container
      this.container.appendChild(toast);

      // Add close functionality
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', () => {
        this.hideToast(toast);
      });

      // Auto-hide after duration
      setTimeout(() => {
        this.hideToast(toast);
      }, duration);
    },

    hideToast(toast) {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 500);
    }
  };

  // Minimal Typing Effect (Only for Retro mode)
  const TypingEffect = {
    init() {
      // Only animate if user hasn't disabled animations AND we're in retro mode
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 
          document.documentElement.getAttribute('data-theme') === 'dark') {
        this.elements = document.querySelectorAll('.typing-effect.animate-typing');
        this.startTyping();
      }
    },

    startTyping() {
      this.elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--text-primary)';
        
        setTimeout(() => {
          this.typeText(element, text, 0);
        }, index * 500);
      });
    },

    typeText(element, text, index) {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => {
          this.typeText(element, text, index + 1);
        }, 80 + Math.random() * 40);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }
  };

  // CRT Effects (Only for Retro mode)
  const CRTEffects = {
    init() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        this.powerOnEffect();
        this.setupScanlineFadeOut();
        this.updateUptime();
      }
      
      this.addSubtleInteractivity();
    },

    powerOnEffect() {
      const powerOnElement = document.querySelector('.power-on-effect');
      if (powerOnElement) {
        setTimeout(() => {
          powerOnElement.style.display = 'none';
        }, 1500);
      }
    },

    setupScanlineFadeOut() {
      const scanlines = document.querySelector('.scanlines');
      if (scanlines) {
        setTimeout(() => {
          scanlines.classList.add('fade-out');
        }, 3000);
      }
    },

    addSubtleInteractivity() {
      // Add minimal hover effects to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .nav-link');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          element.style.transition = 'color 0.2s ease';
        });
        
        element.addEventListener('mouseleave', () => {
          element.style.transition = 'color 0.2s ease';
        });
      });
    },

    updateUptime() {
      const uptimeElement = document.getElementById('uptime');
      if (uptimeElement) {
        const startTime = new Date();
        
        setInterval(() => {
          const now = new Date();
          const uptime = now - startTime;
          const seconds = Math.floor(uptime / 1000) % 60;
          const minutes = Math.floor(uptime / (1000 * 60)) % 60;
          const hours = Math.floor(uptime / (1000 * 60 * 60));
          
          uptimeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
      }
    }
  };

  // Clean Click Effects (Adaptive based on theme)
  const ClickEffects = {
    init() {
      this.addClickRipple();
    },

    addClickRipple() {
      const clickableElements = document.querySelectorAll('a, button, .nav-link, .terminal-btn');
      
      clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
          this.createRipple(e, element);
        });
      });
    },

    createRipple(event, element) {
      // Only add ripple if reduced motion is not preferred AND we're in retro mode
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          document.documentElement.getAttribute('data-theme') === 'light') {
        return;
      }

      element.classList.add('click-ripple');
      element.classList.add('ripple-active');
      
      setTimeout(() => {
        element.classList.remove('ripple-active');
      }, 300);
    }
  };

  // Terminal Cursor (Only for Retro mode)
  const TerminalCursor = {
    init() {
      this.cursors = document.querySelectorAll('.cursor');
      
      // Only animate if reduced motion is not preferred AND we're in retro mode
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 
          document.documentElement.getAttribute('data-theme') === 'dark') {
        this.startBlinking();
      }
    },

    startBlinking() {
      this.cursors.forEach(cursor => {
        setInterval(() => {
          cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 600);
      });
    }
  };

  // Terminal Commands (Simplified)
  const TerminalCommands = {
    init() {
      this.addKeyboardShortcuts();
    },

    addKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+T to toggle theme
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
          e.preventDefault();
          ThemeManager.toggleTheme();
        }
        
        // Ctrl+Shift+S to toggle scanlines (only in retro mode)
        if (e.ctrlKey && e.shiftKey && e.key === 'S' && 
            document.documentElement.getAttribute('data-theme') === 'dark') {
          e.preventDefault();
          this.toggleScanlines();
        }
        
        // Ctrl+Shift+D to toggle debug info
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.toggleDebugInfo();
        }
      });
    },

    toggleScanlines() {
      const scanlines = document.querySelector('.scanlines');
      if (scanlines) {
        scanlines.classList.toggle('fade-out');
      }
    },

    toggleDebugInfo() {
      const debugInfo = document.getElementById('debug-info') || this.createDebugInfo();
      debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
    },

    createDebugInfo() {
      const debugDiv = document.createElement('div');
      debugDiv.id = 'debug-info';
      debugDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: var(--bg-secondary);
        border: 1px solid var(--text-dim);
        padding: 1rem;
        font-family: inherit;
        font-size: 0.8rem;
        color: var(--text-primary);
        z-index: 9999;
        max-width: 300px;
        border-radius: 4px;
      `;
      
      debugDiv.innerHTML = `
        <div><strong>Debug Info</strong></div>
        <div>Theme: ${ThemeManager.currentTheme === 'dark' ? 'Retro' : 'Modern'}</div>
        <div>Reduced Motion: ${window.matchMedia('(prefers-reduced-motion: reduce)').matches}</div>
        <div>Screen: ${screen.width}x${screen.height}</div>
        <div>Viewport: ${window.innerWidth}x${window.innerHeight}</div>
        <div>Timestamp: ${new Date().toLocaleTimeString()}</div>
        <div style="margin-top: 0.5rem; font-size: 0.7rem;">
          <div>Ctrl+Shift+T: Toggle theme</div>
          ${ThemeManager.currentTheme === 'dark' ? '<div>Ctrl+Shift+S: Toggle scanlines</div>' : ''}
        </div>
      `;
      
      document.body.appendChild(debugDiv);
      return debugDiv;
    }
  };

  // Responsive Navigation (Simplified)
  const ResponsiveNav = {
    init() {
      this.handleResize();
    },

    handleResize() {
      window.addEventListener('resize', () => {
        const nav = document.querySelector('.directory-listing');
        if (window.innerWidth > 768) {
          nav?.classList.remove('mobile-open');
        }
      });
    }
  };

  // Performance Monitoring (Minimal)
  const PerformanceMonitor = {
    init() {
      this.monitorPerformance();
    },

    monitorPerformance() {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Dev Notes Blog loaded in ${loadTime}ms`);
        
        setTimeout(() => {
          const debugInfo = document.getElementById('debug-info');
          if (debugInfo) {
            const perfDiv = document.createElement('div');
            perfDiv.textContent = `Load Time: ${loadTime}ms`;
            perfDiv.style.fontSize = '0.7rem';
            debugInfo.appendChild(perfDiv);
          }
        }, 100);
      });
    }
  };

  // Accessibility Helper
  const AccessibilityHelper = {
    init() {
      this.setupFocusManagement();
      this.setupReducedMotionHandling();
    },

    setupFocusManagement() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
    },

    setupReducedMotionHandling() {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleMotionChange = (e) => {
        if (e.matches) {
          document.body.classList.add('reduced-motion');
          const scanlines = document.querySelector('.scanlines');
          if (scanlines) {
            scanlines.style.display = 'none';
          }
        } else {
          document.body.classList.remove('reduced-motion');
        }
      };

      reducedMotion.addListener(handleMotionChange);
      handleMotionChange(reducedMotion);
    }
  };

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🖥️  Initializing Dev Notes Blog...');
    
    ThemeManager.init();
    ToastManager.init();
    CRTEffects.init();
    ClickEffects.init();
    TerminalCursor.init();
    TerminalCommands.init();
    ResponsiveNav.init();
    PerformanceMonitor.init();
    AccessibilityHelper.init();
    
    // Only init typing effect if not reduced motion AND retro mode
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 
        document.documentElement.getAttribute('data-theme') === 'dark') {
      TypingEffect.init();
    }
    
    console.log('✅ Dev Notes Blog ready - adaptive theming enabled');
  });

})(); 