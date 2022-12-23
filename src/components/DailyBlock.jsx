import { useSelector } from "react-redux";
import { MonthIso, DailyInfo } from "../modules/info";

export default function DailyBlock(props) {
    const { event } = useSelector(state => state.event);
  const dayEvent = event.filter(doc => new MonthIso(doc.start).getDayId() === props.dayId);

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
    <li className="dailyBlock flex-col no-scroll">
        {
          times.map(time => <div className="time-row" key={time} id={time}></div>)
        }
        {dayEvent.map((data) => {
          const eventStyle = new DailyInfo(data, 60, 0.5).getEventStyle();
          return (
            <div
              className="daily-event flex-col"
              id={data.id}
              key={data.id}
              style={eventStyle}
            >
              <h5 className="daily-location">{data.location}</h5>
              <h4 className="daily-name">{data.name}</h4>
              <h5 className="daily-duration">{data.start} - {data.end}</h5>
            </div>
          );
        }
        )}
    </li>
  );

}