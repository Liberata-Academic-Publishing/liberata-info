import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import Header from "../components/Header";
import { supabase } from "../lib/supabase";
import "../App.css";
import "./EarlyAccessPage.css";

type EarlyAccessPageProps = {
  product: "Scriptura" | "Mensura";
  description: string;
};

const EMAIL_PATTERN = /^[\w.-]+@\w+(\.\w+)?\.\w{2,}$/;

// Sign-up page for one product's early access, opened from the QR codes at
// the 2026 Charleston Conference. Submissions go to the same Supabase table
// as the contact form; `message` records which product they signed up for.
function EarlyAccessPage({ product, description }: EarlyAccessPageProps) {
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  const [isEmailErrorVisible, setEmailErrorVisible] = useState(false);

  const validateEmail = (input: string) => {
    const isValid = EMAIL_PATTERN.test(input);
    setEmailErrorVisible(!isValid);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    setErrorVisible(false);
    supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email,
        affiliation: affiliation.trim(),
        message: `${product} early access sign-up`,
      })
      .then(({ error }) => {
        setLoading(false);
        if (error) {
          console.error("Early access sign-up failed:", error);
          setErrorVisible(true);
          return;
        }
        setSuccessVisible(true);
        setName("");
        setAffiliation("");
        setEmail("");
      });
  };

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="EarlyAccessHero" id="intro">
        <Header />
        <h1 className="EarlyAccessHero-title">{product} Early Access Sign-Up Form</h1>
        <div className="EarlyAccessHero-text">
          <p className="EarlyAccessHero-event">2026 Charleston Conference</p>
          <p className="EarlyAccessHero-subtitle">{description}</p>
        </div>
      </div>

      <div className="EarlyAccessBody">
        <form className="EarlyAccess-form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Affiliation"
            required
            fullWidth
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          />
          <TextField
            label="Email"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => email && validateEmail(email)}
            error={isEmailErrorVisible}
            helperText={
              isEmailErrorVisible ? "Enter an email in the format name@example.com." : undefined
            }
          />

          {isLoading && <CircularProgress />}
          {!isLoading && !isSuccessVisible && (
            <button type="submit" className="EarlyAccess-submit">
              Sign up
            </button>
          )}

          {isSuccessVisible && (
            <>
              <p className="EarlyAccess-message" role="status">
                Thank you. We will email you about {product} early access.
              </p>
              <Link
                to={`/products/${product.toLowerCase()}`}
                className="EarlyAccess-link"
              >
                Learn more about {product}
              </Link>
            </>
          )}
          {isErrorVisible && (
            <p className="EarlyAccess-message" role="alert">
              There was an error submitting your information. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default EarlyAccessPage;
