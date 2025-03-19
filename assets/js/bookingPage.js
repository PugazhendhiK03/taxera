document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("booking-form");
    const appointmentNumberInput = document.getElementById("appointment-number");
    const dateInput = document.getElementById("date");
    const currentDateInput = document.createElement("input"); // Hidden input for current date
    const emailSubjectInput = document.createElement("input"); // Hidden input for email subject

    // Create a hidden input for the current date
    currentDateInput.type = "hidden";
    currentDateInput.name = "current-date";
    form.appendChild(currentDateInput);

    // Create a hidden input for the email subject
    emailSubjectInput.type = "hidden";
    emailSubjectInput.name = "_subject";
    emailSubjectInput.value = "Booking Consultation";
    form.appendChild(emailSubjectInput);

    // Generate appointment number using the user-selected date
    function generateAppointmentNumber(selectedDate) {
        const dateObj = new Date(selectedDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const date = String(dateObj.getDate()).padStart(2, '0');

        // Retrieve the last appointment number for the selected date from localStorage
        const dateKey = `lastAppointmentNumber-${year}-${month}-${date}`;
        let lastAppointmentNumber = localStorage.getItem(dateKey) || 0;
        lastAppointmentNumber = parseInt(lastAppointmentNumber) + 1;

        // Save the new appointment number for the selected date
        localStorage.setItem(dateKey, lastAppointmentNumber);

        // Format: year/month/date-appointmentnumber
        return `${year}/${month}/${date}-${lastAppointmentNumber}`;
    }

    // Set the current date in the hidden input
    function setCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        currentDateInput.value = `${year}/${month}/${date}`;
    }

    // Update appointment number when the user selects a date
    dateInput.addEventListener("change", function () {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            appointmentNumberInput.value = generateAppointmentNumber(selectedDate);
        }
    });

    // Restrict date picker to current date and future dates
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    dateInput.setAttribute("min", today);

    // Set the current date and generate the initial appointment number
    setCurrentDate();
    appointmentNumberInput.value = generateAppointmentNumber(dateInput.value || today);

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Create a new FormData object and exclude the 'date' field
        const formData = new FormData(form);
        formData.delete("date"); // Remove the 'date' field from the form data

        // Submit form data to Formspree
        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert("Thank you! Your consultation has been booked.");
                    form.reset(); // Reset the form
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Oops! Something went wrong. Please try again.");
            });
    });
});