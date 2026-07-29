import { ReactNode, useState } from "react";
import iconExpand from "../images/figma/products/icon_expand.svg";
import iconMinimize from "../images/figma/products/icon_minimize.svg";
import checkMark from "../images/figma/scriptura/check_mark.svg";
import "./ProductFeatureShowcase.css";

export type ShowcaseFeature = {
  key: string;
  name: string;
  icon: ReactNode;
  gridDesc: string;
  altDesc: string;
  label: string;
  headline: string;
  longDesc: string;
  points: { lead: string; text: string }[];
  // Features without expanded designs yet render without an expand button
  expandable?: boolean;
};

// Grid state: every card carries an expand button (and is click-to-expand).
// Passing no onExpand renders it display-only (used on mobile while another
// card is expanded).
function SmallCard({ feature, onExpand }: { feature: ShowcaseFeature; onExpand?: () => void }) {
  const expandable = feature.expandable !== false && onExpand !== undefined;
  return (
    <div
      className={`sf-card sf-card-small ${expandable ? "sf-card-clickable" : ""}`}
      onClick={expandable ? onExpand : undefined}
      role={expandable ? "button" : undefined}
      aria-label={expandable ? `Expand ${feature.name}` : undefined}
    >
      {expandable && (
        <span className="sf-toggle">
          <img src={iconExpand} alt="" />
        </span>
      )}
      <div className="sf-icon-tile sf-icon-tile-small">{feature.icon}</div>
      <p className="sf-small-name">{feature.name}</p>
      <p className="sf-small-desc">{feature.gridDesc}</p>
    </div>
  );
}

// While another card is expanded, the rest are display-only: no expand
// button, not clickable. Minimize the featured card first, then expand.
function CompactCard({ feature }: { feature: ShowcaseFeature }) {
  return (
    <div className="sf-card sf-card-compact">
      <div className="sf-icon-tile">{feature.icon}</div>
      <p className="sf-compact-name">{feature.name}</p>
      <p className="sf-compact-desc">{feature.altDesc}</p>
    </div>
  );
}

function FeaturedCard({ feature, onMinimize }: { feature: ShowcaseFeature; onMinimize: () => void }) {
  return (
    <div className="sf-card sf-card-featured">
      <button type="button" className="sf-toggle" onClick={onMinimize} aria-label={`Minimize ${feature.name}`}>
        <img src={iconMinimize} alt="" />
      </button>
      <div className="sf-featured-left">
        <div className="sf-featured-label-row">
          <div className="sf-icon-tile">{feature.icon}</div>
          <span className="sf-featured-label">{feature.label}</span>
        </div>
        <p className="sf-featured-headline">{feature.headline}</p>
        <p className="sf-featured-desc">{feature.longDesc}</p>
        <div className="sf-points">
          {feature.points.map((point) => (
            <div className="sf-point" key={point.lead}>
              <span className="sf-point-check">
                <img src={checkMark} alt="" />
              </span>
              <p>
                <strong>{point.lead}</strong> {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="sf-demo-placeholder">Demo (coming soon)</div>
    </div>
  );
}

function ProductFeatureShowcase({ features, largeSmallTitles = false }: { features: ShowcaseFeature[]; largeSmallTitles?: boolean }) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const expanded = features.find((f) => f.key === expandedKey);
  const rest = features.filter((f) => f.key !== expandedKey);
  const titles = largeSmallTitles ? "sf-large-titles" : "";

  // Desktop: the expanded card is promoted to a featured row on top
  const desktop = !expanded ? (
    <div className={`sf-grid ${titles}`}>
      {features.map((feature) => (
        <SmallCard key={feature.key} feature={feature} onExpand={() => setExpandedKey(feature.key)} />
      ))}
    </div>
  ) : (
    <div className={`sf-expanded ${titles}`}>
      <FeaturedCard feature={expanded} onMinimize={() => setExpandedKey(null)} />
      <div className="sf-bottom-row">
        {rest.map((feature) => (
          <CompactCard key={feature.key} feature={feature} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="sf-desktop">{desktop}</div>
      {/* Mobile: cards keep their order; the expanded one grows in place */}
      <div className={`sf-mobile ${titles}`}>
        {features.map((feature) =>
          feature.key === expandedKey ? (
            <FeaturedCard key={feature.key} feature={feature} onMinimize={() => setExpandedKey(null)} />
          ) : (
            <SmallCard
              key={feature.key}
              feature={feature}
              onExpand={expanded ? undefined : () => setExpandedKey(feature.key)}
            />
          )
        )}
      </div>
    </>
  );
}

export default ProductFeatureShowcase;
