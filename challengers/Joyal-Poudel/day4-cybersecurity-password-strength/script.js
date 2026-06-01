class PasswordStrengthAnalyzer {
    constructor() {
        this.commonPasswords = [
            'password', '123456', 'password123', 'admin', 'letmein', 'welcome',
            '123456789', 'qwerty', '12345678', 'monkey', '1234567', 'dragon',
            'admin123', 'master', 'sunshine', 'princess', 'qazwsx', 'abc123'
        ];
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
    }

    cacheDOM() {
        this.passwordInput = document.getElementById('password');
        this.toggleBtn = document.getElementById('toggleBtn');
        this.strengthBar = document.getElementById('strengthBar');
        this.strengthLabel = document.getElementById('strengthLabel');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.feedback = document.getElementById('feedback');
        this.lengthInfo = document.getElementById('lengthInfo');
        this.scoreInfo = document.getElementById('scoreInfo');
        this.entropyInfo = document.getElementById('entropyInfo');
        this.generatedPasswordDiv = document.getElementById('generated-password');
    }

    bindEvents() {
        this.passwordInput.addEventListener('input', () => this.analyze());
        this.toggleBtn.addEventListener('click', () => this.togglePasswordVisibility());
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyPassword());
    }

    togglePasswordVisibility() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        this.toggleBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    }

    analyze() {
        const password = this.passwordInput.value;

        if (password === '') {
            this.reset();
            return;
        }

        const score = this.calculateScore(password);
        const requirements = this.checkRequirements(password);

        this.updateUI(password, score, requirements);
    }

    calculateScore(password) {
        let score = 0;

        // Length scoring
        if (password.length >= 8) score += 10;
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;

        // Character variety
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 10;
        if (/[0-9]/.test(password)) score += 10;
        if (/[!@#$%^&*]/.test(password)) score += 20;

        // Bonus for mixed case and numbers
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 5;
        if (/[0-9]/.test(password) && /[a-z]/.test(password)) score += 5;

        // Penalty for common passwords
        if (this.isCommonPassword(password)) score -= 50;

        // Entropy bonus
        const entropy = this.calculateEntropy(password);
        if (entropy > 40) score += 10;

        return Math.max(0, Math.min(100, score));
    }

    calculateEntropy(password) {
        let charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[!@#$%^&*]/.test(password)) charsetSize += 32;

        return Math.log2(Math.pow(charsetSize, password.length));
    }

    isCommonPassword(password) {
        return this.commonPasswords.some(common => 
            password.toLowerCase() === common
        );
    }

    checkRequirements(password) {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*]/.test(password),
            notCommon: !this.isCommonPassword(password)
        };
    }

    updateUI(password, score, requirements) {
        // Update strength bar
        this.strengthBar.className = 'strength-bar';
        if (score < 25) {
            this.strengthBar.classList.add('weak');
            this.strengthLabel.textContent = 'Weak';
            this.strengthLabel.style.color = '#ff6b6b';
        } else if (score < 50) {
            this.strengthBar.classList.add('fair');
            this.strengthLabel.textContent = 'Fair';
            this.strengthLabel.style.color = '#ffa500';
        } else if (score < 75) {
            this.strengthBar.classList.add('good');
            this.strengthLabel.textContent = 'Good';
            this.strengthLabel.style.color = '#4ecdc4';
        } else {
            this.strengthBar.classList.add('strong');
            this.strengthLabel.textContent = 'Strong';
            this.strengthLabel.style.color = '#4caf50';
        }

        // Update requirements checkmarks
        Object.entries(requirements).forEach(([key, value]) => {
            const reqElement = document.getElementById(`req-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (reqElement) {
                if (value) {
                    reqElement.classList.add('met');
                } else {
                    reqElement.classList.remove('met');
                }
            }
        });

        // Update info
        this.lengthInfo.textContent = password.length;
        this.scoreInfo.textContent = Math.round(score);
        this.entropyInfo.textContent = Math.round(this.calculateEntropy(password));

        // Update feedback
        const allMet = Object.values(requirements).every(v => v);
        if (allMet && score >= 75) {
            this.feedback.className = 'feedback success';
            this.feedback.textContent = '✓ Excellent! This is a very strong password.';
        } else if (score < 25) {
            this.feedback.className = 'feedback error';
            this.feedback.textContent = '✗ This password is too weak. Please add more variety.';
        } else {
            this.feedback.className = 'feedback warning';
            this.feedback.textContent = '⚠ Good, but could be stronger. Try adding more variety.';
        }

        this.copyBtn.style.display = allMet && score >= 75 ? 'block' : 'none';
    }

    generatePassword(length = 16) {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = '!@#$%^&*';
        const all = uppercase + lowercase + numbers + special;

        let password = '';
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += special[Math.floor(Math.random() * special.length)];

        for (let i = 4; i < length; i++) {
            password += all[Math.floor(Math.random() * all.length)];
        }

        password = password.split('').sort(() => Math.random() - 0.5).join('');

        this.passwordInput.value = password;
        this.passwordInput.type = 'text';
        this.toggleBtn.textContent = '👁️‍🗨️';
        this.generatedPasswordDiv.textContent = password;
        this.generatedPasswordDiv.style.display = 'block';

        this.analyze();
    }

    copyPassword() {
        const password = this.passwordInput.value;
        navigator.clipboard.writeText(password).then(() => {
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            alert('Failed to copy: ' + err);
        });
    }

    reset() {
        this.strengthBar.className = 'strength-bar';
        this.strengthLabel.textContent = '-';
        this.strengthLabel.style.color = '#666';
        this.feedback.className = 'feedback';
        this.feedback.textContent = '';
        this.lengthInfo.textContent = '0';
        this.scoreInfo.textContent = '0';
        this.entropyInfo.textContent = '0';
        this.copyBtn.style.display = 'none';
        this.generatedPasswordDiv.style.display = 'none';

        document.querySelectorAll('.requirement').forEach(req => {
            req.classList.remove('met');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PasswordStrengthAnalyzer();
});
