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

function BetaSignupPage() {
  const [fNameInputValue, setFNameInputValue] = useState("");
  const [lNameInputValue, setLNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [institutionInputValue, setInstitutionInputValue] = useState("");
  const [orcidInputValue, setOrcidInputValue] = useState("");
  const [disciplineInputValue, setDisciplineInputValue] = useState("");
  const [timeframeInputValue, setTimeframeInputValue] = useState("");
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

  const handleBetaSignupFormSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    setErrorVisible(false);
    supabase
      .from("beta_signups")
      .insert({
        first_name: fNameInputValue,
        last_name: lNameInputValue,
        institution: institutionInputValue,
        institutional_email: emailInputValue,
        discipline: disciplineInputValue,
        // null, not "": empty strings would collide on the unique index
        orcid: orcidInputValue.trim() || null,
        publish_timeframe_months: timeframeInputValue ? parseInt(timeframeInputValue, 10) : null,
        oa_challenges: openAccessChallengesInputValue || null,
      })
      .then(({ error }) => {
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
        setEmailInputValue("");
        setFNameInputValue("");
        setLNameInputValue("");
        setInstitutionInputValue("");
        setOrcidInputValue("");
        setDisciplineInputValue("");
        setTimeframeInputValue("");
        setOpenAccessChallengesInputValue("");
      });
  }

  return (
    <>
      <Header/>
      <div className="BetaSignup-body">
        <div className="BetaSignup-message">
          <h3 style={{fontSize: '48px'}}>
            Join the future of open access academic publishing.
          </h3>
          <div style={{fontSize: '16px', lineHeight: '1.6'}}>
            Liberata is piloting a shares-based model for open access publishing to make research more transparent.
          </div>
        </div>
        
        <form className="BetaSignup-form" onSubmit={handleBetaSignupFormSubmit}>
          <div className="BetaSignup-basic">
            <h3>Basic information</h3>
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
              label="Academic discipline"
              required
              className="BetaSignup-input"
              value={disciplineInputValue}
              onChange={(e) => setDisciplineInputValue(e.target.value)}
              // onBlur={() => validateFName(fNameInputValue)}
            />
            <TextField
              label="ORCID (optional)"
              className="BetaSignup-input"
              value={orcidInputValue}
              onChange={(e) => setOrcidInputValue(e.target.value)}
              // onBlur={() => validateLName(lNameInputValue)}
            />
          </div>
          
          <h3>More about you</h3>
          <div style={{marginBottom: '8px'}}> When do you anticipate you would next publish research?</div>
          <input
            type="number"
            value={timeframeInputValue}
            onChange={(e) => setTimeframeInputValue(e.target.value)}
            placeholder="Timeframe in months"
            style={{marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
          />
          {/* <div>Primary Research Area</div> */}
          <div style={{marginBottom: '8px'}}>What challenges have you faced with open-access publishing?</div>
          {/* wrapping multiline field in a div in order to trigger a line break for loading spinner */}
          <div> 
            <TextField
              multiline
              rows={4}
              style={{width: "90%", marginBottom: '24px'}}
              inputProps={{ maxLength: 500 }}
              value={openAccessChallengesInputValue}
              onChange={(e) => setOpenAccessChallengesInputValue(e.target.value)}
            />
          </div>

          {isLoading && <CircularProgress/>}
          {!isLoading && !isSuccessVisible && !isDuplicateVisible && <input
            type="submit"
            value="Request Beta Access"
            className="outlined-submit is-visible"
            style={{width: 'fit-content', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold'}}
          />}

          {isSuccessVisible && (
            <div>Thank you! We'll be in touch regarding future updates.</div>
          )}

          {isDuplicateVisible && (
            <div>Looks like this ORCID has already signed up — you're on the list, and we'll be in touch!</div>
          )}

          {isErrorVisible && (
            <div>
              There was an error submitting your information, please try again.
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default BetaSignupPage