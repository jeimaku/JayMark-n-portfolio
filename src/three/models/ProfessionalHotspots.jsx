import { heroSceneContext } from "../../data/heroSceneContext";
import ProfessionalHotspot from "./ProfessionalHotspot";

export default function ProfessionalHotspots({
  activeContextId,
  onContextChange,
}) {
  return (
    <group>
      {heroSceneContext.map((item) => (
        <ProfessionalHotspot
          key={item.id}
          item={item}
          active={activeContextId === item.id}
          onActivate={onContextChange}
        />
      ))}
    </group>
  );
}