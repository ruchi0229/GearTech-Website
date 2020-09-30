// get value for toggle
let logIn = document.querySelector("#login");
let signUp = document.querySelector("#signup");
let butnToggle = document.querySelector("#butn-div");

// fullname email password in signup form
let fullName = document.querySelector("#full-name");
let email = document.querySelector("#signUp-email");
let password = document.querySelector("#signUp-password");

//function for toggle button
function signup() {
  logIn.style.left = "-400px";
  signUp.style.left = "50px";
  butnToggle.style.left = "110px";
}
function login() {
  logIn.style.left = "50px";
  signUp.style.left = "-450px";
  butnToggle.style.left = "0px";
}

// Signup form validation

// Name Validation
let checkName = "^[a-zA-Z]+$";
let nameData = document.querySelector("#name-data");
function checkfullname1() {
  if (fullName.value == null || fullName.value.length < 1) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    nameData.style.opacity = 1;
    return false;
  }
  if (!fullName.value.match(checkName)) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Name only include letters</span>';
    nameData.style.opacity = 1;
    return false;
  } 
  else {
    nameData.style.opacity = 0;
    return true;
  }
}
function checkfullname2() {
  if (fullName.value == "") {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    nameData.style.opacity = 1;
    return false;
  }
  if (!fullName.value.match(checkName)) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Name only include letters</span>';
    nameData.style.opacity = 1;
    return false;
  } 
  if (fullName.value.match(checkName)) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Name only include letters</span>';
    nameData.style.opacity = 0;
    return true;
  } 
  
}

// Email Validation
let emailData = document.querySelector("#email-data");
let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function checkemail1() {
  if (email.value.length == "") {
    emailData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Please input this field</span>';
    emailData.style.opacity = 1;
    return false;
  }
  if (!email.value.match(mailformat)) {
    emailData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Enter a valid Email Address</span>';
    emailData.style.opacity = 1;
    return false;
  } else {
    return true;
  }
}

function checkemail2() {
  if (email.value.length == "") {
    emailData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Please input this field</span>';
    emailData.style.opacity = 1;
    return false;
  }
  if (email.value.match(mailformat)) {
    emailData.style.opacity = 0;
    return true;
  } else {
    emailData.style.opacity = 0;
    return true;
  }
}

//Password Validation

let passwordFormat = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
let passwordData = document.querySelector("#paswd-data");

function checkpassword1() {
  if (password.value.length == "") {
    passwordData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Please input this field</span>';
    passwordData.style.opacity = 1;
    return false;
  }
  if (!password.value.match(passwordFormat)) {
    passwordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Must contain atleast 8 characters,one letter and one number</span>';
    passwordData.style.opacity = 1;
    return false;
  } else {
    passwordData.style.opacity = 0;
    return true;
  }
}

function checkpassword2() {
  if (password.value.length !== "") {
    passwordData.style.opacity = 0;
    return true;
  }
  if (password.value.match(passwordFormat)) {
    passwordData.style.opacity = 0;
    return true;
  }
}

// Validation for Confirm Password
let confirmPassword = document.querySelector("#confirm-password");
let confirmPasswordData = document.querySelector("#confirmPaswd-data");
function checkconfirmpassword1() {
  if (confirmPassword.value != password.value && confirmPassword.value !== "") {
    confirmPasswordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Password not match</span>';
    confirmPasswordData.style.opacity = 1;
    return false;
  }
  if (confirmPassword.value == "") {
    confirmPasswordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    confirmPasswordData.style.opacity = 1;
    return false;
  }
  return true;
}
function checkconfirmpassword2() {
  if (
    confirmPassword.value.length != "" &&
    confirmPassword.value == password.value
  ) {
    confirmPasswordData.style.opacity = 0;
    return true;
  }
  else{
    confirmPasswordData.style.opacity = 0; 
  }
}

// clear signup
function clearData() {
  console.log(document.querySelector("#full-name"));
  document.querySelector("#full-name").value = "";
  document.getElementById("signUp-email").value = "";
  document.getElementById("signUp-password").value = "";
  document.getElementById("confirm-password").value = "";
}

function signUpButton() {
  let input = document.querySelector(".signup-input");
  let fullName = document.querySelector("#full-name").value;
  let email = document.querySelector("#signUp-email").value;
  let password = document.querySelector("#signUp-password").value;
  let confirmPassword = document.querySelector("#confirm-password").value;

  let users = []; //all users array

  if (
    checkfullname1() &&
    checkfullname2() &&
    checkemail1() &&
    checkemail2() &&
    checkpassword1() &&
    checkpassword2() &&
    checkconfirmpassword1() &&
    checkconfirmpassword2()
  ) {
    // signup user data
    let user = {
      name: fullName,
      email: email,
      password: password,
    };

    /*
     * if users array is not setted then 
     * add the previous users in users array, 
     * after that add the new one
     */
    if (localStorage.getItem("users") !== null) {
      // array of users from localStorage
      let previousUsers = JSON.parse(localStorage.getItem("users"));

      previousUsers.forEach(preUser => {
        /* if email already exist then 
        replace the data with new one */
        if (preUser.email !== user.email) {
          users.push(preUser);
        }
      });
    }

    users.push(user); // add the current user

    //set updated users into local storage
    localStorage.setItem("users", JSON.stringify(users));

    window.location.assign(login());

    clearData();
  }
  else {
    console.log("error")
  }
}

// login form validation
// Email Validation
let loginEmail = document.querySelector("#login-email");
let loginEmaildata = document.querySelector("#loginemail-data");
function loginEmailValidation1() {
    if (loginEmail.value.length == "") {
      loginEmaildata.innerHTML =
        '<i class="fas fa-exclamation-circle"><span> Please input this field</span>';
      loginEmaildata.style.opacity = 1;
      return false;
    }
    if (!loginEmail.value.match(mailformat)) {
      loginEmaildata.innerHTML =
        '<i class="fas fa-exclamation-circle"> <span>Enter a valid Email Address</span>';
      loginEmaildata.style.opacity = 1;
      return false;
    } else {
      loginEmaildata.style.opacity = 0;
      return true;
    }
  };
  function loginEmailValidation2() {
    if ((loginEmail.value.length !== "")) {
      loginEmaildata.style.opacity = 0;
      return true;
    }
    if (loginEmail.value.match(mailformat)) {
      loginEmaildata.style.opacity = 0;
      return true;
    }
  };

//passwd validation
  
  let loginPassword = document.querySelector("#login-paswd");
  let loginPasswordData = document.querySelector("#loginpaswd-data");

  function loginPasswordValidation1(){
    if (loginPassword.value.length == "") {
      loginPasswordData.innerHTML =
        '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
      loginPasswordData.style.opacity = 1;
      return false;
    } else {
      loginPasswordData.style.opacity = 0;
      return true;
    }
  };

   function loginPasswordValidation2() {
    if (loginPassword.value != "") {
      loginPasswordData.style.opacity = 0;
      return true;
    }
  };

function clearLogin() {
  document.querySelector("#login-email").value = "";
  document.querySelector("#login-paswd").value = "";
}

function loginButton() {
  let btn = document.querySelector("#login-btn");
  let loginEmail = document.querySelector("#login-email");
  let loginPassword = document.querySelector("#login-paswd");
  let flag = false;

  /*
   * get the users array from local storage
   * and parse the string into JSON
   */
  let users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++) {
    if (loginEmail.value == users[i].email) {
      if (loginPassword.value == users[i].password) {
        flag = true;
        break;
      } else {
        let loginPasswordData = document.querySelector("#loginpaswd-data");
        loginPasswordData.innerHTML =
          '<i class="fas fa-exclamation-circle">incorrect Password';
        loginPasswordData.style.opacity = 1;
        break;
      }
    } else {
      let loginEmaildata = document.querySelector("#loginemail-data");
      loginEmaildata.innerHTML =
        '<i class="fas fa-exclamation-circle">Incorrect Email';
      loginEmaildata.style.opacity = 1;
    }
  }
  if (flag && loginEmailValidation1()&&loginEmailValidation2() && loginPasswordValidation1() && loginPasswordValidation2()) {
    window.open("../index.html");
    clearLogin();
  } else {
    console.log("field is wrong ");
  }
}
