import { useState } from "react";
import Header from "../components/Header";
import chevronDown from "../images/figma/faqs/chevron.svg";
import coverSystem from "../images/figma/faqs/cover_system.png";
import coverShares from "../images/figma/faqs/cover_shares.png";
import coverTrade from "../images/figma/faqs/cover_trade.png";
import coverCitations from "../images/figma/faqs/cover_citations.png";
import "../App.css";
import "./FaqsPage.css";

type Faq = {
  question: string;
  answer: string;
  // Answers that are also filmed: the image is a still from the video, used as
  // its poster until the video itself loads. `video` is the source URL.
  poster?: string;
  video?: string;
};

// Videos are large, so they're served from Cloudflare R2 rather than bundled.
// The three filmed answers are the clips that used to run on the overview
// page; each still is a frame from its own video, used as the poster. Note
// the R2 object names use "_" where the old S3 keys used "+".
const VIDEO_BASE = "https://pub-c93f131df06d44f88212bf9bdb396d2c.r2.dev/";
const FAQS: Faq[] = [
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
  {
    question: "Are contribution shares financial assets?",
    answer:
      "No. Contribution shares aren't tradable and don't generate profit or ownership. They measure intellectual participation. Watch to learn more.",
    poster: coverShares,
    video: `${VIDEO_BASE}Q1_Chloe_Final.mp4`,
  },
  {
    question: "Can I trade my shares on papers?",
    answer:
      "Only in specific cases — between authors and peer reviewers, or between authors and replicators, as first-hand trades from the original owners. Watch to learn more.",
    poster: coverTrade,
    video: `${VIDEO_BASE}Q2_Dr_Brinson_Final.mp4`,
  },
  {
    question: "What are relative citations?",
    answer:
      "Citations weighted by how many references the citing article has — so every article mints one total unit of citation, split evenly across its bibliography. Watch to learn more.",
    poster: coverCitations,
    video: `${VIDEO_BASE}Q3_Imani_Final.mp4`,
  },
];

// Until a video URL exists the still stands in for it, so the row still shows
// what the answer looks like rather than an empty player.
function AnswerMedia({ faq }: { faq: Faq }) {
  if (faq.video) {
    return <video className="Faqs-video" src={faq.video} poster={faq.poster} controls preload="none" />;
  }
  return <img className="Faqs-video" src={faq.poster} alt={`${faq.question} — video coming soon`} />;
}

function FaqRow({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  return (
    <div className={`Faqs-row${open ? " is-open" : ""}`}>
      <button type="button" className="Faqs-question" onClick={onToggle} aria-expanded={open}>
        <span>{faq.question}</span>
        <img className="Faqs-chevron" src={chevronDown} alt="" />
      </button>
      {open && (
        <div className="Faqs-answer">
          <p>{faq.answer}</p>
          {faq.poster && <AnswerMedia faq={faq} />}
        </div>
      )}
    </div>
  );
}

function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="FaqsHero" id="intro">
        <Header />
        <h1 className="FaqsHero-title">FAQs.</h1>
        <p className="FaqsHero-subtitle">
          An overview of the Liberata system, and answers to frequently asked questions.
        </p>
      </div>

      <div className="FaqsBody">
        <div className="Faqs-main">
          <section className="Faqs-section" id="the-liberata-system">
            <div className="section-heading">/The Liberata System</div>
            <p className="Faqs-intro">Watch a brief overview video explaining the Liberata system.</p>
            <video
              className="Faqs-system-video"
              src={`${VIDEO_BASE}Cover_Edited_Liberata_Overview.mp4`}
              poster={coverSystem}
              controls
              preload="none"
            />
          </section>

          <section className="Faqs-section" id="faq">
            <div className="section-heading">/Details</div>
            <h2 className="Faqs-title">Frequently Asked Questions</h2>
            <div className="Faqs-list">
              {FAQS.map((faq, i) => (
                <FaqRow
                  key={faq.question}
                  faq={faq}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Section rail, sticky alongside the content on desktop */}
        <nav className="Faqs-rail" aria-label="On this page">
          <a href="#the-liberata-system">The Liberata System</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </div>
  );
}

export default FaqsPage;
