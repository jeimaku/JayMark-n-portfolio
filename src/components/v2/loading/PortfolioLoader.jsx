import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "motion/react";


// --------------------------------------------------
// Motion constants
// --------------------------------------------------

const MOTION_EASE = [
  0.22,
  1,
  0.36,
  1,
];


// --------------------------------------------------
// Timing
// --------------------------------------------------

const NORMAL_TIMING = {
  readyDelay: 1450,
  exitDelay: 1900,
};

const REDUCED_TIMING = {
  readyDelay: 450,
  exitDelay: 780,
};


// --------------------------------------------------
// Performance detection
// --------------------------------------------------

function getPerformanceMode() {
  if (
    typeof navigator === "undefined"
  ) {
    return false;
  }


  const lowCPU =
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4;


  const lowMemory =
    navigator.deviceMemory &&
    navigator.deviceMemory <= 4;


  return Boolean(
    lowCPU ||
    lowMemory
  );
}


// --------------------------------------------------
// Reduced motion detection
// --------------------------------------------------

function useReducedMotion() {
  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);


  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );


    const update = () => {
      setReducedMotion(
        media.matches
      );
    };


    update();


    media.addEventListener(
      "change",
      update
    );


    return () => {
      media.removeEventListener(
        "change",
        update
      );
    };
  }, []);


  return reducedMotion;
}


// --------------------------------------------------
// Utility
// --------------------------------------------------

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map(
      (part) =>
        part[0]
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


// --------------------------------------------------
// Corner Marker
// --------------------------------------------------

function CornerMarker({
  position,
  reducedMotion,
  lowPerformance,
}) {

  const positions = {
    topLeft:
      "left-0 top-0 border-l border-t",

    topRight:
      "right-0 top-0 border-r border-t",

    bottomLeft:
      "left-0 bottom-0 border-l border-b",

    bottomRight:
      "right-0 bottom-0 border-r border-b",
  };


  return (
    <motion.span
      aria-hidden="true"
      className={[
        "absolute",
        "h-10",
        "w-10",
        "border-cyan-300/60",
        positions[position],
      ].join(" ")}
      initial={{
        opacity: 0,
        scale:
          lowPerformance
            ? 1
            : 0.85,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration:
          reducedMotion ||
          lowPerformance
            ? 0.25
            : 0.7,

        delay:
          reducedMotion ||
          lowPerformance
            ? 0
            : 0.15,

        ease: MOTION_EASE,
      }}
    />
  );
}


// --------------------------------------------------
// Portfolio Mark
// --------------------------------------------------

function PortfolioMark({
  initials,
  isExiting,
  reducedMotion,
  lowPerformance,
}) {

  return (
    <motion.div
      className="
        relative
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-2xl
        border
        border-cyan-300/30
        bg-slate-900/70
      "

      initial={{
        opacity: 0,
        y: 20,
        filter:
          lowPerformance
            ? "blur(0px)"
            : "blur(5px)",
      }}

      animate={
        isExiting
          ? {
              opacity: 0,
              y: -40,
              filter:
                lowPerformance
                  ? "blur(0px)"
                  : "blur(5px)",
            }

          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
      }

      transition={{
        duration:
          reducedMotion ||
          lowPerformance
            ? 0.25
            : 0.8,

        ease: MOTION_EASE,
      }}
    >

      <span
        className="
          text-3xl
          font-semibold
          tracking-tight
          text-cyan-100
        "
      >
        {initials}
      </span>

    </motion.div>
  );
}

// --------------------------------------------------
// Loader Identity
// --------------------------------------------------

function LoaderIdentity({
  initials,
  phase,
  isExiting,
  reducedMotion,
  lowPerformance,
}) {
  const showIdentity =
    phase !== "idle";


  return (
    <motion.div
      className="
        flex
        flex-col
        items-center
        gap-6
        text-center
      "

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity:
          showIdentity
            ? 1
            : 0,
      }}

      transition={{
        duration:
          reducedMotion ||
          lowPerformance
            ? 0.25
            : 0.6,

        ease: MOTION_EASE,
      }}
    >

      <PortfolioMark
        initials={initials}
        isExiting={isExiting}
        reducedMotion={reducedMotion}
        lowPerformance={lowPerformance}
      />


      <motion.div
        initial={{
          opacity: 0,
          y: 18,
          filter:
            lowPerformance
              ? "blur(0px)"
              : "blur(5px)",
        }}

        animate={{
          opacity:
            phase === "identity" ||
            phase === "ready"
              ? 1
              : 0,

          y: 0,

          filter:
            "blur(0px)",
        }}

        transition={{
          duration:
            reducedMotion ||
            lowPerformance
              ? 0.25
              : 0.7,

          delay:
            reducedMotion ||
            lowPerformance
              ? 0
              : 0.15,

          ease: MOTION_EASE,
        }}

        className="
          space-y-2
        "
      >

      <h1
        className="
          text-3xl
          font-semibold
          tracking-tight
          text-white
        "
      >
        JAY MARK APELADO
      </h1>


      <div
        className="
          mt-3
          flex
          flex-col
          items-center
          gap-1
          text-sm
          uppercase
          tracking-[0.35em]
          text-cyan-300/80
        "
      >

        <span>
          FULL-STACK DEVELOPER
        </span>


        <span
          className="
            text-cyan-200/60
          "
        >
          •
        </span>


        <span>
          IT SUPPORT SPECIALIST
        </span>

      </div>

      </motion.div>

    </motion.div>
  );
}



// --------------------------------------------------
// Loading Line
// --------------------------------------------------

function LoadingLine({
  phase,
  reducedMotion,
  lowPerformance,
}) {

  const completed =
    phase === "ready";


  return (
    <div
      className="
        relative
        mt-10
        h-px
        w-64
        overflow-hidden
        bg-white/10
      "
    >

      <motion.span
        className="
          absolute
          left-0
          top-0
          h-full
          bg-cyan-300
        "

        initial={{
          width: "0%",
        }}

        animate={{
          width:
            completed
              ? "100%"
              : "65%",
        }}

        transition={{
          duration:
            reducedMotion ||
            lowPerformance
              ? 0.4
              : 1.05,

          ease: MOTION_EASE,
        }}
      />


      {!reducedMotion &&
      !lowPerformance ? (
        <motion.span
          aria-hidden="true"
          className="
            absolute
            right-0
            top-1/2
            h-2
            w-2
            -translate-y-1/2
            rounded-full
            bg-cyan-300
          "

          animate={{
            opacity: [
              0.3,
              1,
              0.3,
            ],
          }}

          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}

    </div>
  );
}

// --------------------------------------------------
// Main Portfolio Loader
// --------------------------------------------------

export default function PortfolioLoader({
  onComplete,
}) {

  const reducedMotion =
    useReducedMotion();


  const lowPerformance =
    useMemo(
      () =>
        getPerformanceMode(),
      []
    );


  const [
    phase,
    setPhase,
  ] = useState(
    "identity"
  );


  const [
    isExiting,
    setIsExiting,
  ] = useState(false);



  const initials =
    useMemo(
      () =>
        getInitials(
          "Jay Mark Apelado"
        ),
      []
    );



  const timing =
    reducedMotion
      ? REDUCED_TIMING
      : NORMAL_TIMING;



  // ------------------------------------------------
  // Lifecycle + scroll lock
  // ------------------------------------------------

  useEffect(() => {

    document.body.style.overflow =
      "hidden";


    const readyTimer =
      setTimeout(
        () => {
          setPhase(
            "ready"
          );
        },
        timing.readyDelay
      );


    const exitTimer =
      setTimeout(
        () => {

          setIsExiting(
            true
          );


          document.body.style.overflow =
            "";


          setTimeout(
            () => {

              onComplete?.();

            },
            reducedMotion
              ? 100
              : 650
          );


        },
        timing.exitDelay
      );



    return () => {

      clearTimeout(
        readyTimer
      );

      clearTimeout(
        exitTimer
      );


      document.body.style.overflow =
        "";

    };

  }, [
    timing,
    reducedMotion,
    onComplete,
  ]);



  return (

    <motion.div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#020617]
      "


      animate={{
        y:
          isExiting
            ? "-100%"
            : "0%",
      }}


      transition={{
        duration:
          reducedMotion
            ? 0.25
            : 0.75,

        ease: MOTION_EASE,
      }}
    >


      {/* ------------------------------------------
          Background atmosphere
      ------------------------------------------ */}


      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >


        <motion.div

          className="
            absolute
            left-1/2
            top-1/2
            h-[30rem]
            w-[30rem]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "


          initial={{
            opacity: 0,
            scale:
              lowPerformance
                ? 1
                : 0.8,
          }}


          animate={{
            opacity: 1,
            scale: 1,
          }}


          transition={{
            duration:
              lowPerformance
                ? 0.35
                : 1.2,

            ease: MOTION_EASE,
          }}

        />



        {!lowPerformance ? (

          <motion.div

            className="
              absolute
              right-[-10rem]
              bottom-[-10rem]
              h-[22rem]
              w-[22rem]
              rounded-full
              bg-blue-400/10
              blur-3xl
            "


            initial={{
              opacity: 0,
              scale: 0.75,
            }}


            animate={{
              opacity: 1,
              scale: 1,
            }}


            transition={{
              duration: 1.2,
              ease: MOTION_EASE,
            }}

          />

        ) : null}



        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            bg-[linear-gradient(to_right,#67e8f9_1px,transparent_1px),linear-gradient(to_bottom,#67e8f9_1px,transparent_1px)]
            bg-[size:80px_80px]
          "
        />


      </div>



      {/* ------------------------------------------
          Corner markers
      ------------------------------------------ */}


      <CornerMarker
        position="topLeft"
        reducedMotion={reducedMotion}
        lowPerformance={lowPerformance}
      />


      <CornerMarker
        position="topRight"
        reducedMotion={reducedMotion}
        lowPerformance={lowPerformance}
      />


      <CornerMarker
        position="bottomLeft"
        reducedMotion={reducedMotion}
        lowPerformance={lowPerformance}
      />


      <CornerMarker
        position="bottomRight"
        reducedMotion={reducedMotion}
        lowPerformance={lowPerformance}
      />



      {/* ------------------------------------------
          Main identity
      ------------------------------------------ */}


      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
        "
      >


        <LoaderIdentity

          initials={initials}

          phase={phase}

          isExiting={isExiting}

          reducedMotion={reducedMotion}

          lowPerformance={lowPerformance}

        />



        <LoadingLine

          phase={phase}

          reducedMotion={reducedMotion}

          lowPerformance={lowPerformance}

        />



        <motion.p

          className="
            mt-6
            text-xs
            uppercase
            tracking-[0.4em]
            text-slate-400
          "


          initial={{
            opacity: 0,
          }}


          animate={{
            opacity:
              phase === "ready"
                ? 1
                : 0,
          }}


          transition={{
            duration:
              reducedMotion ||
              lowPerformance
                ? 0.25
                : 0.5,
          }}

        >

          SYSTEM READY

        </motion.p>


      </div>


    </motion.div>

  );

}