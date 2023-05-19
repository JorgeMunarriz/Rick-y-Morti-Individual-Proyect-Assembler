export function changeThemesAdd() {
    const lightBtn = document.querySelector('[data-bs-theme-value="light"]');
    const darkBtn = document.querySelector('[data-bs-theme-value="dark"]');
    const autoBtn = document.querySelector('[data-bs-theme-value="auto"]');
    lightBtn.addEventListener("click", () => {
        changeTheme("light");
    });
    darkBtn.addEventListener("click", () => {
        changeTheme("dark");
    });
    autoBtn.addEventListener("click", () => {
        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 8 && currentHour < 18;
        const theme = isDayTime ? "light" : "dark";
        changeTheme(theme);
    });
}
export function changeTheme(theme) {
    const html = document.getElementById("html");
    html.setAttribute("data-bs-theme", theme);
}
//# sourceMappingURL=index.js.map