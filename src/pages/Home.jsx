import { useNavigate } from "react-router-dom";
import { useState } from "react";
import stadium from "../assets/stadium.jpg";

import csk from "../assets/teams/csk.png";
import mi from "../assets/teams/mi.png";
import rcb from "../assets/teams/rcb.png";
import kkr from "../assets/teams/kkr.png";
import rr from "../assets/teams/rr.png";
import dc from "../assets/teams/dc.png";
import pbks from "../assets/teams/pbks.png";

import "../styles.css";

export default function Home() {
  const navigate = useNavigate();
  const [showPlayers, setShowPlayers] = useState(false);

  const teams = [csk, mi, rcb, kkr, rr, dc, pbks];

  return (
    <div className="home-root">
      <div
        className="stadium-bg"
        style={{ backgroundImage: `url(${stadium})` }}
      >
        {/* OVERLAYS */}
        <div className="dark-overlay" />
        <div className="center-glow" />

        {/* TITLE */}
        <h1 className="home-title">🏏 IPL Win Predictor</h1>

        {/* ROLLING TEAM LOGOS */}
        <div className="team-roll-container">
          <div className="team-roll">
            {[...teams, ...teams].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="IPL Team"
                className="team-roll-logo"
              />
            ))}
          </div>
        </div>

        {/* PLAYER SILHOUETTES */}
        {showPlayers && (
          <>
            <div className="player left" />
            <div className="player right" />
          </>
        )}

        {/* CTA */}
        <div className="cta-wrapper">
          <div className="spotlight left-light" />
          <div className="spotlight right-light" />

          <button
            className="predict-btn"
            onClick={() => {
              setShowPlayers(true);
              setTimeout(() => navigate("/match"), 900);
            }}
          >
            Predict Now
          </button>

          <p className="cta-sub">AI-powered IPL win probability</p>
        </div>
      </div>
    </div>
  );
}
