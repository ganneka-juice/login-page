
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const mainContent = document.getElementById('main-content');


    let progress = 0;
    const loadingInterval = setInterval(() => {

        progress += Math.floor(Math.random() * 5) + 1;


        if (progress > 90 && progress < 100) {
            progress += Math.floor(Math.random() * 2);
        }

        if (progress > 100) progress = 100;

        loaderBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(loadingInterval);


            setTimeout(() => {
                // Hide loader with animation
                loader.style.opacity = '0';

                // Show main content after loader fades out
                setTimeout(() => {
                    loader.style.visibility = 'hidden';
                    loader.style.display = 'none';
                    mainContent.classList.remove('hidden');
                }, 500);
            }, 800);
        }
    }, 100); // Faster interval for smoother animation

    // Get form elements
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('button[type="submit"]');

    // Add subtle parallax effect to the background
    document.body.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        document.body.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
    });

    // Form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        let errorMessages = [];

        // Simple email validation
        if (!emailInput.value || !emailInput.value.includes('@')) {
            isValid = false;
            emailInput.classList.add('border-red-500');
            errorMessages.push('Please enter a valid email address');
        } else {
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-green-500');
        }

        // Password validation (at least 6 characters)
        if (!passwordInput.value || passwordInput.value.length < 6) {
            isValid = false;
            passwordInput.classList.add('border-red-500');
            errorMessages.push('Password must be at least 6 characters long');
        } else {
            passwordInput.classList.remove('border-red-500');
            passwordInput.classList.add('border-green-500');
        }

        // If form is valid, show success animation
        if (isValid) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Signing in...</span>';

            // Simulate API call
            setTimeout(() => {
                // Show success message
                const formContainer = document.querySelector('.w-full.md\\:w-1\\/2.p-8');
                formContainer.innerHTML = `
                    <div class="text-center animate__animated animate__fadeIn">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800 mt-4">Login Successful!</h2>
                        <p class="text-gray-600 mt-2 text-sm">Redirecting to dashboard...</p>
                    </div>
                `;

                // Redirect after 2 seconds (in a real app, this would go to the dashboard)
                setTimeout(() => {
                    window.location.href = "#dashboard";
                }, 2000);

            }, 1500);
        } else {
            // Show error messages
            const errorContainer = document.querySelector('.error-container') || document.createElement('div');
            errorContainer.className = 'error-container bg-red-50 text-red-600 p-3 rounded-lg mt-4 text-sm';
            errorContainer.innerHTML = errorMessages.map(msg => `<p class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${msg}</p>`).join('');

            if (!document.querySelector('.error-container')) {
                form.appendChild(errorContainer);
            }
        }
    });

    // Add subtle focus animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('transform', 'scale-[1.02]');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('transform', 'scale-[1.02]');
        });
    });
});
