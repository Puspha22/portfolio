/* =============================
   NAVIGATION LOGIC
============================= */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
// Select all navigation links
const navLinks = document.querySelectorAll('.nav-link, .nav-cta'); 

// Show/Hide Menu on Mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        const isExpanded = navMenu.classList.contains('show-menu');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        const icon = navToggle.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });
}

// Close Menu when ANY link or button is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            const icon = navToggle.querySelector('i');
            if(icon) {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        }
    });
});

/* =============================
   SCROLL ACTIVE LINK
============================= */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        // Looks for links that point to this section ID
        const sectionLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (sectionLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                sectionLink.classList.add('active-link');
            } else {
                sectionLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* =============================
   HEADER SHADOW
============================= */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 80) {
        header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.boxShadow = "0 1px 0 rgba(0,0,0,0.05)";
    }
}
window.addEventListener('scroll', scrollHeader);

/* =============================
   DYNAMIC COPYRIGHT YEAR
============================= */
window.addEventListener('DOMContentLoaded', () => {
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

/* =============================
   AJAX CONTACT FORM
   Prevents page reload on submit
============================= */
const contactForm = document.querySelector('.contact-form');
const feedbackBanner = document.getElementById('form-feedback');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Stop the redirect
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        // Hide previous feedback
        if (feedbackBanner) {
            feedbackBanner.style.display = 'none';
        }
        
        // 1. Show Loading State
        btn.innerText = 'Sending...';
        btn.style.opacity = '0.7';
        
        // 2. Collect Data
        const formData = new FormData(contactForm);
        
        // 3. Send to Formspree
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success State
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#059669'; // Green
                contactForm.reset();
                
                if (feedbackBanner) {
                    feedbackBanner.className = 'form-feedback success';
                    feedbackBanner.innerText = 'Thank you! Your message has been sent successfully.';
                    feedbackBanner.style.display = 'block';
                }
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ''; 
                    btn.style.opacity = '1';
                }, 3000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            // Error State
            btn.innerText = originalText;
            btn.style.opacity = '1';
            
            if (feedbackBanner) {
                feedbackBanner.className = 'form-feedback error';
                feedbackBanner.innerText = 'Oops! There was a problem sending your message. Please try again.';
                feedbackBanner.style.display = 'block';
            }
        }
    });
}

/* ==========================================================================
   EXPANDABLE TIMELINE ACHIEVEMENTS ACTIONS
   ========================================================================== */
function toggleExperienceDetails(btn) {
    const timelineContent = btn.closest('.timeline-content');
    if (!timelineContent) return;
    
    const expandedEl = timelineContent.querySelector('.experience-details-expanded');
    if (!expandedEl) return;
    
    const isClosed = !expandedEl.classList.contains('open');
    
    if (isClosed) {
        // Expand: add class and set exact scrollHeight
        expandedEl.classList.add('open');
        expandedEl.style.maxHeight = expandedEl.scrollHeight + 'px';
        btn.innerHTML = `<i class='bx bx-chevron-up'></i> Hide Achievements`;
        btn.setAttribute('aria-expanded', 'true');
    } else {
        // Collapse: reset height and remove class
        expandedEl.style.maxHeight = '0px';
        expandedEl.classList.remove('open');
        btn.innerHTML = `<i class='bx bx-chevron-down'></i> Show Achievements`;
        btn.setAttribute('aria-expanded', 'false');
        
        // UX improvement: smooth scroll back to card top on collapse
        timelineContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Expose globally for inline onclick triggers
window.toggleExperienceDetails = toggleExperienceDetails;