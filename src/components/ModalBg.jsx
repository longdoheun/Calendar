import { setModal } from "../modules/env"
import { useDispatch } from "react-redux";

export default function Modalbg() {

  const dispatch = useDispatch();

  const closeModalBg = () => {
    dispatch(setModal(false));
  };

  return (
    <div className="modalbg" onClick={closeModalBg}></div>
  )
}