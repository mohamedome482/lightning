import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
   apiKey: "AIzaSyDNZoYdZXvNT5BDR7-wsLyugSmSEj8YDi4",
    authDomain: "ligh-4bda4.firebaseapp.com",
    projectId: "ligh-4bda4",
    storageBucket: "ligh-4bda4.appspot.com",
    messagingSenderId: "128228232683",
    appId: "1:128228232683:web:e3adcdd1ec56cd611f9dae",
    measurementId: "G-ZZX0R6N1X4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// DOM

const loginBtn = document.getElementById("login_btn").addEventListener("click", function(event){
  login();
  event.preventDefault();
});
const signupBtn = document.getElementById("signup_btn").addEventListener("click", function(event){
  register();
  event.preventDefault();
});
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const USER_COLLECTION = "Users";

async function register() {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert("Email or Password Invalid");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        const user = userCredential.user;
        const user_data = {
          email: email,
          last_login: Date.now(),
        };
        const userRef = ref(database, `${USER_COLLECTION}/` + user.uid);
        set(userRef, user_data)
          .then(() => {
            return alert("Account Has Been Created");            
          })
          .catch((error) => {
            return alert(error.message);
          });
      })
      .catch(function (error) {
        const error_code = error.code;
        const error_message = error.message;
        return alert(error_message);
      });
  }
}
async function login() {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (validate_email(email) == false || validate_password(password) == false) {
    return alert("Email or Password Invalid");
  } else {
    await signInWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        console.log(userCredential);
        const user = userCredential.user;
        const user_data = {
          last_login: Date.now(),
        };
        const userRef = ref(database, `${USER_COLLECTION}/` + user.uid);
        update(userRef, user_data)
          .then(() => {
            window.location.href ="DashBoard.html"
            return alert("User Has Logged In");
          })
          .catch((error) => {
            return alert(error.message);
          });
      })
      .catch(function (error) {
        const error_code = error.code;
        const error_message = error.message;
        return alert(error_message);
      });
  }
}
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}
function validate_password(password) {
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
}
