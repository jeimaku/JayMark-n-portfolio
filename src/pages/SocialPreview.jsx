export default function SocialPreview() {
  const technologies = [
    "React.js",
    "Node.js",
    "Supabase",
    "AI Systems",
    "Tailwind CSS",
    "UI/UX",
  ];

  const metrics = [
    {
      label: "Systems Built",
      value: "04",
    },
    {
      label: "Primary Stack",
      value: "Full",
    },
    {
      label: "Focus",
      value: "AI + Web",
    },
  ];

  const activeStack = [
    "React",
    "Node",
    "Supabase",
    "AI",
  ];

  const stars = [
    [12, 18],
    [22, 42],
    [34, 20],
    [48, 35],
    [65, 16],
    [78, 28],
    [90, 18],
    [85, 65],
    [70, 78],
    [42, 72],
    [18, 82],
  ];

  return (
    <div
      className="
        relative
        h-[630px]
        w-[1200px]
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #ffffff 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              #ffffff 1px,
              transparent 1px
            )
          `,
          backgroundSize: "64px 64px",
        }}
      />


      {/* Glow layers */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
        "
        style={{
          background: `
            radial-gradient(
              ellipse 45% 60% at 22% 50%,
              rgba(255,255,255,0.12),
              transparent 70%
            ),
            radial-gradient(
              ellipse 35% 55% at 85% 50%,
              rgba(255,255,255,0.10),
              transparent 70%
            )
          `,
        }}
      />


      {/* Constellation points */}
      <div
        className="
          absolute
          inset-0
        "
      >
        {stars.map(([x, y], index) => (
          <span
            key={index}
            className="
              absolute
              h-1
              w-1
              rounded-full
              bg-neutral-100/50
            "
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        ))}
      </div>


      {/* Frame */}
      <div
        className="
          absolute
          inset-6
          rounded-3xl
          border
          border-white/[0.08]
        "
      />


      {/* Main content */}
      <div
        className="
          relative
          flex
          h-full
          items-center
          justify-between
          gap-12
          px-20
        "
      >

        {/* LEFT SIDE */}
        <div
          className="
            max-w-[650px]
          "
        >

          {/* Status */}
          <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-neutral-100/20
              bg-neutral-100/[0.05]
              px-4
              py-2
              font-mono
              text-xs
              uppercase
              tracking-[0.22em]
              text-white
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
              "
            />

            Available for opportunities
          </div>


          {/* Name */}
          <h1
            className="
              text-[68px]
              font-semibold
              leading-[0.95]
              tracking-[-0.06em]
              text-white
            "
          >
            Jay Mark Apelado
          </h1>


          {/* Role */}
          <p
            className="
              mt-5
              font-mono
              text-sm
              uppercase
              tracking-[0.32em]
              text-neutral-100
            "
          >
            Full-Stack Developer · IT Support Specialist
          </p>


          {/* Description */}
          <p
            className="
              mt-7
              max-w-xl
              text-lg
              leading-relaxed
              text-neutral-400
            "
          >
            Building reliable systems,
            AI-assisted platforms,
            and practical digital solutions.
          </p>


          {/* Technologies */}
          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
            "
          >
            {technologies.map((tech) => (
              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-neutral-100/20
                  bg-white/[0.03]
                  px-4
                  py-2
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.16em]
                  text-neutral-300
                "
              >
                {tech}
              </span>
            ))}
          </div>

        </div>



        {/* RIGHT DASHBOARD */}
        <div
          className="
            relative
            w-[330px]
            rounded-3xl
            border
            border-white/[0.10]
            bg-neutral-950/70
            p-6
            shadow-2xl
            backdrop-blur
          "
        >

          {/* Header */}
          <div
            className="
              flex
              items-start
              justify-between
              border-b
              border-white/[0.08]
              pb-5
            "
          >

            <div>
              <p
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-neutral-100
                "
              >
                jaymark.dev
              </p>

              <p
                className="
                  mt-2
                  text-xs
                  text-neutral-500
                "
              >
                System overview
              </p>
            </div>


            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
              "
            />

          </div>



          {/* Metrics */}
          <div
            className="
              mt-6
              space-y-5
            "
          >
            {metrics.map((item) => (
              <div
                key={item.label}
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                    text-neutral-400
                  "
                >
                  {item.label}
                </span>


                <span
                  className="
                    font-mono
                    text-sm
                    text-neutral-100
                  "
                >
                  {item.value}
                </span>

              </div>
            ))}
          </div>



          {/* Active stack */}
          <div
            className="
              mt-7
              rounded-2xl
              border
              border-neutral-100/10
              bg-neutral-100/[0.03]
              p-4
            "
          >

            <p
              className="
                font-mono
                text-[0.65rem]
                uppercase
                tracking-[0.25em]
                text-neutral-500
              "
            >
              Active Stack
            </p>


            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-2
              "
            >
              {activeStack.map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-white/[0.08]
                    px-3
                    py-1
                    text-xs
                    text-neutral-300
                  "
                >
                  {item}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}