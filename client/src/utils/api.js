const BASE = "/api";

export const getScores = async () => {
  const res = await fetch(`${BASE}/scores`);
  if (!res.ok) throw new Error("Failed to fetch scores");
  return res.json();
};

export const postScore = async ({ name, score, level }) => {
  const res = await fetch(`${BASE}/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, level }),
  });
  if (!res.ok) throw new Error("Failed to save score");
  return res.json();
};

export const resetScores = async () => {
  const res = await fetch(`${BASE}/scores`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to reset scores");
  return res.json();
};
