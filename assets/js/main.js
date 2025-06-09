// Main JavaScript for Terminal Blog

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

  // Typing Effect
  const TypingEffect = {
    init() {
      this.elements = document.querySelectorAll('.typing-effect');
      this.startTyping();
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
        }, 50 + Math.random() * 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 1000);
      }
    }
  };

  // CRT Effects
  const CRTEffects = {
    init() {
      this.powerOnEffect();
      this.updateUptime();
      this.addGlowEffects();
    },

    powerOnEffect() {
      const powerOnElement = document.querySelector('.power-on-effect');
      if (powerOnElement) {
        // Remove power-on effect after animation
        setTimeout(() => {
          powerOnElement.style.display = 'none';
        }, 2000);
      }
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
    },

    addGlowEffects() {
      // Add glow effect to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .nav-link');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          element.classList.add('phosphor-glow');
        });
        
        element.addEventListener('mouseleave', () => {
          element.classList.remove('phosphor-glow');
        });
      });
    }
  };

  // Terminal Cursor
  const TerminalCursor = {
    init() {
      this.cursors = document.querySelectorAll('.cursor');
      this.startBlinking();
    },

    startBlinking() {
      this.cursors.forEach(cursor => {
        setInterval(() => {
          cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
      });
    }
  };

  // Terminal Commands (Easter Eggs)
  const TerminalCommands = {
    init() {
      this.addKeyboardShortcuts();
      this.addTerminalCommands();
    },

    addKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+T to toggle theme
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
          e.preventDefault();
          ThemeManager.toggleTheme();
        }
        
        // Ctrl+Shift+D to toggle debug info
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
          e.preventDefault();
          this.toggleDebugInfo();
        }
      });
    },

    addTerminalCommands() {
      // Add click handlers for terminal commands
      document.querySelectorAll('.command').forEach(command => {
        command.addEventListener('click', () => {
          this.executeCommand(command.textContent);
        });
      });
    },

    executeCommand(command) {
      // Simple command execution simulation
      if (command.includes('ls')) {
        console.log('📁 Listing directory contents...');
      } else if (command.includes('cat')) {
        console.log('📄 Reading file...');
      } else if (command.includes('git')) {
        console.log('🔄 Git operation...');
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
      `;
      
      debugDiv.innerHTML = `
        <div>Theme: ${ThemeManager.currentTheme}</div>
        <div>User Agent: ${navigator.userAgent.split(' ')[0]}</div>
        <div>Screen: ${screen.width}x${screen.height}</div>
        <div>Viewport: ${window.innerWidth}x${window.innerHeight}</div>
        <div>Timestamp: ${new Date().toISOString()}</div>
      `;
      
      document.body.appendChild(debugDiv);
      return debugDiv;
    }
  };

  // Responsive Navigation
  const ResponsiveNav = {
    init() {
      this.createMobileMenu();
      this.handleResize();
    },

    createMobileMenu() {
      const nav = document.querySelector('.directory-listing');
      if (!nav) return;

      const mobileToggle = document.createElement('button');
      mobileToggle.innerHTML = '☰ MENU';
      mobileToggle.className = 'mobile-nav-toggle terminal-btn';
      mobileToggle.style.cssText = `
        display: none;
        margin-bottom: 1rem;
        
        @media (max-width: 768px) {
          display: block;
        }
      `;

      nav.parentNode.insertBefore(mobileToggle, nav);

      mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
      });
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

  // Performance Monitoring
  const PerformanceMonitor = {
    init() {
      this.monitorPerformance();
    },

    monitorPerformance() {
      // Monitor page load performance
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
        
        // Log to debug info if available
        setTimeout(() => {
          const debugInfo = document.getElementById('debug-info');
          if (debugInfo) {
            const perfDiv = document.createElement('div');
            perfDiv.textContent = `Load Time: ${loadTime}ms`;
            debugInfo.appendChild(perfDiv);
          }
        }, 100);
      });
    }
  };

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    TypingEffect.init();
    CRTEffects.init();
    TerminalCursor.init();
    TerminalCommands.init();
    ResponsiveNav.init();
    PerformanceMonitor.init();
    
    console.log('🖥️  Terminal Blog initialized');
  });

  // Reduced motion support
  const respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (respectsReducedMotion) {
    document.body.classList.add('reduced-motion');
  }

})(); 