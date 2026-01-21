import { useState } from "react";
import axios from "axios";
import "./MatchForm.css";

export default function MatchForm() {
  const [battingTeam, setBattingTeam] = useState("Sunrisers Hyderabad");
  const [bowlingTeam, setBowlingTeam] = useState("Mumbai Indians");
  const [city, setCity] = useState("Hyderabad");

  const [target, setTarget] = useState("");
  const [score, setScore] = useState("");
  const [overs, setOvers] = useState("");
  const [wickets, setWickets] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    try {
      setLoading(true);

      const runsLeft = Number(target) - Number(score);
      const ballsLeft = 120 - Math.round(Number(overs) * 6);
      const wicketsLeft = 10 - Number(wickets);

      const curRunRate =
        Number(overs) > 0 ? Number(score) / Number(overs) : 0;

      const reqRunRate =
        ballsLeft > 0 ? (runsLeft * 6) / ballsLeft : 0;

      const payload = {
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        city,
        runs_left: runsLeft,
        balls_left: ballsLeft,
        wickets_left: wicketsLeft,
        total_runs_x: Number(target),
        cur_run_rate: Number(curRunRate.toFixed(2)),
        req_run_rate: Number(reqRunRate.toFixed(2))
      };

      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/predict`,
  payload,
  { timeout: 20000 }
);



setResult(res.data.win_probability.win_probability);

    } catch (err) {
  console.error("Axios error:", err);

  if (err.response) {
    alert(`Backend error: ${err.response.status}`);
  } else {
    alert("Backend is waking up, please try again in 5 seconds");
  }
}
finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-page">
      <div className="match-card">
        <h2>🏏 Match Details</h2>

        <div className="section">
          <h3>Teams</h3>

          <div className="row">
            <label>Batting Team</label>
            <select value={battingTeam} onChange={e => setBattingTeam(e.target.value)}>
              <option>Sunrisers Hyderabad</option>
              <option>Mumbai Indians</option>
              <option>Royal Challengers Bangalore</option>
              <option>Chennai Super Kings</option>
              <option>Kolkata Knight Riders</option>
              <option>Rajasthan Royals</option>
              <option>Delhi Capitals</option>
              <option>Punjab Kings</option>
            </select>
          </div>

          <div className="row">
            <label>Bowling Team</label>
            <select value={bowlingTeam} onChange={e => setBowlingTeam(e.target.value)}>
              <option>Mumbai Indians</option>
              <option>Sunrisers Hyderabad</option>
              <option>Royal Challengers Bangalore</option>
              <option>Chennai Super Kings</option>
              <option>Kolkata Knight Riders</option>
              <option>Rajasthan Royals</option>
              <option>Delhi Capitals</option>
              <option>Punjab Kings</option>
            </select>
          </div>

          <div className="row">
            <label>City</label>
            <select value={city} onChange={e => setCity(e.target.value)}>
              <option>Hyderabad</option>
              <option>Mumbai</option>
              <option>Chennai</option>
              <option>Bangalore</option>
              <option>Kolkata</option>
              <option>Delhi</option>
              <option>Jaipur</option>
              <option>Mohali</option>
            </select>
          </div>
        </div>

        <div className="section">
          <h3>Match Situation</h3>

          <div className="grid">
            <input type="number" placeholder="Target" value={target} onChange={e => setTarget(e.target.value)} />
            <input type="number" placeholder="Current Score" value={score} onChange={e => setScore(e.target.value)} />
            <input type="number" placeholder="Overs Completed" value={overs} onChange={e => setOvers(e.target.value)} />
            <input type="number" placeholder="Wickets Fallen" value={wickets} onChange={e => setWickets(e.target.value)} />
          </div>
        </div>

        <button className="predict-btn" onClick={handlePredict} disabled={loading}>
          {loading ? "Predicting..." : "Predict Win Probability"}
        </button>

        {result && (
          <div className="result">
            <p>{battingTeam} Win Probability</p>
            <h1>{result.batting_win}%</h1>

            <p>{bowlingTeam} Win Probability</p>
            <h1>{result.bowling_win}%</h1>
          </div>
        )}
      </div>
    </div>
  );
}
