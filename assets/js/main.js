// Minimal Terminal Blog JavaScript - Production Optimized

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
      
      // Handle theme-specific features
      this.handleThemeSpecificFeatures(theme);
    },

    handleThemeSpecificFeatures(theme) {
      const body = document.body;
      
      if (theme === 'light') {
        // Modern mode: disable CRT effects
        body.classList.add('modern-mode');
        body.classList.remove('retro-mode');
        
        const scanlines = document.querySelector('.scanlines');
        const powerOnEffect = document.querySelector('.power-on-effect');
        
        if (scanlines) scanlines.style.display = 'none';
        if (powerOnEffect) powerOnEffect.style.display = 'none';
        
      } else {
        // Retro mode: enable CRT effects
        body.classList.add('retro-mode');
        body.classList.remove('modern-mode');
        
        const scanlines = document.querySelector('.scanlines');
        const powerOnEffect = document.querySelector('.power-on-effect');
        
        if (scanlines) scanlines.style.display = 'block';
        if (powerOnEffect) powerOnEffect.style.display = 'block';
        
        // Initialize CRT effects
        this.initializeCRTEffects();
      }
    },

    initializeCRTEffects() {
      // Simple CRT flicker effect
      setInterval(() => {
        if (this.currentTheme === 'dark') {
          const terminal = document.querySelector('.terminal-container');
          if (terminal && Math.random() < 0.02) {
            terminal.style.opacity = '0.95';
            setTimeout(() => {
              terminal.style.opacity = '1';
            }, 50);
          }
        }
      }, 1000);
    },

    bindEvents() {
      if (this.easterEggToggle) {
        this.easterEggToggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleTheme();
        });
      }

      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 't') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
    },

    toggleTheme() {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
      
      // Show toast notification
      ToastNotificationManager.show(`Switched to ${newTheme === 'dark' ? 'Retro' : 'Modern'} mode`);
    }
  };

  // Toast Notification Manager
  const ToastNotificationManager = {
    show(message, type = 'info', duration = 3000) {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      
      // Add to container or body
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
      
      container.appendChild(toast);
      
      // Show toast
      setTimeout(() => toast.classList.add('show'), 10);
      
      // Hide and remove toast
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 300);
      }, duration);
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

  function initializeApp() {
    ThemeManager.init();
    
    // Add power-on effect for retro mode
    if (ThemeManager.currentTheme === 'dark') {
      document.body.classList.add('power-on');
      setTimeout(() => {
        document.body.classList.remove('power-on');
      }, 1000);
    }
  }

  // Expose to global scope if needed
  window.BlogApp = {
    ThemeManager,
    ToastNotificationManager
  };

})();
