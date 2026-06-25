import { StudentData } from "./scoring";

const STUDENT_DATA_KEY = "studentData";
const THEME_KEY = "theme";

export function saveStudentData(data: StudentData) {
  try {
    localStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save student data:", error);
  }
}

export function getStudentData(): StudentData | null {
  try {
    const data = localStorage.getItem(STUDENT_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to get student data:", error);
    return null;
  }
}

export function clearStudentData() {
  try {
    localStorage.removeItem(STUDENT_DATA_KEY);
  } catch (error) {
    console.error("Failed to clear student data:", error);
  }
}

export function setTheme(theme: "light" | "dark") {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {
    console.error("Failed to set theme:", error);
  }
}

export function getTheme(): "light" | "dark" {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return theme === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Failed to get theme:", error);
    return "light";
  }
}

export function initializeTheme() {
  const theme = getTheme();
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
