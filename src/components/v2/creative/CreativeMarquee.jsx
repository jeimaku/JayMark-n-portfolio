import {
  useRef,
  useState,
} from "react";
import {
  motion,
  useInView,
} from "motion/react";

import CreativeArtworkItem from "./CreativeArtworkItem";

function ArtworkSequence({
  artworks,
  duplicate = false,
  hoveredArtworkId,
  label,
  onArtworkBlur,
  onArtworkFocus,
  onArtworkOpen,
  onArtworkPointerEnter,
  onArtworkPointerLeave,
  staticLayout = false,
}) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : label}
      className="creative-marquee-group"
    >
      {artworks.map((artwork) => (
        <CreativeArtworkItem
          key={`${artwork.id}-${duplicate ? "duplicate" : "primary"}`}
          artwork={artwork}
          duplicate={duplicate}
          inactive={
            Boolean(hoveredArtworkId) &&
            hoveredArtworkId !== artwork.id
          }
          staticLayout={staticLayout}
          onBlur={onArtworkBlur}
          onFocus={() => onArtworkFocus?.(artwork.id)}
          onOpen={onArtworkOpen}
          onPointerEnter={() => onArtworkPointerEnter?.(artwork.id)}
          onPointerLeave={onArtworkPointerLeave}
        />
      ))}
    </ul>
  );
}

function CreativeMarqueeLane({
  artworkById,
  lane,
  onOpen,
  paused,
  staticLayout,
}) {
  const [hoveredArtworkId, setHoveredArtworkId] =
    useState(null);

  const artworks = lane.imageIds
    .map((id) => artworkById.get(id))
    .filter(Boolean);

  if (artworks.length === 0) {
    return null;
  }

  const clearHoveredArtwork = () => {
    setHoveredArtworkId(null);
  };

  const handleBlur = (event) => {
    if (
      event.currentTarget.parentElement?.parentElement?.contains(
        event.relatedTarget
      )
    ) {
      return;
    }

    clearHoveredArtwork();
  };

  const itemProps = {
    artworks,
    hoveredArtworkId,
    label: lane.label,
    onArtworkBlur: handleBlur,
    onArtworkFocus: setHoveredArtworkId,
    onArtworkOpen: onOpen,
    onArtworkPointerEnter: setHoveredArtworkId,
    onArtworkPointerLeave: clearHoveredArtwork,
    staticLayout,
  };

  if (staticLayout) {
    return (
      <div className="creative-marquee-row relative">
        <div
          data-lenis-prevent-horizontal=""
          className="creative-marquee-static-rail -mx-1 snap-x snap-mandatory overflow-x-auto px-1 pb-3"
        >
          <ArtworkSequence {...itemProps} />
        </div>
      </div>
    );
  }

  return (
    <div
      data-paused={paused ? "true" : undefined}
      className="creative-marquee-row relative"
      onPointerLeave={clearHoveredArtwork}
    >
      <div className="creative-marquee-viewport">
        <div
          className={[
            "creative-marquee-track",
            lane.direction === "right"
              ? "creative-marquee-track--right"
              : "creative-marquee-track--left",
          ].join(" ")}
          style={{
            "--creative-marquee-duration": `${lane.duration}s`,
          }}
        >
          <ArtworkSequence {...itemProps} />
          <ArtworkSequence {...itemProps} duplicate />
        </div>
      </div>
    </div>
  );
}

export default function CreativeMarquee({
  allowEntranceMotion = true,
  artworks = [],
  lanes = [],
  onOpen,
  paused = false,
  staticLayout = false,
}) {
  const marqueeRef = useRef(null);
  const isInView = useInView(marqueeRef, {
    amount: 0.04,
  });
  const artworkById = new Map(
    artworks.map((artwork) => [artwork.id, artwork])
  );
  const shouldPause = paused || (!staticLayout && !isInView);

  return (
    <div
      ref={marqueeRef}
      role="region"
      aria-label="Selected visual work"
      className="space-y-5 sm:space-y-6"
    >
      {lanes.map((lane) => (
        <motion.div
          key={lane.id}
          initial={
            allowEntranceMotion
              ? { opacity: 0, y: 18 }
              : false
          }
          whileInView={
            allowEntranceMotion
              ? { opacity: 1, y: 0 }
              : undefined
          }
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.62,
            delay:
              lane.direction === "right"
                ? 0.12
                : 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CreativeMarqueeLane
            artworkById={artworkById}
            lane={lane}
            onOpen={onOpen}
            paused={shouldPause}
            staticLayout={staticLayout}
          />
        </motion.div>
      ))}
    </div>
  );
}
