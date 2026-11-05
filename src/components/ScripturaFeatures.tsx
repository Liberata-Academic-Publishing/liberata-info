import iconUpload from "../images/figma/scriptura/icons/icon_upload.svg";
import iconReview from "../images/figma/scriptura/icons/icon_review.svg";
import iconFlask from "../images/figma/scriptura/icons/icon_flask.svg";
import iconCollection from "../images/figma/scriptura/icons/icon_collection.svg";
import iconUserSearch from "../images/figma/scriptura/icons/icon_user_search.svg";
import iconInstitutionSearch from "../images/figma/scriptura/icons/icon_institution_search.svg";

// Literature Browse (the "Preprints & Papers" card) — search results, the
// paper view with its PDF, then the 3-step upload flow
import demoLitSearchResults from "../images/figma/scriptura/demo_preprints_1.png";
import demoLitPaperViewerPdf from "../images/figma/scriptura/demo_paper_viewer_pdf.png";
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
    name: "Preprints and Articles",
    icon: <img src={iconUpload} alt="" />,
    gridDesc: "Use as a preprint repository or publish with rigorous quality controls with fast upload and easy linking to records and indexes.",
    altDesc: "Use as a preprint repository or publish with rigorous quality controls with fast upload and easy linking to records and indexes.",
    label: "Preprints and Articles",
    demo: [demoLitSearchResults, demoLitPaperViewerPdf, demoLitStep1, demoLitStep2, demoLitStep3],
    demoAlt: "Scriptura walkthrough: browsing articles, viewing an article and its PDF, and the upload flow",
    headline: "Own & track your works",
    longDesc:
      "Works can be posted as preprints with attached artifacts such as data and code to get a citable, DOI-linked record. Preprints can optionally go on to publication through the platform's quality controls.",
    points: [
      { lead: "Diamond open access.", text: "All works are free to read and free to publish. Publication requires passing incentivized, rigorous peer review or replication." },
      { lead: "Keep your rights.", text: "No transfer of rights. You keep copyright and distribution rights to your work." },
      { lead: "Transparent version control.", text: "Revisions, peer reviewer comments, and replicator reports are all tied to the same work's record." },
      { lead: "Contributions as credit.", text: "Contribution shares replace authorship positions as the primary way to assign credit for work impact. CREDIT (Contributor Roles, Evaluations, Data, and Incentives Taxonomy) system tracks rich metadata for cataloging works." },
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
    headline: "Peer review, properly incentivized",
    longDesc:
      "No editors. Authors solicit their own anonymous peer reviewers by offering a share of the credit on their works to experts they think can improve it.",
    points: [
      { lead: "Invested quality controllers.", text: "Reviewers are compensated with a portion of the credit on the article. This incentivizes them to do what is best for the article, rather than to finish quickly." },
      { lead: "Fastest review times.", text: "Reviews happen according to contracted deadlines between author and reviewer. Reviewers are naturally incentivized to work fast so that their shares increase in value sooner." },
      { lead: "Single blind & reader auditable.", text: "Reviewers are anonymous to authors, readers, and each other. However, their coarse, binned metrics are available to all for auditing qualifications." },
      { lead: "Collusion resistant.", text: "Authors cannot review their own work. Reviewer and author pairings that occur more often than chance are detectable and suppressed, depending on community size." },
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
    headline: "Replications, properly incentivized",
    longDesc:
      "Authors solicit replications of their article by offering a share of the credit on their work. Replicators get a share of a work they help buttress, or a chance to discover an alternative conclusion, without having to compete against the original work for citations.",
    points: [
      { lead: "Powered by markets.", text: "Prices reflect the difficulty of the work and the quality signal the replicator adds, incentivizing good documentation and data sharing practices to drive down costs." },
      { lead: "Living documents.", text: "Replication reports are attached to the original work, bolstering its credibility while maintaining auditability." },
      { lead: "Accountable results.", text: "Replicators are non-anonymous, so their credentials and track record are fully transparent to authors and readers." },
      { lead: "Derisking truthseeking.", text: "If a replicator finds a different result than the original article, the author can revise their conclusions without penalty. The replicator can also forfeit the shares on the original work and publish their findings as a standalone work." },
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
    headline: "Curate bookmarks and subscription feeds",
    longDesc:
      "Search millions of articles at unmatched granularity and accuracy, then organize what you find into static collections you curate, or dynamic collections that update themselves.",
    points: [
      { lead: "Fast and precise.", text: "Search at 4 levels of granularity, down to 2000 different academic fields, with subsecond response times." },
      { lead: "Intuitive, powerful filters.", text: "Filter and sort by impact (academic capital), reviewed or replicated status, saved count, and more." },
      { lead: "Shareable and integrated.", text: "Share your collections or sync them with other tools." },
      { lead: "Static & dynamic collections.", text: "Static collections serve as bookmarks, whereas dynamic collections are subscription feeds, similar to journals, tailored to selected topics and filters." },
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
    headline: "Find the expertise you need",
    longDesc:
      "Search by precise topic expertise rather than generic department names. Filter by method, institution, geographic region, and more.",
    points: [
      { lead: "Detailed profiles.", text: "View academic metrics, articles, expertise, and bio, all on one intuitive page." },
      { lead: "Networking statuses.", text: "Know before you reach out who is looking for new research ideas, collaborators, or topic pivots, with status badges on profiles." },
      { lead: "Multiple leads.", text: "Find a profile you like and click \"find similar\" to obtain multiple leads." },
      { lead: "Easy profile builder.", text: "Most of a profile is constructed automatically from your works and ORCID records, and everything remains editable by the user." },
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
    headline: "Visualize institution specialties",
    longDesc:
      "Search for narrow topics or broad fields you care about and find out which institutions lead in them. Gain insight into the unique expertise mixes and academic practices of different institutions.",
    points: [
      { lead: "Rank by output or by focus.", text: "Sort by total Academic Capital for the biggest institution in a field, or by portfolio share for the most specialized one." },
      { lead: "Academic culture insights.", text: "Liberata's metrics reveal work culture, uniformity, collaborativeness, and more." },
      { lead: "Find people from places.", text: "Every institution contains a full researcher directory and publication list." },
      { lead: "Helpful career tools.", text: "Save a shortlist of institutions, and get job alerts and news for your places of interest." },
    ],
  },
];

function ScripturaFeatures() {
  return <ProductFeatureShowcase features={FEATURES} />;
}

export default ScripturaFeatures;
