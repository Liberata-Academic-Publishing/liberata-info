import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { supabase } from "../lib/supabase";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./BetaSignupPage.css";

const INTEREST_OPTIONS = [
  "Scriptura",
  "Mensura",
  "Other",
];

// Max lengths keep the fallback payload (see below) under the 1000-character
// limit on oa_challenges: 40 + 200 + 120 + 500 plus labels is about 915.
const INTEREST_OTHER_MAX = 200;
const HEARD_ABOUT_MAX = 120;
const CHALLENGES_MAX = 500;

function BetaSignupPage() {
  const [fNameInputValue, setFNameInputValue] = useState("");
  const [lNameInputValue, setLNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [institutionInputValue, setInstitutionInputValue] = useState("");
  const [orcidInputValue, setOrcidInputValue] = useState("");
  const [disciplineInputValue, setDisciplineInputValue] = useState("");
  const [interestInputValue, setInterestInputValue] = useState("");
  const [interestOtherInputValue, setInterestOtherInputValue] = useState("");
  const [heardAboutInputValue, setHeardAboutInputValue] = useState("");
  const [openAccessChallengesInputValue, setOpenAccessChallengesInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isDuplicateVisible, setDuplicateVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

  // Section observer
  useEffect(() => {
    const sectionItems = document.getElementsByClassName("BetaSignup-body");
    const observerCallback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0px)";
          observer.unobserve(entry.target);
        }
        });
    };
    const observer = new IntersectionObserver(observerCallback);
    Array.from(sectionItems).forEach((e) => {
      observer.observe(e);
    });
  }, []);

  const resetForm = () => {
    setEmailInputValue("");
    setFNameInputValue("");
    setLNameInputValue("");
    setInstitutionInputValue("");
    setOrcidInputValue("");
    setDisciplineInputValue("");
    setInterestInputValue("");
    setInterestOtherInputValue("");
    setHeardAboutInputValue("");
    setOpenAccessChallengesInputValue("");
  };

  const handleBetaSignupFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!interestInputValue) return;

    setLoading(true);
    setErrorVisible(false);

    const interestOther = interestInputValue === "Other" ? interestOtherInputValue.trim() : "";
    const heardAbout = heardAboutInputValue.trim();
    const challenges = openAccessChallengesInputValue.trim();

    const baseRow = {
      first_name: fNameInputValue,
      last_name: lNameInputValue,
      institution: institutionInputValue,
      institutional_email: emailInputValue,
      // the column is NOT NULL, so an empty answer is sent as ""
      discipline: disciplineInputValue.trim(),
      // null, not "": empty strings would collide on the unique index
      orcid: orcidInputValue.trim() || null,
    };

    // Preferred: dedicated columns, so signups can be filtered by interest.
    let { error } = await supabase.from("beta_signups").insert({
      ...baseRow,
      interest: interestInputValue,
      interest_other: interestOther || null,
      heard_about: heardAbout || null,
      oa_challenges: challenges || null,
    });

    // Fallback: if the new columns have not been added to the table yet,
    // save the same answers as labeled lines in oa_challenges so the form
    // still works. Remove once the columns exist everywhere.
    if (error && (error.code === "PGRST204" || error.code === "42703")) {
      const lines = [`Interest: ${interestInputValue}`];
      if (interestOther) lines.push(`Other: ${interestOther}`);
      if (heardAbout) lines.push(`Heard about us: ${heardAbout}`);
      if (challenges) lines.push(`Pain point: ${challenges}`);
      ({ error } = await supabase.from("beta_signups").insert({
        ...baseRow,
        oa_challenges: lines.join("\n"),
      }));
    }

    setLoading(false);
    if (error) {
      // 23505 = unique violation on ORCID: they already signed up
      if (error.code === "23505") {
        setDuplicateVisible(true);
      } else {
        setErrorVisible(true);
        return;
      }
    } else {
      setSuccessVisible(true);
    }
    resetForm();
  };

  return (
    <>
      <Header/>
      <div className="BetaSignup-body">
        <div className="BetaSignup-message">
          <h3 className="BetaSignup-title">
            Sign up for early access
          </h3>
          <div className="BetaSignup-text">
            Liberata is building an open access academic ecosystem. Tell us which platform you are interested in, and we will be in touch about early access.
          </div>
          <div className="BetaSignup-text" style={{marginTop: '16px'}}>
            <strong>Scriptura:</strong> Diamond open access academic publishing platform with marketplace-powered quality controls
          </div>
          <div className="BetaSignup-text" style={{marginTop: '8px'}}>
            <strong>Mensura:</strong> Precise and insightful scientometrics on a modern platform experience
          </div>
        </div>
        
        <form className="BetaSignup-form" onSubmit={handleBetaSignupFormSubmit}>
          <div className="BetaSignup-basic">
            <h3>About you</h3>
            <TextField
              label="First name"
              required
              className="BetaSignup-input"
             
              value={fNameInputValue}
              onChange={(e) => setFNameInputValue(e.target.value)}
              // onBlur={() => validateFName(fNameInputValue)}
            />
            <TextField
              label="Last name"
              required
              className="BetaSignup-input"
             
              value={lNameInputValue}
              onChange={(e) => setLNameInputValue(e.target.value)}
              // onBlur={() => validateLName(lNameInputValue)}
            />

            <TextField
              label="Institution"
              required
              className="BetaSignup-input"
              value={institutionInputValue}
              onChange={(e) => setInstitutionInputValue(e.target.value)}
              // onBlur={() => validateEmail(emailInputValue)}
              // error={isEmailErrorVisible}
            />

            <TextField
              label="Institutional Email"
              required
              className="BetaSignup-input"
              value={emailInputValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
              // onBlur={() => validateEmail(emailInputValue)}
              // error={isEmailErrorVisible}
            />

            <TextField
              label="Academic discipline or role"
              className="BetaSignup-input"
              value={disciplineInputValue}
              onChange={(e) => setDisciplineInputValue(e.target.value)}
              // onBlur={() => validateFName(fNameInputValue)}
            />
            <TextField
              label="ORCID"
              className="BetaSignup-input"
              value={orcidInputValue}
              onChange={(e) => setOrcidInputValue(e.target.value)}
              // onBlur={() => validateLName(lNameInputValue)}
            />
          </div>
          
          <h3>Your interest</h3>
          <div className="BetaSignup-basic" style={{marginBottom: '24px'}}>
            <TextField
              select
              label="What are you interested in?"
              required
              className="BetaSignup-input"
              value={interestInputValue}
              onChange={(e) => setInterestInputValue(e.target.value)}
            >
              {INTEREST_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            {interestInputValue === "Other" && (
              <TextField
                label="Please describe your interest"
                multiline
                rows={3}
                className="BetaSignup-input"
                inputProps={{ maxLength: INTEREST_OTHER_MAX }}
                value={interestOtherInputValue}
                onChange={(e) => setInterestOtherInputValue(e.target.value)}
              />
            )}
            <TextField
              label="How did you hear about us?"
              className="BetaSignup-input"
              inputProps={{ maxLength: HEARD_ABOUT_MAX }}
              value={heardAboutInputValue}
              onChange={(e) => setHeardAboutInputValue(e.target.value)}
            />
          </div>
          <TextField
            label="What has been your biggest pain point with academic publishing?"
            multiline
            rows={4}
            className="BetaSignup-input"
            style={{marginBottom: '24px'}}
            // before focus, let the label wrap on narrow screens instead of being cut off
            InputLabelProps={{ sx: { "&:not(.MuiInputLabel-shrink)": { whiteSpace: "normal", width: "calc(100% - 32px)" } } }}
            inputProps={{ maxLength: CHALLENGES_MAX }}
            value={openAccessChallengesInputValue}
            onChange={(e) => setOpenAccessChallengesInputValue(e.target.value)}
          />

          {isLoading && <CircularProgress/>}
          {!isLoading && !isSuccessVisible && !isDuplicateVisible && <input
            type="submit"
            value="Request early access"
            className="outlined-submit is-visible"
            style={{width: 'fit-content', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold'}}
          />}

          {isSuccessVisible && (
            <div>Thank you. We have received your request and will be in touch.</div>
          )}

          {isDuplicateVisible && (
            <div>This ORCID has already signed up. You are on the list, and we will be in touch.</div>
          )}

          {isErrorVisible && (
            <div>
              There was an error submitting your information. Please try again.
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default BetaSignupPage