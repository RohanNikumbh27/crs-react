import { useState } from "react";
// import "../Styles/App.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import QueryPage from "./QueryPage";
import Index from "./MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MainPage from "./MainPage";
import { HiMenu } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";


const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="signuppage" element={<SignupPage />} />
          <Route path="querypage" element={<QueryPage />} />
          <Route path="mainpage" element={<MainPage />} />

          {/* <Route
            path="querypage"
            element={isLogin ? <QueryPage /> : <LoginPage />}
          /> */}
        </Routes>
      </BrowserRouter>
      <ThemeToggle />
    </>
  );
};

export default App;
