const SET_GLOBAL_COLOR = "SET_GLOBAL_COLOR";
const SET_MODAL = "SET_MODAL";
const SET_EVENT_VIEW = "SET_EVENT_VIEW";

const setColor = (globalColor) => {
  const colorToCode = globalColor === "dark" ? "#161b22":"#fff"
  document.querySelector('meta[name="theme-color"]').setAttribute('content',  colorToCode);
  document.documentElement.setAttribute('color-theme', globalColor);
  localStorage.setItem('color-theme', globalColor);
}

export const setGlobalColor = (globalColor) => {
  setColor(globalColor);
  return ({ type: SET_GLOBAL_COLOR, payload: globalColor });
}

export const setModal = () => ({ type: SET_MODAL });

export const setEventView = () => ({ type: SET_EVENT_VIEW });

  //다크모드 세팅
const defaultValue = () => {
  const storedGlobalColor = localStorage.getItem("color-theme");
  if (storedGlobalColor) {
    setColor(storedGlobalColor);
    return storedGlobalColor;
  }
  else {
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const newGlobalColor = isDarkMode ? "dark" : "light";
    setColor(newGlobalColor);
    return newGlobalColor;
  };
};

const initialState = {
  globalColor: defaultValue(),
  isModalOn: false,
  isEventVisible: true,
};

export default function env(state = initialState, action) {
  switch (action.type) {
    case SET_GLOBAL_COLOR:
      return {
        ...state,
        globalColor: action.payload
      };
    case SET_MODAL:
      return {
        ...state,
        isModalOn: state.isModalOn ? false : true
      };
    case SET_EVENT_VIEW:
      return {
        ...state,
        isEventVisible: state.isEventVisible ? false : true
      };
    default:
      return state;
  };
};