// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  setupNavigation();

  // Search functionality
  setupSearch();

  // Report form
  setupReportForm();

  // Claim functionality
  setupClaims();

  // Filters
  setupFilters();
});

function setupNavigation() {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Update active nav link
      document.querySelectorAll('nav a').forEach(navLink => {
        navLink.classList.remove('active');
      });
      this.classList.add('active');

      // Show selected section
      const sectionId = this.getAttribute('data-section');
      document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active-section');
      });
      document.getElementById(sectionId).classList.add('active-section');
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') performSearch();
    });
  }
}

function performSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const items = document.querySelectorAll('.item-card');
  let foundCount = 0;

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = 'block';
      foundCount++;
    } else {
      item.style.display = 'none';
    }
  });

  document.getElementById('search-results').textContent =
    `Found ${foundCount} item${foundCount !== 1 ? 's' : ''}`;
}

function setupReportForm() {
  const form = document.getElementById('report-form');
  const imageInput = document.getElementById('image');
  const imagePreview = document.getElementById('display-image');

  if (imageInput) {
    imageInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Report submitted! (In a real app, this would save to database)');
      this.reset();
      imagePreview.src = 'bottle.png';
    });
  }
}

function setupClaims() {
  // Claim button
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('claim-btn')) {
      document.getElementById('notification-popup').style.display = 'flex';
    }
  });

  // Close popup
  document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('notification-popup').style.display = 'none';
  });

  // Claim form
  const claimForm = document.getElementById('claim-form');
  if (claimForm) {
    claimForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('form-status').innerHTML =
        '<div class="success">Claim submitted successfully!</div>';
      setTimeout(() => {
        document.getElementById('notification-popup').style.display = 'none';
        this.reset();
      }, 2000);
    });
  }
}

function setupFilters() {
  const categoryFilter = document.getElementById('filter-category');
  const locationFilter = document.getElementById('filter-location');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterItems);
  }

  if (locationFilter) {
    locationFilter.addEventListener('change', filterItems);
  }
}

function filterItems() {
  const category = document.getElementById('filter-category').value;
  const location = document.getElementById('filter-location').value;

  document.querySelectorAll('.item-card').forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    const itemLocation = item.querySelector('.fa-map-marker-alt').nextSibling.textContent.trim();

    const categoryMatch = category === 'all' || itemCategory === category;
    const locationMatch = location === 'all' || itemLocation === location;

    if (categoryMatch && locationMatch) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
