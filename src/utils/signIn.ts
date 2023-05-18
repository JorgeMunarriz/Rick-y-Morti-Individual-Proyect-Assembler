export function logIn(): void {
  
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  const userInput = document.getElementById("userName") as HTMLInputElement
  const emailInput = document.getElementById("floatingInput") as HTMLInputElement;
  const passwordInput1 = document.getElementById("floatingPassword1") as HTMLInputElement;
  const passwordInput2 = document.getElementById("floatingPassword2") as HTMLInputElement;
  const signInBtn = document.getElementById("signInBtn") as HTMLButtonElement;
  const signOutBtn = document.getElementById("signOutBtn") as HTMLButtonElement;

  const headerContainer = document.getElementById("headerContainer") as HTMLElement;
  const sideBar = document.getElementById("sideBarBig") as HTMLElement;
  
  const containerMain = document.getElementById("containerMain") as HTMLElement;
  const containerFooter = document.getElementById("containerFooter") as HTMLElement;
  const formSignInDiv = document.getElementById("formSignInDiv") as HTMLElement;
  const showPassBtn = document.getElementById("eye1") as HTMLElement;
  const showPassBtn1 = document.getElementById("eye2") as HTMLElement;

  // Oculta los elementos principales y muestra el formulario de inicio de sesión
  const showLoginForm = (): void => {
    formSignInDiv.style.display = "flex" 
    headerContainer.style.display = "none";
    sideBar.style.display = "none";
    sideBar.classList.remove("d-flex")
    containerMain.style.display = "none";
    containerFooter.style.display = "none";
  };

  // Muestra los elementos principales y oculta el formulario de inicio de sesión
  const showMainContent = (): void => {
    formSignInDiv.style.display = "none";
    headerContainer.style.display = "block";
    sideBar.classList.add("d-flex")
    containerMain.style.display = "block";
    containerFooter.style.display = "block";
  };

  // Función para manejar el evento de inicio de sesión
  const handleLogin = (event: Event): void => {
    event.preventDefault();
    const userName = userInput.value;
    const email = emailInput.value;
    const password = passwordInput1.value;
    const passwordConfirm = passwordInput2.value;

    if (password !== passwordConfirm) {
      // Las contraseñas no coinciden, puedes mostrar un mensaje de error aquí si deseas
      return;
    }
     localStorage.setItem("userName", userName)
     localStorage.setItem("email", email)
     localStorage.setItem("password", password)
     const userButton = document.getElementById("user") as HTMLButtonElement
     if (userButton) {
       userButton.textContent = userName;
     }
    
    showMainContent();
  };

  // Función para manejar el evento de cierre de sesión
  const handleLogout = (): void => {
    // Aquí puedes realizar cualquier tarea de cierre de sesión, como eliminar las credenciales del usuario

    // Mostrar el formulario de inicio de sesión después de cerrar sesión
    showLoginForm();
  };

  showLoginForm();

  // AddeventListeners
  signInBtn.addEventListener("click", handleLogin);
  signOutBtn.addEventListener("click", handleLogout);
  showPassBtn.addEventListener("click", togglePasswordVisibility1);
  showPassBtn1.addEventListener("click", togglePasswordVisibility2);

  
  let boxItem = document.querySelector('.form-item') as HTMLDivElement
  let boxItemEmail = document.getElementById('email') as HTMLDivElement
  let boxItemPass = document.getElementById('password1') as HTMLDivElement
  let boxItemPass1 = document.getElementById('confirmPass') as HTMLDivElement
  const errorUser = document.createElement('div');
  errorUser.textContent = "This field should be complete"
  errorUser.className = 'error';
  const userMsgError = errorUser;

  const errorEmail = document.createElement('div');
  errorEmail.textContent = "This field is not properly formatted"
  errorEmail.className = 'error-input';
  const emailMsgError = errorEmail;

  const errorPass = document.createElement('div');
  errorPass.className = 'error-input';
  errorPass.textContent = "This field is not properly formatted"
  const passMsgError = errorPass;
  
  const errorPass1 = document.createElement('div');
  errorPass1.textContent = "This fields doesn't match"
  errorPass1.className = 'error-input';
  const confPassMsgError = errorPass1;
  function validateEmail(email: string) {
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test(email);
  }
  function validatePass(passwordInput1: string) {
    let passReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return passReg.test(passwordInput1);
  }
  
  userInput.addEventListener('input', function() {
    let strRer = /\s/;
    let str = userInput.value;
    let total = Number(str.length);
    if (total <= 4 || total == 0 || total == undefined || str === "" || strRer.test(str)) {
      boxItem.appendChild(userMsgError)
      return false;
    } else {
      if (userMsgError && total > 4 && userMsgError.parentNode === boxItem) {
        boxItem.removeChild(userMsgError);;
      }
      return true;
    }
  });
  
  emailInput.addEventListener("input", function() {
    let email = emailInput.value;
    if (!validateEmail(email)) {
      boxItemEmail.appendChild(emailMsgError);
      return false;
    } else {
      if (emailMsgError && emailMsgError.parentNode === boxItemEmail) {
        boxItemEmail.removeChild(emailMsgError);
      }
      return true;
    }
  });

  
  passwordInput1.addEventListener("input", function() {
    let pass1 = passwordInput1.value;
  
    if (!validatePass(pass1)) {
      boxItemPass.appendChild(passMsgError);
      return false;
    } else {
      if (passMsgError && passMsgError.parentNode === boxItemPass) {
        boxItemPass.removeChild(passMsgError);
      }
      return true;
    }
  });
  
  passwordInput2.addEventListener("input", function verifyPasswords() {
    const password1 = passwordInput1.value;
    const password2 = passwordInput2.value;
    if (password1 !== password2) {
      boxItemPass1.appendChild(confPassMsgError);
      return false;
    } else {
      if (confPassMsgError && confPassMsgError.parentNode === boxItemPass1) {
        boxItemPass1.removeChild(confPassMsgError);
      }
      return true;
    }
  });

  const validateForm = (): void => {
    const userName = userInput.value;
    const email = emailInput.value;
    const password = passwordInput1.value;
    const passwordConfirm = passwordInput2.value;

    const isUserNameValid = userName.trim().length > 4;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePass(password);
    const doPasswordsMatch = password === passwordConfirm;

    signInBtn.disabled = !(isUserNameValid && isEmailValid && isPasswordValid && doPasswordsMatch);
  };

  userInput.addEventListener("input", validateForm);
  emailInput.addEventListener("input", validateForm);
  passwordInput1.addEventListener("input", validateForm);
  passwordInput2.addEventListener("input", validateForm);

  function togglePasswordVisibility1(): void {
    if (passwordInput1.type === "password") {
      showPassBtn.classList.remove("bi-eye-slash");
      showPassBtn.classList.add("bi-eye-fill");
      passwordInput1.type = "text";
    } else {
      showPassBtn.classList.remove("bi-eye-fill");
      showPassBtn.classList.add("bi-eye-slash");
      passwordInput1.type = "password";
    }
  }

  
  function togglePasswordVisibility2(): void {
    if (passwordInput2.type === "password") {
      showPassBtn1.classList.remove("bi-eye-slash");
      showPassBtn1.classList.add("bi-eye-fill");
      passwordInput2.type = "text";
    } else {
      showPassBtn1.classList.remove("bi-eye-fill");
      showPassBtn1.classList.add("bi-eye-slash");
      passwordInput2.type = "password";
    }
  }
  
}
