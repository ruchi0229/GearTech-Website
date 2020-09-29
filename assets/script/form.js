// get value for toggle
let logIn = document.querySelector("#login");
let signUp = document.querySelector("#signup");
let butnToggle = document.querySelector("#butn-div");

//function for toggle
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

// form validation


// 




// signup validation
// Name Validation
function fullnameBlur() {
  let fullName = document.querySelector("#full-name");

  if (fullName.value == null || fullName.value == "") {
    let nameData = document.querySelector("#name-data");
    nameData.innerText = "! please input this field";
    return false;
  }
  return true;
}


function fullnameFocus() {
  let checkName = "/[a-zA-Z]/g";
  let fullName = document.querySelector("#full-name");


  if (!fullName.value.match(checkName)) {
    let nameData = document.querySelector("#name-data");
    nameData.innerText = "!Names only include letter";
    return false;
  }
  return true;
}

function fullnameKeyup() {
  let checkName = "/[a-zA-Z]/g";
  let fullName = document.querySelector("#full-name");
  if (fullName.value != "" && checkName.search(fullName.value)) {
    let nameData = document.querySelector("#name-data");
    nameData.innerText = "";
    return false;
  }
  return true;
}


// Email Validation

function emailBlur() {
  let email = document.querySelector("#signUp-email");
  if (email.value.length == "") {
    let emailData = document.querySelector("#email-data");
    emailData.innerHTML = "! please input this field";
    return false;
  }
  return true;
}


function emailFocus() {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let email = document.querySelector("#signUp-email");
  if (!email.value.match(mailformat)) {
    let emailData = document.querySelector("#email-data");
    emailData.innerHTML = "!@ is missing.@ must include ";
    return false;
  }
  return true;
}


function emailKeyup() {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let email = document.querySelector("#signUp-email");
  if (email.value.length != "" && email.value.search(mailformat)) {
    let emailData = document.querySelector("#email-data");
    emailData.innerHTML = "";
    return false;
  }
  return true;
}


//Password Validation

function passwordBlur() {
  let password = document.querySelector("#signUp-password");
  if (password.value.length == "") {
    let passwordData = document.querySelector("#paswd-data");
    passwordData.innerText = "! please input this field";
    return false;
  }
  return true;
}


function passwordFocus() {
  let password = document.querySelector("#signUp-password");
  if (password.value.length < 8) {
    let passwordData = document.querySelector("#paswd-data");
    passwordData.innerText = "! pswd atleast 8 Characters long";
    return false;
  }
  return true;

}


function passwordKeyup() {
  let password = document.querySelector("#signUp-password");
  if (password.value.length !== "" && password.value.length > 8) {
    let passwordData = document.querySelector("#paswd-data");
    passwordData.innerText = "";
    return false;
  }
  return true;
}


// Validation for Confirm Password

function confirmPasswordBlur() {
  let confirmPassword = document.querySelector("#confirm-password");
  if (confirmPassword.value.length == "") {
    let confirmPasswordData = document.querySelector("#confirmPaswd-data");
    confirmPasswordData.innerText = "!please input this field";
    return false;
  }
  return true;
}


function confirmPasswordFocus() {
  let password = document.querySelector("#signUp-password");
  let confirmPassword = document.querySelector("#confirm-password");
  if (confirmPassword.value != password.value) {
    let confirmPasswordData = document.querySelector("#confirmPaswd-data");
    confirmPasswordData.innerText = "!pasword not match";
    return false;
  }
  return true;
}


function confirmPasswordKeyup() {
  let password = document.querySelector("#signUp-password");
  let confirmPassword = document.querySelector("#confirm-password");
  if (confirmPassword.value.length != "" && confirmPassword.value == password.value) {
    let confirmPasswordData = document.querySelector("#confirmPaswd-data");
    confirmPasswordData.innerText = "";
    return false;
  }
  return true;
}

// clear signup

function clearData() {
  console.log(document.querySelector("#full-name"));
  document.querySelector("#full-name").value = "";
  document.getElementById("signUp-email").value = "";
  document.getElementById("signUp-password").value = "";
  document.getElementById("confirm-password").value = "";

}

//  signup submit
function signUpButton() {
  let input = document.querySelector(".signup-input");
  let fullName = document.querySelector("#full-name").value;
  let email = document.querySelector("#signUp-email").value;
  let password = document.querySelector("#signUp-password").value;
  let confirmPassword = document.querySelector("#confirm-password").value;

  if (fullnameBlur() && emailBlur() && passwordBlur() && confirmPasswordBlur()) {
    let signUpdata =
    {
      name: fullName,
      email: email,
      password: password

    };
    let signUpKey = Date.now();

    localStorage.setItem(signUpKey, JSON.stringify(signUpdata));

    window.location.assign(login());

    clearData();
  }
  else {
    console.log("error")
  }
}



// login validation


// Email Validation
function loginEmailfocus() {
  let loginEmail = document.querySelector("#login-email");
  if (loginEmail.value.length == "") {
    let loginEmaildata = document.querySelector("#loginemail-data");
    loginEmaildata.innerHTML = "! please input this field";
    return false;
  }
  return true;
}


function loginEmailkeyup() {
  let loginEmail = document.querySelector("#login-email");
  if (loginEmail.value != "") {
    let loginEmaildata = document.querySelector("#loginemail-data");
    loginEmaildata.innerHTML = "";
    return false;
  }
  return true;
}


//passwd validation

function loginPasswordfocus() {
  let loginPassword = document.querySelector("#login-paswd");
  if (loginPassword.value.length == "") {
    let loginPasswordData = document.querySelector("#loginpaswd-data");
    loginPasswordData.innerHTML = "! please input this field";
    return false;
  }
  return true;
}


function loginPasswordkeyup() {
  let loginPassword = document.querySelector("#login-paswd");
  if (loginPassword.value != "") {
    let loginPasswordData = document.querySelector("#loginpaswd-data");
    loginPasswordData.innerHTML = "";
    return false;
  }
  return true;
}

function clearLogin() {
  document.querySelector("#login-email").value = "";
  document.querySelector("#login-paswd").value = "";

}

function loginButton() {
  let btn = document.querySelector("#login-btn");
  let loginEmail = document.querySelector("#login-email");
  let loginPassword = document.querySelector("#login-paswd");
  let flag = false;
  let users = [];

  for (let i = 0; i < localStorage.length; i++) {

    //get usersfrom local storage
    let user = localStorage.getItem(localStorage.key(i));

    //parse the string into JSON
    user = JSON.parse(user);

    //check it's user data, not product
    if (user.email !== undefined) {
      users.push(user); // add the signed up user into users array
    }


  }
  for (let i = 0; i < users.length; i++) {
    if (loginEmail.value == users[i].email) {
      if (loginPassword.value == users[i].password) {
        flag = true;
        break;
      }
      else {
        let loginPasswordData = document.querySelector("#loginpaswd-data");
        loginPasswordData.innerHTML = "!incorrect pswd";
        break;
      }
    }
    else {
      let loginEmaildata = document.querySelector("#loginemail-data");
      loginEmaildata.innerHTML = "! Incorrect Email";
    }
  }
  if (flag && loginEmailfocus() && loginPasswordfocus()) {
    window.open("../index.html");
    clearLogin();
  }
  else {
    console.log("field is wrong ")
  }

}

