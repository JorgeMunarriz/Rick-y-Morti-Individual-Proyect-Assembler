export function changeThemesAdd() {
    const lightBtn = document.querySelector('[data-bs-theme-value="light"]');
    const darkBtn = document.querySelector('[data-bs-theme-value="dark"]');
    const autoBtn = document.querySelector('[data-bs-theme-value="auto"]');
    lightBtn === null || lightBtn === void 0 ? void 0 : lightBtn.addEventListener("click", () => {
        changeTheme("light");
    });
    darkBtn === null || darkBtn === void 0 ? void 0 : darkBtn.addEventListener("click", () => {
        changeTheme("dark");
    });
    autoBtn === null || autoBtn === void 0 ? void 0 : autoBtn.addEventListener("click", () => {
        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 8 && currentHour < 18;
        const theme = isDayTime ? "light" : "dark";
        changeTheme(theme);
    });
}
export function changeTheme(theme) {
    const html = document.getElementById("html");
    html === null || html === void 0 ? void 0 : html.setAttribute("data-bs-theme", theme);
}
//# sourceMappingURL=index.js.map