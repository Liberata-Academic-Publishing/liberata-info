import {useState} from "react";
import imgShare from "../images/shares_liberata.png";
import imgMarket from "../images/marketplaces_liberata.png";
import imgMetrics from "../images/portfolio_metrics.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./KeyConcepts.css"

type OpenCloseItemProps = {id:string;
                        title: string;
                        children:JSX.Element|string;
                        activeId:string|null;
                        onToggle:(id:string)=> void;}

function OpenCloseItem({id, title, children, activeId, onToggle}:OpenCloseItemProps){
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
                    {title}
                </span>
                {isOpen ? <RemoveIcon className="open-close-icon" /> : <AddIcon className="open-close-icon" />}
            </a>
            {isOpen && <div className="open-close-content">{children}</div>}
        </div>
    );
}

type OpenCloseChildrenProps ={oldSystemContent: string;
                            liberataContent: string;
                            oldSystemImage? : string;
                            liberataImage? : string;
                            }
function OpenCloseChildren({oldSystemContent, liberataContent, oldSystemImage, liberataImage}:OpenCloseChildrenProps){
    return(
        <>
            <div className="cards-layout">
                <div className="card old-system-card">
                    <p className="card-title">Traditional System</p>
                    <p className="card-content" style={{ whiteSpace: "pre-line" }}>{oldSystemContent}</p>
                    {oldSystemImage && (
                        <img src={oldSystemImage} alt="Old system" className="card-image" />
                    )}
                </div>
                <div className="card liberata-card">
                    <p className="card-title">Liberata's System</p>
                    <p className="card-content" style={{ whiteSpace: "pre-line" }}>{liberataContent}</p>
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
    const creditTraditional = `Traditionally, academic credit is primarily given in the form of authorship positions on articles. However, these positions can only give an ordering of contributions, but not exact distances in contributions. This makes it impossible to tell for example if one author did 10% or 10x more work than another, resulting in highly distortable and exploitable metrics where the same credit is given to all authors, or only to the first author, both of which are inaccurate pictures of contributions. The same noisy metrics can then cause politics and abuse of power dynamics in the assignment of authorship positions.`;
    const creditLiberata = `Liberata uses fractional contribution (contribution shares) to assign academic credit, which are similar to percentage ownership of patents or companies. These shares record both order and distances in contributions of all contributors, allowing more accurate academic metrics based on shares and weighted citations. The shares are not financial assets, and purely a way to split academic credit on works. Liberata uses a default blind survey mechanism to assign shares to circumvent power dynamics issues, but authors are allowed to decide their own share split in lieu of a survey if they can demonstrate consensus. Additionally, because shares are fungible, they can be used to recognize a much wider range of contributions, or be traded on marketplaces for services such as peer review or replication.`;
    const qualityControlTraditional = `Traditionally, the primary forms of quality control are editors who can do desk rejections, and peer reviewers who can critique works and advise the editor. The problem with the former is that all editors carry some level of personal bias. The problem with the latter is that since peer reviewers are anonymous and uncompensated, they are incentivized to get the job done, but not to do it well as there are no additional rewards for doing a thorough review over a quick review. These quality control issues over time lead to an increasing retraction rate and declining trust in science.`;
    const qualityControlLiberata = `Liberata features two forms of quality control: peer review and replication. Both are optional, and are incentivized on the platform's academic marketplaces. In these marketplaces, authors can trade shares in their work (i.e. credit in their work) to other academics in exchange for peer review & replication services. The author(s) would be willing to do this if the additional credit (citations, altmetrics, etc.) gained due to the article being more trustworthy and more read are relatively greater than the shares given away to the quality controllers. The quality controllers would be willing to provide these services if the time taken to do the job is less than the (share) proportion of time it would take them to do a similar quality project of their own by themselves. Additionally, in this system, quality controllers are incentivized to make the work better. The better the work is and the more citations it earns, the more credit accrues to all shares. Liberata is built to depend on no altruism and no centralized authority (editors, etc.), and depends only on the self-interest of all actors to operate.`;
    const metricsTraditional = [
        `Traditionally, impact of scholarly works is measured with citation count or its derivatives such as H-index. These metrics suffer from several exploits. First, every article published can cite an unlimited number of other works and thus dole out an unlimited amount of credit. This leads to a noticeable steady inflation of average citations per article over time, and a corresponding decrease of average relevance of cited works to the citing works.`,
        `Second, because with most metrics, all authors are treated the same, adding another author to the work adds a multiple of the future incoming citations as generated credit, incentivizing researchers to put authors on works despite negligible contributions for similar or other favors.`,
        `Third, different academic fields have naturally different rates of publication and thus different citation counts and derivative metrics, adding distortions that can make some researchers look artificially better or worse. In addition to not being able to measure impact reliably, today's metrics struggle to capture other quantities of interest, such as relative risk, reliability of works or people, and added value of peer review.`,
    ].join("\n\n");
    const metricsLiberata = [
        `Liberata's metrics suite is designed from graph theory fundamentals to capture more information more accurately than conventional metrics. The shares graph tracks how contributions on works are split between contributors, and the citations graph, with correction factors and weighted citations, tracks how credit flows between works. The product of these two graphs yields precise information about the impact of each person's research, their expertise, collaborative yield, and more.`,
        `Additionally, statistical distributions on those graphs yield market based metrics such as fair market price for quality control services, and risk premiums associated with research reliability, language bias, gender bias, geographical bias.`,
        `All Liberata metrics, unlike conventional metrics, are extensible to any entity that holds a portfolio of shares, including but not limited to people, labs, institutions, geographic regions, demographic cohorts, and academic fields. Liberata monetizes these metrics so that academic literature on the platform remains free to read and publish for all.`,
    ].join("\n\n");

    return(
        <>
            <OpenCloseItem
                id="merit-problem"
                title="Academic Credit"
                activeId={activeSection}
                onToggle={toggleSolution}
            >
                <OpenCloseChildren
                    oldSystemContent= {creditTraditional}
                    liberataContent={creditLiberata}
                    liberataImage={imgShare}
                />
            </OpenCloseItem>
            
            <OpenCloseItem
                id="economic-problem"
                title="Academic Marketplaces"
                activeId={activeSection}
                onToggle={toggleSolution}
            >
                <OpenCloseChildren
                    oldSystemContent={qualityControlTraditional}
                    liberataContent={qualityControlLiberata}
                    liberataImage={imgMarket}
                />
            </OpenCloseItem>

            <OpenCloseItem
                id="trust-problem"
                title="Academic Metrics"
                activeId={activeSection}
                onToggle={toggleSolution}
            >
                <OpenCloseChildren
                    oldSystemContent={metricsTraditional}
                    liberataContent={metricsLiberata}
                    liberataImage={imgMetrics}
                />
            </OpenCloseItem>
        </>
    );
}

export default KeyConcepts;