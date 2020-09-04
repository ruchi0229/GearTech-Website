let logIn = document.querySelector("#login");
let signUp = document.querySelector("#signup");
let butnToggle = document.querySelector("#butn-div");

function signup(){
  logIn.style.left = "-400px";
  signUp.style.left = "50px";
  butnToggle.style.left = "110px";
}

function login(){
    logIn.style.left = "50px";
    signUp.style.left = "-450px";
    butnToggle.style.left = "0px";
}