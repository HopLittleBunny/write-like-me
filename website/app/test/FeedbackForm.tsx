"use client";

import { FormEvent, useState } from "react";
import { feedbackEndpoint } from "../lib/paths";

type FormStatus = "idle" | "sending" | "success" | "error";

export function FeedbackForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [testsCompleted, setTestsCompleted] = useState("");

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    payload.freshChatWorked ||= "not-tested";
    payload.confidenceClear ||= "not-seen";
    payload.whatWorked ||= "";

    try {
      const response = await fetch(feedbackEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "We could not save your feedback.");
      }
      event.currentTarget.reset();
      setTestsCompleted("");
      setStatus("success");
      setMessage("Thank you. Your anonymous feedback has been saved.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We could not save your feedback. Please try again.",
      );
    }
  }

  return (
    <form className="feedback-form" onSubmit={submitFeedback}>
      <div className="form-grid">
        <label>
          Platform tested
          <select name="platform" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option value="claude">Claude Skill</option>
            <option value="chatgpt">ChatGPT Skill</option>
            <option value="codex">Codex / OpenAI plugin</option>
            <option value="other">Another compatible surface</option>
          </select>
        </label>
        <label>
          Tests completed
          <select
            name="testsCompleted"
            required
            value={testsCompleted}
            onChange={(event) => setTestsCompleted(event.target.value)}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="clean">Draft cleaning only</option>
            <option value="pattern">Pattern creation only</option>
            <option value="clean-pattern">Cleaning + pattern</option>
            <option value="all-three">All three, including fresh chat</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend>How close did the result feel to you?</legend>
        <div className="rating-row">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label className="rating-choice" key={rating}>
              <input type="radio" name="closenessRating" value={rating} required />
              <span>{rating}</span>
            </label>
          ))}
          <div className="rating-labels">
            <small>Not close</small>
            <small>Very close</small>
          </div>
        </div>
      </fieldset>

      <div className="form-grid">
        <label>
          Did it preserve your point and facts?
          <select name="meaningPreserved" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option value="yes">Yes</option>
            <option value="mostly">Mostly</option>
            <option value="no">No</option>
            <option value="not-sure">Not sure</option>
          </select>
        </label>
        <label>
          Did it invent personal details?
          <select name="inventedDetails" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
            <option value="not-sure">Not sure</option>
          </select>
        </label>
      </div>

      <label>
        What worked, felt unlike you, or broke?
        <textarea
          name="whatFeltOff"
          rows={5}
          maxLength={3000}
          placeholder="One specific moment is enough. Please do not paste confidential or identifying information."
          required
        />
      </label>
      {testsCompleted === "all-three" ? (
        <div className="advanced-feedback">
          <p>
            You completed the full portability test. Two extra questions will
            help us understand whether the writing pattern carried.
          </p>
          <div className="form-grid">
            <label>
              Did fresh-chat reuse work?
              <select name="freshChatWorked" required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option value="yes">Yes</option>
                <option value="with-help">Only with extra help</option>
                <option value="no">No</option>
              </select>
            </label>
            <label>
              Were the confidence labels clear?
              <select name="confidenceClear" required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option value="yes">Yes</option>
                <option value="mostly">Mostly</option>
                <option value="no">No</option>
                <option value="not-seen">I did not see them</option>
              </select>
            </label>
          </div>
          <label>
            What carried successfully into the fresh conversation?
            <textarea
              name="whatWorked"
              rows={4}
              maxLength={2000}
              placeholder="Optional, but especially useful after the full test."
            />
          </label>
        </div>
      ) : null}
      <label className="checkbox-label">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          I understand this anonymous feedback will be stored for improving
          Write Like Me. I have removed confidential and identifying information.
        </span>
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-submit-row">
        <button
          className="button button-coral"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Saving…" : "Send anonymous feedback"}
        </button>
        <p
          className={`form-message ${status === "error" ? "form-error" : ""}`}
          role="status"
        >
          {message}
        </p>
      </div>
    </form>
  );
}
