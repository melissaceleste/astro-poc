import { useState, type FormEvent } from "react";
import styles from "./FeedbackForm.module.css";

const MAX_LENGTH = 500;

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.form} role="status">
        <p>Vielen Dank für Ihr Feedback!</p>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setMessage("");
            setSubmitted(false);
          }}
        >
          Weiteres Feedback geben
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="feedback-message">Ihre Nachricht</label>
      <textarea
        id="feedback-message"
        value={message}
        maxLength={MAX_LENGTH}
        rows={5}
        onChange={(event) => setMessage(event.target.value)}
      />
      <p className={styles.counter}>
        {message.length} / {MAX_LENGTH} Zeichen
      </p>
      <button
        type="submit"
        className={styles.button}
        disabled={message.trim() === ""}
      >
        Absenden
      </button>
    </form>
  );
}
