document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Password Generator Elements
    const passwordDisplay = document.getElementById('passwordDisplay');
    const lengthSlider = document.getElementById('lengthSlider');
    const lengthValue = document.getElementById('lengthValue');
    const strengthBadge = document.getElementById('strengthBadge');
    const copyBtn = document.getElementById('copyBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');

    // Character Sets
    const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBER_CHARS = '0123456789';
    const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Generate Password
    function generatePassword() {
        let chars = '';
        if (uppercaseCheck.checked) chars += UPPERCASE_CHARS;
        if (lowercaseCheck.checked) chars += LOWERCASE_CHARS;
        if (numbersCheck.checked) chars += NUMBER_CHARS;
        if (symbolsCheck.checked) chars += SYMBOL_CHARS;

        let password = '';
        const length = lengthSlider.value;

        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        passwordDisplay.value = password;
        updateStrengthIndicator(password);
    }

    // Update Strength Indicator
    function updateStrengthIndicator(password) {
        const strength = calculatePasswordStrength(password);
        let color, text;

        switch(strength) {
            case 'weak':
                color = 'red';
                text = 'Weak';
                break;
            case 'medium':
                color = 'yellow';
                text = 'Medium';
                break;
            case 'strong':
                color = 'green';
                text = 'Strong';
                break;
        }

        strengthBadge.textContent = text;
        strengthBadge.className = `px-2 py-1 text-sm font-semibold text-${color}-700 bg-${color}-100 rounded`;
    }

    // Calculate Password Strength
    function calculatePasswordStrength(password) {
        if (password.length < 8) return 'weak';
        
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[^A-Za-z0-9]/.test(password);
        
        const strength = hasUppercase + hasLowercase + hasNumbers + hasSymbols;
        
        if (strength >= 4 && password.length >= 12) return 'strong';
        if (strength >= 3) return 'medium';
        return 'weak';
    }

    // Copy Password
    copyBtn.addEventListener('click', () => {
        passwordDisplay.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });

    // Event Listeners
    regenerateBtn.addEventListener('click', generatePassword);
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword();
    });

    [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(checkbox => {
        checkbox.addEventListener('change', generatePassword);
    });

    // Initial password generation
    generatePassword();

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Sending...
        `;

        try {
            // Simulate API call (replace with your actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            // Error message
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalButtonText;
        }
    });
});