import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { experienceGallery } from "../../../data";

const STACK_LAYOUT = [
  {
    rotate: -7,
    x: "-52%",
    y: "-44%",
    hoverY: "-48%",
    zIndex: 10,
  },
  {
    rotate: -2,
    x: "-20%",
    y: "-58%",
    hoverY: "-62%",
    zIndex: 20,
  },
  {
    rotate: 5,
    x: "14%",
    y: "-45%",
    hoverY: "-49%",
    zIndex: 30,
  },
  {
    rotate: 8,
    x: "42%",
    y: "-26%",
    hoverY: "-30%",
    zIndex: 40,
  },
];

const transition = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 0.85,
};

function StoryNumber({ number }) {
  return (
    <span
      className="
        font-mono
        text-[0.65rem]
        tracking-[0.22em]
        text-white
      "
    >
      {number}
    </span>
  );
}

function DesktopPhotoStack({ onSelect, reduceMotion }) {
  return (
    <div
      className="
        relative
        hidden
        min-h-[510px]
        overflow-visible
        md:block
      "
    >
      {experienceGallery.map((item, index) => {
        const position = STACK_LAYOUT[index] ?? STACK_LAYOUT[0];
        const leadImage = item.images[0];

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            initial={false}
            animate={{
              x: position.x,
              y: position.y,
              rotate: position.rotate,
              scale: 1,
              zIndex: position.zIndex,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: position.hoverY,
                    rotate: 0,
                    scale: 1.035,
                    zIndex: 60,
                  }
            }
            whileFocus={
              reduceMotion
                ? undefined
                : {
                    scale: 1.025,
                    zIndex: 60,
                  }
            }
            transition={transition}
            className="
              group
              absolute
              left-1/2
              top-1/2
              w-[48%]
              max-w-[390px]
              overflow-hidden
              rounded-[1.4rem]
              border
              border-white/10
              bg-neutral-950/78
              text-left
              shadow-[0_26px_90px_rgba(0,0,0,0.45)]
              outline-none
              transition-colors
              hover:border-neutral-100/35
              focus-visible:ring-2
              focus-visible:ring-neutral-100/50
            "
            aria-label={`Open ${item.title}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={leadImage.src}
                alt={leadImage.alt}
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-[1.04]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-neutral-950/90
                  via-neutral-950/5
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  flex
                  items-end
                  justify-between
                  gap-4
                  p-5
                "
              >
                <div>
                  <StoryNumber number={item.number} />

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {item.title}
                  </p>
                </div>

                <span
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-neutral-950/60
                    text-lg
                    text-neutral-100
                    backdrop-blur
                    transition
                    group-hover:border-neutral-100/40
                    group-hover:bg-neutral-100/10
                  "
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </div>
          </motion.button>
        );
      })}

      <div
        className="
          pointer-events-none
          absolute
          bottom-1
          left-1/2
          -translate-x-1/2
          font-mono
          text-[0.6rem]
          uppercase
          tracking-[0.28em]
          text-neutral-600
        "
      >
        Select a moment
      </div>
    </div>
  );
}

function MobilePhotoStack({ onSelect }) {
  return (
    <div
      data-lenis-prevent-horizontal=""
      className="
        -mx-1
        flex
        snap-x
        snap-mandatory
        gap-4
        overflow-x-auto
        px-1
        pb-4
        md:hidden
      "
    >
      {experienceGallery.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className="
            group
            min-w-[82%]
            snap-center
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.02]
            text-left
          "
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={item.images[0].src}
              alt={item.images[0].alt}
              loading="lazy"
              decoding="async"
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>

          <div className="p-4">
            <StoryNumber number={item.number} />

            <p
              className="
                mt-1
                font-semibold
                text-white
              "
            >
              {item.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function ImageSwitcher({
  item,
  activeImageIndex,
  setActiveImageIndex,
}) {
  if (item.images.length <= 1) return null;

  return (
    <div
      className="
        mt-5
        flex
        gap-3
      "
    >
      {item.images.map((image, index) => {
        const active = activeImageIndex === index;

        return (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            className={`
              flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-2
              text-xs
              transition

              ${
                active
                  ? "border-neutral-100/45 bg-neutral-100/10 text-neutral-100"
                  : "border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/20 hover:text-white"
              }
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full

                ${
                  active
                    ? "bg-neutral-100"
                    : "bg-neutral-600"
                }
              `}
            />

            {image.label}
          </button>
        );
      })}
    </div>
  );
}

function ActiveStory({
  item,
  onClose,
  onSelectStory,
  reduceMotion,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const currentImage = item.images[activeImageIndex];

  function changeStory(id) {
    setActiveImageIndex(0);
    onSelectStory(id);
  }

  return (
    <motion.div
      key={item.id}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: -8,
            }
      }
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        overflow-hidden
        rounded-[1.6rem]
        border
        border-white/10
        bg-white/[0.025]
      "
    >
      <div
        className="
          grid
          lg:grid-cols-[1.35fr_0.8fr]
        "
      >
        {/* Active image */}
        <div
          className="
            relative
            min-h-[320px]
            overflow-hidden
            bg-neutral-950
            sm:min-h-[430px]
            lg:min-h-[560px]
          "
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 1.025,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.985,
                    }
              }
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />
          </AnimatePresence>

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-neutral-950/50
              via-transparent
              to-neutral-950/10
            "
          />

          <div
            className="
              absolute
              left-5
              top-5
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-neutral-950/65
              px-3
              py-2
              font-mono
              text-[0.6rem]
              uppercase
              tracking-[0.2em]
              text-neutral-300
              backdrop-blur-md
            "
          >
            {item.number} / 04
          </div>
        </div>

        {/* Information */}
        <div
          className="
            flex
            min-h-full
            flex-col
            justify-between
            p-6
            sm:p-8
            lg:p-10
          "
        >
          <div>
            <button
              type="button"
              onClick={onClose}
              className="
                group
                inline-flex
                items-center
                gap-2
                font-mono
                text-[0.65rem]
                uppercase
                tracking-[0.18em]
                text-neutral-500
                transition
                hover:text-white
              "
            >
              <span
                className="
                  transition-transform
                  group-hover:-translate-x-1
                "
              >
                ←
              </span>

              All moments
            </button>

            <p
              className="
                mt-10
                font-mono
                text-[0.65rem]
                uppercase
                tracking-[0.24em]
                text-white
              "
            >
              {item.eyebrow}
            </p>

            <h3
              className="
                mt-3
                text-3xl
                font-semibold
                tracking-[-0.04em]
                text-white
                sm:text-4xl
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-neutral-400
                sm:text-base
                sm:leading-8
              "
            >
              {item.description}
            </p>

            <div
              className="
                mt-7
                flex
                flex-wrap
                gap-2
              "
            >
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-3
                    py-1.5
                    font-mono
                    text-[0.6rem]
                    uppercase
                    tracking-[0.12em]
                    text-neutral-400
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            <ImageSwitcher
              item={item}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
            />
          </div>

          {/* Story navigation */}
          <div
            className="
              mt-12
              border-t
              border-white/10
              pt-5
            "
          >
            <p
              className="
                mb-3
                font-mono
                text-[0.55rem]
                uppercase
                tracking-[0.2em]
                text-neutral-600
              "
            >
              Explore
            </p>

            <div
              className="
                grid
                grid-cols-4
                gap-2
              "
            >
              {experienceGallery.map((story) => {
                const active = story.id === item.id;

                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => changeStory(story.id)}
                    aria-label={`View ${story.title}`}
                    className={`
                      rounded-lg
                      border
                      px-2
                      py-3
                      font-mono
                      text-[0.65rem]
                      transition

                      ${
                        active
                          ? "border-neutral-100/40 bg-neutral-100/10 text-neutral-100"
                          : "border-white/10 text-neutral-600 hover:border-white/20 hover:text-neutral-300"
                      }
                    `}
                  >
                    {story.number}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceGallery() {
  const [activeId, setActiveId] = useState(null);
  const reduceMotion = useReducedMotion();

  const activeStory =
    experienceGallery.find(
      (item) => item.id === activeId,
    ) ?? null;

  return (
    <section
      aria-labelledby="experience-gallery-heading"
      className="mt-24"
    >
      {/* Heading */}
      <div
        className="
          max-w-3xl
        "
      >
        <p
          className="
            font-mono
            text-[0.65rem]
            uppercase
            tracking-[0.28em]
            text-white
          "
        >
          Experience / Field Notes
        </p>

        <h2
          id="experience-gallery-heading"
          className="
            mt-4
            text-3xl
            font-semibold
            tracking-[-0.045em]
            text-white
            sm:text-4xl
            lg:text-5xl
          "
        >
          Throughout my experience at Launchpad Coworking
          &amp; 520 IT Services.
        </h2>

        <p
          className="
            mt-5
            max-w-2xl
            text-sm
            leading-7
            text-neutral-400
            sm:text-base
          "
        >
          A few moments from the software,
          infrastructure, deployments, and industry
          exposure that shaped my internship.
        </p>
      </div>

      {/* Gallery */}
      <div className="mt-14">
        <AnimatePresence mode="wait">
          {!activeStory ? (
            <motion.div
              key="gallery-overview"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              animate={{
                opacity: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                    }
              }
            >
              <DesktopPhotoStack
                onSelect={setActiveId}
                reduceMotion={reduceMotion}
              />

              <MobilePhotoStack
                onSelect={setActiveId}
              />
            </motion.div>
          ) : (
            <ActiveStory
              key="gallery-active"
              item={activeStory}
              onClose={() => setActiveId(null)}
              onSelectStory={setActiveId}
              reduceMotion={reduceMotion}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
