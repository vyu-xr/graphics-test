# 3D Interactive Graph Visualizer Starter (Three.js)

A lightweight, modern web app starter for plotting interactive 3D math surface plots, wireframes, scatter point clouds, and parametric curves using **Three.js**, **Vanilla CSS**, and **ES Modules**.

---

## 📁 File Structure

```text
graphics/
├── index.html     # Semantic layout, Import Maps, HUD overlay controls
├── styles.css     # Dark glassmorphism theme system, custom sliders, responsive HUD
├── app.js         # Three.js engine, equation compiler, color maps, raycaster tooltips
├── package.json   # NPM config with instant static dev server
└── README.md      # Getting started guide & documentation
```

---

## 🚀 Getting Started

### Option 1: Quick Local Server (Recommended)
Because modern JavaScript ES Modules (`import * as THREE from 'three'`) run over HTTP, start a local server using `npm dev` or Python:

```bash
# Using npm:
npm run dev

# Or using Python:
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

---

## ✨ Core Features

- 🧊 **Multiple Plot Modes**: 3D Surface Mesh, Wireframe, Point Cloud Scatter, and Parametric Curve / Helix.
- 🎨 **Dynamic Color Palettes**: Plasma, Viridis, Cyberpunk Neon, Rainbow, and Warm Sunset height-gradient mapping.
- ⚡ **Interactive Equation Engine**: Evaluates standard JavaScript math functions in real time (e.g. `Math.sin(x) * Math.cos(y)`).
- 🖱️ **Orbit Controls & Hover Raycaster**:
  - **Left Click + Drag**: Rotate camera
  - **Right Click + Drag**: Pan camera
  - **Scroll**: Zoom in/out
  - **Mouse Hover**: Live 3D coordinate inspection popup (X, Y, Z coordinates).
- 🌊 **Animated Waves & Auto-Rotate**: Animate time-dependent functions `t` for fluid 3D wave effects.
- 📸 **High-Res PNG Export**: One-click screenshot generator.
