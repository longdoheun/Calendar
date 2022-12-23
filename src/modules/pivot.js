/* 액션 타입 만들기 */
const SET_DIFF = "pivot/SET_DIFF";
const INCREASE = "pivot/INCREASE";
const DECREASE = "pivot/DECREASE";


/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setDiff = diff => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });


//object
const Today = new Date()

/** object of today's information */
const initialState = {
  year: Today.getFullYear(),
  month: Today.getMonth() + 1,
  day: 1,
};
  
export default function pivot(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        year: action.diff.year,
        month: action.diff.month
      };
    case INCREASE:
      return {
        ...state,
        year: state.month < 12 ? state.year : state.year + 1,
        month: state.month < 12 ? state.month + 1 : 1,
      };
    case DECREASE:
      return {
        ...state,
        year: state.month > 1 ? state.year : state.year - 1,
        month: state.month > 1 ? state.month - 1 : 12,
      };
    default:
      return state;
  }
}
