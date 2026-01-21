import { useLocation } from "react-router-dom";
import WinBar from "../components/WinBar";

export default function Result() {
  const { state } = useLocation();

  if (!state) {
    return <h2 style={{ color: "white" }}>No data found</h2>;
  }

  return (
    <div className="center">
      <h2>Prediction Result</h2>
      <WinBar label={state.batting} value={state.win} />
      <WinBar label={state.bowling} value={state.loss} />
    </div>
  );
}
