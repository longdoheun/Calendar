//firebase
import { db } from "../modules/firebase_config";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataAsync } from "../modules/event";
import dayjs from "dayjs";

import LeftBackBtn from "../components/LeftBackBtn";
import Header from "../components/Header";
import InputWindow from "../components/InputWindow";

export default function Creation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultEvent = {
    name: "",
    desc: "",
    start: dayjs(new Date()).format("YYYY-MM-DDTHH:mm"),
    end: dayjs(new Date()).format("YYYY-MM-DDTHH:mm"),
    location: "",
    color: "green",
  };

  const [dayEvent, setDayEvent] = useState(defaultEvent);

  //CREATE
  const eventConvert = (uid) => {
    return {
      toFirestore: (event) => {
        return {
          ...event,
          start: Timestamp.fromDate(new Date(event.start)),
          end: Timestamp.fromDate(new Date(event.end)),
          uid: uid,
          createdAt: Timestamp.fromDate(new Date()),
        };
      },
    };
  };

  const addData = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const eventRef = collection(db, "event").withConverter(
          eventConvert(user.uid)
        );
        try {
          const docRef = await addDoc(eventRef, dayEvent);
          console.log("Document written with ID: ", docRef.id);
          navigate("/", { replace: true });
          dispatch(fetchDataAsync(user.uid));
        } catch (err) {
          console.log("error message", err);
        }
      } else {
        console.log("user is signed out");
      }
    });
  };

  return (
    <>
      <Header navLeft={<LeftBackBtn />} />
      <InputWindow
        dayEvent={dayEvent}
        setDayEvent={setDayEvent}
        title={"나만의 일정 생성하기"}
        actionName={"생성하기"}
        action={addData}
      />
    </>
  );
}
