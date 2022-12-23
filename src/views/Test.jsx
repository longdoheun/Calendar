//firebase
import { db } from '../modules/firebase_config';
import { doc, setDoc, updateDoc, getDocs, Timestamp, where, collection, addDoc, query, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataAsync } from "../modules/event";

import LeftBackBtn from "../components/LeftBackBtn";
import Header from "../components/Header";
import { ReactComponent as TrashcanLogo } from "../assets/trashcan.svg";
import InputWindow from '../components/InputWindow';

export default function Test() {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { docId } = useParams();
  const { event } = useSelector(state => state.event);
  const [currentEvent] = event.filter(doc => doc.id === docId);

  const defaultEvent = {
    name: "",
    desc: "",
    start: "",
    end: "",
    location: "",
    color: "green"
  }

  const [dayEvent, setDayEvent] = useState(defaultEvent);
  
  useEffect(() => {
    setDayEvent(currentEvent ? currentEvent : defaultEvent);
  }, [event]);

  //UPDATE
  const customConvert = (event) => {
    return {
      ...event,
      start: Timestamp.fromDate(new Date(event.start)),
      end: Timestamp.fromDate(new Date(event.end)),
    };
  }

  const updateData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const eventRef = doc(db, "event", docId);
        try {
          const docRef = await updateDoc(eventRef, customConvert(dayEvent));
          console.log("Document updated");
          navigate("/", {replace: true});
          dispatch(fetchDataAsync(user.uid));
        } catch (err) {
          console.log("error message", err)
        }
      } else {
        console.log("user is signed out");
      };
    });
  }

  const deleteData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const eventRef = doc(db, "event", docId);
        try {
          await deleteDoc(eventRef);
          console.log("Document deleted");
          navigate("/",{replace:true});
          dispatch(fetchDataAsync(user.uid));
        } catch (err) {
          console.log("error message", err)
        }
      } else {
        console.log("user is signed out");
      };
    });
  }

  return (
    <>
      <Header navLeft={<LeftBackBtn />} navRight={<TrashcanLogo className="left-img" onClick={deleteData} />} />
      <InputWindow
        dayEvent={dayEvent}
        setDayEvent={setDayEvent}
        title={"일정 관리하기"}
        actionName={"업데이트"}
        action={updateData}
      />
    </>
  );
};