export default function SelectColor (props) {
  const { givenColor, setCurrentEvent, currentEvent } = props
  
  const selectColor = (e) => {
    e.preventDefault();
    setCurrentEvent({ ...currentEvent, color: e.target.id });
    console.log(currentEvent.color);
  };
  
  return (
    <div
      className="select-color"
      id={givenColor}
      style={{ background: givenColor }}
      onClick={selectColor}
    ></div>
  );
};
