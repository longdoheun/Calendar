export default function InputLabel(props) {
  return (
    <label>
      <div className="inner">
        <div className={`input`}>
          <span className="label">{props.name}</span>
          {props.children}
        </div>
      </div>
    </label>
  );
};