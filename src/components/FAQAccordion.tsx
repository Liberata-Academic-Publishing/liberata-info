import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./FAQAccordion.css";

// TODO: answers drafted from existing site copy — pending review by the team
const FAQ_ITEMS = [
  {
    question: "What is Liberata?",
    answer:
      "Liberata is an open access academic publishing platform that uses game theory to align incentives between academic stakeholders, and graph theory to measure the impact, behavior, and health of academic entities. It replaces authorship positions with contribution shares so that all academic contributors are rewarded fairly.",
  },
  {
    question: "How does peer review work?",
    answer:
      "Peer review happens through Liberata's academic marketplaces. Authors trade shares in their work — credit on their paper — to other academics in exchange for peer review and replication services. Because reviewers own shares in the work they review, they are incentivized to make it genuinely better, not just to get the job done.",
  },
  {
    question: "Who can join?",
    answer:
      "Any academic researcher can join. The beta is open to researchers across all disciplines — sign up with your institutional email and ORCID through the beta signup form.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes. Liberata monetizes its academic metrics suite so that the academic literature remains free to read and publish for everyone — no publishing fees and no subscription fees.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-accordion">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = index === openIndex;
        return (
          <div className="faq-row" key={item.question}>
            <button
              type="button"
              className="faq-question-row"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="faq-question">{item.question}</span>
              <ExpandMoreIcon className={`faq-chevron ${isOpen ? "open" : ""}`} />
            </button>
            {isOpen && <p className="faq-answer">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default FAQAccordion;
