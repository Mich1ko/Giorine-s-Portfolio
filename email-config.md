# Email Configuration Guide

## Setting Up Email Functionality for Your Contact Form

Your contact form is now ready! To make it actually send emails, you have several options:

### Option 1: EmailJS (Recommended for beginners)
1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Replace the commented code in `main.js` with your actual EmailJS configuration:

```javascript
// Add this to your HTML head section
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
  emailjs.init('YOUR_USER_ID');
</script>

// Then uncomment and update the EmailJS code in main.js
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  from_name: name,
  from_email: email,
  subject: subject,
  message: message,
  to_email: 'giorine@creative.com'
});
```

### Option 2: Formspree (Easy setup)
1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Add the `action` attribute to your form in HTML:

```html
<form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 3: Netlify Forms (If hosting on Netlify)
1. Add the `netlify` attribute to your form:

```html
<form id="contactForm" class="contact-form" netlify>
```

2. Deploy to Netlify and the form will work automatically

### Option 4: Custom Backend
If you have a backend server, you can modify the `sendEmailToService` function to send data to your API endpoint.

## Current Features

✅ **Working Contact Form** - Collects name, email, subject, and message
✅ **Form Validation** - Validates all fields and email format
✅ **Success Animation** - Shows success message after submission
✅ **Social Media Links** - Facebook, Instagram, WhatsApp
✅ **Responsive Design** - Works on all devices
✅ **Vibrant Design** - Modern gradient background with floating elements
✅ **Interactive Elements** - Hover effects and animations

## Customization

### Update Social Media Links
Edit the `href` attributes in the HTML for each social link:

```html
<a href="https://facebook.com/your_username" class="social-link facebook">
<a href="https://instagram.com/your_username" class="social-link instagram">
<a href="https://wa.me/your_phone_number" class="social-link whatsapp">
```

### Update Contact Information
Edit the contact details in the HTML:

```html
<p>your-email@domain.com</p>
<p>Your Location</p>
<p>Your Response Time</p>
```

### Change Colors
Modify the CSS variables in `styles.css`:

```css
:root {
  --primary: #5D3A9B;
  --accent: #D4A373;
  --neutral: #4A4E69;
  --highlight: #F2E9E4;
  --background: #FFFFFF;
}
```

## Testing

1. Open your website in a browser
2. Navigate to the Contact section
3. Fill out the form and submit
4. You should see the success message
5. Check your browser console for the form data (until you set up email service)

The form is fully functional and ready to use! Just choose your preferred email service and follow the setup instructions above.
