import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchForm.css";
import "./CricketAnimation.css";

export default function MatchForm() {
  // State
  const [battingTeam, setBattingTeam] = useState("Sunrisers Hyderabad");
  const [bowlingTeam, setBowlingTeam] = useState("Mumbai Indians");
  const [city, setCity] = useState("Hyderabad");

  const [target, setTarget] = useState("");
  const [score, setScore] = useState("");
  const [overs, setOvers] = useState("");
  const [wickets, setWickets] = useState("");
  const [striker, setStriker] = useState("");
  const [bowler, setBowler] = useState("");

  const [metadata, setMetadata] = useState({ batsmen: [], bowlers: [], teams: [], cities: [] });
  const [result, setResult] = useState(null);

  // Animation State: 'idle', 'calc', 'action', 'reveal'
  const [animPhase, setAnimPhase] = useState("idle");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/metadata`)
      .then(res => setMetadata(res.data))
      .catch(err => console.error(err));
  }, []);

  const isValid = () => target !== "" && score !== "" && overs !== "" && wickets !== "" && striker !== "" && bowler !== "";

  const handlePredict = async () => {
    if (!isValid()) return;
    if (Number(wickets) > 10) {
      alert("Error: Wickets cannot exceed 10 in IPL games!");
      return;
    }
    if (Number(overs) > 20) {
      alert("Error: Overs cannot exceed 20 in IPL games!");
      return;
    }
    if (Number(target) <= 1) {
      alert("Error: Target must be greater than 1!");
      return;
    }

    try {
      // 1. Fetch Data
      const runsLeft = Number(target) - Number(score);
      const ballsLeft = 120 - Math.round(Number(overs) * 6);
      const wicketsLeft = 10 - Number(wickets);
      const curRunRate = Number(overs) > 0 ? Number(score) / Number(overs) : 0;
      const reqRunRate = ballsLeft > 0 ? (runsLeft * 6) / ballsLeft : 0;

      const payload = {
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        city,
        runs_left: runsLeft,
        balls_left: ballsLeft,
        wickets_left: wicketsLeft,
        total_runs_x: Number(target),
        cur_run_rate: Number(curRunRate.toFixed(2)),
        req_run_rate: Number(reqRunRate.toFixed(2)),
        striker: striker,
        bowler: bowler
      };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, payload);
      setResult(res.data.win_probability);

      // 2. Start Animation Sequence
      setAnimPhase("calc"); // Show Table

      // Sequence Timing
      setTimeout(() => {
        setAnimPhase("action"); // Show Bat hitting Ball

        setTimeout(() => {
          setAnimPhase("reveal"); // Show Ball Breakdown & Result
        }, 1200);

      }, 2000);

    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  const resetAnimation = () => {
    setAnimPhase("idle");
    setResult(null);
  };

  return (
    <div className="hud-page">
      <div className="hud-overlay" />

      {/* --- FORM CONTAINER (Hidden during animation for cleaner look, or kept visible) --- */}
      {animPhase === "idle" && (
        <div className="hud-container">
          <div className="hud-header">
            <h2>MATCH INTELLIGENCE</h2>
            <div className="hud-line"></div>
          </div>

          <div className="hud-content">
            <div className="hud-section">
              <label>MATCHUP</label>
              <div className="hud-row">
                <select value={battingTeam} onChange={e => setBattingTeam(e.target.value)}>{metadata.teams.map(t => <option key={t}>{t}</option>)}</select>
                <span className="vs">VS</span>
                <select value={bowlingTeam} onChange={e => setBowlingTeam(e.target.value)}>{metadata.teams.map(t => <option key={t}>{t}</option>)}</select>
              </div>
            </div>
            <div className="hud-section">
              <div className="hud-row full">
                <select value={city} onChange={e => setCity(e.target.value)}>{metadata.cities.map(c => <option key={c}>{c}</option>)}</select>
              </div>
            </div>
            <div className="hud-section">
              <label>ON FIELD</label>
              <div className="hud-row">
                <select value={striker} onChange={e => setStriker(e.target.value)}>
                  <option value="">Select Striker</option>
                  {metadata.batsmen.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={bowler} onChange={e => setBowler(e.target.value)}>
                  <option value="">Select Bowler</option>
                  {metadata.bowlers.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="hud-section">
              <label>SCENARIO</label>
              <div className="hud-grid">
                <input type="number" placeholder="Target" value={target} onChange={e => setTarget(e.target.value)} />
                <input type="number" placeholder="Score" value={score} onChange={e => setScore(e.target.value)} />
                <input type="number" placeholder="Overs" value={overs} onChange={e => setOvers(e.target.value)} />
                <input type="number" placeholder="Wickets" value={wickets} onChange={e => setWickets(e.target.value)} />
              </div>
            </div>

            <button className="hud-btn" onClick={handlePredict} disabled={!isValid()}>
              RUN SIMULATION
            </button>
          </div>
        </div>
      )}

      {/* --- ANIMATION LAYERS --- */}

      {/* PHASE 1: CALC TABLE */}
      {animPhase === "calc" && (
        <div className="animation-overlay">
          <div className="calc-table">
            <div className="calc-row"><span>Injecting Data</span><span className="loading-dots"></span></div>
            <div className="calc-row"><span>Analyzing Pitch</span><span className="loading-dots"></span></div>
            <div className="calc-row"><span>Predicting shot</span><span className="loading-dots"></span></div>
          </div>
        </div>
      )}

      {/* PHASE 2: ACTION */}
      {animPhase === "action" && (
        <div className="animation-overlay">
          <div className="batting-stage">
            <div className="cartoon-ball"></div>
            <div className="cartoon-bat"></div>
            <div className="impact-pow">WHAM!</div>
          </div>
        </div>
      )}

      {/* PHASE 3: REVEAL */}
      {animPhase === "reveal" && result && (
        <div className="reveal-stage">
          <div className="giant-ball">
            <div className="giant-ball-content">
              <h2>PREDICTION COMPLETE!</h2>

              <div className="toon-bar-container">
                <div className="toon-bar">
                  <div className="toon-fill" style={{ width: `${result.batting_win}%`, background: '#4FC3F7' }}>
                    {battingTeam}: {result.batting_win}%
                  </div>
                </div>
                <div className="toon-bar">
                  <div className="toon-fill" style={{ width: `${result.bowling_win}%`, background: '#FF8A65' }}>
                    {bowlingTeam}: {result.bowling_win}%
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div className="cute-human">🙋‍♂️</div>
                <div className="cute-human" style={{ animationDelay: '0.1s' }}>🙆‍♀️</div>
                <div style={{ background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '10px' }}>
                  <strong>MVP:</strong> {result.details?.striker_predicted_runs > 30 ? striker : bowler} is on fire!
                </div>
                <div className="cute-human" style={{ animationDelay: '0.2s' }}>🙌</div>
              </div>

              <button onClick={resetAnimation} style={{ marginTop: '30px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
