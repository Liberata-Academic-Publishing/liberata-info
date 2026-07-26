import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Contact from "../components/Contact";
import "../App.css";
import "./PlatformsPage.css";
import ImageCarousel from "../components/ImageCarousel";
import literature_browse from "../images/literature_browse.png";
import peer_review from "../images/peer_review.png";
import replication from "../images/replication.png";
import dataframe from "../images/dataframe.png";
import dataframe_comparison from "../images/dataframe_comparison.png";
import chart from "../images/chart.png";
import chart_example from "../images/chart_example.png";
import bass_connections_logo from "../images/BassConnections_Logo.png";

function PlatformsPage() {
    const headerBgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sectionItems = document.getElementsByClassName("App-section");
        const observerCallback = (entries: any[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0px)";
                    observer.unobserve(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback);
        Array.from(sectionItems).forEach((e) => observer.observe(e));
    }, []);

    // Right nav highlight
    useEffect(() => {
        const mainSection = document.getElementById("App-main-platform");
        const metricsSection = document.getElementById("Platforms-metrics-section");
        const mainNav = document.getElementById("mainPlatform-nav");
        const metricsNav = document.getElementById("metricsPlatform-nav");

        let prev: any;
        const observer = new IntersectionObserver(
            (entries: any[]) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    if (prev) prev.classList.remove("section-active");

                    if (entry.target.id === "App-main-platform" && mainNav) {
                        mainNav.classList.add("section-active");
                        prev = mainNav;
                    } else if (entry.target.id === "Platforms-metrics-section" && metricsNav) {
                        metricsNav.classList.add("section-active");
                        prev = metricsNav;
                    }
                });
            },
            { threshold: 0.6 }
        );

        mainSection && observer.observe(mainSection);
        metricsSection && observer.observe(metricsSection);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const bg = headerBgRef.current;
        if (!bg) return;

        function onMove(e: MouseEvent) {
            if (!bg) return;
            const rect = bg.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            bg.style.transform = `translate(${x * 18}px, ${y * 10}px)`;
        }
        function onLeave() {
            if (!bg) return;
            bg.style.transform = "translate(0px, 0px)";
        }

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <div className="App">
            <Header />

            <div className="PlatformsPageBody">
                <div
                    className="App-section"
                    style={{
                        paddingTop: "10vh",
                        display: "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    <div
                        style={{
                            fontSize: "3.2rem",
                            fontWeight: 500,
                            color: "#111",
                            textAlign: "left",
                        }}
                    >
                        Introducing Platforms.
                    </div>
                </div>

                <div className="App-column-container">
                    <div className="App-column-left">

                        {/* /Main Platform */}
                        <div className="App-section App-col-left-section" id="App-main-platform">
                            <div className="section-heading" style={{ color: "#2F6BFF" }}>
                                /Main Platform
                            </div>

                            <div
                                style={{
                                    color: "#8B93A3",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.55rem",
                                    marginTop: "2vh",
                                    maxWidth: "42vw",
                                }}
                            >
                                The main platform allows any visitor to search and read academic literature. Academic users (ORCID needed) can upload
                                manuscripts as preprints, and optionally go through peer review or replication processes on the platform. Additionally,
                                all users with an account can search for collaborations with academics.
                            </div>

                            <div style={{ marginTop: "4vh", maxWidth: "46vw" }}>
                                <ImageCarousel
                                    items={[
                                        { url: literature_browse },
                                        { url: peer_review },
                                        { url: replication }
                                    ]}
                                />
                            </div>

                            {/* Timeline */}
                            <div style={{ marginTop: "6vh", maxWidth: "46vw" }}>
                                {/* line */}
                                <div style={{ position: "relative" }}>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "28px",
                                            left: 0,
                                            right: 0,
                                            height: "1px",
                                            background: "#DADDE3",
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: "2vw",
                                            position: "relative",
                                        }}
                                    >
                                        {[
                                            { date: "June 2026", label: "Alpha version & testing with early users" },
                                            { date: "Dec 2026", label: "Beta open trials" },
                                            { date: "June 2027", label: "Full rollout" },
                                            { date: "Dec 2027", label: "AI based premium features" },
                                        ].map((m, i) => (
                                            <div key={`${m.date}-${i}`} style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "#111", marginBottom: "14px" }}>
                                                    {m.date}
                                                </div>
                                                <div
                                                    style={{
                                                        width: "10px",
                                                        height: "10px",
                                                        borderRadius: "999px",
                                                        background: "#C9CDD6",
                                                        marginBottom: "14px",
                                                    }}
                                                />
                                                <div style={{ fontSize: "0.9rem", color: "#8B93A3", lineHeight: "1.25rem" }}>{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* /Metrics Platform */}
                        <div className="App-section App-col-left-section" id="Platforms-metrics-section">
                            <div className="section-heading" style={{ color: "#2F6BFF" }}>
                                /Metrics Platform
                            </div>

                            <div
                                style={{
                                    color: "#8B93A3",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.55rem",
                                    marginTop: "2vh",
                                    maxWidth: "42vw",
                                }}
                            >
                                The metrics platform allows paid users to view detailed academic metrics for individuals, institutions, geographic regions,
                                demographic subsections, time periods, and academic fields. All users are paid license seats. This platform is not meant for
                                reading/publishing academic literature and is only for metrics analysis.
                            </div>

                            <div style={{ marginTop: "4vh", maxWidth: "46vw" }}>
                                <ImageCarousel
                                    items={[
                                        { url: dataframe },
                                        { url: dataframe_comparison },
                                        { url: chart },
                                        { url: chart_example }
                                    ]}
                                />
                            </div>

                            {/* Timeline */}
                            <div style={{ marginTop: "6vh", maxWidth: "46vw" }}>
                                <div style={{ position: "relative" }}>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "28px",
                                            left: 0,
                                            right: 0,
                                            height: "1px",
                                            background: "#DADDE3",
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: "2vw",
                                            position: "relative",
                                        }}
                                    >
                                        {[
                                            { date: "Dec 2026", label: "Alpha version & testing with early users" },
                                            { date: "June 2027", label: "Beta open trials" },
                                            { date: "Dec 2027", label: "Full rollout" },
                                        ].map((m, i) => (
                                            <div key={`${m.date}-${i}`} style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "#111", marginBottom: "14px" }}>
                                                    {m.date}
                                                </div>
                                                <div
                                                    style={{
                                                        width: "10px",
                                                        height: "10px",
                                                        borderRadius: "999px",
                                                        background: "#C9CDD6",
                                                        marginBottom: "14px",
                                                    }}
                                                />
                                                <div style={{ fontSize: "0.9rem", color: "#8B93A3", lineHeight: "1.25rem" }}>{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right nav */}
                    <div className="App-column-right">
                        <a href="#App-main-platform" id="mainPlatform-nav">
                            Main Platform
                        </a>
                        <a href="#Platforms-metrics-section" id="metricsPlatform-nav">
                            Metrics Platform
                        </a>
                    </div>
                </div>

                <div className="App-section" id="section-contact">
                    <Contact />
                </div>
            </div>
        </div>
    );
}

export default PlatformsPage;
