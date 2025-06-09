// Minimal Terminal Blog JavaScript - Optimized for Legibility

(function() {
  'use strict';

  // Theme Management
  const ThemeManager = {
    init() {
      this.themeToggle = document.getElementById('theme-toggle-btn');
      this.currentTheme = localStorage.getItem('theme') || 'dark';
      
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
        themeDisplay.textContent = theme === 'dark' ? 'Dark' : 'Light';
      }
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },

    bindEvents() {
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => {
          this.toggleTheme();
        });
      }
    }
  };

  // Minimal Typing Effect (Optional)
  const TypingEffect = {
    init() {
      // Only animate if user hasn't disabled animations
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
        }, 80 + Math.random() * 40); // Slightly faster typing
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }
  };

  // Minimal CRT Effects
  const CRTEffects = {
    init() {
      this.powerOnEffect();
      this.setupScanlineFadeOut();
      this.addSubtleInteractivity();
      this.updateUptime();
    },

    powerOnEffect() {
      const powerOnElement = document.querySelector('.power-on-effect');
      if (powerOnElement) {
        // Remove power-on effect after animation
        setTimeout(() => {
          powerOnElement.style.display = 'none';
        }, 1500); // Faster removal
      }
    },

    setupScanlineFadeOut() {
      // Fade out scanlines after page load for better readability
      const scanlines = document.querySelector('.scanlines');
      if (scanlines) {
        setTimeout(() => {
          scanlines.classList.add('fade-out');
        }, 3000); // Wait 3 seconds after page load
      }
    },

    addSubtleInteractivity() {
      // Add minimal hover effects to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .nav-link');
      
      interactiveElements.forEach(element => {
        // Remove phosphor glow, use subtle highlighting instead
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

  // Clean Click Effects
  const ClickEffects = {
    init() {
      this.addClickRipple();
    },

    addClickRipple() {
      // Add subtle ripple effect to clickable elements
      const clickableElements = document.querySelectorAll('a, button, .nav-link, .terminal-btn');
      
      clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
          this.createRipple(e, element);
        });
      });
    },

    createRipple(event, element) {
      // Only add ripple if reduced motion is not preferred
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      element.classList.add('click-ripple');
      element.classList.add('ripple-active');
      
      setTimeout(() => {
        element.classList.remove('ripple-active');
      }, 300);
    }
  };

  // Terminal Cursor (Simplified)
  const TerminalCursor = {
    init() {
      this.cursors = document.querySelectorAll('.cursor');
      // Only animate if reduced motion is not preferred
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.startBlinking();
      }
    },

    startBlinking() {
      this.cursors.forEach(cursor => {
        setInterval(() => {
          cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 600); // Slightly slower blink
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
        
        // Ctrl+Shift+S to toggle scanlines
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
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
        <div>Theme: ${ThemeManager.currentTheme}</div>
        <div>Reduced Motion: ${window.matchMedia('(prefers-reduced-motion: reduce)').matches}</div>
        <div>Screen: ${screen.width}x${screen.height}</div>
        <div>Viewport: ${window.innerWidth}x${window.innerHeight}</div>
        <div>Timestamp: ${new Date().toLocaleTimeString()}</div>
        <div style="margin-top: 0.5rem; font-size: 0.7rem;">
          <div>Ctrl+Shift+T: Toggle theme</div>
          <div>Ctrl+Shift+S: Toggle scanlines</div>
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
      // Monitor page load performance
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Terminal Blog loaded in ${loadTime}ms`);
        
        // Add performance info to debug panel
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
      // Ensure proper focus management for keyboard navigation
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
      // Respect user's motion preferences
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleMotionChange = (e) => {
        if (e.matches) {
          document.body.classList.add('reduced-motion');
          // Hide scanlines completely for reduced motion users
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
    console.log('🖥️  Initializing Minimal Terminal Blog...');
    
    ThemeManager.init();
    CRTEffects.init();
    ClickEffects.init();
    TerminalCursor.init();
    TerminalCommands.init();
    ResponsiveNav.init();
    PerformanceMonitor.init();
    AccessibilityHelper.init();
    
    // Only init typing effect if not reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      TypingEffect.init();
    }
    
    console.log('✅ Terminal Blog ready - optimized for legibility');
  });

})(); 