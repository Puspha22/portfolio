/* =============================
   NAVIGATION LOGIC
============================= */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

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

// Close Menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
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
   (Updated to match new folder structure)
============================= */
function downloadResume() {
    window.open("assets/docs/Resume.pdf");
}

function openTranscript() {
    window.open("assets/docs/Transcript.pdf");
}

function openExperienceLetter(company) {
    if (company === 'cedar') {
        window.open("assets/docs/CedarGate_Exp.pdf");
    } else if (company === 'dekods') {
        window.open("assets/docs/Dekods_Exp.pdf");
    }
}