import { Suspense } from "react";

import {
  HERO_MODEL_LAYOUT,
  HERO_MODEL_PATHS,
  HERO_WORKSPACE_TRANSFORM,
} from "../config/heroSceneConfig";

import { HERO_MATERIAL_STYLERS } from "../materials/heroMaterialStyles";

import AssetPlaceholder from "./AssetPlaceholder";
import FloatingPlatform from "./FloatingPlatform";
import NormalizedModel from "./NormalizedModel";

function WorkspaceAsset({
  url,
  layout,
  placeholderSize,
  materialStyler,
}) {
  return (
    <Suspense
      fallback={
        <AssetPlaceholder
          position={layout.position}
          size={placeholderSize}
        />
      }
    >
      <NormalizedModel
        url={url}
        materialStyler={materialStyler}
        {...layout}
      />
    </Suspense>
  );
}

export default function HeroWorkspace() {
  return (
    <group
      position={HERO_WORKSPACE_TRANSFORM.position}
      rotation={HERO_WORKSPACE_TRANSFORM.rotation}
      scale={HERO_WORKSPACE_TRANSFORM.scale}
    >
      <FloatingPlatform />

      <WorkspaceAsset
        url={HERO_MODEL_PATHS.desk}
        layout={HERO_MODEL_LAYOUT.desk}
        placeholderSize={[1.8, 0.8, 0.9]}
        materialStyler={HERO_MATERIAL_STYLERS.desk}
      />

      <WorkspaceAsset
        url={HERO_MODEL_PATHS.monitor}
        layout={HERO_MODEL_LAYOUT.monitor}
        placeholderSize={[0.9, 0.65, 0.15]}
        materialStyler={HERO_MATERIAL_STYLERS.monitor}
      />

      <WorkspaceAsset
        url={HERO_MODEL_PATHS.microphone}
        layout={HERO_MODEL_LAYOUT.microphone}
        placeholderSize={[0.25, 0.6, 0.25]}
        materialStyler={HERO_MATERIAL_STYLERS.microphone}
      />

      <WorkspaceAsset
        url={HERO_MODEL_PATHS.router}
        layout={HERO_MODEL_LAYOUT.router}
        placeholderSize={[0.45, 0.18, 0.3]}
        materialStyler={HERO_MATERIAL_STYLERS.router}
      />

      <WorkspaceAsset
        url={HERO_MODEL_PATHS.server}
        layout={HERO_MODEL_LAYOUT.server}
        placeholderSize={[0.65, 1.5, 0.6]}
        materialStyler={HERO_MATERIAL_STYLERS.server}
      />
    </group>
  );
}