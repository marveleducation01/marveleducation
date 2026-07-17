// ========== navbar.js - Universal Navbar Renderer (UPDATED) ==========
(function() {
  // Get the current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Define navigation links
  const navLinks = [
    { href: 'index.html', icon: 'fa-home', label: 'HOME' },
    { href: 'about.html', icon: 'fa-user-astronaut', label: 'ABOUTS' },
    { href: 'contact.html', icon: 'fa-phone-alt', label: 'CONTACT' }
  ];

  // Build the navbar HTML
  function renderNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    let navHTML = `
      <nav class="navbar">
        <div class="logo">
          <img src="https://i.ibb.co/Q3sL352d/m-E.png" alt="Marvel Education Logo" class="logo-img" />
          <span class="logo-text">Marvel Education</span>
        </div>
        
        <!-- Hamburger Menu Button -->
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>

        <ul class="nav-links" id="navLinks">
    `;

    // Generate navigation links with active class
    navLinks.forEach(link => {
      const isActive = (currentPage === link.href) || 
                       (currentPage === '' && link.href === 'index.html') ||
                       (currentPage === '/' && link.href === 'index.html');
      const activeClass = isActive ? ' active' : '';
      navHTML += `
        <li>
          <a href="${link.href}" class="${activeClass}">
            <i class="fas ${link.icon}"></i> <span>${link.label}</span>
          </a>
        </li>
      `;
    });

    navHTML += `
        </ul>
      </nav>
    `;

    container.innerHTML = navHTML;

    // ===== Mobile Menu Toggle (re-initialize after render) =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinksEl = document.getElementById('navLinks');

    if (menuToggle && navLinksEl) {
      // Remove any existing event listeners by cloning and replacing
      const newMenuToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
      
      const newNavLinks = navLinksEl.cloneNode(true);
      navLinksEl.parentNode.replaceChild(newNavLinks, navLinksEl);

      // Add fresh event listeners
      const freshMenuToggle = document.getElementById('menuToggle');
      const freshNavLinks = document.getElementById('navLinks');

      if (freshMenuToggle && freshNavLinks) {
        freshMenuToggle.addEventListener('click', function(e) {
          e.stopPropagation();
          freshNavLinks.classList.toggle('open');
          
          const icon = this.querySelector('i');
          if (freshNavLinks.classList.contains('open')) {
            icon.className = 'fas fa-times';
          } else {
            icon.className = 'fas fa-bars';
          }
        });

        // Close menu when clicking a link
        freshNavLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', function() {
            freshNavLinks.classList.remove('open');
            const icon = freshMenuToggle.querySelector('i');
            if (icon) {
              icon.className = 'fas fa-bars';
            }
          });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.navbar')) {
            freshNavLinks.classList.remove('open');
            const icon = freshMenuToggle.querySelector('i');
            if (icon) {
              icon.className = 'fas fa-bars';
            }
          }
        });
      }
    }
  }

  // Render navbar when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }

})();