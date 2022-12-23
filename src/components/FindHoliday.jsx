import React, { useState } from "react";
import convert from "xml-js"

const FindHoliday = () => {
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("08");
  const [holidays, setHoldiays] = useState([]);

  const HOLIDAY_API_KEY = "v1sROnCe3rzMHnzEzcMG4sBTxmTAPFxI9he54M0o1DYx4htgYWM%2F2WqfUE1hGDi6NJtiCFybxb6IYIjWDfboDQ%3D%3D"
  const getRequestUrl = (year, month) =>
  `/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?ServiceKey=${HOLIDAY_API_KEY}&solYear=${year}&solMonth=${month}`;

  const make2ZeroString = (number) => {
    let numberStr = "0" + number;
    numberStr = numberStr.slice(-2);
    return numberStr;
  };
  // const search = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

  fetch(getRequestUrl(year, make2ZeroString(month)), requestOptions)
    .then((response) => response.text())
    .then((result) => {
      let xml = convert.xml2json(result, { compact: false, spaces: 4 });
      xml = JSON.parse(xml);

      const dates = xml.elements[0].elements[1].elements[0].elements;
      const dateArr = [];
      for (let i = 0; i < dates.length; i++) {
        const { elements: dateObj } = dates[i];
        const obj = {
          name: dateObj[1].elements[0].text,
          holiday: dateObj[2].elements[0].text,
          date: dateObj[3].elements[0].text,
        };
        dateArr.push(obj);
      }
      setHoldiays(dateArr);
    })
    .catch((error) => {
      console.log("error", error);
      setHoldiays([]);
    });
  
    console.log(holidays)
return (
  <div>
    {`${holidays[0].name}`}
  </div>
);
};




export default FindHoliday;