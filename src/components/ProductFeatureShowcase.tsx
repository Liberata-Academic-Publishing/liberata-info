import { ReactNode, useEffect, useRef, useState } from "react";
import iconExpand from "../images/figma/products/icon_expand.svg";
import iconMinimize from "../images/figma/products/icon_minimize.svg";
import iconCarouselNext from "../images/figma/products/icon_carousel_next.svg";
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
  // Product screenshots for the demo slot, in slide order. Features without
  // any fall back to the "Demo (coming soon)" placeholder; a single slide
  // renders without carousel controls.
  demo?: string[];
  demoAlt?: string;
  // Features without expanded designs yet render without an expand button
  expandable?: boolean;
};

// Grid state: the whole card is clickable to expand, not just the corner
// button — the button is a visual cue and stays independently keyboard-
// operable, but the card itself is the bigger, easier mouse/touch target.
// Passing no onExpand renders the card display-only.
function SmallCard({ feature, onExpand }: { feature: ShowcaseFeature; onExpand?: () => void }) {
  const expandable = feature.expandable !== false && onExpand !== undefined;
  return (
    <div
      className={`sf-card sf-card-small${expandable ? " sf-card-clickable" : ""}`}
      onClick={expandable ? onExpand : undefined}
      // iOS Safari only applies :active styles to elements with a directly
      // attached touch/click listener — React's onClick is delegated, so
      // without this no-op the :active press state below silently never
      // fires on iPhone (still works fine everywhere else without it).
      onTouchStart={expandable ? () => {} : undefined}
    >
      {expandable && (
        <button type="button" className="sf-toggle" onClick={onExpand} aria-label={`Expand ${feature.name}`}>
          <img src={iconExpand} alt="" />
        </button>
      )}
      <div className="sf-icon-tile sf-icon-tile-small">{feature.icon}</div>
      <p className="sf-small-name">{feature.name}</p>
      <p className="sf-small-desc">{feature.gridDesc}</p>
    </div>
  );
}

// While another card is expanded, the rest sit in the bottom row. Each still
// gets its own expand button and is fully clickable, so switching between
// cards is a single click — no need to minimize the current one first.
function CompactCard({ feature, onExpand }: { feature: ShowcaseFeature; onExpand?: () => void }) {
  const expandable = feature.expandable !== false && onExpand !== undefined;
  return (
    <div
      className={`sf-card sf-card-compact${expandable ? " sf-card-clickable" : ""}`}
      onClick={expandable ? onExpand : undefined}
    >
      {expandable && (
        <button type="button" className="sf-toggle" onClick={onExpand} aria-label={`Expand ${feature.name}`}>
          <img src={iconExpand} alt="" />
        </button>
      )}
      <div className="sf-icon-tile">{feature.icon}</div>
      {/* same name/description styling and copy as the grid's SmallCard
          (sf-small-name/-desc, gridDesc) — compact cards are just the grid
          cards demoted to a bottom row while another card is expanded, so
          the text shouldn't change size or content when that happens */}
      <p className="sf-small-name">{feature.name}</p>
      <p className="sf-small-desc">{feature.gridDesc}</p>
    </div>
  );
}

// The demo slot. One slide renders as a plain screenshot; several add the
// design's dot row and next arrow (Figma 1056:15995 / Component 5), and
// slide via a continuous track (.sf-demo-track in the CSS) rather than
// cutting between images — on desktop that's triggered by the arrow
// buttons or dots, on mobile also by dragging, which drags the neighbour
// in and follows your finger.
const SNAP_MS = 260;

export function DemoCarousel({ slides, name, alt, mobile = false }: { slides: string[]; name: string; alt: string; mobile?: boolean }) {
  const [index, setIndex] = useState(0);
  // Mobile-only: drag offset in px, added on top of the track's index-based
  // base position — 0 except while actively dragging.
  const [dragPx, setDragPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const go = (i: number) => setIndex((i + count) % count);

  useEffect(() => {
    if (count < 2) return;
    if (mobile) {
      // A swipe can reach any slide within a couple of gestures, so warm the
      // whole set right away rather than just the immediate neighbours.
      slides.forEach((slide) => {
        const img = new Image();
        img.src = slide;
      });
    } else {
      for (const offset of [1, -1]) {
        const neighbour = new Image();
        neighbour.src = slides[(index + offset + count) % count];
      }
    }
  }, [index, count, slides, mobile]);

  if (count < 2) {
    return (
      <div className="sf-demo-placeholder sf-demo-image">
        <img src={slides[0]} alt={alt} />
      </div>
    );
  }

  const handleTouchEnd = () => {
    if (touchX.current === null) return;
    touchX.current = null;
    setDragging(false);
    // One continuous strip of every slide (below), so finishing the drag is
    // just moving the index by one — the same math either direction, and the
    // transition animates the rest of the way from wherever the finger let go.
    if (Math.abs(dragPx) > 40) {
      setIndex((i) => (i + (dragPx < 0 ? 1 : -1) + count) % count);
    }
    setDragPx(0);
  };

  return (
    <div
      className="sf-demo-placeholder sf-demo-image sf-demo-carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
        setDragging(true);
      }}
      onTouchMove={(e) => {
        if (touchX.current === null) return;
        setDragPx(e.touches[0].clientX - touchX.current);
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="sf-demo-track"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(calc(${(-index / count) * 100}% + ${dragPx}px))`,
          transition: dragging ? "none" : `transform ${SNAP_MS}ms ease`,
        }}
      >
        {slides.map((slide, i) => (
          <div className="sf-demo-slide" style={{ flexBasis: `${100 / count}%` }} key={slide}>
            <img
              src={slide}
              alt={i === index ? `${alt} (${index + 1} of ${count})` : ""}
              aria-hidden={i === index ? undefined : true}
            />
          </div>
        ))}
      </div>
      <button type="button" className="sf-demo-prev" aria-label={`Previous ${name} demo`} onClick={() => go(index - 1)}>
        <img src={iconCarouselNext} alt="" />
      </button>
      <div className="sf-demo-dots">
        {slides.map((slide, i) => (
          <button
            key={slide}
            type="button"
            className={`sf-demo-dot${i === index ? " is-active" : ""}`}
            aria-label={`Show ${name} demo ${i + 1} of ${count}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <button type="button" className="sf-demo-next" aria-label={`Next ${name} demo`} onClick={() => go(index + 1)}>
        <img src={iconCarouselNext} alt="" />
      </button>
    </div>
  );
}

function FeaturedCard({ feature, onMinimize, mobile = false }: { feature: ShowcaseFeature; onMinimize: () => void; mobile?: boolean }) {
  return (
    <div className="sf-card sf-card-featured">
      <button type="button" className="sf-toggle" onClick={onMinimize} aria-label={`Minimize ${feature.name}`}>
        <img src={iconMinimize} alt="" />
      </button>
      {/* Icon, headline, description, and checklist all live in the left
          column; the demo carousel is its own column on the right (and
          falls after all the text once the columns stack on mobile) */}
      <div className="sf-featured-left">
        <div className="sf-featured-label-row">
          <div className="sf-icon-tile">{feature.icon}</div>
          <span className="sf-featured-label">{feature.label}</span>
        </div>
        <p className="sf-featured-headline">{feature.headline}</p>
        <p className="sf-featured-desc">{feature.longDesc}</p>
        <div className="sf-points">
          {feature.points.map((point, i) => (
            // keyed by feature + index, not point.lead — the two PLACEHOLDER
            // features currently reuse "PLACEHOLDER." as every point's lead,
            // and duplicate keys within one list corrupt React's reconciliation:
            // switching from one of those to a different feature could leave
            // stale point rows behind instead of swapping them out cleanly.
            <div className="sf-point" key={`${feature.key}-${i}`}>
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
      <div className="sf-featured-right">
        {feature.demo?.length ? (
          /* keyed so switching features restarts the carousel at slide 1 */
          <DemoCarousel
            key={feature.key}
            slides={feature.demo}
            name={feature.name}
            alt={feature.demoAlt ?? `${feature.name} preview`}
            mobile={mobile}
          />
        ) : (
          <div className="sf-demo-placeholder">Demo (coming soon)</div>
        )}
      </div>
    </div>
  );
}

function ProductFeatureShowcase({ features, largeSmallTitles = false }: { features: ShowcaseFeature[]; largeSmallTitles?: boolean }) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const expanded = features.find((f) => f.key === expandedKey);
  const rest = features.filter((f) => f.key !== expandedKey);
  const titles = largeSmallTitles ? "sf-large-titles" : "";
  // How many columns the grid should wrap to before the mobile stack takes
  // over, based on how many cards there are — Scriptura's 6 want 3 columns
  // (two rows of three), Mensura's 4 want 2 (a clean 2x2). Tied to card
  // count instead of a per-page prop so it stays correct if either page's
  // feature list changes size later. See the sf-grid-cols-* media queries
  // in ProductFeatureShowcase.css.
  const gridCols = features.length >= 5 ? "sf-grid-cols-3" : "sf-grid-cols-2";

  // Desktop: the expanded card is promoted to a featured row on top
  const desktop = !expanded ? (
    <div className={`sf-grid ${gridCols} ${titles}`}>
      {features.map((feature) => (
        <SmallCard key={feature.key} feature={feature} onExpand={() => setExpandedKey(feature.key)} />
      ))}
    </div>
  ) : (
    <div className={`sf-expanded ${titles}`}>
      <FeaturedCard feature={expanded} onMinimize={() => setExpandedKey(null)} />
      {/* stays one row regardless of width, unlike .sf-grid above — the
          expanded card is already the focal point, so the rest just line
          up underneath rather than reflowing into their own grid */}
      <div className="sf-bottom-row">
        {rest.map((feature) => (
          <CompactCard key={feature.key} feature={feature} onExpand={() => setExpandedKey(feature.key)} />
        ))}
      </div>
    </div>
  );

  // Mobile is an accordion: tapping any card expands it and collapses the
  // previous one, so nobody has to scroll back up to minimize first. The
  // scroll nudge keeps the tapped card in view after the card above it
  // collapses and shifts the layout.
  const expandOnMobile = (key: string) => {
    setExpandedKey(key);
    setTimeout(() => {
      document.getElementById(`sf-mobile-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <>
      <div className="sf-desktop">{desktop}</div>
      {/* Mobile: cards keep their order; the expanded one grows in place */}
      <div className={`sf-mobile ${titles}`}>
        {features.map((feature) => (
          <div className="sf-mobile-slot" id={`sf-mobile-${feature.key}`} key={feature.key}>
            {feature.key === expandedKey ? (
              <FeaturedCard feature={feature} onMinimize={() => setExpandedKey(null)} mobile />
            ) : (
              <SmallCard feature={feature} onExpand={() => expandOnMobile(feature.key)} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductFeatureShowcase;
