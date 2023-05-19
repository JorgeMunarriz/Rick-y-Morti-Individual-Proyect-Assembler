export function changeThemesAdd() {
  const lightBtn = document.querySelector('[data-bs-theme-value="light"]') as HTMLButtonElement;
  const darkBtn = document.querySelector('[data-bs-theme-value="dark"]') as HTMLButtonElement;
  const autoBtn = document.querySelector('[data-bs-theme-value="auto"]') as HTMLButtonElement;

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
export function changeTheme(theme: string) {
    const html = document.getElementById("html") as HTMLHtmlElement;
    html.setAttribute("data-bs-theme", theme);
  }