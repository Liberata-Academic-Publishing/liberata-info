import {useState} from "react";
import imgShare from "../images/shares_liberata.png";
import imgMarket from "../images/marketplaces_liberata.png";
import imgMetrics from "../images/portfolio_metrics.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./KeyConcepts.css"

type OpenCloseItemProps = {id:string;
                        num: string;
                        title: string;
                        children:JSX.Element|string;
                        activeId:string|null;
                        onToggle:(id:string)=> void;}

function OpenCloseItem({id, num, title, children, activeId, onToggle}:OpenCloseItemProps){
    const isOpen = (id ===activeId);

    return(
        <div className="open-close-wrapper" id={id}>
            <a  href={`#${id}`}
                className="open-close-header"
                onClick={(e)=>{
                    e.preventDefault();
                    onToggle(id);
                    setTimeout(() => {
                        document.getElementById(id)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    },0);
                }}
            >
                <span className="open-close-title">
                    <span className="open-close-num">{num}</span> {title}
                </span>
                {isOpen ? <RemoveIcon className="open-close-icon" /> : <AddIcon className="open-close-icon" />}
            </a>
            {isOpen && <div className="open-close-content">{children}</div>}
        </div>
    );
}

type OpenCloseChildrenProps ={description: string;
                            oldSystemContent: string;
                            liberataContent: string;
                            oldSystemImage? : string;
                            liberataImage? : string;
                            }
function OpenCloseChildren({description, oldSystemContent, liberataContent, oldSystemImage, liberataImage}:OpenCloseChildrenProps){
    return(
        <>
            <p className="open-close-description">{description}</p>
            <div className="cards-layout">
                <div className="card old-system-card">
                    <p className="card-title">Tradition</p>
                    <p className="card-content" style={{ whiteSpace: "pre-line" }}>{oldSystemContent}</p>
                    {oldSystemImage && (
                        <img src={oldSystemImage} alt="Old system" className="card-image" />
                    )}
                </div>
                <div className="card liberata-card">
                    <p className="card-title">Liberata</p>
                    <p className="card-content">{liberataContent}</p>
                    {liberataImage && (
                        <img src={liberataImage} alt="Liberata" className="card-image" />
                    )}
                </div>
            </div>
        </>

    );
}

function KeyConcepts(){
    const [activeSection, setActiveSection] = useState<string|null>(null)
    const toggleSolution = (id:string) => {
        setActiveSection(activeSection === id ? null : id);
    }
    const creditTraditional = `Traditionally, academic credit is given in the form of authorship positions on papers. However, these positions can only give an ordering of contributions (>, <), but not exact distances in contributions. These lead to scenarios where it is impossible to tell if one author did 10% or 10x more work than another, and this results in highly exploitable metrics whereby the same credit is given to all authors, or only to the first author, both of which are inaccurate in almost all cases. These metrics can then cause politics and abuse of power dynamics in the assignment of authorship positions.`;
    const creditLiberata = `Liberata uses contribution shares to assign academic credit, similar to percentage ownership of patents or companies. These shares have no direct financial value, and are used for a new suite of more accurate academic metrics based on shares and weighted citations. Optionally, institutions may refer to the share split on papers when assigning IP ownership, which can give the shares indirect financial value. \n\n
    The share based system allows the precise quantification of contributions, rather than just the ordering of contributions. Liberata will use a default blind survey mechanism to assign shares to circumvent power dynamics issues, but authors are allowed to decide their own share split in lieu of a survey.`;
    const qualityControlTraditional = `Traditionally, the only forms of quality control is editors capable of doing a desk rejection, and peer reviewers that can suggest changes and final acceptance/rejection to the editor. The problem with the former is that all editors will be inherently biased given where they were educated, and their research subject area. The problem with the latter, is that peer reviewers are anonymous, and uncompensated. Given that a through review is a much higher time opportunity cost than a quick skim, peer reviewers often do a poor job of review, opting for whatever they feel is enough to convince the editor they did their job. This is a critical problem with incentive alignment today. Peer reviewers are incentivized to get the job done, but not to do it well as there are no additional rewards for doing a through peer review.`;
    const qualityControlLiberata = `In Liberata, many more forms of quality control are possible, and they are properly incentivized. The platform will start off supporting peer review, and replication, through its academic marketplaces. In these marketplaces, authors can trade shares in their work (i.e. credit on their work) to other academics for peer review & replication services. \n\n
    The author(s) would be willing to do this if the additional citations gained is greater than the shares given away. The quality controllers would be willing to provide these services if the time taken to do them is less than the proportional time it would them to do a similar quality project of their own. Additionally, in this system, the peer reviewers and replicators are incentivized to make the work better, as their own shares in the work are worth more, if the work ends up becoming actually better and more read & cited. \n\n
    Liberata is built to depend on no altruism and no centralized authority (editors, etc.), and only requires self interested actors to operate as intended.`;
    const metricsTraditional = `Traditionally, impact is measured with citation count or citation count derivatives such as H-index. These metrics are highly problematic for several reasons. First, each paper published can cite a different number of other works, allowing papers to disproportionally yield credit to other papers just by referencing more works. This leads to a gradual but noticeable practice of reference section inflation over the years, and the formation of citation rings, where different groups will cite each other whenever possible to boost each others' academic metrics. Second, different academic fields have naturally different rates of publication and thus naturally different citation counts and derivative metrics. Third, it is possible to buy citations. In addition to not being able to measure impact reliably, today's metrics struggle to measure any other quantity of interest, such as relative risk or reliability of works, people, and institutions.`;
    const metricsLiberata = `Liberata uses a graph based metrics suite (provisional patent granted), which uses weighted contributions and weighted citations to calculate academic impact. The weighted contributions are called shares, and the weighted citations are the references list corrected for factors such as 1. number of references, 2. average publication frequency in the field, and 3. author list self similarity in the references list. \n\n
    Because the continuous system of shares allows for more accurate pictures of contributions than the discrete system of authorship positions, Liberata's metrics are able to provide a more accurate picture of academic impact. Additionally, Liberata has market based metrics such as fair market price for quality control services, and risk premiums paid by research topics, individual labs, institutions, and geographic regions, and demographics. These metrics allow us to reveal hard to quantify aspects of the current academic landscape. Liberata monetizes these metrics so that the academic literature is free to read and publish for all.`;

    return(
        <>
            <OpenCloseItem
                id="merit-problem"
                num="1"
                title="Academic Credit"
                activeId={activeSection}
                onToggle={toggleSolution}
            >
                <OpenCloseChildren
                    description="Ending politics of maneuvering for authorship roles."
                    oldSystemContent= {creditTraditional}
                    liberataContent={creditLiberata}
                    liberataImage={imgShare}
                />
            </OpenCloseItem>
            
            <OpenCloseItem
                id="economic-problem"
                num="2"
                title="Academic Marketplaces"
                activeId={activeSection}
                onToggle={toggleSolution}
            >
                <OpenCloseChildren
                    description="An overview of how Liberata incentivizes quality control among the academic community."
                    oldSystemContent={qualityControlTraditional}
                    liberataContent={qualityControlLiberata}
                    liberataImage={imgMarket}
                />
            </OpenCloseItem>

            <OpenCloseItem
                id="trust-problem"
                num="3"
                title="Academic Metrics"
                activeId={activeSection}
                onToggle={toggleSolution}
            >
                <OpenCloseChildren
                    description="An overview of how Liberata measures academic impact."
                    oldSystemContent={metricsTraditional}
                    liberataContent={metricsLiberata}
                    liberataImage={imgMetrics}
                />
            </OpenCloseItem>
        </>
    );
}

export default KeyConcepts;