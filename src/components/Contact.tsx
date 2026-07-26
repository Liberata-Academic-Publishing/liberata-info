import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import "./Contact.css";

function Contact() {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [fNameInputValue, setFNameInputValue] = useState("");
  const [lNameInputValue, setLNameInputValue] = useState("");
  const [institutionInputValue, setInstitutionInputValue] = useState("");
  const [messageInputValue, setMessageInputValue] = useState("");
  const [isSubmitVisible, setSubmitVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);
  // const [isLNameErrorVisible, setLNameErrorVisible] = useState(true);
  // const [isFNameErrorVisible, setFNameErrorVisible] = useState(true);
  const [isEmailErrorVisible, setEmailErrorVisible] = useState(false);
  const googleSheetApiUrl =
    "https://script.google.com/macros/s/AKfycbxxxxcMbnh3e86tRLOqz57Fcw2LpLG14kVWVtuoqMClVNCLb8Ut0v1SpW4E3aetfzT9/exec";

  const handleContactFormSubmit = (e: any) => {
    e.preventDefault();

    // perform regex checks
    if (
      !validateFName(fNameInputValue) ||
      !validateLName(lNameInputValue) ||
      !validateEmail(emailInputValue)
    ) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Email", emailInputValue);
    formData.append("First name", fNameInputValue);
    formData.append("Last name", lNameInputValue);
    formData.append("Institution", institutionInputValue);
    formData.append("Message", messageInputValue);

    // Push the contact form data to a google sheet
    fetch(googleSheetApiUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSuccessVisible(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setErrorVisible(true);
        setLoading(false);
      });
    setEmailInputValue("");
    setFNameInputValue("");
    setLNameInputValue("");
    setInstitutionInputValue("");
    setMessageInputValue("");
  };

  /**
   * TODO: implement functions that validate first and last name fields.
   * A name cannot contain whitespaces or non-unicode characters
   * @param input First or last name being validated.
   * @returns A boolean value
   */

  const validateFName = (input: string) => {
    console.log("validating name ", input);
    return true;
  };
  const validateLName = (input: string) => {
    console.log("validating name ", input);
    return true;
  };

  /**
   * TODO: Implement the validate email function
   * An email must follow the structure helloworld@abc.xyz
   * @param input Email being validated
   * @returns A boolean value
   */
  const validateEmail = (input: string) => {
    console.log("validating email ", input);
    const validEmail = new RegExp("^[\\w\\.\\-]+@\\w+(\\.\\w+)?\\.\\w{2,}$");
    const isValid = validEmail.test(input);
    setEmailErrorVisible(!isValid);
    return isValid;
  };

  return (
    <div className="Contact-body">
      <div className="Contact-text">
        <div className="Contact-text-headline">
          Let's build a better system{" "}
          <span style={{ color: "var(--duke-blue)" }}>together</span>.
        </div>
        <div className="Contact-text-subline">
          Join our mailing list for future updates.
        </div>
      </div>
      <form className="Contact-form" onSubmit={handleContactFormSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "13px",
            gap: "13px",
          }}
        >
          <TextField
            id="outlined-fname"
            label="First name"
            required
            sx={{ width: "45%" }}
            value={fNameInputValue}
            onChange={(e) => setFNameInputValue(e.target.value)}
            onFocus={() => setSubmitVisible(true)}
            onBlur={() => validateFName(fNameInputValue)}
          />
          <TextField
            id="outlined-lname"
            label="Last name"
            required
            sx={{ width: "45%" }}
            value={lNameInputValue}
            onChange={(e) => setLNameInputValue(e.target.value)}
            onFocus={() => setSubmitVisible(true)}
            onBlur={() => validateLName(lNameInputValue)}
          />
        </div>

        {/* TODO: Add validate name error handling here */}
        {/* <div style={{marginBottom: '10px', fontSize: '14px', color: 'red', display: !isLNameErrorVisible || !isFNameErrorVisible ? 'block' : 'none'}}>Your name cannot contain whitespaces or non-ABC characters.</div> */}

        <div style={{ marginBottom: "13px" }}>
          <TextField
            id="outlined-email"
            label="Email"
            required
            sx={{ maxWidth: "92%" }}
            value={emailInputValue}
            onChange={(e) => setEmailInputValue(e.target.value)}
            onFocus={() => setSubmitVisible(true)}
            onBlur={() => validateEmail(emailInputValue)}
            error={isEmailErrorVisible}
          />
        </div>

        {isEmailErrorVisible && (
          <div style={{ marginBottom: "10px", fontSize: "14px", color: "red" }}>
            Your email must follow the format helloworld@abc.com.{" "}
          </div>
        )}

        <div style={{ marginBottom: "13px" }}>
          <TextField
            id="outlined-institution"
            label="Institution"
            sx={{ maxWidth: "92%" }}
            value={institutionInputValue}
            onChange={(e) => setInstitutionInputValue(e.target.value)}
            onFocus={() => setSubmitVisible(true)}
            onBlur={() => validateEmail(emailInputValue)}
          />
        </div>

        <TextField
          id="outlined-message"
          label="Message"
          sx={{ maxWidth: "92%", marginBottom: "30px" }}
          value={messageInputValue}
          onChange={(e) => setMessageInputValue(e.target.value)}
          onFocus={() => setSubmitVisible(true)}
          onBlur={() => validateEmail(emailInputValue)}
        />

        {isLoading && <CircularProgress />}
        {!isLoading && !isSuccessVisible && (
          <input
            type="submit"
            value="Submit"
            className={`outlined-submit ${isSubmitVisible && "is-visible"}`}
          />
        )}

        {isSuccessVisible && (
          <div>Thank you! We'll be in touch regarding future updates.</div>
        )}

        {isErrorVisible && (
          <div>
            There was an error submitting your information, please try again.
          </div>
        )}
      </form>
    </div>
  );
}

export default Contact;
