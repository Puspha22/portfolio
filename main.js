/* =============================
   NAVIGATION LOGIC
============================= */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
// UPDATED: Selects both regular links AND the new "Book a Call" button
const navLinks = document.querySelectorAll('.nav-link, .nav-cta'); 

// Show/Hide Menu on Mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
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
        const icon = navToggle.querySelector('i');
        if(icon) {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
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
   FILE OPENING FUNCTIONS
============================= */
function openExperienceLetter(company) {
    if (company === 'cedar') {
        window.open("assets/docs/CedarGate_Exp.pdf");
    } else if (company === 'dekods') {
        window.open("assets/docs/Dekods_Exp.pdf");
    }
}
// Note: downloadResume() and openTranscript() were removed as they 
// are not currently connected to buttons in the new layout.

/* =============================
   AJAX CONTACT FORM (New!)
   Prevents page reload on submit
============================= */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Stop the redirect
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
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
            alert("Oops! There was a problem sending your form. Please try again.");
            btn.innerText = originalText;
            btn.style.opacity = '1';
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
    } else {
        // Collapse: reset height and remove class
        expandedEl.style.maxHeight = '0px';
        expandedEl.classList.remove('open');
        btn.innerHTML = `<i class='bx bx-chevron-down'></i> Show Achievements`;
    }
}

// Expose globally for inline onclick triggers
window.toggleExperienceDetails = toggleExperienceDetails;