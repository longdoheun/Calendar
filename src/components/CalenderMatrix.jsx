import React from 'react';
import { DAY_OF_THE_WEEK, TODAY, MonthInfo } from "../modules/info";
import MonthlyEvent from "./MonthlyEvent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CalenderMatrix(props) {
  const navigate = useNavigate();
  const { monthInfo, mini } = props;
  const { year, month } = monthInfo;
  const { isEventVisible } = useSelector(state => state.env);

  const Month = new MonthInfo(year, month, 1);
  const matrix = Month.generateDate();

  const todayISO = new MonthInfo(TODAY.year, TODAY.month, TODAY.day).getISOdate();
  const dayInfo = (day, id) => {
    if (day) {
      if (todayISO === id) {
        return "able today"
      } else {
        return "able"
      };
    } else {
      return "null"
    };
  };
  const goDaily = (e) => {
    e.preventDefault();
    navigate("/daily/" + e.target.id);
  };

  return (
    <ul className={`calender-matrix ${year}-${month} no-drag`}>
      {matrix.map((dayVector, index) =>
        <li className={DAY_OF_THE_WEEK.eng[index]} key={index}>
          <ul>
            {dayVector.map((day, index) => {
              const CURRENT_DAY_ID = new MonthInfo(year, month, day).getISOdate();
              return (
                <li className={`block ${mini && "no-border"}`} key={"day-block" + index} id={CURRENT_DAY_ID}>
                  <div className={`day-number ${dayInfo(day, CURRENT_DAY_ID)}`} key={index}>{day}</div>
                  {!mini && isEventVisible && <MonthlyEvent dayID={CURRENT_DAY_ID} />}
                </li>
              );
            })}
          </ul>
        </li>)}
    </ul>
  );
};

export default CalenderMatrix