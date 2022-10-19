import React from "react";
import { useState, useEffect } from "react";
import Home from "./pages/home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/Notfound";
import AuthLoadingPage from "./pages/auth/AuthLoading";
import { GetLoggedinUser } from "./services/Google_Services/GoogleProfileService";
import Header from "./components/Header/Header.jsx";

export const UserContext = React.createContext(null);
export const ApplicationContext = React.createContext(null);

export default function App() {
  const [User, SetUser] = useState(null);
  const [EditMode, SetEditMode] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const user = await GetLoggedinUser();
    SetUser(user);
  }

  function Logout() {
    localStorage.removeItem("tokens");
    SetUser(null);
  }

  return (
    <div className="app">
      <UserContext.Provider value={{ User, Logout, SetUser }}>
        <ApplicationContext.Provider value={{ EditMode, SetEditMode }}>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/auth" element={<AuthLoadingPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApplicationContext.Provider>
      </UserContext.Provider>
    </div>
  );
}