import "./MobileControls.css";

export default function MobileControls({ onDirection }) {
  const handleTouch = (dir) => (e) => {
    e.preventDefault();
    onDirection(dir);
  };

  return (
    <div className="mobile-controls">
      <div className="ctrl-row">
        <button className="ctrl-btn" onTouchStart={handleTouch("UP")} onMouseDown={handleTouch("UP")}>
          ▲
        </button>
      </div>
      <div className="ctrl-row ctrl-middle">
        <button className="ctrl-btn" onTouchStart={handleTouch("LEFT")} onMouseDown={handleTouch("LEFT")}>
          ◀
        </button>
        <div className="ctrl-center" />
        <button className="ctrl-btn" onTouchStart={handleTouch("RIGHT")} onMouseDown={handleTouch("RIGHT")}>
          ▶
        </button>
      </div>
      <div className="ctrl-row">
        <button className="ctrl-btn" onTouchStart={handleTouch("DOWN")} onMouseDown={handleTouch("DOWN")}>
          ▼
        </button>
      </div>
    </div>
  );
}
