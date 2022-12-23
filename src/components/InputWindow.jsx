import React, { useState, useEffect } from "react";
//js
import { COLOR_LIST } from "../modules/info";

//components
import SelectColor from './SelectColor';
import InputLabel from "./InputLabel";


export default function InputWindow(props) {
  const { dayEvent, setDayEvent, action, title, actionName } = props;
  const [isDisableToLogin, setIsDisAbleToLogin] = useState(true);

  useEffect(() => {
    setIsDisAbleToLogin(dayEvent.name && dayEvent.start ? false : true);
  }, [dayEvent.name, dayEvent.start]);

  useEffect(() => {
    if (new Date(dayEvent.start) > new Date(dayEvent.end)) {
      setDayEvent({ ...dayEvent, end: dayEvent.start });
    }
  }, [dayEvent.start]);

  useEffect(() => {
    if (new Date(dayEvent.start) > new Date(dayEvent.end)) {
      setDayEvent({ ...dayEvent, start: dayEvent.end });
    }
  }, [dayEvent.end]);

  const changeInput = e => {
    const { name, value } = e.target;
    setDayEvent({ ...dayEvent, [name]: value });
  };
  
  return (
    <>
      <div className="event-wrapper">
        <h1 className="event-title">{title}</h1>
        <p className="subtitle">보고싶은 일정을 한 눈에</p>

        <InputLabel name="이벤트 이름">
          <input
            className="login-input"
            autoComplete="off" type="text" name="name"
            value={dayEvent.name}
            placeholder="제목 입력하기"
            onChange={changeInput}
          />
        </InputLabel>
        <InputLabel name="이벤트 시간">
          <div className="t-con">
            <div className="time-info">
              <p className="desc">시작</p>
              <input type="datetime-local" className="start" name="start" value={dayEvent.start} onChange={changeInput} required />
            </div>
            <div className="time-info">
              <p className="desc">종료</p>
              <input type="datetime-local" className="end" name="end" value={dayEvent.end} min={dayEvent.start} onChange={changeInput} required />
            </div>
          </div>
        </InputLabel>
        <InputLabel name="이벤트 위치">
          <input
            className="login-input"
            autoComplete="off" type="text" name="location"
            value={dayEvent.location}
            placeholder="위치 입력하기"
            onChange={changeInput}
          />
        </InputLabel>
        <InputLabel name="색상 팔레트">
          <section className="event-select-color">
            {COLOR_LIST.map(color =>
              <SelectColor
                key={color}
                givenColor={color}
                currentEvent={dayEvent}
                setCurrentEvent={setDayEvent}
              >
              </SelectColor>)}
          </section>
        </InputLabel>
        <InputLabel name="세부사항 입력하기">
          <textarea
            id="event-detail"
            name="desc"
            value={dayEvent.desc}
            placeholder="세부사항"
            onChange={changeInput}
          />
        </InputLabel>
        <section className="event-button">
          <button className="login-btn" onClick={action} disabled={isDisableToLogin}>{actionName}</button>
        </section>
      </div>
    </>
  );
};