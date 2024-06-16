import React from 'react'
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom'
import MyProducts from './pages/MyProducts';
import { useState } from "react";
import Topbar from "./globals/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


const App = () => {
  const location = useLocation();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const visibleRoutes = ['/line','/pie','/bar','/addProduct','/myProducts','/dashboard','/calendar'];
  const isRouteVisible = (route) => visibleRoutes.includes(route);
  return (
     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> 
        <CssBaseline />
        <div className="app">
          <main className="content">
          {isRouteVisible(location.pathname) && <Topbar />}
      <Routes>
        
        <Route path='/myProducts' element={<MyProducts />}/>
        
      </Routes>
      </main>
      </div>
      </ThemeProvider>
      </ColorModeContext.Provider>
  )
}

export default App
