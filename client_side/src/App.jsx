import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import MissingPage from "./pages/Missingpage";
import Home from "./pages/Home";
import userContext from "./userContext";

const App = () => {
  const [user, setUser] = useState({
    accessToken: localStorage.getItem("accessToken"),
  });
  const unsetUser = () => {
    localStorage.clear();
    setUser({ accessToken: null });
  };
  const userContextData = useMemo(() => ({ user, setUser, unsetUser }));

  return (
    <>
      <userContext.Provider value={userContextData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
};

export default App;
