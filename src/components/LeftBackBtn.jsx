import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftBack } from "../assets/left-back.svg";

export default function LeftBackBtn() {
  const navigate = useNavigate();
  
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1, {replace: true});
  };

  return (
    <LeftBack className="left-img" onClick={goBack}/>
  );
};