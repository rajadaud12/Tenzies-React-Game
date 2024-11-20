export default function Dice(props) {
  const getDotClass = (value) => {
    switch (value) {
      case 1:
        return "dot-1";
      case 2:
        return "dot-2";
      case 3:
        return "dot-3";
      case 4:
        return "dot-4";
      case 5:
        return "dot-5";
      case 6:
        return "dot-6";
      default:
        return "";
    }
  };

  const dots = {
    1: ["dot"],
    2: ["dot-1", "dot-2"],
    3: ["dot-1", "dot-2", "dot-3"],
    4: ["dot-1", "dot-2", "dot-3", "dot-4"],
    5: ["dot-1", "dot-2", "dot-3", "dot-4", "dot-5"],
    6: ["dot-1", "dot-2", "dot-3", "dot-4", "dot-5", "dot-6"],
  };

  return (
    <div
      onClick={props.handleClick}
      style={{ backgroundColor: props.isHeld ? "lightGreen" : "white" }}
      className={`die ${getDotClass(props.value)}`}
    >
      {dots[props.value].map((dotClass, index) => (
        <div key={index} className={`dot ${dotClass}`}></div>
      ))}
    </div>
  );
}
