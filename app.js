// Loader functionality
document.addEventListener('DOMContentLoaded', function () {
    const loaderWrapper = document.querySelector('.loader-wrapper');

    // Hide loader after page loads
    window.addEventListener('load', function () {
        setTimeout(function () {
            loaderWrapper.classList.add('hidden');
        }, 1000);
    });

    // Scroll to top button functionality
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    };

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Simple animation for elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.feature-card, .course-card, .teacher-card, .testimonial-card, .resource-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .course-card, .teacher-card, .testimonial-card, .resource-card').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const nav = document.querySelector('nav');
    const navItemsWithDropdown = document.querySelectorAll('nav ul li.has-dropdown');

    mobileMenuToggle.addEventListener('click', function () {
        nav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', function () {
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    navItemsWithDropdown.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        const link = item.querySelector('a');

        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // Close other dropdowns
                navItemsWithDropdown.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.querySelector('.dropdown');
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Close all dropdowns
            navItemsWithDropdown.forEach(item => {
                const dropdown = item.querySelector('.dropdown');
                dropdown.classList.remove('active');
            });
        }
    });

    // Calculate discount percentages
    const priceContainers = document.querySelectorAll('.course-price-container');

    priceContainers.forEach(container => {
        const originalPriceText = container.querySelector('.original-price').textContent;
        const discountedPriceText = container.querySelector('.discounted-price').textContent;

        // Extract numeric values from price strings
        const originalPrice = parseInt(originalPriceText.replace(/[^\d]/g, ''));
        const discountedPrice = parseInt(discountedPriceText.replace(/[^\d]/g, ''));

        // Calculate discount percentage
        const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

        // Update the discount badge text
        const discountBadge = container.querySelector('.discount-badge');
        discountBadge.textContent = `${discountPercentage}% OFF`;
    });

    // Enhanced resources functionality
    const categoryTitles = document.querySelectorAll('.category-title');
    const notesContainer = document.getElementById('notes-container');

    categoryTitles.forEach(title => {
        title.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            const resourceCategory = this.parentElement;
            const subjectButtons = document.getElementById(`${category}-subjects`);

            // Close other categories
            document.querySelectorAll('.resource-category').forEach(cat => {
                if (cat !== resourceCategory) {
                    cat.classList.remove('active');
                    cat.querySelector('.subject-buttons').classList.remove('active');
                    cat.querySelector('.fa-chevron-down').classList.remove('fa-chevron-up');
                }
            });

            // Toggle current category
            resourceCategory.classList.toggle('active');
            subjectButtons.classList.toggle('active');

            // Rotate chevron icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');

            // Hide notes container when category is closed
            if (!resourceCategory.classList.contains('active')) {
                notesContainer.classList.remove('active');
            }
        });
    });

    // Handle subject button clicks
    const subjectButtons = document.querySelectorAll('.subject-btn');
    subjectButtons.forEach(button => {
        button.addEventListener('click', function () {
            const subject = this.getAttribute('data-subject');
            displayNotes(subject);

            // Show notes container with animation
            notesContainer.classList.add('active');
        });
    });

    // Function to display notes
    function displayNotes(subject) {
        const notesGrid = document.getElementById('notes-grid');
        notesGrid.innerHTML = '';

        if (notesData[subject]) {
            notesData[subject].forEach(note => {
                const noteItem = document.createElement('div');
                noteItem.className = 'note-item';
                noteItem.innerHTML = `
                    <h4>${note.title}</h4>
                    <a href="${note.pdf}" class="resource-btn">Download PDF</a>
                    <a href="${note.ncert}" class="resource-btn">NCERT Solution</a>
                `;
                notesGrid.appendChild(noteItem);
            });
        } else {
            notesGrid.innerHTML = '<p>No notes available for this subject yet.</p>';
        }
    }

    // Sample notes data (replace with your actual notes)
    const notesData = {
        'physics-11': [
            { title: 'Hand-Written Notes', pdf: '#', ncert: '#' },
            { title: 'NCERT Book Pdf', pdf: '#', ncert: '#' },
            { title: 'Chapter 3: Motion in a Straight Line', pdf: '#', ncert: '#' }
        ],
        'chemistry-11': [
            { title: 'Chapter 1: Some Basic Concepts', pdf: '#', ncert: '#' },
            { title: 'Chapter 2: Structure of Atom', pdf: '#', ncert: '#' }
        ],
        'maths-11': [
            { title: 'Chapter 1: Sets', pdf: '#', ncert: '#' },
            { title: 'Chapter 2: Relations and Functions', pdf: '#', ncert: '#' }
        ],
        'physics-12': [
            { title: 'Chapter 1: Electric Charges and Fields', pdf: '#', ncert: '#' },
            { title: 'Chapter 2: Electrostatic Potential', pdf: '#', ncert: '#' }
        ],
        'chemistry-12': [
            { title: 'Chapter 1: The Solid State', pdf: '#', ncert: '#' },
            { title: 'Chapter 2: Solutions', pdf: '#', ncert: '#' }
        ],
        'maths-12': [
            { title: 'Chapter 1: Relations and Functions', pdf: '#', ncert: '#' },
            { title: 'Chapter 2: Inverse Trigonometric Functions', pdf: '#', ncert: '#' }
        ],
        'physics-bsc': [
            { title: 'Classical Mechanics', pdf: '#', ncert: '#' },
            { title: 'Quantum Mechanics', pdf: '#', ncert: '#' }
        ],
        'physics-jee': [
            { title: 'Quick Revision Notes', pdf: '#', ncert: '#' },
            { title: 'Important Formulas', pdf: '#', ncert: '#' }
        ],
        'physics-neet': [
            { title: 'Important Diagrams', pdf: '#', ncert: '#' },
            { title: 'Previous Year Questions', pdf: '#', ncert: '#' }
        ]
    };

    // Gallery functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    const galleryDots = document.querySelector('.gallery-dots');
    let currentImageIndex = 0;
    let galleryInterval;

    // Create dots for gallery
    galleryImages.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToImage(index);
        });
        galleryDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery-dot');

    function goToImage(index) {
        galleryImages[currentImageIndex].classList.remove('active');
        dots[currentImageIndex].classList.remove('active');

        currentImageIndex = index;

        galleryImages[currentImageIndex].classList.add('active');
        dots[currentImageIndex].classList.add('active');

        // Reset auto-rotation timer
        resetGalleryInterval();
    }

    function nextImage() {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        goToImage(nextIndex);
    }

    function prevImage() {
        let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        goToImage(prevIndex);
    }

    function resetGalleryInterval() {
        clearInterval(galleryInterval);
        galleryInterval = setInterval(nextImage, 4000);
    }

    // Set up gallery navigation
    galleryNext.addEventListener('click', nextImage);
    galleryPrev.addEventListener('click', prevImage);

    // Start auto-rotation
    resetGalleryInterval();

    // Pause auto-rotation when hovering over gallery
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(galleryInterval);
    });

    galleryContainer.addEventListener('mouseleave', () => {
        resetGalleryInterval();
    });

    // Demo Class Modal functionality
    const demoModal = document.getElementById("demoModal");
    const demoForm = document.getElementById("demoForm");
    const successMessage = document.getElementById("successMessage");
    const closeModalBtn = document.querySelector(".close-modal");
    const demoTitles = document.querySelectorAll(".modal-title");

    // Function to open modal with specific type
    function openDemoModal(modalType) {
        // Hide all titles first
        demoTitles.forEach(title => title.style.display = "none");

        // Show the appropriate title
        if (modalType === "enroll") {
            document.querySelector(".modal-title.enroll-title").style.display = "block";
        } else {
            document.querySelector(".modal-title.demo-title").style.display = "block";
        }

        demoModal.classList.add("show");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    // Function to close modal
    function closeDemoModal() {
        demoModal.classList.remove("show");
        document.body.style.overflow = "auto"; // Enable scrolling

        // Reset form after a delay
        setTimeout(() => {
            demoForm.reset();
            demoForm.style.display = "block";
            successMessage.style.display = "none";
        }, 300);
    }

    // Event listeners for modal
    closeModalBtn.addEventListener("click", closeDemoModal);

    // Close modal when clicking outside
    demoModal.addEventListener("click", (e) => {
        if (e.target === demoModal) {
            closeDemoModal();
        }
    });

    // Form submission
    demoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simple form validation
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const batch = document.getElementById('batch').value;

        if (!name || !phone || !email || !batch) {
            alert('Please fill all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Here you would typically send the form data to your server
        // For now, we'll just show the success message
        demoForm.style.display = "none";
        successMessage.style.display = "block";

        // Reset form after 3 seconds
        setTimeout(() => {
            closeDemoModal();
        }, 3000);
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    const contactMsg = document.getElementById('contactMsg');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // Simple validation
        if (!name || !email || !message) {
            contactMsg.textContent = 'Please fill all required fields';
            contactMsg.className = 'form-message error';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            contactMsg.textContent = 'Please enter a valid email address';
            contactMsg.className = 'form-message error';
            return;
        }

        // If validation passes, show success message
        contactMsg.textContent = 'Message sent successfully! We will get back to you soon.';
        contactMsg.className = 'form-message success';

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            contactMsg.style.display = 'none';
        }, 5000);
    });

    // Add event listeners to all buttons
    const demoButton = document.querySelector('.demo-btn');
    if (demoButton) {
        demoButton.addEventListener('click', function (e) {
            e.preventDefault();
            openDemoModal("demo");
        });
    }

    // Get all enroll now buttons
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            openDemoModal("enroll");
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    // Course modal functionality
    const courseModal = document.getElementById("courseModal");
    const courseModalContainer = document.querySelector(".course-modal-container");
    const courseModalFront = document.querySelector(".course-modal-front");
    const closeCourseModal = document.querySelector("#courseModal .close-modal");
    const flipBackBtn = document.querySelector(".flip-back");
    const courseEnrollForm = document.getElementById("courseEnrollForm");

    // Course data mapping
    const courseData = {
        '11th-bseb-cbse': {
            title: '11th (BSEB/CBSE)',
            duration: '1 Year',
            seats: 'Limited seats',
            description: 'Foundation course for Class 11 students preparing for board exams.',
            subjects: ['Physics', 'Chemistry', 'Mathematics'],
            originalPrice: '₹13,000/year',
            discountedPrice: '₹9,000/year',
            discountPercentage: '31% OFF'
        },
        '12th-bseb-cbse': {
            title: '12th (BSEB/CBSE)',
            duration: '1 Year',
            seats: 'Limited seats',
            description: 'Comprehensive course for Class 12 students preparing for board exams.',
            subjects: ['Physics', 'Chemistry', 'Mathematics'],
            originalPrice: '₹15,000/year',
            discountedPrice: '₹11,000/year',
            discountPercentage: '27% OFF'
        },
        'bsc': {
            title: 'B.Sc (Physics, Math, Chemistry)',
            duration: '3 Years',
            seats: 'Limited seats',
            description: 'In-depth course for B.Sc students focusing on core science subjects.',
            subjects: ['Physics', 'Mathematics', 'Chemistry'],
            originalPrice: '₹10,000/year',
            discountedPrice: '₹8,000/year',
            discountPercentage: '20% OFF'
        },
        'competitive-exam': {
            title: 'Competitive Exam (NEET, JEE)',
            duration: '1 Year',
            seats: 'Limited seats',
            description: 'Intensive preparation for NEET and JEE competitive exams.',
            subjects: ['Physics', 'Chemistry', 'Mathematics/Biology'],
            originalPrice: '₹18,000/year',
            discountedPrice: '₹14,500/year',
            discountPercentage: '19% OFF'
        },
        'special-batch-11th': {
            title: 'Special Batch 11th (BSEB & CBSE)',
            duration: '1 Year',
            seats: 'Limited seats',
            description: 'Intensive preparation for Board Exams.',
            subjects: ['Physics', 'Chemistry', 'Mathematics/Biology', 'Hindi', 'English'],
            originalPrice: '₹15,000/year',
            discountedPrice: '₹11,500/year',
            discountPercentage: '23% OFF'
        },
        'special-batch-12th': {
            title: 'Special Batch 12th (BSEB & CBSE)',
            duration: '1 Year',
            seats: 'Limited seats',
            description: 'Intensive preparation for Board Exams.',
            subjects: ['Physics', 'Chemistry', 'Mathematics/Biology', 'Hindi', 'English'],
            originalPrice: '₹18,000/year',
            discountedPrice: '₹14,000/year',
            discountPercentage: '22% OFF'
        }
    };

    // Function to open course modal
    function openCourseModal(courseId) {
        const course = courseData[courseId];
        if (!course) return;

        // Populate course modal front
        courseModalFront.innerHTML = `
        <div class="course-modal-header">
            <h2>${course.title}</h2>
            <div class="course-meta">
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-users"></i> ${course.seats}</span>
            </div>
        </div>
        
        <p>${course.description}</p>
        
        <div class="course-modal-features">
            <h4>Subjects Covered:</h4>
            <ul>
                ${course.subjects.map(subject => `<li>${subject}</li>`).join('')}
            </ul>
        </div>
        
        <div class="course-price-container">
            <span class="original-price">${course.originalPrice}</span>
            <span class="discounted-price">${course.discountedPrice}</span>
            <span class="discount-badge">${course.discountPercentage}</span>
        </div>
        
        <div class="course-modal-actions">
            <button class="btn enroll-btn" data-course="${courseId}">Enroll Now</button>
            <button class="btn btn-outline close-course-btn">Close</button>
        </div>
    `;

        // Show modal
        courseModal.classList.add("show");
        document.body.style.overflow = "hidden";

        // Reset flip state
        courseModalContainer.classList.remove("flipped");

        // Add event listeners to new buttons
        const enrollBtn = courseModalFront.querySelector('.enroll-btn');
        const closeBtn = courseModalFront.querySelector('.close-course-btn');

        enrollBtn.addEventListener('click', function () {
            courseModalContainer.classList.add("flipped");
        });

        closeBtn.addEventListener('click', closeCourseModalFunc);
    }

    // Function to close course modal
    function closeCourseModalFunc() {
        courseModal.classList.remove("show");
        document.body.style.overflow = "auto";
        courseModalContainer.classList.remove("flipped");
    }

    // Event listeners for course modal
    closeCourseModal.addEventListener("click", closeCourseModalFunc);

    flipBackBtn.addEventListener("click", function () {
        courseModalContainer.classList.remove("flipped");
    });

    // Close modal when clicking outside
    courseModal.addEventListener("click", (e) => {
        if (e.target === courseModal) {
            closeCourseModalFunc();
        }
    });

    // Form submission
    courseEnrollForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simple form validation
        const name = document.getElementById('courseName').value;
        const phone = document.getElementById('coursePhone').value;
        const email = document.getElementById('courseEmail').value;
        const batch = document.getElementById('courseBatch').value;

        if (!name || !phone || !email || !batch) {
            alert('Please fill all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Here you would typically send the form data to your server
        alert('Enrollment successful! We will contact you shortly.');
        closeCourseModalFunc();
        courseEnrollForm.reset();
    });

    // Add click event listeners to course dropdown items
    document.querySelectorAll('.dropdown a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            // Map dropdown text to course IDs
            const text = this.textContent.trim().toLowerCase();
            let courseId = '';

            if (text.includes('11th')) courseId = '11th-bseb-cbse';
            else if (text.includes('12th')) courseId = '12th-bseb-cbse';
            else if (text.includes('b.sc')) courseId = 'bsc';
            else if (text.includes('competitive')) courseId = 'competitive-exam';
            else if (text.includes('special batch 11th')) courseId = 'special-batch-11th';
            else if (text.includes('special batch 12th')) courseId = 'special-batch-12th';

            if (courseId) {
                openCourseModal(courseId);
            }
        });
    });

    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load in case elements are already in view
    window.addEventListener('load', animateOnScroll);
});