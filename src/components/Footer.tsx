import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import fullLogo from "../images/FullLogo.png";
// import iconEmail from "../images/figma/icon_email.svg";
// import iconBluesky from "../images/figma/icon_bluesky.svg";
// import iconMastodon from "../images/figma/icon_mastodon.svg";
import './Footer.css';

function Footer() {
  const linkedinUrl = "https://www.linkedin.com/company/liberata-academia/posts/?feedView=all";
  const youtubeUrl = "https://www.youtube.com/@liberata.academia";
  const instagramUrl = "https://www.instagram.com/liberata.official/";
  const redditUrl = "https://www.reddit.com/user/Liberata_Official/";

  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="Footer-body">
      <div className="Footer-row">
        <img src={fullLogo} alt="Liberata" className="Footer-logo" />
        <div className="Footer-quick-links">
          <Link to="/" className="footer-link">Overview</Link>
          <span className="footer-dot">•</span>
          {/* Team link temporarily hidden until content is curated:
          <Link to="/team" className="footer-link">Team</Link>
          <span className="footer-dot">•</span> */}
          <button type="button" className="footer-link footer-link-button" onClick={() => setContactOpen(true)}>Contact</button>
        </div>
      </div>
      <div className="Footer-row Footer-row-bottom">
        <p className="Footer-copyright">Copyright © 2026. All rights reserved.</p>
        <div className="Footer-icons">
          {/* TODO: Email, Bluesky, and Mastodon icons are downloaded in src/images/figma — enable once we have addresses/URLs */}
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            <LinkedInIcon className="mediaIcon" />
          </a>
          <a href={redditUrl} target='_blank' rel='noreferrer'>
            <RedditIcon className='mediaIcon' />
          </a>
          <a href={instagramUrl} target='_blank' rel='noreferrer'>
            <InstagramIcon className='mediaIcon' />
          </a>
          <a href={youtubeUrl} target="_blank" rel="noreferrer">
            <YouTubeIcon className="mediaIcon" />
          </a>
        </div>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  )
}

export default Footer
