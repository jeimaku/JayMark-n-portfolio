import * as THREE from "three";

function getHex(color) {
  if (!color?.isColor) {
    return "";
  }

  return color.getHexString().toLowerCase();
}

function updateStandardMaterial(
  material,
  {
    color,
    emissive,
    emissiveIntensity,
    roughness,
    metalness,
    opacity,
    transparent,
    depthWrite,
  } = {}
) {
  if (color && material.color?.isColor) {
    material.color.set(color);
  }

  if (emissive && material.emissive?.isColor) {
    material.emissive.set(emissive);
  }

  if (
    typeof emissiveIntensity === "number" &&
    "emissiveIntensity" in material
  ) {
    material.emissiveIntensity = emissiveIntensity;
  }

  if (
    typeof roughness === "number" &&
    "roughness" in material
  ) {
    material.roughness = roughness;
  }

  if (
    typeof metalness === "number" &&
    "metalness" in material
  ) {
    material.metalness = metalness;
  }

  if (typeof opacity === "number") {
    material.opacity = opacity;
  }

  if (typeof transparent === "boolean") {
    material.transparent = transparent;
  }

  if (typeof depthWrite === "boolean") {
    material.depthWrite = depthWrite;
  }

  material.needsUpdate = true;
}

function styleDesk({ material }) {
  if (material.name === "DarkWood") {
    updateStandardMaterial(material, {
      color: "#0f172a",
      roughness: 0.48,
      metalness: 0.22,
    });

    return;
  }

  if (material.name === "Wood") {
    updateStandardMaterial(material, {
      color: "#1e293b",
      roughness: 0.52,
      metalness: 0.16,
    });
  }
}

function styleMonitor({ material }) {
  if (material.name === "metalDark") {
    updateStandardMaterial(material, {
      color: "#111827",
      roughness: 0.34,
      metalness: 0.58,
    });

    return;
  }

  if (material.name === "metal") {
    /*
     * Keep this surface neutral for now.
     * Task 3C will add the actual glowing screen interface.
     */
    updateStandardMaterial(material, {
      color: "#94a3b8",
      roughness: 0.32,
      metalness: 0.38,
    });
  }
}

function styleMicrophone({ material }) {
  const color = getHex(material.color);
  const emissive = getHex(material.emissive);

  // Original red illuminated ring.
  if (color === "b90c18" || emissive === "ff0000") {
    updateStandardMaterial(material, {
      color: "#22d3ee",
      emissive: "#0891b2",
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.5,
    });

    return;
  }

  // Lighter metallic microphone parts.
  if (color === "9c9c9c") {
    updateStandardMaterial(material, {
      color: "#64748b",
      roughness: 0.24,
      metalness: 0.72,
    });

    return;
  }

  // Remaining microphone body materials.
  updateStandardMaterial(material, {
    color: color === "000000" ? "#020617" : "#111827",
    roughness: 0.36,
    metalness: 0.5,
  });
}

function styleRouter({ material }) {
  const color = getHex(material.color);

  switch (color) {
    case "424242":
      updateStandardMaterial(material, {
        color: "#111827",
        roughness: 0.4,
        metalness: 0.34,
      });
      break;

    case "b4b4b4":
      updateStandardMaterial(material, {
        color: "#334155",
        roughness: 0.42,
        metalness: 0.32,
      });
      break;

    case "161616":
      updateStandardMaterial(material, {
        color: "#020617",
        roughness: 0.4,
        metalness: 0.4,
      });
      break;

    // Green status indicator.
    case "06e722":
      updateStandardMaterial(material, {
        color: "#22c55e",
        emissive: "#16a34a",
        emissiveIntensity: 1,
        roughness: 0.25,
        metalness: 0.18,
      });
      break;

    // Red indicator changed to an amber warning light.
    case "e70900":
      updateStandardMaterial(material, {
        color: "#f59e0b",
        emissive: "#d97706",
        emissiveIntensity: 0.9,
        roughness: 0.25,
        metalness: 0.18,
      });
      break;

    // Wi-Fi symbol.
    case "167fe7":
      updateStandardMaterial(material, {
        color: "#22d3ee",
        emissive: "#0891b2",
        emissiveIntensity: 1.15,
        roughness: 0.28,
        metalness: 0.25,
      });
      break;

    default:
      break;
  }
}

function styleServer({ material }) {
  /*
   * Preserve the two mapped server materials so the detailed server
   * hardware remains visible.
   */
  if (material.name !== "Cristal") {
    return;
  }

  // Convert the large white server door into dark transparent glass.
  updateStandardMaterial(material, {
    color: "#0f172a",
    roughness: 0.16,
    metalness: 0.22,
    opacity: 0.28,
    transparent: true,
    depthWrite: false,
  });

  material.side = THREE.DoubleSide;
  material.needsUpdate = true;
}

export const HERO_MATERIAL_STYLERS = {
  desk: styleDesk,
  monitor: styleMonitor,
  microphone: styleMicrophone,
  router: styleRouter,
  server: styleServer,
};