import { useState, useEffect } from "react";
import { getScores } from "../utils/api";
import { formatDate } from "../utils/gameUtils";
import "./Leaderboard.css";

export default function Leaderboard({ refreshKey }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getScores();
      setScores(data);
    } catch (e) {
      setError("Could not load scores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, [refreshKey]);

  

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="leaderboard">
      <div className="lb-header">
        <h2 className="lb-title">HALL OF FAME</h2>
        
      </div>

      {loading && <div className="lb-status">LOADING...</div>}
      {error && <div className="lb-status lb-error">{error}</div>}
      {!loading && !error && scores.length === 0 && (
        <div className="lb-status lb-empty">No scores yet. Be the first!</div>
      )}

      {!loading && scores.length > 0 && (
        <div className="lb-list">
          <div className="lb-row lb-heading">
            <span>#</span>
            <span>NAME</span>
            <span>SCORE</span>
            <span>LVL</span>
            <span className="lb-date-col">DATE</span>
          </div>
          {scores.map((s, i) => (
            <div
              key={s.id}
              className={`lb-row ${i === 0 ? "lb-top" : ""}`}
            >
              <span className="lb-rank">{medals[i] || i + 1}</span>
              <span className="lb-name">{s.name}</span>
              <span className="lb-score">{s.score.toLocaleString()}</span>
              <span className="lb-level">{s.level}</span>
              <span className="lb-date lb-date-col">{formatDate(s.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
