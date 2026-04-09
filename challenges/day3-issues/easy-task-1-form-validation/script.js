const form = document.getElementById('validationForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const website = document.getElementById('website');
const terms = document.getElementById('terms');

// Validation rules
const validationRules = {
    fullname: {
        validate: (value) => value.trim().length >= 3,
        error: 'Full name must be at least 3 characters'
    },
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        error: 'Please enter a valid email address'
    },
    phone: {
        validate: (value) => /^\d{10}$|^\d{3}-\d{3}-\d{4}$|^\d{3}\s\d{3}\s\d{4}$/.test(value.replace(/\s/g, '')),
        error: 'Please enter a valid 10-digit phone number'
    },
    password: {
        validate: (value) => value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value),
        error: 'Password must be 8+ characters with uppercase and numbers'
    },
    confirmpassword: {
        validate: (value) => value === password.value && value.length > 0,
        error: 'Passwords do not match'
    },
    website: {
        validate: (value) => !value || /^https?:\/\/.+/.test(value),
        error: 'Please enter a valid website URL'
    },
    terms: {
        validate: (value) => terms.checked,
        error: 'You must agree to the terms'
    }
};

// Real-time validation
[fullname, email, phone, password, confirmpassword, website].forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
        if (field.classList.contains('invalid') || field.classList.contains('valid')) {
            validateField(field);
        }
    });
});

terms.addEventListener('change', () => validateField(terms));

function validateField(field) {
    const fieldName = field.name;
    const rule = validationRules[fieldName];
    const errorElement = field.parentElement.querySelector('.error-message');

    if (!rule) return true;

    const isValid = rule.validate(field.value);

    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorElement.textContent = '';
        return true;
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorElement.textContent = rule.error;
        return false;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Validate all fields
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        showSuccess();
        setTimeout(() => {
            form.reset();
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            document.querySelector('.success-message').style.display = 'none';
        }, 2000);
    }
});

function showSuccess() {
    document.querySelector('.success-message').style.display = 'block';
    form.style.display = 'none';
}
