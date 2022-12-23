import { TODAY } from "../modules/info";
import { useNavigate } from "react-router-dom";
import { setDiff } from "../modules/pivot";
import { setModal } from "../modules/env";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";

//components
import Calendar from "../components/Calendar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ModalBg from "../components/ModalBg";

//icons
import {ReactComponent as EventLogo } from "../assets/event.svg";
import {ReactComponent as NavLogo } from "../assets/nav.svg";
import {ReactComponent as SearchLogo } from "../assets/search.svg";
import {ReactComponent as TodayLogo } from "../assets/today.svg";

export default function Monthly() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pivot = useSelector(state => state.pivot);
  const { isModalOn } = useSelector(state => state.env);
  const [brWidth, setBrWidth] = useState(null);

  const onSetDiff = (diff) => dispatch(setDiff(diff));

  //eventhandler
  const goToday = () => {
    onSetDiff({ ...TODAY });
  };

  const toggleModal = () => {
    dispatch(setModal(true));
  }

  //현재 brWidth로 스크롤 길이 설정
  const handleResize = () => {
    setBrWidth(window.innerWidth);
  };

  //브라우저 사이즈 변경 감지
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isModal = brWidth <= 1256 ? true : false;

  return (
    <div className="total-con">
      {isModalOn && <ModalBg />}
      {isModal ? isModalOn && <Sidebar /> : <Sidebar />}
      <div className="Monthly-con">
        <Header
          CLASSNAME={"h-monthly"}
          navLeft={
            <div className="nav-left">
              <NavLogo className="nav-img navLogo" onClick={toggleModal}/>
              <span className="indicator">{`${pivot.year}년 ${pivot.month}월`}</span>
            </div>}
          navRight={
            <div className="nav-right">
              <TodayLogo className="nav-img" onClick={goToday}/>
              <EventLogo className="nav-img" onClick={()=>navigate("creation")}/>
              <SearchLogo className="nav-img" onClick={()=>navigate("/")}/>
            </div>}
        />
        <Calendar />
      </div>
    </div>
  );
};