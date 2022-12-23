import DailyBlock from "../components/DailyBlock";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function Daily() {
  const { docId } = useParams();
  const times = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  return (
    <div className="daily-wrapper flex-col">
      <Header
        CLASSNAME={"h-monthly"}
        navLeft={<span className="indicator">2022년 10월</span>}
      />
      <div className="daily-subheader flex-row">
        <div className="index-nav flex-col"></div>
        {["1", 2, 3, 4, 5, 6, 7].map(num =>
          <div className="daily-nav flex-col">
            { num}일
      </div>)}
      </div>
      <ul className="table-con flex-row no-scroll">
        <li className="indexBlock flex-col no-scroll">
          {
            times.map(time => <div className="time-row" key={time} id={time}>{time}</div>)
          }
        </li>

        {["2022-10-07", "2022-10-08", "2022-10-09", "2022-10-10", "2022-10-11", "2022-10-12", "2022-10-13"].map(dayId => <DailyBlock dayId={ dayId}/>)}
      </ul>
    </div>
  );
};