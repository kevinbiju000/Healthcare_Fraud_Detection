import { useState } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username); // Set the username on login
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar username={username} isSidebar={isSidebar} />}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/team" element={isAuthenticated ? <Team /> : <Navigate to="/" />} />
              <Route path="/contacts" element={isAuthenticated ? <Contacts /> : <Navigate to="/" />} />
              <Route path="/invoices" element={isAuthenticated ? <Invoices /> : <Navigate to="/" />} />
              <Route path="/form" element={isAuthenticated ? <Form /> : <Navigate to="/" />} />
              <Route path="/bar" element={isAuthenticated ? <Bar /> : <Navigate to="/" />} />
              <Route path="/pie" element={isAuthenticated ? <Pie /> : <Navigate to="/" />} />
              <Route path="/line" element={isAuthenticated ? <Line /> : <Navigate to="/" />} />
              <Route path="/faq" element={isAuthenticated ? <FAQ /> : <Navigate to="/" />} />
              <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/" />} />
              <Route path="/geography" element={isAuthenticated ? <Geography /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
