//Validation form function
function validateForm() {

  let firstName = document.getElementById('first_name').value;
  let lastName = document.getElementById('last_name').value;
  let birthDate = document.getElementById('birth_date').value;
  let username = document.getElementById('user_name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirm_password').value;

  // Regular expression 
  let nameRegex = /^[a-zA-Z]{2,}$/;
  let userRegex = /^[a-zA-Z0-9]{3,}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/;

  // Birth date validation 
  let today = new Date();
  let minBirthDate = new Date(today.getFullYear() - 120, today.getMonth() - 120, today.getDate());
  let maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth() - 18, today.getDate());
  let selectedBirthDate = new Date(birthDate);

  if (!nameRegex.test(firstName)) {
    toastr["error"]("First name must be at least 2 characters long and must contain only letters!", "Error");
    return false;
  }

  if (!nameRegex.test(lastName)) {
    toastr["error"]("Last name must be at least 2 characters long and must contain only letters!", "Error");
    return false;
  }

  if(!userRegex.test(username)) {
    toastr["error"]("Username must be at least 3 characters long and contain only letters and numbers!", "Error");
    return false;
  }

  if(!(selectedBirthDate >= minBirthDate && selectedBirthDate <= maxBirthDate)) {
    toastr["error"] ("You must be between 18 and 120 years old to register!", "Error");
    return false;
  }

  if(!emailRegex.test(email)) {
    toastr["error"]("Please enter a valid email address", "Error");
    return false;
  }

  if(!passwordRegex.test(password)) {
    toastr["error"]("Password must be between 6 and 20 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!", "Error");
    return false;
  }

  if(confirmPassword !== password) {
    toastr["error"] ("Passwords do not match!", "Error");
    return false;
  }


  // Function to check if an email address exists in local storage
  function isEmailExists(email) {
    // Retrieve email addresses from local storage
    let storedEmails = JSON.parse(localStorage.getItem('userData')) || [];

    // Check if the provided email exists in the stored email addresses
    return storedEmails.includes(email);
  }

    // Example usage
    let userEmail = "user@example.com";
    let exists = isEmailExists(userEmail);



  // Check if user data already exists in local storage
  let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
  if(storedUsers && storedUsers.find(user => user.email === email)) {
    toastr["error"] ("Email adress already exists!", "Error")
    return false;
  }

  //Save user data to local storage
  let userData = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    birthDate: birthDate,
    email: email,
    password: password, 
    confirmPassword: confirmPassword
  }

  storedUsers.push(userData);

  localStorage.setItem("userData", JSON.stringify(storedUsers));
  toastr["success"] ("Account successfully created");

  // Redirect to login page
  window.location.href = "./login.html";

  return true; // Form is valid
}

// Event listener binding
document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    validateForm();
  });
});


toastr.options = {
  "closeButton": false,
  "debug": true,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

