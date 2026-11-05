import { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { supabase } from "../lib/supabase";
import iconClose from "../images/figma/contact/icon_close.svg";
import "./ContactModal.css";

const PURPOSES = [
  "Press inquiries",
  "Partnership",
  "Funding",
  "Other",
];

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // The component stays mounted while closed, so without this a sent message
  // would still be sitting behind a disabled "Sent" button the next time the
  // modal opens, with no way to send another until a reload. Cleared on the
  // way out, and only after a successful send, so an unsent draft survives
  // an accidental close.
  const close = useCallback(() => {
    if (status === "success") {
      setName("");
      setEmail("");
      setAffiliation("");
      setPurpose("");
      setMessage("");
      setStatus("idle");
    }
    onClose();
  }, [status, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || status === "success") return;
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
    <div className="ContactModal-overlay" onClick={close} role="presentation">
      <div className="ContactModal" role="dialog" aria-modal="true" aria-label="Contact us" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="ContactModal-close" onClick={close} aria-label="Close">
          <img src={iconClose} alt="" />
        </button>
        <div className="ContactModal-left">
          <h2 className="ContactModal-title">
            Let us build a better academic ecosystem <span>together</span>
          </h2>
          <p className="ContactModal-subtitle">Send us a message, and we will be in touch.</p>
        </div>
        <form className="ContactModal-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
            <button type="submit" className="ContactModal-submit" disabled={isLoading || status === "success"}>
              {isLoading ? <CircularProgress size={18} style={{ color: "white" }} /> : status === "success" ? "Sent" : "Submit"}
            </button>
            {status === "success" && <span className="ContactModal-status">Thank you. We have received your message and will be in touch.</span>}
            {status === "error" && <span className="ContactModal-status ContactModal-status-error">There was an error sending your message. Please try again.</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
