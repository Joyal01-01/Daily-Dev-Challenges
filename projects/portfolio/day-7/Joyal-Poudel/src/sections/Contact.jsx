import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // Info Column Animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          },
        }
      );

      // Form Animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user type
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Shake animation for error
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 0, duration: 0.1, repeat: 5, yoyo: true, ease: 'power1.inOut' }
      );
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hello@joyalpoudel.com.np',
      link: 'mailto:hello@joyalpoudel.com.np',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Kathmandu, Nepal',
      link: 'https://maps.google.com/?q=Kathmandu,Nepal',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'joyalpoudel',
      link: 'https://linkedin.com/in/joyalpoudel',
    },
    {
      icon: '🐦',
      label: 'Twitter',
      value: '@joyal_poudel',
      link: 'https://twitter.com/joyal_poudel',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 bg-[var(--color-bg)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] hero-glow-accent opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss your next project or just say hi!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Column */}
          <div ref={infoRef} className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-[var(--color-text)]">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3 rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-2xl glass-card group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-bold">
                        {info.label}
                      </p>
                      <p className="text-[var(--color-text)] font-medium group-hover:text-[var(--color-primary)] transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent">
              <h4 className="text-xl font-bold mb-4 text-[var(--color-text)]">Availability</h4>
              <p className="text-[var(--color-muted)]">
                I'm currently available for freelance work and full-time opportunities. 
                I usually respond within 24 hours.
              </p>
              <div className="mt-6 flex items-center gap-2 text-[var(--color-accent)] font-semibold">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                Available for new projects
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10 relative overflow-hidden">
              {submitStatus === 'success' && (
                <div className="absolute inset-0 z-20 bg-[var(--color-bg)]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 scale-up-center">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-[var(--color-muted)] mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="hero-cta-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[var(--color-muted)] ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-[var(--color-bg)]/50 border ${
                        errors.name ? 'border-red-500/50' : 'border-[var(--glass-border)]'
                      } rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[var(--color-muted)] ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-[var(--color-bg)]/50 border ${
                        errors.email ? 'border-red-500/50' : 'border-[var(--glass-border)]'
                      } rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-all`}
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[var(--color-muted)] ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={`w-full bg-[var(--color-bg)]/50 border ${
                      errors.subject ? 'border-red-500/50' : 'border-[var(--glass-border)]'
                    } rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-all`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs ml-1">{errors.subject}</p>}
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--color-muted)] ml-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell me about your project..."
                    className={`w-full bg-[var(--color-bg)]/50 border ${
                      errors.message ? 'border-red-500/50' : 'border-[var(--glass-border)]'
                    } rounded-xl px-4 py-3 outline-none focus:border-[var(--color-primary)] transition-all resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full hero-cta-primary justify-center group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className={isSubmitting ? 'opacity-0' : 'opacity-100 flex items-center gap-2'}>
                    Send Message <span>🚀</span>
                  </span>
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
