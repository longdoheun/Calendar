import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoginBtn from "../components/LoginBtn";
import MOON from "../assets/moon.png";
import PORTRAIT from "../assets/portrait.jpg";
import LANDSCAPE from "../assets/landscape.jpg";
  
export default function Home() {
  const navigate = useNavigate();

  const goMonth = () => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <div className="home-con no-drag">
      <Header
        CLASSNAME={"h-home"}
        navLeft={<div className="home-logo">Calendar</div>}
        navRight={<LoginBtn/>}
      ></Header>
      <div className="thumbnail">
        <div className="hooks">
          <h1 className="home-title">Create your own Calendar</h1>
          <h3 className="home-paragraph">| 나만의 캘린더 만들기</h3>
          <div className="round-btn c-white no-drag m-t-50" onClick={goMonth}>시작하기</div>
        </div>
        <img src={MOON} alt="moon.img" className="bg-img" />
      </div>
      <section className="home-main">
        <h1 className="home-subtitle m-t-200">Calendar는 무엇인가요?</h1>
        <div className="img-wrapper m-t-50">
          <div className="img-con">
            <img src={LANDSCAPE} alt="landscape.img" className="sh-img" />
            <h3 className="home-paragraph">iPad display | landscape</h3>
          </div>
          <div className="img-con">
            <img src={PORTRAIT} alt="portrait.img" className="sh-img" />
            <h3 className="home-paragraph">iPad display | portrait</h3>
          </div>
        </div>
        <h3 className="home-paragraph m-t-50">
          Calendar는 모바일, 데스크톱 환경에 제약없이 사용할 수 있는 브라우저 웹 앱(PWA)입니다.
          </h3>
      </section>

      <footer className="footer m-t-200">
        <p>ⓒ 2022. longdoheun All rights reserved</p>
      </footer>
    </div>
  );
};