import React, { useEffect, useState } from "react";
import "./App.css";

/**
 * Feedback App with Matrix background.
 * - Stores feedback in localStorage
 * - Tries to POST to /api/feedback (optional backend)
 */

function App() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState(() => {
    try {
      const v = localStorage.getItem("feedbacks_v1");
      return v ? JSON.parse(v) : [];
    } catch {
      return [];
    }
  });
  const [sending, setSending] = useState(false);

  // MATRIX RAIN EFFECT
  useEffect(() => {
    const canvas = document.getElementById("matrix");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);

    const characters =
      "01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*()-_=+[]{};:<>?/|\\";
    let running = true;

    function draw() {
      if (!running) return;
      // translucent background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 1;
        }
      }
    }

    const interval = setInterval(draw, 45);

    return () => {
      running = false;
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // persist feedbacks to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem("feedbacks_v1", JSON.stringify(feedbacks));
    } catch (e) {
      // ignore
    }
  }, [feedbacks]);

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      // allow but inform? We'll still allow
    }
    const newFeedback = {
      id: Date.now(),
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    setFeedbacks((prev) => [newFeedback, ...prev]);
    setComment("");
    setRating(5);

    // attempt to send to backend (optional)
    setSending(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      // if backend returns something, you could update state with server id
    } catch (err) {
      // backend not available — it's fine, we keep local copy
      // console.warn("Could not send to backend", err);
    } finally {
      setSending(false);
    }
  };

  const removeFeedback = (id) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <>
      {/* Matrix canvas in background */}
      <div className="matrix-container" aria-hidden>
        <canvas id="matrix" />
      </div>

      <div className="app-container">
        <h1>Feedback Collector</h1>

        <div className="section-card" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2>Give Your Feedback</h2>
          <form onSubmit={submitFeedback}>
            <label style={{ display: "block", textAlign: "left" }}>
              Rating (1–5):
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ marginTop: 8 }}
              >
                <option value={1}>1 ⭐</option>
                <option value={2}>2 ⭐⭐</option>
                <option value={3}>3 ⭐⭐⭐</option>
                <option value={4}>4 ⭐⭐⭐⭐</option>
                <option value={5}>5 ⭐⭐⭐⭐⭐</option>
              </select>
            </label>

            <label style={{ display: "block", textAlign: "left", marginTop: 14 }}>
              Comments:
              <textarea
                rows="6"
                value={comment}
                placeholder="Enter your thoughts..."
                onChange={(e) => setComment(e.target.value)}
              />
            </label>

            <div style={{ textAlign: "left" }}>
              <button type="submit" disabled={sending}>
                {sending ? "Sending…" : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>

        <div
          className="section-card"
          style={{ maxWidth: 900, margin: "0 auto", marginTop: 24 }}
        >
          <h2>Submitted Feedback</h2>
          {feedbacks.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>No feedback yet.</p>
          ) : (
            feedbacks.map((fb) => (
              <div key={fb.id} className="feedback-card">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <strong style={{ color: "#00ffd8" }}>{fb.rating} / 5</strong>
                    <div style={{ color: "#c8ffda", marginTop: 6 }}>{fb.comment || <i>(no comment)</i>}</div>
                    <div style={{ color: "#7fdfaa", marginTop: 8, fontSize: 12 }}>
                      {new Date(fb.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <button
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#00ff88",
                        padding: "6px 10px",
                        borderRadius: 6,
                      }}
                      onClick={() => removeFeedback(fb.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
