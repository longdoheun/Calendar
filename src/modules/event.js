import { doc, setDoc, updateDoc, getDocs, Timestamp, where, collection, addDoc, query } from "firebase/firestore";
import { db } from '../modules/firebase_config';
import dayjs from "dayjs";

// action type
const FETCH_ALL = "FETCH_ALL";
const FETCH_FAIL = "FETCH_FAIL";
const INITIALIZE = "INITIALIZE";

// initial state
const initialState = {
  event: [],
  error: ""
};

const eventConverter = {
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return {
        ...data,
        start: dayjs(data.start.toDate().toISOString()).format("YYYY-MM-DDTHH:mm"),
        end: dayjs(data.end.toDate().toISOString()).format("YYYY-MM-DDTHH:mm"),
      };
    }
};

export const fetchDataAsync = (uid) => {
  const docRef = collection(db, "event").withConverter(eventConverter);
  const q = query(docRef, where("uid", "==", uid));
  return (async (dispatch) => {
    try {
      const querySnapShot = await getDocs(q);
      const response = querySnapShot.docs.map(doc => { return { ...doc.data(), id: doc.id } });
      dispatch({ type: FETCH_ALL, payload: response });
    } catch (err) {
      dispatch({ type: FETCH_FAIL, error: err });
    }
  });
};

export const deleteData = () => ({ type: INITIALIZE });


export default function event (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, event: action.payload };
    
    case FETCH_FAIL:
      return { ...state, error: action.error };
    
    case INITIALIZE:
      return { ...initialState };
    
    default:
      return state;
  }
};