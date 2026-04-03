import { useState } from "react";
import { postScore } from "../utils/api";
import "./GameOverModal.css";

export default function GameOverModal({ score, level, onRestart, onScoreSaved }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rank, setRank] = useState(null);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      setSaving(true);
      setError(null);
      const result = await postScore({ name: name.trim(), score, level });
      setRank(result.rank);
      setSaved(true);
      onScoreSaved();
    } catch (e) {
      setError("Could not save score. Server might be offline.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-skull">💀</div>
        <h2 className="modal-title">GAME OVER</h2>

        <div className="modal-stats">
          <div className="modal-stat">
            <span className="modal-stat-label">SCORE</span>
            <span className="modal-stat-value">{score.toLocaleString()}</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">LEVEL</span>
            <span className="modal-stat-value">{level}</span>
          </div>
        </div>

        {!saved ? (
          <div className="modal-save">
            <p className="modal-save-label">ENTER YOUR NAME</p>
            <input
              className="modal-input"
              type="text"
              maxLength={15}
              placeholder="PLAYER ONE"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-save"
                onClick={handleSave}
                disabled={saving || !name.trim()}
              >
                {saving ? "SAVING..." : "SAVE SCORE"}
              </button>
              <button className="modal-btn modal-btn-skip" onClick={onRestart}>
                SKIP
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-saved">
            <p className="modal-rank">
              🏆 YOU RANKED <span>#{rank}</span> ON THE LEADERBOARD!
            </p>
            <button className="modal-btn modal-btn-save" onClick={onRestart}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
