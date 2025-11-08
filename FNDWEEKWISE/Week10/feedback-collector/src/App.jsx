import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

export default function App() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Feedback Collector</h1>

      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}
