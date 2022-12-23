import { useSelector } from "react-redux";
import { MonthIso } from "../modules/info";
import { useNavigate } from "react-router-dom";

export default function MonthlyEvent(props) {
  const { dayID } = props;
  const { event } = useSelector(state => state.event);
  const navigate = useNavigate();
  const dayEvent = event.filter(doc => new MonthIso(doc.start).getDayId() === dayID);

  const goTest = (e) => {
    e.preventDefault();
    navigate("/test/" + e.target.id);
  };

  /**return style according to each data */
  const monthlyEventStyle = (color) => {
    return {
      backgroundColor: `${color}`,
    }
  };

  return (
    <>
     <section className="event-con">
        {dayEvent.map((data) =>
          <p
            className="monthly-event flex-col"
            id={data.id}
            key={data.id}
            style={monthlyEventStyle(data.color)}
            onClick={goTest}
          >{data.name}</p>
        )}
      </section>
    </>
  );
}