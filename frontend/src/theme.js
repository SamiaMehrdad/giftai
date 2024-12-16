import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50", // Custom primary color
    },
    secondary: {
      main: "#ff9800", // Custom secondary color
    },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
  },
});

export default theme;
