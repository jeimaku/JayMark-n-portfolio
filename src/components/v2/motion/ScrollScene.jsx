import useSectionScroll from "../../../hooks/useSectionScroll";

export default function ScrollScene({
  children,
  className = "",
  offset,
  inputRange,
  yRange,
  scaleRange,
  opacityRange,
}) {
  const values = useSectionScroll({
    offset,
    inputRange,
    yRange,
    scaleRange,
    opacityRange,
  });

  return (
    <div
      ref={values.ref}
      data-scroll-scene=""
      className={[
        "relative",
        className,
      ].join(" ")}
    >
      {typeof children === "function"
        ? children(values)
        : children}
    </div>
  );
}