import { useState, useEffect } from "react";
import { darkStyle, lightStyle } from "../modules/info";
import "../css/ToggleBtn.css";

export default function ToggleBtn(props) {

  const [currentState, setCurrentState] = useState(props.default);
  const [toggleStyle, setToggleStyle] = useState(currentState === true ? { ...lightStyle } : { ...darkStyle });
  
  const toggle = (changeOption) => {
    setCurrentState(currentState === true ? false : true);
    changeOption();
  }

  useEffect(() => {
    setToggleStyle(currentState === true ? { ...lightStyle } : { ...darkStyle });
  }, [currentState] );
  
  return (
    <div className="toggle-cover" onClick={() => toggle(props.changeOption)} style={toggleStyle.cover}>
      <div className="toggle-btn" style={toggleStyle.btn }></div>
    </div>
  )
}