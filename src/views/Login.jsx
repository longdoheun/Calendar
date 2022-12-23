import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InputLabel from "../components/InputLabel";
import Header from "../components/Header";
import LeftBackBtn from "../components/LeftBackBtn";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isDisableToLogin, setIsDisAbleToLogin] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

/**change current input value*/
  const onChangeInput = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  
  useEffect(() => {
    setIsError(false);
    const { email, password } = userInfo;
    setIsDisAbleToLogin(email && password ? false : true);
  }, [userInfo]);

  const logIn = (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
        // sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken);
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setIsError(true);
      });
    console.log(userInfo);
  }
  
  return (
    <>
      <Header navLeft={<LeftBackBtn/>}/>
      <div className="input-container">
        <h3 className="title">나만의 캘린더 작성하기</h3>
        <p className="sub-title">언제 어디에서나 일정을 확인할 수 있습니다</p>
        <InputLabel name="이메일 주소">
          <input
            autoComplete="off"
            type="email" name="email" id="email"
            value={userInfo.email}
            className="login-input"
            placeholder="이메일 입력"
            onChange={onChangeInput}
          />
        </InputLabel>
        <InputLabel name="비밀번호">
          <input
            autoComplete="off"
            type="password" name="password" id="password"
            value={userInfo.password}
            placeholder="비밀번호 입력"
            className="login-input"
            onChange={onChangeInput} />
        </InputLabel>
        <button
          className="login-btn"
          onClick={logIn}
          disabled={isDisableToLogin}
        >로그인</button>
        {isError && <div className="error-alert">이메일 혹은 비밀번호가 일치하지 않습니다. 확인 후 다시 입력해주세요.</div>}
      </div>
    </>
  );
};