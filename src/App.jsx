import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDataAsync } from "./modules/event"
import { getAuth, onAuthStateChanged } from "firebase/auth";

//components
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Monthly from './views/Monthly';
import Home from './views/Home';
import Test from './views/Test';
import Creation from './views/Creation';

// css
import './css/App.css';
import './css/daily.css';
import './css/Monthly.css';
import "./css/InputEvent.css"
import './css/CalenderMatrix.css';
import './css/login.css';
import './css/sidebar.css';
import "./css/Home.css";

//맨 마지막에 작성
import './css/responsive.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchDataAsync(user.uid));
      } else {
        console.log("user is signed out");
      }
    });
  }, []);
  
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Monthly />}/>
          <Route path="/">
            <Route path="info" element={<Home/>}></Route>
            <Route path="creation" element={<Creation/>}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="test/:docId" element={<Test/>}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};