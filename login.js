// Function to validate registration form
function validateRegistration() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    return true;
}