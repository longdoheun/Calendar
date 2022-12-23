import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteData } from "../modules/event";

export default function LoginBtn() {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => { // user 판명을 듣고 
      if (user) { // 있으면
        setIsLoggedIn(true); // 로그인 됨
      } else {
        setIsLoggedIn(false); // 로그인 안됨
      }
    });
  }, []);

  const goTologIn = () => {
    navigate("/login");
  };

  const logOut = () => {
    navigate("/");
    signOut(auth)
      .then(() => {
        dispatch(deleteData());
        console.log("signed out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!isLoggedIn && <div className="round-btn" onClick={goTologIn}>로그인</div>}
      {isLoggedIn && <div className="round-btn" onClick={logOut}>로그아웃</div>}
    </>
    
  );
};