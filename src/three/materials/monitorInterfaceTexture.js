import * as THREE from "three";

let cachedMonitorTexture = null;

function drawRoundedRect(
  context,
  x,
  y,
  width,
  height,
  radius
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + safeRadius
  );
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height
  );
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - safeRadius
  );
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawMetricCard(
  context,
  {
    x,
    y,
    width,
    height,
    label,
    value,
    accent,
    progress,
  }
) {
  drawRoundedRect(context, x, y, width, height, 22);

  context.fillStyle = "rgba(17, 17, 17, 0.92)";
  context.fill();

  context.strokeStyle = "rgba(163, 163, 163, 0.18)";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = "rgba(163, 163, 163, 0.82)";
  context.font = "600 22px Arial, sans-serif";
  context.fillText(label, x + 24, y + 38);

  context.fillStyle = "#f8fafc";
  context.font = "700 40px Arial, sans-serif";
  context.fillText(value, x + 24, y + 88);

  context.fillStyle = "rgba(255, 255, 255, 0.08)";
  drawRoundedRect(
    context,
    x + 24,
    y + height - 30,
    width - 48,
    10,
    5
  );
  context.fill();

  context.fillStyle = accent;
  drawRoundedRect(
    context,
    x + 24,
    y + height - 30,
    (width - 48) * progress,
    10,
    5
  );
  context.fill();
}

function drawNetworkGraph(context) {
  const nodes = [
    { x: 635, y: 372, radius: 12 },
    { x: 730, y: 320, radius: 9 },
    { x: 812, y: 376, radius: 11 },
    { x: 900, y: 306, radius: 9 },
    { x: 913, y: 420, radius: 8 },
    { x: 744, y: 442, radius: 8 },
  ];

  const connections = [
    [0, 1],
    [0, 5],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 4],
  ];

  context.lineWidth = 3;

  connections.forEach(([fromIndex, toIndex]) => {
    const from = nodes[fromIndex];
    const to = nodes[toIndex];

    const gradient = context.createLinearGradient(
      from.x,
      from.y,
      to.x,
      to.y
    );

    gradient.addColorStop(0, "rgba(255, 255, 255, 0.72)");
    gradient.addColorStop(1, "rgba(184, 184, 184, 0.4)");

    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  });

  nodes.forEach((node, index) => {
    context.beginPath();
    context.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 255, 255, 0.13)";
    context.fill();

    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fillStyle =
      index === 2 ? "#d4d4d4" : "#f5f5f5";
    context.fill();
  });
}

function drawInterface(context, width, height) {
  const background = context.createLinearGradient(
    0,
    0,
    width,
    height
  );

  background.addColorStop(0, "#050505");
  background.addColorStop(0.55, "#101010");
  background.addColorStop(1, "#181818");

  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  // Subtle technical grid.
  context.strokeStyle = "rgba(255, 255, 255, 0.055)";
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += 48) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += 48) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  // Top glow.
  const glow = context.createRadialGradient(
    820,
    40,
    10,
    820,
    40,
    360
  );

  glow.addColorStop(0, "rgba(255, 255, 255, 0.24)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  // Header.
  context.fillStyle = "#ffffff";
  context.font = "700 22px Arial, sans-serif";
  context.fillText("JAYMARK SYSTEMS CORE", 58, 66);

  context.fillStyle = "rgba(163, 163, 163, 0.88)";
  context.font = "500 18px Arial, sans-serif";
  context.fillText(
    "FULL-STACK • AI • INFRASTRUCTURE",
    58,
    100
  );

  // Online indicator.
  context.beginPath();
  context.arc(895, 65, 9, 0, Math.PI * 2);
  context.fillStyle = "#22c55e";
  context.fill();

  context.fillStyle = "#dcfce7";
  context.font = "700 18px Arial, sans-serif";
  context.fillText("SYSTEM ONLINE", 918, 72);

  // Main metric cards.
  drawMetricCard(context, {
    x: 58,
    y: 142,
    width: 270,
    height: 148,
    label: "WEB SYSTEMS",
    value: "04 ACTIVE",
    accent: "#f5f5f5",
    progress: 0.86,
  });

  drawMetricCard(context, {
    x: 350,
    y: 142,
    width: 270,
    height: 148,
    label: "AI SERVICES",
    value: "02 LINKED",
    accent: "#b8b8b8",
    progress: 0.72,
  });

  drawMetricCard(context, {
    x: 642,
    y: 142,
    width: 270,
    height: 148,
    label: "INFRA STATUS",
    value: "STABLE",
    accent: "#22c55e",
    progress: 0.92,
  });

  // Lower left status panel.
  drawRoundedRect(context, 58, 322, 500, 190, 24);
  context.fillStyle = "rgba(17, 17, 17, 0.88)";
  context.fill();

  context.strokeStyle = "rgba(163, 163, 163, 0.16)";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = "#e5e5e5";
  context.font = "700 22px Arial, sans-serif";
  context.fillText("LIVE SERVICE ACTIVITY", 86, 364);

  const bars = [0.68, 0.83, 0.52, 0.91, 0.74, 0.86, 0.62];

  bars.forEach((bar, index) => {
    const barX = 90 + index * 62;
    const barHeight = 95 * bar;

    context.fillStyle = "rgba(255, 255, 255, 0.07)";
    drawRoundedRect(context, barX, 392, 28, 92, 8);
    context.fill();

    const barGradient = context.createLinearGradient(
      0,
      484,
      0,
      392
    );

    barGradient.addColorStop(0, "#8e8e8e");
    barGradient.addColorStop(1, "#ffffff");

    context.fillStyle = barGradient;
    drawRoundedRect(
      context,
      barX,
      484 - barHeight,
      28,
      barHeight,
      8
    );
    context.fill();
  });

  // Lower right network panel.
  drawRoundedRect(context, 582, 322, 372, 190, 24);
  context.fillStyle = "rgba(17, 17, 17, 0.88)";
  context.fill();

  context.strokeStyle = "rgba(163, 163, 163, 0.16)";
  context.lineWidth = 2;
  context.stroke();

  context.fillStyle = "#e5e5e5";
  context.font = "700 22px Arial, sans-serif";
  context.fillText("CONNECTED WORKFLOW", 610, 364);

  drawNetworkGraph(context);

  // Bottom status line.
  context.fillStyle = "rgba(163, 163, 163, 0.7)";
  context.font = "500 15px Arial, sans-serif";
  context.fillText(
    "TalkReady AI • Internal Systems • Network Operations",
    58,
    550
  );
}

export function getMonitorInterfaceTexture() {
  if (cachedMonitorTexture) {
    return cachedMonitorTexture;
  }

  const canvas = document.createElement("canvas");

  /*
  * Draw using logical 1024 × 576 coordinates, but generate the actual
  * texture at 2048 × 1152 for improved clarity.
  */
  const logicalWidth = 1024;
  const logicalHeight = 576;
  const renderScale = 2;

  canvas.width = logicalWidth * renderScale;
  canvas.height = logicalHeight * renderScale;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "Unable to create the monitor interface canvas."
    );
  }

  context.scale(renderScale, renderScale);

  drawInterface(
    context,
    logicalWidth,
    logicalHeight
  );

  const texture = new THREE.CanvasTexture(canvas);

  /*
   * The monitor comes from a glTF asset, so its UV convention expects
   * the texture not to be vertically flipped.
   */
  texture.flipY = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.offset.x = 1;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;

  cachedMonitorTexture = texture;

  return cachedMonitorTexture;
}