import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/header";
import LandingPage from "./pages/landingPage";
import ReadBiblePage from "./pages/readBiblePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { 
  Box,
  createTheme } from "@mui/material";
import Cookies from "js-cookie";
import themeConstants from "./components/theme";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [isLightTheme, setIsLightTheme] = useState(Cookies.get("theme_mode") === "light")

  const theme = createTheme({
    palette: {
      background: {
        default: themeConstants[isLightTheme ? "BG_LIGHT_CLR" : "BG_DARK_CLR"],
      },
      primary: {
        main: themeConstants.PRIMARY_CLR,
        div: themeConstants[isLightTheme ? "DIV_LIGHT_CLR" : "DIV_DARK_CLR"],
      },
      secondary: {
        main: themeConstants.SECONDARY_CLR,
        light: themeConstants.SECONDARY_LGT_CLR,
      },
      danger: {
        main: themeConstants.DANGER_CLR
      }
    },
    typography: {
      fontFamily: themeConstants.PRIMARY_FOF,
      body1: {
        color: isLightTheme ? "black" : "white"
      },
      body2: {
        color: "black"
      }
    },
  })

  const reactSelectStyles = {
    control: base => ({
      ...base,
      fontFamily: themeConstants.PRIMARY_FOF,
      backgroundColor: themeConstants[isLightTheme ? "BG_LIGHT_CLR" : "BG_DARK_CLR"],
      color: isLightTheme ? "black" : "white"
    }),
  
    indicatorSeparator:() => null,
  
    placeholder: base => ({
      ...base,
      color: isLightTheme ? "black" : "white"
    }),
  
    option: (base, {
      isFocused,
      isSelected,
      isActive
    }) => ({
      ...base,
      backgroundColor: isSelected ? themeConstants.PRIMARY_CLR : null,
      fontWeight: isFocused ? "bold" : "normal",
      color: isSelected ? "white" : isLightTheme ? "black" : "white"
    }),
  
    singleValue: base => ({
      ...base,
      color: isLightTheme ? "black" : "white"
    }),
  
    menu: base => ({
      ...base,
      fontFamily: themeConstants.PRIMARY_FOF,
      backgroundColor: themeConstants[isLightTheme ? "BG_LIGHT_CLR" : "BG_DARK_CLR"],
      color: isLightTheme ? "black" : "white"
    })
  };

  return (
    <React.StrictMode>
      <ToastContainer hideProgressBar={true} position="top-right" />
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Header
              isLightTheme={isLightTheme}
              setIsLightTheme={setIsLightTheme} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/read-bible" 
                element={<ReadBiblePage reactSelectStyles={reactSelectStyles} />} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
