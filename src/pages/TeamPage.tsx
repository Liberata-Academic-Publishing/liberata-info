import { useEffect, useState } from "react";
import Header from "../components/Header";
import iconEmail from "../images/figma/team/icon_email.svg";
import iconLinkedin from "../images/figma/team/icon_linkedin.svg";
import iconExpandClear from "../images/figma/team/icon_expand_clear.svg";
import teamUiux from "../images/figma/team/team_uiux.png";
import teamSoftware from "../images/figma/team/team_software.png";
import teamAlgorithms from "../images/figma/team/team_algorithms.png";
import teamAiml from "../images/figma/team/team_aiml.png";
import teamProduct from "../images/figma/team/team_product.png";
import imgAffiliations from "../images/figma/team/affiliations.png";
import "../App.css";
import "./TeamPage.css";

type Member = { name: string; role: string };

const LEADERSHIP: Member[] = [
  { name: "Han Zhang", role: "Executive Director" },
  { name: "Patrick Prochazka", role: "Operations Director" },
  { name: "Anshuman Sabath", role: "Research Director" },
  { name: "Haider Khan", role: "Technical Director" },
  { name: "Anish Verma", role: "Product Director" },
  { name: "Rishabh Malviya", role: "AI/ML Director" },
];

const ADVISORS: Member[] = [
  { name: "Prof. L. Catherine Brinson", role: "Academic Processes Advisor" },
  { name: "Hon. Dr. Tommy Sowers", role: "Technology Ethics Advisor" },
  { name: "Michael Waitzkins, Esq.", role: "Law & Policy Advisor" },
  { name: "Prof. Shana McAlexander", role: "Curricula & Practica Advisor" },
  { name: "Haley Walton", role: "Open Scholarship Advisor" },
  { name: "Prof. Udayan Vaidya", role: "Mechanism Design Advisor" },
];

const AMBASSADORS: Member[] = [
  { name: "XXX", role: "[Title]" },
  { name: "XXX", role: "[Title]" },
  { name: "XXX", role: "[Title]" },
];

const TEAMS = [
  { name: "UI/UX", image: teamUiux, points: ["Interface design", "Experience design", "Frontend implementation", "Digital graphics"] },
  { name: "Software", image: teamSoftware, points: ["Data engineering", "Backend implementation", "Infrastructure development"] },
  { name: "Algorithms", image: teamAlgorithms, points: ["Algorithm research", "API development", "Agent simulations"] },
  { name: "AI/ML", image: teamAiml, points: ["Recommendation engines", "AI integrations", "Literature conversion"] },
  { name: "Product", image: teamProduct, points: ["Market research", "Product roadmap", "Strategic partnerships", "Marketing content"] },
];

const SECTIONS = [
  { id: "team-leadership", label: "Leadership" },
  { id: "team-advisors", label: "Advisors" },
  { id: "team-teams", label: "Teams" },
  { id: "team-affiliations", label: "Affiliations" },
  { id: "team-ambassadors", label: "Ambassadors" },
];

// TODO: photos, emails, and LinkedIn URLs pending — placeholders until the data exists
function MemberCard({ member, contact = true }: { member: Member; contact?: boolean }) {
  return (
    <div className="Team-card">
      <div className="Team-photo">
        <span className="Team-photo-expand">
          <img src={iconExpandClear} alt="" />
        </span>
      </div>
      <div className="Team-card-text">
        <p className="Team-card-name">{member.name}</p>
        <p className="Team-card-role">{member.role}</p>
      </div>
      {contact && (
        <div className="Team-card-contact">
          <img src={iconEmail} alt="Email" />
          <img src={iconLinkedin} alt="LinkedIn" />
        </div>
      )}
    </div>
  );
}

function TeamPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      el && observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      {/* id="intro" drives the Header's transparent-over-hero scroll behavior */}
      <div className="TeamHero" id="intro">
        <Header />
        <p className="TeamHero-eyebrow">The Liberata Team</p>
        <h1 className="TeamHero-title">Meet our team.</h1>
        <p className="TeamHero-subtitle">
          An interdisciplinary team of innovators with experience at institutions such as Duke, Google, Autodesk and
          Neuralink.
        </p>
      </div>

      <div className="TeamBody">
        <div className="TeamMain">
          <div className="TeamSection" id="team-leadership">
            <h2 className="TeamSection-title">Leadership</h2>
            {/* TODO: placeholder tagline from the wireframe — needs real copy */}
            <p className="TeamSection-tagline">Tagline introducing the leadership team, which also includes advisors.</p>
            <div className="Team-grid">
              {LEADERSHIP.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <div className="TeamSection" id="team-advisors">
            <h2 className="TeamSection-title">Advisors</h2>
            <p className="TeamSection-tagline">Tagline introducing the advisors team</p>
            <div className="Team-grid">
              {ADVISORS.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <div className="TeamSection" id="team-teams">
            <h2 className="TeamSection-title Team-blue">Teams</h2>
            <p className="TeamSection-tagline Team-blue">Tagline introducing the software team</p>
            <div className="Team-columns">
              {TEAMS.map((team) => (
                <div className="Team-column" key={team.name}>
                  <div className="Team-column-head">
                    <div className="Team-column-image">
                      <img src={team.image} alt="" />
                    </div>
                    <p className="Team-column-name">{team.name}</p>
                  </div>
                  <div className="Team-column-points">
                    {team.points.map((point) => (
                      <p key={point}>• {point}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="TeamSection" id="team-affiliations">
            <h2 className="TeamSection-title">Affiliations</h2>
            <p className="TeamSection-tagline">Tagline introducing the product team</p>
            <img className="Team-affiliations" src={imgAffiliations} alt="Affiliated institutions" />
          </div>

          <div className="TeamSection" id="team-ambassadors">
            <h2 className="TeamSection-title">Ambassadors</h2>
            <p className="TeamSection-tagline">Tagline introducing the algorithms team</p>
            <div className="Team-grid">
              {AMBASSADORS.map((member, i) => (
                <div className="Team-card" key={i}>
                  <div className="Team-photo Team-photo-inverted" />
                  <div className="Team-card-text">
                    <p className="Team-card-name">{member.name}</p>
                    <p className="Team-card-role">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="TeamSideNav">
          {SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
