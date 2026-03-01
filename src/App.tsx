import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ruRU as coreRuRU } from "@mui/material/locale";
import { ruRU } from "@mui/x-data-grid";
import PeopleIcon from "@mui/icons-material/People";
import UserDataGrid from "./components/UserDataGrid";

const theme = createTheme(
  {
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  },
  ruRU,
  coreRuRU,
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <PeopleIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              Управление пользователями
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth={false} sx={{ mt: 4, mb: 4, flex: 1, display: "flex", flexDirection: "column" }}>
          <UserDataGrid />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
