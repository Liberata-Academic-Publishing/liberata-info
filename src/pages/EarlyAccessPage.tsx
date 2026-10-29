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

// Deliberately loose: something@something.something with no spaces. A stricter
// pattern rejects real addresses (hyphenated domains like uni-heidelberg.de,
// "+" in the name, deeper subdomains), which matters for an academic audience.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sign-up page for one product's early access, opened from the QR codes at
// the 2026 Charleston Conference. Submissions go to their own Supabase table,
// early_access_signups (see supabase/migrations), separate from the contact
// form and the beta sign-up.
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
    const cleanEmail = email.trim();
    if (!validateEmail(cleanEmail)) {
      return;
    }

    setLoading(true);
    setErrorVisible(false);
    supabase
      .from("early_access_signups")
      .insert({
        product: product.toLowerCase(),
        name: name.trim(),
        affiliation: affiliation.trim(),
        email: cleanEmail,
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
            onBlur={() => email.trim() && validateEmail(email.trim())}
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
