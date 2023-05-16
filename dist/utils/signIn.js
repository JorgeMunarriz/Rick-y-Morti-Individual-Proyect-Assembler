export function logIn() {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("floatingInput");
    const passwordInput = document.getElementById("floatingPassword1");
    const passwordInput2 = document.getElementById("floatingPassword2");
    const sideBar = document.getElementById("sideBar");
    const containerMain = document.getElementById("containerMain");
    const formSignIn = document.getElementById("formSignIn");
    const showPassBtn = document.getElementById("eye1");
    const showPassBtn1 = document.getElementById("eye2");
    const hideFormAndShowContent = () => {
        formSignIn.className = "no-show";
    };
    const handleLogin = (event) => {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        window.location.href = "index.html";
        hideFormAndShowContent();
    };
    const togglePasswordVisibility1 = () => {
        if (passwordInput.type === "password") {
            showPassBtn.classList.remove("bi-eye-slash");
            showPassBtn.classList.add("bi-eye-fill");
            passwordInput.type = "text";
        }
        else {
            showPassBtn.classList.remove("bi-eye-fill");
            showPassBtn.classList.add("bi-eye-slash");
            passwordInput.type = "password";
        }
    };
    const togglePasswordVisibility2 = () => {
        if (passwordInput2.type === "password") {
            showPassBtn1.classList.remove("bi-eye-slash");
            showPassBtn1.classList.add("bi-eye-fill");
            passwordInput2.type = "text";
        }
        else {
            showPassBtn1.classList.remove("bi-eye-fill");
            showPassBtn1.classList.add("bi-eye-slash");
            passwordInput2.type = "password";
        }
    };
    formSignIn.style.display = "block";
    sideBar.style.display = "none";
    containerMain.style.display = "none";
    showPassBtn.addEventListener("click", togglePasswordVisibility1);
    showPassBtn1.addEventListener("click", togglePasswordVisibility2);
    loginForm.addEventListener("submit", handleLogin);
}
//# sourceMappingURL=signIn.js.map