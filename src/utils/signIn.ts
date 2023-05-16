export function logIn(): void {
    const loginForm = document.getElementById("loginForm") as HTMLFormElement;
    const emailInput = document.getElementById("floatingInput") as HTMLFormElement;
    const passwordInput = document.getElementById("floatingPassword1") as HTMLInputElement;
    const passwordInput2 = document.getElementById("floatingPassword2") as HTMLInputElement;
    const sideBar = document.getElementById("sideBar") as HTMLElement;
    const containerMain = document.getElementById("containerMain") as HTMLElement;
    const formSignIn = document.getElementById("formSignIn") as HTMLElement;
    const showPassBtn = document.getElementById("eye1") as HTMLElement;
    const showPassBtn1 = document.getElementById("eye2") as HTMLElement;
  
    // Función para ocultar el formulario y mostrar el contenido principal
    const hideFormAndShowContent = (): void => {
      formSignIn.className = "no-show";
      
      
      
    };
  
    // Función para manejar el evento de inicio de sesión
    const handleLogin = (event: Event): void => {
      event.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      window.location.href = "index.html";
      hideFormAndShowContent();
    };
  
    // Función para alternar la visibilidad de la contraseña del primer campo
    const togglePasswordVisibility1 = (): void => {
      if (passwordInput.type === "password") {
        showPassBtn.classList.remove("bi-eye-slash");
        showPassBtn.classList.add("bi-eye-fill");
        passwordInput.type = "text";
      } else {
        showPassBtn.classList.remove("bi-eye-fill");
        showPassBtn.classList.add("bi-eye-slash");
        passwordInput.type = "password";
      }
    };
  
    // Función para alternar la visibilidad de la contraseña del segundo campo
    const togglePasswordVisibility2 = (): void => {
      if (passwordInput2.type === "password") {
        showPassBtn1.classList.remove("bi-eye-slash");
        showPassBtn1.classList.add("bi-eye-fill");
        passwordInput2.type = "text";
      } else {
        showPassBtn1.classList.remove("bi-eye-fill");
        showPassBtn1.classList.add("bi-eye-slash");
        passwordInput2.type = "password";
      }
    };
  
    // Mostrar el formulario al cargar la página
    formSignIn.style.display = "block";
    sideBar.style.display = "none";
    containerMain.style.display = "none";
  
    // Agregar los manejadores de eventos
    showPassBtn.addEventListener("click", togglePasswordVisibility1);
    showPassBtn1.addEventListener("click", togglePasswordVisibility2);
    loginForm.addEventListener("submit", handleLogin);
  }
  