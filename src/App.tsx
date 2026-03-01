import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import UserDataGrid from "./components/UserDataGrid";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <PeopleIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              User Management
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <UserDataGrid />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
