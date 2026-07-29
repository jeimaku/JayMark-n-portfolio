export const HERO_MODEL_PATHS = {
  desk:
    "/old-portfolio-assets/3d/hero/workstation/desk/quaternius-desk.glb",

  monitor:
    "/old-portfolio-assets/3d/hero/workstation/monitor/computer-screen.glb",

  microphone:
    "/old-portfolio-assets/3d/hero/talkready/microphone/hlibkarman-microphone.glb",

  router:
    "/old-portfolio-assets/3d/hero/infrastructure/server-network/mastertux-router-63.glb",

  server:
    "/old-portfolio-assets/3d/hero/infrastructure/server-rack/anais3dcraft-server-rack.glb",
};

export const HERO_HDRI_PATH =
  "/old-portfolio-assets/3d/hero/environment/studio-small-08/studio_small_08_1k.hdr";

/*
 * Moves the entire workstation without changing the internal arrangement.
 *
 * More negative X = farther left.
 * Example:
 * -0.55 = current recommendation
 * -0.75 = farther left
 * -0.35 = slightly right
 */
export const HERO_WORKSPACE_TRANSFORM = {
  position: [-0.55, 0, 0],
  rotation: [0, 0, 0],
  scale: 1,
};

export const HERO_MODEL_LAYOUT = {
  desk: {
    position: [-0.72, 0.03, 0.3],
    rotation: [0, -0.08, 0],
    fit: "height",
    targetSize: 1.05,
  },

  monitor: {
    position: [-0.94, 1.08, 0.13],
    rotation: [0, Math.PI + 0.06, 0],
    fit: "height",
    targetSize: 0.85,
  },

  microphone: {
    position: [0.01, 1.08, 0.45],
    rotation: [0, -0.22, 0],
    fit: "height",
    targetSize: 0.52,
  },

  router: {
    /*
     * The router is now slightly farther left and lower,
     * so it rests more naturally on the desk.
     */
    position: [-0.10, 1.08, 0.15],
    rotation: [0, -0.25, 0],
    fit: "height",
    targetSize: 0.28,
  },

  server: {
    position: [1.82, 0.03, -0.48],
    rotation: [0, -0.52, 0],
    fit: "height",
    targetSize: 2.55,
  },
};