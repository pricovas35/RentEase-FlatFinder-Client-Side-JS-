document.addEventListener('DOMContentLoaded', function () {
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
  };


  function populateFlatsTable() {
     // Retrieve logged-in user data
     let loggedInUser = JSON.parse(localStorage.getItem('logedUser'));
     let userFlats =  JSON.parse(localStorage.getItem('userData'));

     // Retrieve flats array from logged-in user data
     let flats = userFlats.find(user => user.email === loggedInUser.email).flats || [];

    // Populate the flats table
    let tableBody = document.getElementById('addBody');
    tableBody.style.textAlign = 'center';
    tableBody.style.fontSize = "20px";
    tableBody.innerHTML = ''; // Clear existing rows

    flats.forEach((flat, index) => {
      let row = tableBody.insertRow();
      row.innerHTML = `
          <td>${flat.city}</td>
          <td>${flat.streetName}</td>
          <td>${flat.streetNumber}</td>
          <td>${flat.areaSize}</td>
          <td>${flat.hasAC}</td>
          <td>${flat.yearBuilt}</td>
          <td>${flat.rentPrice}</td>
          <td>${flat.avbDate}</td>
          <td>
              <button id="deleteBtn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
              <button id="favoriteBtn" data-index="${index}"><i class="fa-regular fa-heart"></i></button>
          </td>
      `;
    });
  }

  // Populate the flats table when the page loads
  populateFlatsTable();


  // Example function to display a welcome message
  function displayWelcomeMessage() {
    let welcomeMessage = document.getElementById('welcome-message');
    let userData = JSON.parse(localStorage.getItem('logedUser'));
    if (userData) {
      welcomeMessage.innerText = `Welcome, ${userData.firstName} ${userData.lastName}!`;
    } else {
      welcomeMessage.innerText = 'Welcome!';
    }
  }

  displayWelcomeMessage();

  // Event listener for "Add Flat" button
  let addFlatBtn = document.getElementById('addFlatBtn');
  addFlatBtn.addEventListener('click', function () {
    document.getElementById('addFlat').style.display = 'block';
    document.getElementById('updateInfo').style.display = 'none';
    document.getElementById('flatsTable').style.display = 'none';
    document.getElementById('favTable').style.display = 'none';
  });

  let addFlat = document.getElementById('addFlat');
  addFlat.addEventListener('submit', function (e) {
   e.preventDefault();
  });

  // Event listener for "See Flats" button
  let seeFlatBtn = document.getElementById('seeFlatBtn');
  seeFlatBtn.addEventListener('click', function () {
    document.getElementById('addFlat').style.display = 'none';
    document.getElementById('updateInfo').style.display = 'none';
    document.getElementById('flatsTable').style.display = 'block';
    document.getElementById('favTable').style.display = 'none';

    // Populate the flats table when "See Flats" button is clicked
    populateFlatsTable();
  });

  // Event listener for "Add Info" button
  let addInfoBtn = document.getElementById('updateInfoBtn');
  addInfoBtn.addEventListener('click', function () {
    document.getElementById('addFlat').style.display = 'none';
    document.getElementById('updateInfo').style.display = 'block';
    document.getElementById('flatsTable').style.display = 'none';
    document.getElementById('favTable').style.display = 'none';
  });

  // Event listener for "Favorites" button
  let favoritesBtn = document.getElementById('favoritesBtn');
  favoritesBtn.addEventListener('click', function () {
    document.getElementById('addFlat').style.display = 'none';
    document.getElementById('updateInfo').style.display = 'none';
    document.getElementById('flatsTable').style.display = 'none';
    document.getElementById('favTable').style.display = 'block';
  });



  // Function to save added flat
  let saveFlatBtn = document.getElementById('saveBtn');
  saveFlatBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let city = document.getElementById('city').value;
    let streetName = document.getElementById('streetName').value;
    let streetNumber = document.getElementById('streetNumber').value;
    let areaSize = document.getElementById('areaSize').value;
    let hasAC = document.getElementById('hasAC').value;
    let yearBuilt = document.getElementById('yearBuilt').value;
    let rentPrice = document.getElementById('rentPrice').value;
    let avbDate = document.getElementById('avbDate').value;

    let cityRegex = /^[a-zA-Z- ]+$/;
    let streetNameRegex = /^[a-zA-Z0-9\s]+$/;
    let streetNumberRegex = /^[a-zA-Z0-9]+$/;
    let areaSizeRegex = /^[0-9]+$/;
    let yearBuiltRegex = /^[0-9]+$/;
    let rentPriceRegex = /^[0-9]+$/;
  
    if (!cityRegex.test(city)) {
      toastr.error("City name can only contain letters and '-' character");
      return false;
    }
  
    if (!streetNameRegex.test(streetName)) {
      toastr.error("Street name can only contain letters and numbers");
      return false;
    }
  
    if (!streetNumberRegex.test(streetNumber)) {
      toastr.error("Street number can only contain numbers and letters");
      return false;
    }
  
    if (!areaSizeRegex.test(areaSize)) {
      toastr.error("Area size can only contain numbers");
      return false;
    }
  
    if (!yearBuiltRegex.test(yearBuilt)) {
      toastr.error("Year built can only contain numbers");
      return false;
    }
  
    if (!rentPriceRegex.test(rentPrice)) {
      toastr.error("Rent price can only contain numbers");
      return false;
    }

      let flatData = {
        city: city,
        streetName: streetName,
        streetNumber: streetNumber,
        areaSize: areaSize,
        hasAC: hasAC,
        yearBuilt: yearBuilt,
        rentPrice: rentPrice,
        avbDate: avbDate
      }

      // Retrieve logged-in user data
      let loggedInUser = JSON.parse(localStorage.getItem('logedUser'));
      let users = JSON.parse(localStorage.getItem("userData")) || [];

      for(let user of users) {
        if(user.email === loggedInUser.email) {
          if(user.flats){
          user.flats.push(flatData);
          }
          else
          {
            user.flats=[];
            user.flats.push(flatData);
          }
        }
      }
      localStorage.setItem('userData', JSON.stringify(users));

      // Add flat data to the logged-in user's flats array
      loggedInUser.flats = loggedInUser.flats || [];
      loggedInUser.flats.push(flatData);

      // Update user data in local storage
      localStorage.setItem('logedUser', JSON.stringify(loggedInUser));

      // Hide the form after saving the flat
      document.getElementById('addFlat').style.display = 'none';

      // Show success message
      toastr.success('Flat added successfully');

      // Repopulate flats table after adding a new flat
      populateFlatsTable();
    });

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
      toastr["success"] ("Updated info successfully!");
    
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

  // Function to delete a flat
  function deleteFlat(index) {
    let loggedInUser = JSON.parse(localStorage.getItem('logedUser'));
    let users = JSON.parse(localStorage.getItem("userData")) || [];
    for (let user of users) {
      if (user.email === loggedInUser.email) {
        if (user.flats) {
          user.flats.splice(index, 1);
        }
        break; // Once the flat is deleted, we can exit the loop
      }
    }
    localStorage.setItem('userData', JSON.stringify(users));
    populateFlatsTable();
  }


  // Function to toggle favorite status of a flat
  function toggleFavorite(index) {
    let loggedInUser = JSON.parse(localStorage.getItem('logedUser'));
    let users = JSON.parse(localStorage.getItem("userData")) || [];
    for (let user of users) {
      if (user.email === loggedInUser.email) {
        if (user.flats) {
          user.flats[index].favorite = !user.flats[index].favorite;
        }
        break; // Once the favorite is toggled, we can exit the loop
      }
    }
    localStorage.setItem('userData', JSON.stringify(users));
    populateFavoritesTable();
  }




  // Function to populate the favorites table
  function populateFavoritesTable() {
    let dataUser = JSON.parse(localStorage.getItem('logedUser'));
    let users = JSON.parse(localStorage.getItem('userData')) || []; 
    let flats = users.find (user => user.email === dataUser.email).flats || [];
    let favoritesTableBody = document.getElementById('favBody');
    favoritesTableBody.style.textAlign = 'center';
    favoritesTableBody.style.fontSize = "20px";
    favoritesTableBody.innerHTML = ''; // Clear existing rows
    flats.forEach((flat, index) => {
      if (flat.favorite) { // Only add flats marked as favorites
        let row = favoritesTableBody.insertRow();
        row.innerHTML = `
          <td>${flat.city}</td>
          <td>${flat.streetName}</td>
          <td>${flat.streetNumber}</td>
          <td>${flat.areaSize}</td>
          <td>${flat.hasAC}</td>
          <td>${flat.yearBuilt}</td>
          <td>${flat.rentPrice}</td>
          <td>${flat.avbDate}</td>
        `;
      }
    });
  }


  // Event listener for clicks on flats table (including delete and favorite buttons)
  document.addEventListener('click', function (e) {
    let target = e.target;
    if (target.id == ('deleteBtn')) {
      let index = parseInt(target.getAttribute('data-index'));
      deleteFlat(index);
    } else if (target.id == ('favoriteBtn')) {
      let index = parseInt(target.getAttribute('data-index'));
      toggleFavorite(index);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the table element
  let table = document.getElementById("flatsTable");
  // Get the table body
  let tbody = table.getElementsByTagName("tbody")[0];
  // Add event listeners to specific th elements by ID

  let sortThs = {
      sortCity: 0,
      sortStreetName: 1,
      sortStreetNumber: 2,
      sortAreaSize: 3,
      sortAC: 4,
      sortYearBuilt: 5,
      sortRentPrice: 6,
      sortAvbDate: 7
  };
  for (let id in sortThs) {
      if (sortThs.hasOwnProperty(id)) {
          let th = document.getElementById(id);
          if (th) {
              th.addEventListener("click", createSortFunction(sortThs[id], id));
          }
      }
  }
  // Function to create sort function for a specific column
  function createSortFunction(columnIndex, id) {
      return function () {
         let sortOrder = this.classList.contains("asc") ? -1 : 1;
         // Toggle asc/desc class
         this.classList.toggle("asc");
         // Get all table rows
         let rows = Array.from(tbody.getElementsByTagName("tr"));
         // Sort the rows based on the content of the column
         rows.sort(function (a, b) {
             let aValue = a.cells[columnIndex].textContent.trim();
             let bValue = b.cells[columnIndex].textContent.trim();
             // Parse numbers if applicable
             if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                 return (parseFloat(aValue) - parseFloat(bValue)) * sortOrder;
             } 
             else if (id === "sortAvbDate") { // If sorting by "Data Availability"
               let aDate = new Date(aValue);
               let bDate = new Date(bValue);
               // Compare year, month, and day
               if (aDate.getFullYear() !== bDate.getFullYear()) {
                   return (aDate.getFullYear() - bDate.getFullYear()) * sortOrder;
               }
               if (aDate.getMonth() !== bDate.getMonth()) {
                   return (aDate.getMonth() - bDate.getMonth()) * sortOrder;
               }
                if (aDate.getDate() !== bDate.getDate()) {
                    return (aDate.getDate() - bDate.getDate()) * sortOrder;
                }
               return 0; // Dates are equal
           } 
           else {
               // For string comparison
               return aValue.localeCompare(bValue) * sortOrder;
           } 
         });
         // Re-append the rows to the table body
         rows.forEach(function (row) {
             tbody.appendChild(row);
         });
      }
  }
});

