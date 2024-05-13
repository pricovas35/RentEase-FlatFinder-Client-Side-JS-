// Function to check if the user exists in local storage
let form = document.querySelector('form');
form.addEventListener('submit', loginValidation);

function loginValidation(e) {
  e.preventDefault();

  // Retrieve username and password from local storage
  let storedUsername = JSON.parse(localStorage.getItem('userData')) || [];

  // Retrieve values entered by the user in the login form
  let enteredUsername = document.getElementById('username').value;
  let enteredPassword = document.getElementById('password').value;

  // Check if the entered username and password match the stored values
  const logedUserData = storedUsername.find(x => x.username === enteredUsername && x.password === enteredPassword)

  if(logedUserData) {
    let loggedInUsers = localStorage.setItem('logedUser', JSON.stringify(logedUserData)) || [];
    loggedInUsers.push(logedUserData);
    toastr['success']("Login successful!", 'success');

    // Redirect to another page or perform other actions after successful login
    window.location.href = "./flats.html";
  }
  else {
    toastr['error']("Username or password do not match. Please try again.", 'error');
  };
};


toastr.options = {
  "closeButton": false,
  "debug": true,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
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