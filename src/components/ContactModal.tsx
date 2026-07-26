import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { supabase } from "../lib/supabase";
import iconClose from "../images/figma/contact/icon_close.svg";
import "./ContactModal.css";

// TODO: confirm the purpose options with the team
const PURPOSES = ["General inquiry", "Beta access", "Partnership", "Press", "Other"];

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setStatus("idle");
    supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        affiliation: affiliation || null,
        purpose: purpose || null,
        message: message || null,
      })
      .then(({ error }) => {
        setLoading(false);
        setStatus(error ? "error" : "success");
      });
  };

  return (
    <div className="ContactModal-overlay" onClick={onClose} role="presentation">
      <div className="ContactModal" role="dialog" aria-modal="true" aria-label="Contact us" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ContactModal-close" onClick={onClose} aria-label="Close">
          <img src={iconClose} alt="" />
        </button>
        <div className="ContactModal-left">
          <h2 className="ContactModal-title">
            Let's build a better system <span>together.</span>
          </h2>
          <p className="ContactModal-subtitle">Join the mailing list or get in touch with a message.</p>
        </div>
        <form className="ContactModal-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Affiliation" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} />
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className={purpose ? "" : "ContactModal-select-placeholder"}
            aria-label="Purpose"
          >
            <option value="" disabled>Purpose</option>
            {PURPOSES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} maxLength={5000} />
          <div className="ContactModal-actions">
            <button type="submit" className="ContactModal-submit" disabled={isLoading}>
              {isLoading ? <CircularProgress size={18} style={{ color: "white" }} /> : "Submit"}
            </button>
            {status === "success" && <span className="ContactModal-status">Thanks — we'll be in touch!</span>}
            {status === "error" && <span className="ContactModal-status ContactModal-status-error">Something went wrong. Please try again.</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
