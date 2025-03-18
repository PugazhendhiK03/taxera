document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the form data
    const formData = new FormData(this);

    // Send the form data to Formspree
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you for contacting us! We will get back to you soon.');
            this.reset(); // Clear the form
        } else {
            alert('Oops! Something went wrong. Please try again later.');
        }
    })
    .catch(error => {
        alert('Oops! Something went wrong. Please try again later.');
    });
});