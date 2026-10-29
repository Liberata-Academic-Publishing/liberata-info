import React, { useState } from "react";
import "./AcademicPublishingProblems.css";

function AcademicPublishingProblems() {
    const [activeIndex, setActiveIndex] = useState(0); // desktop: which tab is showing
    const [expandedIndex, setExpandedIndex] = useState(0); // mobile: which accordion item is open

    const items = [
        { id: 1, title: "Article Written", tag: "Merit", subtitle: "Authorship credit", body: "When an article is written, authorship positions are the primary way to recognize contributions to the article, but these only show the order of contributions, not relative contribution sizes." },
        { id: 2, title: "Article Submitted", tag: "Economic", subtitle: "Publishing Fees", body: "If an article submitted to a journal is accepted, there are often publishing fees. These are a substantial economic burden to academics, and indirectly to taxpayers." },
        { id: 3, title: "Peer Review", tag: "Merit", subtitle: "Unincentivized Reviews", body: "In today's system, peer reviewers are incentivized to complete reviews, but not to review well. This leads to poor quality control and negative experiences with peer review." },
        { id: 4, title: "Article Published", tag: "Societal", subtitle: "Rights Issues", body: "When an article is published, authors often lose the copyright to their work. As a result, taxpayer-funded research is often owned by private journal companies." },
        { id: 5, title: "Article Read", tag: "Economic", subtitle: "Subscription Fees", body: "Reading research often requires paying subscription fees. This is a rent-seeking problem for academics and taxpayers." },
        { id: 6, title: "Replication", tag: "Societal", subtitle: "Trust in Science", body: "There is no strong incentive for replication studies today. As a result, most research findings are supported by only one study. Research labs often replicate earlier findings before relying on them in their own work, but these replications are rarely recorded." }
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