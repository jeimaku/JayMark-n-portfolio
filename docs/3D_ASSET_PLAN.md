# 3D Asset Plan

## Phase Status

Planning in progress.

## Approved Creative Direction

The portfolio will use an Interactive Systems Workspace concept with:

- Stylized low-poly 3D assets
- Dark interface
- Cyan primary accent
- Floating technical workspace
- Hero-focused 3D experience
- Primarily HTML and CSS supporting sections
- Simplified mobile and reduced-motion alternatives

---

## Hero Scene Objective

The hero scene will visually represent Jay Mark Apelado's main
professional areas:

1. Full-stack systems development
2. AI-powered platforms
3. IT support and infrastructure
4. Networking and system connectivity
5. UI/UX and digital product development

The scene should support the portfolio introduction without making the
website feel like a game or 3D demo.

---

## Scene Composition

The desktop hero will use a floating technical platform containing:

- Main monitor or computer
- Server or server rack
- Microphone or headset
- Router or network device
- Database-inspired objects
- Floating application panels
- Network connection lines
- Small workstation props
- Environmental lighting

The scene will occupy the visual side of the hero while the name,
professional title, description, and buttons remain normal HTML.

---

## Asset Classification

### A. Downloaded 3D Models

The following objects will preferably use free GLB or glTF assets:

| Asset | Meaning | Priority | Desktop | Mobile |
|---|---|---:|---:|---:|
| Main computer or monitor | Full-stack development | Required | Yes | Yes |
| Server or server rack | IT infrastructure | Required | Yes | Yes |
| Microphone or headset | TalkReady and AI speech | Required | Yes | Yes |
| Desk or floating platform | Scene foundation | Required | Yes | Simplified |
| Router or network device | Networking and support | Required | Yes | Optional |
| Keyboard | Workstation detail | Supporting | Yes | No |
| Mouse | Workstation detail | Supporting | Yes | No |
| Office chair | Environmental balance | Optional | Yes | No |
| Small technology props | Scene composition | Optional | Yes | No |

### B. Code-Generated 3D Elements

The following elements should be created using Three.js or React Three
Fiber rather than downloaded models:

| Element | Implementation |
|---|---|
| Database objects | Cylinders and rings |
| Floating interface panels | Planes with HTML or canvas textures |
| Status indicators | Small emissive spheres or planes |
| Network nodes | Spheres or low-poly geometry |
| Data connections | Lines, curves, or tubes |
| Moving data packets | Small animated particles |
| Floating platform accents | Boxes, rings, and edge lighting |
| Background particles | Points or lightweight sprites |
| Hover labels | HTML overlays using Drei Html |
| Loading indicator | Standard HTML or lightweight geometry |

---

## Asset Style Requirements

Every downloaded model must follow these rules:

- Stylized or low-poly appearance
- Clean geometric shapes
- Neutral dark or recolorable materials
- No highly realistic scanned assets
- No cartoon proportions that conflict with the professional direction
- No visible trademarks unless legally and visually appropriate
- No unnecessary built-in animation
- No excessive texture detail
- No large environmental scenes
- Models must visually match the other selected assets

---

## File Format Requirements

Preferred formats:

1. GLB
2. glTF
3. OBJ only when a suitable GLB or glTF version is unavailable

GLB is preferred because it can contain model data, materials, and
textures inside one file.

Files requiring complicated conversion or Blender editing should
generally be rejected.

---

## Licensing Policy

Preferred licenses:

1. CC0
2. Free commercial-use license
3. CC BY with proper attribution

Assets with the following conditions should not be used:

- Non-commercial use only
- Editorial use only
- Unclear ownership
- Missing license information
- Prohibited modification when optimization is required
- Redistribution restrictions that conflict with web deployment

Every selected asset must be recorded in:

docs/ASSET_CREDITS.md

---

## Asset Size Targets

### Individual Model Targets

| Asset Type | Preferred Size | Maximum Initial Size |
|---|---:|---:|
| Main hero model | Below 2 MB | 5 MB |
| Supporting model | Below 1 MB | 3 MB |
| Small prop | Below 500 KB | 1 MB |
| Texture | 512 px to 1024 px | 2048 px |
| HDRI or environment asset | Below 3 MB | 6 MB |

Assets exceeding these limits must either be optimized or replaced.

### Scene Target

The initial compressed hero scene should aim for:

- Desktop 3D assets: below 8 MB total
- Mobile 3D assets: below 4 MB total
- Static fallback image: below 500 KB

These are development targets and may be adjusted after testing.

---

## Desktop Scene Requirements

The desktop version may include:

- Complete workstation composition
- Main computer
- Server
- Microphone
- Router
- Database objects
- Floating interface panels
- Connection lines
- Environmental props
- Subtle shadows
- Pointer-based camera response
- Gentle idle animation

---

## Mobile Scene Requirements

The mobile version should contain only:

- Main computer or monitor
- Simplified server
- Microphone or headset
- Floating platform
- Limited connection lines
- Reduced lighting complexity
- Minimal particles

The following desktop assets may be removed on mobile:

- Chair
- Keyboard
- Mouse
- Decorative props
- Secondary network devices
- Additional floating panels
- Expensive shadows

---

## Reduced-Motion Version

When reduced motion is enabled:

- Disable pointer parallax
- Disable automatic model rotation
- Stop floating animations
- Stop moving particles
- Keep connection lines static
- Preserve all models and content in a stable composition

---

## Static Fallback

A static image of the completed 3D scene will be provided for:

- Unsupported WebGL environments
- Devices with rendering problems
- Performance fallback mode
- Failed model loading

The fallback must preserve the same overall hero composition.

---

## Initial Asset Search List

Assets will be searched in this order:

1. Main monitor or workstation
2. Server or server rack
3. Microphone or headset
4. Desk or floating platform
5. Router or network equipment
6. Keyboard and mouse
7. Chair
8. Small environmental props
9. Environment lighting or HDRI

The required assets must be approved before optional props are added.

---

## Asset Evaluation Checklist

Each candidate asset must be evaluated using the following checklist:

- [ ] Matches the approved low-poly style
- [ ] Free for portfolio and commercial use
- [ ] License is clearly documented
- [ ] Available as GLB or glTF
- [ ] File size is acceptable
- [ ] Materials can match the dark and cyan direction
- [ ] Does not require advanced Blender editing
- [ ] Looks appropriate beside the other selected models
- [ ] Works on desktop
- [ ] Can be simplified or removed on mobile
- [ ] Source and creator information recorded
- [ ] Tested successfully in a glTF viewer

---

## Asset Approval Status

| Asset | Status | Selected Source |
|---|---|---|
| Main computer or monitor | Not searched | |
| Server or server rack | Not searched | |
| Microphone or headset | Not searched | |
| Desk or floating platform | Not searched | |
| Router or network device | Not searched | |
| Keyboard | Not searched | |
| Mouse | Not searched | |
| Chair | Not searched | |
| Environment lighting | Not searched | |

---

## Phase Completion Requirements

Phase 3 will be complete when:

- [ ] Required hero assets have been identified
- [ ] Asset licenses have been verified
- [ ] Sources and creators have been documented
- [ ] All required models have a consistent visual style
- [ ] File sizes are within acceptable limits
- [ ] Desktop and mobile asset lists are finalized
- [ ] Code-generated elements are confirmed
- [ ] Asset plan is approved
- [ ] 3D asset directory is created
- [ ] Selected assets are added and tested

## Current Status

Draft prepared for asset research and approval.
| Main computer or monitor | Approved | Kenney — Computer Screen, CC0 |
| Router or network device | Approved | MasterTux — Wireless Router |
| Router or network device | Approved | MasterTux — Wireless Router, CC0 |
| Server or server rack | Searching — first candidate rejected visually | Jeremy Eyring model retained as backup |

