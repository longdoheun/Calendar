import InputLabel from "./InputLabel";
import Calendar from "./Calendar";
import LoginBtn from "./LoginBtn";
import ToggleBtn from "./ToggleBtn";
import { setGlobalColor, setEventView } from "../modules/env";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { globalColor, isEventVisible } = useSelector(state => state.env);
  const pivot = useSelector(state => state.pivot);
  const changeColor = () => dispatch(setGlobalColor(globalColor === "light" ? "dark" : "light"));
  const changeEventView = () => dispatch(setEventView());

  return (
    <>
      <section className="sidebar no-scroll" >
        <div className="hl">
          <div className="hl-top">Calendar</div>
          <div className="hl-btm flex-row">ⓒ 2022. longdoheun</div>
        </div>
        <div className="sidebar-main">
          <section className="mini-calendar-con">
            {`${pivot.year}년 ${pivot.month}월`}
            <div className="mini-calendar">
              <Calendar mini={true} />
            </div>
          </section>
          <InputLabel name={"페이지 이동"}>
            <div className='page-index' onClick={() => { navigate("/") }}>월별 페이지</div>
            <div className='page-index' onClick={() => { navigate("/creation") }}>일정 생성하기</div>
            <div className='page-index' onClick={() => { navigate("/info") }}>캘린더 정보</div>
          </InputLabel>
          <InputLabel name="환경설정">
            <div className='page-index flex-row'>
              다크모드
          <ToggleBtn default={globalColor === "light" ? true : false} changeOption={changeColor} />
            </div>
            <div className='page-index flex-row'>
              이벤트 미표시
          <ToggleBtn default={isEventVisible} changeOption={changeEventView} />
            </div>
          </InputLabel>
          <LoginBtn />
        </div>
      </section>
    </>
  );
};