/**
 * Eulogy Landing Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize hiring form
    initHiringForm();
    
    // Initialize Netflix gallery
    initNetflixGallery();
    
    // Initialize memorials search
    initMemorialsSearch();
    
    // Add scroll animations
    initScrollAnimations();
});

/**
 * Change the featured Netflix image
 * @param {string} imageSrc - Source of the image to display
 */
function changeNetflixImage(imageSrc) {
    const featuredImage = document.querySelector('.netflix-main-image img');
    if (featuredImage) {
        // Add fade-out effect
        featuredImage.style.opacity = '0';
        
        // Change image after fade-out
        setTimeout(() => {
            featuredImage.src = imageSrc;
            featuredImage.style.opacity = '1';
        }, 300);
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.netflix-thumbnail');
        thumbnails.forEach(thumbnail => {
            const thumbImg = thumbnail.querySelector('img');
            if (thumbImg && thumbImg.getAttribute('src') === imageSrc) {
                thumbnail.style.borderColor = '#E50914';
            } else {
                thumbnail.style.borderColor = 'transparent';
            }
        });
    }
}

/**
 * Initialize Netflix gallery
 */
function initNetflixGallery() {
    // Set up click handlers for thumbnails
    const thumbnails = document.querySelectorAll('.netflix-thumbnail img');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageSrc = this.getAttribute('src');
            changeNetflixImage(imageSrc);
        });
    });
    
    // Set first thumbnail as active
    const firstThumbnail = document.querySelector('.netflix-thumbnail');
    if (firstThumbnail) {
        firstThumbnail.style.borderColor = '#E50914';
    }
}

/**
 * Initialize memorials search functionality
 */
function initMemorialsSearch() {
    const searchInput = document.querySelector('.memorial-search');
    const searchBtn = document.querySelector('.search-btn');
    const memorialCards = document.querySelectorAll('.memorial-card');
    
    if (searchInput && memorialCards.length > 0) {
        // Search function
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all cards if search is empty
                memorialCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter cards based on search term
            memorialCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.memorial-description').textContent.toLowerCase();
                const stats = card.querySelector('.memorial-stats').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || description.includes(searchTerm) || stats.includes(searchTerm)) {
                    card.style.display = 'block';
                    
                    // Add highlight animation
                    card.classList.add('search-highlight');
                    setTimeout(() => {
                        card.classList.remove('search-highlight');
                    }, 1000);
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        // Add event listeners
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        searchBtn.addEventListener('click', performSearch);
        
        // Add hover effects to memorial cards
        memorialCards.forEach(card => {
            card.addEventListener('click', function() {
                // In a real implementation, this would navigate to the memorial page
                console.log('Viewing memorial:', card.querySelector('h3').textContent);
            });
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Hide all answers initially
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle answer visibility
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
}

/**
 * Initialize form submission handling
 */
function initFormSubmission() {
    const preOrderForm = document.querySelector('.pre-order-form');
    const waitlistBtn = document.querySelector('.btn-secondary');
    
    if (preOrderForm) {
        preOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(preOrderForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateForm(formValues)) {
                // Simulate form submission
                submitForm(formValues, 'pre-order');
            }
        });
    }
    
    if (waitlistBtn) {
        waitlistBtn.addEventListener('click', function() {
            // Get form data
            const formData = new FormData(preOrderForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateForm(formValues)) {
                // Simulate form submission
                submitForm(formValues, 'waitlist');
            }
        });
    }
}

/**
 * Initialize hiring form submission
 */
function initHiringForm() {
    const hiringForm = document.querySelector('.hiring-form');
    
    if (hiringForm) {
        hiringForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(hiringForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateHiringForm(formValues)) {
                // Simulate form submission
                submitHiringForm(formValues);
            }
        });
    }
}

/**
 * Validate form data
 * @param {Object} formValues - Form values
 * @returns {boolean} - Whether form is valid
 */
function validateForm(formValues) {
    let isValid = true;
    const errors = [];
    
    // Check name
    if (!formValues.name || formValues.name.trim() === '') {
        errors.push('Please enter your name');
        isValid = false;
    }
    
    // Check email
    if (!formValues.email || !isValidEmail(formValues.email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Check reason
    if (!formValues.reason || formValues.reason === '') {
        errors.push('Please select a reason for your interest');
        isValid = false;
    }
    
    // Display errors if any
    if (!isValid) {
        alert('Please correct the following errors:\n' + errors.join('\n'));
    }
    
    return isValid;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Submit form data
 * @param {Object} formValues - Form values
 * @param {string} type - Submission type ('pre-order' or 'waitlist')
 */
function submitForm(formValues, type) {
    // In a real implementation, this would send data to a server
    console.log(`Submitting ${type} form:`, formValues);
    
    // Show success message
    const message = type === 'pre-order' 
        ? 'Thank you for your pre-order! We\'ll be in touch soon with next steps.'
        : 'Thank you for joining our waitlist! We\'ll notify you when Eulogy becomes available.';
    
    alert(message);
    
    // Reset form
    document.querySelector('.pre-order-form').reset();
}

/**
 * Validate hiring form data
 * @param {Object} formValues - Form values
 * @returns {boolean} - Whether form is valid
 */
function validateHiringForm(formValues) {
    let isValid = true;
    const errors = [];
    
    // Check name
    if (!formValues['hiring-name'] || formValues['hiring-name'].trim() === '') {
        errors.push('Please enter your name');
        isValid = false;
    }
    
    // Check email
    if (!formValues['hiring-email'] || !isValidEmail(formValues['hiring-email'])) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Check position
    if (!formValues['hiring-position'] || formValues['hiring-position'] === '') {
        errors.push('Please select a position');
        isValid = false;
    }
    
    // Check resume (optional in this demo)
    
    // Display errors if any
    if (!isValid) {
        alert('Please correct the following errors:\n' + errors.join('\n'));
    }
    
    return isValid;
}

/**
 * Submit hiring form data
 * @param {Object} formValues - Form values
 */
function submitHiringForm(formValues) {
    // In a real implementation, this would send data to a server
    console.log('Submitting hiring form:', formValues);
    
    // Show success message
    alert('Thank you for your application! Our team will review your information and contact you soon.');
    
    // Reset form
    document.querySelector('.hiring-form').reset();
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Update countdown timer
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        // Set countdown to 14 days from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 14);
        
        updateCountdown();
        
        // Update countdown every day
        setInterval(updateCountdown, 86400000);
        
        function updateCountdown() {
            const now = new Date();
            const diff = Math.floor((targetDate - now) / (1000 * 60 * 60 * 24));
            countdownElement.textContent = `${diff} days`;
        }
    }
    
    // Add scroll event listener for potential scroll animations
    window.addEventListener('scroll', function() {
        // This could be expanded with more complex scroll animations
        const scrollPosition = window.scrollY;
        
        // Example: Change header background opacity based on scroll
        const header = document.querySelector('header');
        if (header) {
            const opacity = Math.min(0.8, scrollPosition / 500);
            header.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.2})`;
        }
    });
}
