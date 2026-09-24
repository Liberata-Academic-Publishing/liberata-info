import iconUpload from "../images/figma/scriptura/icons/icon_upload.svg";
import iconReview from "../images/figma/scriptura/icons/icon_review.svg";
import iconFlask from "../images/figma/scriptura/icons/icon_flask.svg";
import iconCollection from "../images/figma/scriptura/icons/icon_collection.svg";
import iconUserSearch from "../images/figma/scriptura/icons/icon_user_search.svg";
import iconInstitutionSearch from "../images/figma/scriptura/icons/icon_institution_search.svg";

// Literature Browse (the "Preprints & Papers" card) — search results plus the
// 3-step upload flow
import demoLitSearchResults from "../images/figma/scriptura/demo_preprints_1.png";
import demoLitStep1 from "../images/figma/scriptura/demo_preprints_2.png";
import demoLitStep2 from "../images/figma/scriptura/demo_preprints_3.png";
import demoLitStep3 from "../images/figma/scriptura/demo_preprints_4.png";

// Peer Review Marketplace
import demoPeerReview from "../images/figma/scriptura/demo_peer_review_1.png";
import demoPrOpenSolicitation from "../images/figma/scriptura/demo_peer_review_2.png";
import demoReviewerAddComment from "../images/figma/scriptura/demo_peer_review_3.png";
import demoCreateSolicitation from "../images/figma/scriptura/demo_peer_review_4.png";
import demoPrAuthorFullView from "../images/figma/scriptura/demo_peer_review_5.png";
import demoPrAuthorReviewers from "../images/figma/scriptura/demo_peer_review_6.png";
import demoPrAuthorFullView2 from "../images/figma/scriptura/demo_peer_review_7.png";

// Replication Marketplace
import demoReplicationOverview from "../images/figma/scriptura/demo_replication_1.png";
import demoReplicationOpenSolicitation from "../images/figma/scriptura/demo_replication_2.png";
import demoReplicationCreateSolicitation from "../images/figma/scriptura/demo_replication_3.png";
import demoReplicationAuthorView from "../images/figma/scriptura/demo_replication_4.png";
import demoReplicationCounteroffer from "../images/figma/scriptura/demo_replication_5.png";
import demoReplicationBidResponses from "../images/figma/scriptura/demo_replication_6.png";
import demoReplicationDocuments from "../images/figma/scriptura/demo_replication_7.png";
import demoUploadRepDocument from "../images/figma/scriptura/demo_replication_8.png";

// Collections
import demoCollectionJournals from "../images/figma/scriptura/demo_collections_1.png";
import demoCollectionCreateJournal from "../images/figma/scriptura/demo_collections_2.png";
import demoCollectionCreateJournal2 from "../images/figma/scriptura/demo_collections_3.png";
import demoCollectionOpened from "../images/figma/scriptura/demo_collections_4.png";
import demoCollectionBookmarks from "../images/figma/scriptura/demo_collections_5.png";
import demoCollectionBookmarksCreateNew from "../images/figma/scriptura/demo_collections_6.png";
import demoCollectionBookmarkEmpty from "../images/figma/scriptura/demo_collections_7.png";

// Collaborator Search (new)
import demoCollaboratorSearch from "../images/figma/scriptura/demo_collaborator_search_1.png";
import demoCollaboratorSearchSaved from "../images/figma/scriptura/demo_collaborator_search_2.png";
import demoProfileOverview from "../images/figma/scriptura/demo_collaborator_search_3.png";
import demoProfileCollections from "../images/figma/scriptura/demo_collaborator_search_4.png";

// Institution Search (new)
import demoInstitutionSearch from "../images/figma/scriptura/demo_institution_search_1.png";
import demoUniversityAcademicsFilters from "../images/figma/scriptura/demo_institution_search_2.png";
import demoUniProfileMetrics from "../images/figma/scriptura/demo_institution_search_3.png";

import ProductFeatureShowcase, { ShowcaseFeature } from "./ProductFeatureShowcase";

const FEATURES: ShowcaseFeature[] = [
  {
    key: "preprints",
    name: "Preprints & Papers",
    icon: <img src={iconUpload} alt="" />,
    gridDesc: "Host, version, and cite your work with DOI-linked records. Open access by default, and you keep the copyright.",
    altDesc: "Host, version, and cite your work with DOI-linked records. Open access by default, and you keep the copyright.",
    label: "Preprints & Papers",
    demo: [demoLitSearchResults, demoLitStep1, demoLitStep2, demoLitStep3],
    demoAlt: "Scriptura walkthrough: browsing papers, filtering, saving to a collection, and the upload flow",
    headline: "Publishing that you actually own",
    longDesc:
      "Post a preprint the moment it's ready, attach your data and code, and get a citable, DOI-linked record — without signing your rights over to a journal.",
    points: [
      { lead: "Open by default.", text: "Every paper is free to read and download. No subscription, no paywall, no account required to access the work." },
      { lead: "Keep your copyright.", text: "No transfer of rights and no $2,000–$10,000 article-processing charge. The work stays yours to distribute." },
      { lead: "A versioned record.", text: "Revisions are tracked over time, so each reviewer's and replicator's contribution stays tied to the exact version they worked on." },
      { lead: "Honest contribution splits.", text: "Declare who did what up front. Anomalous share splits are easy to spot with graph metrics and get flagged." },
    ],
  },
  {
    key: "peer-review",
    name: "Peer Review Marketplace",
    icon: <img src={iconReview} alt="" />,
    gridDesc: "Offer reviewers a share of credit, so review is rewarded for improving the work, with enforced deadlines.",
    altDesc: "Commission and trade structured peer review with transparent, verifiable credit.",
    label: "Peer Review Marketplace",
    demo: [
      demoPeerReview,
      demoPrOpenSolicitation,
      demoReviewerAddComment,
      demoCreateSolicitation,
      demoPrAuthorFullView,
      demoPrAuthorReviewers,
      demoPrAuthorFullView2,
    ],
    demoAlt: "Scriptura peer review marketplace: a filterable, sortable feed of open review solicitations",
    headline: "Review that's worth doing",
    longDesc:
      "Authors post a review request offering a share of credit in the paper. Reviewers bid, the best matches are accepted, and everyone's incentive points the same way: toward making the work better.",
    points: [
      { lead: "Credit, not charity.", text: "Reviewers earn shares of the paper, so careful, substantive review is rewarded — not just getting it 'done'." },
      { lead: "On the clock.", text: "Every review runs against an enforced deadline. Miss it and the review simply doesn't count — with no penalty to the paper." },
      { lead: "Blind where it matters.", text: "Reviewers stay anonymous and can't see each other's comments. Authors see only coarse, anonymized credentials, so they choose on merit, not name." },
      { lead: "Conflict-proof.", text: "Authors and co-authors can't review their own work, and unusual author–reviewer patterns get flagged for collusion." },
    ],
  },
  {
    key: "replication",
    name: "Replication Marketplace",
    icon: <img src={iconFlask} alt="" />,
    gridDesc: "Request or take on replications for a verified stake in the work. Reproducibility readers can trust.",
    altDesc: "Request or offer replications; build a verified record of reproducibility.",
    label: "Replication Marketplace",
    demo: [
      demoReplicationOverview,
      demoReplicationOpenSolicitation,
      demoReplicationCreateSolicitation,
      demoReplicationAuthorView,
      demoReplicationCounteroffer,
      demoReplicationBidResponses,
      demoReplicationDocuments,
      demoUploadRepDocument,
    ],
    demoAlt: "Scriptura replication marketplace: a searchable feed of open replication solicitations",
    headline: "Reproducibility, finally rewarded",
    longDesc:
      "Authors offer a stake in their paper to independent labs that reproduce the results. Replicators get durable credit instead of competing against the work for citations — and readers get a trust signal they can check.",
    points: [
      { lead: "A real market.", text: "Post a request with the shares offered, the timeline, the resources you'll provide, and whether negative results are accepted. Replicators accept or counter-offer." },
      { lead: "Verified, attached, visible.", text: "Completed replications live on the paper as a badge, readable at a glance from search results." },
      { lead: "Named and accountable.", text: "Replicators are non-anonymous, so their credentials and track record are fully transparent to authors and readers." },
      { lead: "Built to converge on truth.", text: "If a replication finds something different, authors can revise at no penalty rather than bury it — and a rejected replicator can publish their own findings instead." },
    ],
  },
  {
    key: "collections",
    name: "Collections",
    icon: <img src={iconCollection} alt="" />,
    gridDesc: "Search 250M+ open works at fine-grained precision, then save them into static and dynamic collections.",
    altDesc: "Editors and institutions organize research into canonical, citable collections.",
    label: "Collections",
    demo: [
      demoCollectionJournals,
      demoCollectionCreateJournal,
      demoCollectionCreateJournal2,
      demoCollectionOpened,
      demoCollectionBookmarks,
      demoCollectionBookmarksCreateNew,
      demoCollectionBookmarkEmpty,
    ],
    demoAlt: "Scriptura collections library: saved article collections in a searchable, sortable grid",
    headline: "Find the right work, then keep it",
    longDesc:
      "Search 250M+ open papers at a granularity legacy tools can't reach, ranked by what authors actually meant — then organize what you find into project folders and journals that update themselves.",
    points: [
      { lead: "Precise by design.", text: "Search down to fine-grained topic tags, not the few dozen broad buckets of older tools. Results respect author-intended classification over keyword guessing." },
      { lead: "Quality over prestige.", text: "Filter and sort by Academic Capital, replications, saves, and reviews — real usage signals, not journal brand or impact factor." },
      { lead: "Open to everyone.", text: "Search, read, download, and share with no account. Only saving to a collection needs a login." },
      { lead: "Collections & journals.", text: "Bookmark papers into project folders, and spin up “journals” — custom feeds by tag, author, institution, and quality bar — that surface new preprints, reviews, and replications as they land." },
    ],
  },
  {
    key: "collaborator-search",
    name: "Collaborator Search",
    icon: <img src={iconUserSearch} alt="" />,
    gridDesc: "Search researchers by granular expertise, then rank them by objective portfolio metrics instead of personal connections.",
    altDesc: "Search researchers by granular expertise, then rank them by objective portfolio metrics instead of personal connections.",
    label: "Collaborator Search",
    demo: [demoCollaboratorSearch, demoCollaboratorSearchSaved, demoProfileOverview, demoProfileCollections],
    demoAlt: "Scriptura collaborator search: finding and saving researcher profiles",
    headline: "Collaborators, not connections",
    longDesc:
      "Most academic collaboration still comes down to who you already know. Search any technique or research area down to the same granular tags your own portfolio is scored on, and sort by real expertise instead.",
    points: [
      { lead: "Rank by expertise, not connections.", text: "Sort by total Academic Capital for the top expert in a tag, or by portfolio share for the specialist." },
      { lead: "Know before you reach out.", text: "A collaboration status badge shows who's open to new work, and \"more like this\" surfaces similar researchers." },
      { lead: "Filter out who's gone quiet.", text: "An \"Active\" filter shows only researchers with recent publications, so you're not reaching out to someone who left research years ago." },
      { lead: "Built for people without a network yet.", text: "Early-career researchers get the same discovery tools as tenured faculty, then save and contact prospects directly." },
    ],
  },
  {
    key: "institution-search",
    name: "Institution Search",
    icon: <img src={iconInstitutionSearch} alt="" />,
    gridDesc: "See how an institution performs in one narrow research area, not just its overall prestige ranking.",
    altDesc: "See how an institution performs in one narrow research area, not just its overall prestige ranking.",
    label: "Institution Search",
    demo: [demoInstitutionSearch, demoUniversityAcademicsFilters, demoUniProfileMetrics],
    demoAlt: "Scriptura institution search: finding institutions and their academic profile metrics",
    headline: "Search by expertise, not prestige",
    longDesc:
      "Rankings rate institutions in broad categories like \"best in mechanical engineering.\" That's no help if you need to know who's actually doing the work in one narrow subfield. Search by that same granular tag instead.",
    points: [
      { lead: "Rank by output or by focus.", text: "Sort by total Academic Capital for the biggest program in a field, or by portfolio share for the most specialized one." },
      { lead: "Numbers that protect you, too.", text: "Per-capita impact and risk premium flag programs that overwork or under-credit their researchers." },
      { lead: "See who's actually there.", text: "Every profile links to the institution's full researcher directory and publication list, not just a summary card." },
      { lead: "Track it like a shortlist.", text: "Save institutions while you're applying or job-hunting, and check back as new papers come in." },
    ],
  },
];

function ScripturaFeatures() {
  return <ProductFeatureShowcase features={FEATURES} />;
}

export default ScripturaFeatures;
