// Form validation logic
const form = document.getElementById('validationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

// Validation rules
const validationRules = {
    username: (value) => {
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
    },
    password: (value) => {
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return '';
    },
    confirm: (value) => {
        if (value !== passwordInput.value) return 'Passwords do not match';
        return '';
    }
};

// Validate single field
function validateField(input) {
    const fieldName = input.name;
    const error = validationRules[fieldName](input.value);
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (error) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = error;
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    }

    return !error;
}

// Real-time validation
[usernameInput, emailInput, passwordInput, confirmInput].forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => validateField(input));
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = [usernameInput, emailInput, passwordInput, confirmInput]
        .every(input => validateField(input));

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
        [usernameInput, emailInput, passwordInput, confirmInput].forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }
});
