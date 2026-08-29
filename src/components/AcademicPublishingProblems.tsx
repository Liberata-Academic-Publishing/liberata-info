import React, { useState } from "react";
import "./AcademicPublishingProblems.css";

function AcademicPublishingProblems() {
    const [activeIndex, setActiveIndex] = useState(0); // desktop: which tab is showing
    const [expandedIndex, setExpandedIndex] = useState(0); // mobile: which accordion item is open

    const items = [
        { id: 1, title: "Paper Written", tag: "Merit", subtitle: "Authorship politics", body: "When a paper is written, authorship positions are the only way to recognize contributions to the paper, but these only show ordinal positioning of contributions, not relative contribution sizes." },
        { id: 2, title: "Paper Submitted", tag: "Economic", subtitle: "Publishing Fees", body: "When a paper is submitted, often there are publishing fees, which is a rent-seeking problem for all taxpayers and academics." },
        { id: 3, title: "Peer Review", tag: "Merit", subtitle: "Unincentivized Reviews", body: "When a paper goes through peer review, the peer reviewers are, at best, incentivized to get the job done, not to do the job well, leading to bad experiences with peer reviewers, and also poor quality control overall from peer review." },
        { id: 4, title: "Paper Published", tag: "Societal", subtitle: "Rights Issues", body: "When the paper is published, authors often lose the distribution rights to their work, leading to a scenario where taxpayer funded work is \"owned\" by private journal companies." },
        { id: 5, title: "Paper Read", tag: "Economic", subtitle: "Subscription Fees", body: "When the paper is read, there are often subscription fees. This is another rent-seeking problem for all taxpayers and academics." },
        { id: 6, title: "Replication", tag: "Societal", subtitle: "Trust in Science", body: "There is no incentive for replication studies today, leading to almost all research findings backed up by only one study, conducted by graduate students in a hurry to publish. At the same time, mini replications are often done and never recorded by researchers building off prior work for their own projects." }
    ];

    const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
    const prev = () => setActiveIndex((p) => (p - 1 + items.length) % items.length);
    const active = items[activeIndex];

    return (
        <>
            {/* DESKTOP: sidebar + panel layout (unchanged) */}
            <div className="ap-desktop">
                <div className="ap-shell">
                    <aside className="ap-sidebar">
                        <div className="ap-steps">
                            {items.map((item, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <React.Fragment key={item.id}>
                                        <button
                                            type="button"
                                            className={`ap-step ${isActive ? "isActive" : "isInactive"}`}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            {item.id}. {item.title}
                                        </button>
                                        {index < items.length - 1 && <div className="ap-stepArrow" />}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </aside>

                    <section className="ap-panel">
                        <div className="ap-top">
                            <div className="ap-num">{active.id}</div>
                            <div className="ap-headings">
                                <div className="ap-pill">{active.tag}</div>
                                <h2 className="ap-title">{active.title}</h2>
                                <div className="ap-subtitle">{active.subtitle}</div>
                            </div>
                        </div>
                        <p className="ap-body">{active.body}</p>
                        <div className="ap-nav">
                            <button className="ap-arrowBtn" onClick={prev} type="button">←</button>
                            <div className="ap-dots">
                                {items.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`ap-dot ${index === activeIndex ? "active" : ""}`}
                                        onClick={() => setActiveIndex(index)}
                                    />
                                ))}
                            </div>
                            <button className="ap-arrowBtn" onClick={next} type="button">→</button>
                        </div>
                    </section>
                </div>
            </div>

            {/* MOBILE: vertical stepper/accordion */}
            <div className="ap-mobile-stepper ap-mobile ap-mobile-card">
                {items.map((item, index) => {
                    const isExpanded = index === expandedIndex;
                    const isLast = index === items.length - 1;
                    return (
                        <div className="ap-mobile-item" key={item.id}>
                            <div className="ap-mobile-rail">
                                <div className="ap-mobile-circle">{item.id}</div>
                                {!isLast && <div className="ap-mobile-line" />}
                            </div>
                            <div className={`ap-mobile-content ${isExpanded ? "ap-mobile-content-expanded" : ""}`}>
                                <button
                                    type="button"
                                    className="ap-mobile-header"
                                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                                    aria-expanded={isExpanded}
                                >
                                    <span className="ap-mobile-title">{item.subtitle}</span>
                                    <svg
                                        className={`ap-mobile-chevron ${isExpanded ? "open" : ""}`}
                                        /* Standard wide chevron (7.5 wide x 3.75 tall, a 2:1 ratio) sitting
                                           in a square 11x11 box, both centred on (5,2.5). width/height
                                           match the viewBox 1:1, so strokeWidth renders at exactly 2.5px,
                                           there's room on every side for the round cap/join's stroke halo,
                                           and the 180deg flip stays centred in place. */
                                        width="11" height="11" viewBox="-0.5 -3 11 11" fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M1.25 0.625L5 4.375L8.75 0.625" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                {isExpanded && (
                                    <div className="ap-mobile-body">
                                        <div className="ap-pill">{item.tag}</div>
                                        <p>{item.body}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
export default AcademicPublishingProblems;