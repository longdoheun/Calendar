import React, { useState, useRef, useEffect } from "react";
import { DAY_OF_THE_WEEK, MonthInfo } from "../modules/info";
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from "../modules/pivot";
import CalenderMatrix from './CalenderMatrix';


export default function Calendar(props) {
  const { mini } = props;
  const myref = useRef();
  const [SCROLL_HEIGHT, setScrollHeight] = useState(null);
  const pivot = useSelector(state => state.pivot);

  // 전역상태 dispatch
  const dispatch = useDispatch();
  const onDecrease = () => dispatch(decrease());
  const onIncrease = () => dispatch(increase());

  //현재 element height로 스크롤 길이 설정
  const handleResize = () => {
    setScrollHeight(myref.current.clientHeight);
    console.log(myref.current.clientHeight);
  };

  //브라우저 사이즈 변경 감지
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //scrollHeight가 바뀔 때마다 스크롤 높이 재조정
  useEffect(() => {
    myref.current.scroll(0, SCROLL_HEIGHT);
  }, [SCROLL_HEIGHT, pivot]);

  const currentMonth = new MonthInfo(pivot.year, pivot.month, pivot.day);
  const calendarInfo = [{ ...currentMonth.goLastMonth() }, { ...currentMonth }, { ...currentMonth.goNextMonth() }];

  const changePivot = (indicate) => {
    setTimeout(() => {
      indicate();
    }, 90);
    // myref.current.scroll(0, SCROLL_HEIGHT);
  };
  
  /**if scroll reaches certain points, change pivot month.*/
  const onScroll = () => {
    const scrolltop = myref.current.scrollTop;
    // console.log(scrolltop);
    switch (scrolltop) {
      case 0:
        changePivot(onDecrease);
        break;
      case SCROLL_HEIGHT * 2:
        changePivot(onIncrease);
        break;
      default:
        break;
    }
  };

  return (
    <section className={`calendar-con ${mini&&"mini"}`}>
      <div className='day-nav no-drag'>
        {DAY_OF_THE_WEEK.kor.map((dayString, index) =>
          <span className={dayString} key={index}>
            {dayString}
          </span>)}
      </div>
      <div className={`calender ${mini&&"mini"}`} ref={myref} onScroll={onScroll}>
        {calendarInfo.map(monthInfo =>
          <CalenderMatrix
            key={`${monthInfo.year}.${monthInfo.month}`}
            mini= {mini}
            monthInfo={monthInfo}
          />)}
      </div>
    </section>
  );
};