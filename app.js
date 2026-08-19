import * as THREE from 'three';
import { CricketStadiumScene } from './cricketScene.js';
import { T20_FINAL_2026_DELIVERIES, TEAMS_ROSTERS } from './cricketData.js';

// Application State
const state = {
  team: 'IND',          // 'IND' | 'NZ'
  mode: 'batter',       // 'batter' (Wagon Wheel) | 'bowler' (Pitch Trajectory Map)
  selectedPlayerId: 'samson'
};

// Global Three.js References
let scene, camera, renderer;
let cricketSceneInstance = null;

// DOM Elements
const canvasContainer = document.getElementById('canvas-container');
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
const openSidebarBtn = document.getElementById('open-sidebar-btn');

// Ticker Elements
const tickerViewMode = document.getElementById('ticker-view-mode');
const tickerPlayerName = document.getElementById('ticker-player-name');

// Control Buttons
const teamIndBtn = document.getElementById('team-ind-btn');
const teamNzBtn = document.getElementById('team-nz-btn');
const modeBatterBtn = document.getElementById('mode-batter-btn');
const modeBowlerBtn = document.getElementById('mode-bowler-btn');
const playerSelectLabel = document.getElementById('player-select-label');
const playerSelect = document.getElementById('player-select');
const catalogLabel = document.getElementById('catalog-label');
const shotsListContainer = document.getElementById('shots-list-container');

// Stat Cards
const statPlayerTitle = document.getElementById('stat-player-title');
const statP1 = document.getElementById('stat-p1');
const statP2 = document.getElementById('stat-p2');
const statP3 = document.getElementById('stat-p3');
const statP4 = document.getElementById('stat-p4');
const statSummaryBadge = document.getElementById('stat-summary-badge');

// — Meta Ray-Ban Display Web Apps Focus & Input System —
const DPAD = {
  UP: 'ArrowUp', DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft', RIGHT: 'ArrowRight',
  SELECT: 'Enter', SPACE: ' ', BACK: 'Escape',
};

let focusableElements = [];
let focusIndex = 0;

function updateFocusables() {
  focusableElements = Array.from(
    document.querySelectorAll('.focusable:not([disabled]):not(.hidden), [data-focusable]:not([disabled]):not(.hidden)')
  );
}

function moveFocus(dir) {
  updateFocusables();
  if (!focusableElements.length) return;

  var idx = focusableElements.indexOf(document.activeElement);
  if (idx === -1) idx = focusIndex;

  if (dir === 'up' || dir === 'left') {
    focusIndex = idx > 0 ? idx - 1 : focusableElements.length - 1;
  } else {
    focusIndex = idx < focusableElements.length - 1 ? idx + 1 : 0;
  }

  const target = focusableElements[focusIndex];
  if (target) {
    focusableElements.forEach(el => el.classList.remove('focused'));
    target.classList.add('focused');
    target.focus();
    target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

document.addEventListener('focusin', function(e) {
  updateFocusables();
  const idx = focusableElements.indexOf(e.target);
  if (idx !== -1) {
    focusableElements.forEach(el => el.classList.remove('focused'));
    focusIndex = idx;
    e.target.classList.add('focused');
  }
});

// Neural Band Pinch & D-pad Listener
document.addEventListener('keydown', function(e) {
  switch (e.key) {
    case DPAD.UP:
    case DPAD.LEFT:
      e.preventDefault();
      moveFocus('up');
      break;
    case DPAD.DOWN:
    case DPAD.RIGHT:
      e.preventDefault();
      moveFocus('down');
      break;
    case DPAD.SELECT:
    case DPAD.SPACE:
    case 'Select':
    case 'Accept':
      e.preventDefault();
      let active = document.activeElement;
      if (!active || active === document.body || (!active.classList.contains('focusable') && !active.hasAttribute('data-focusable'))) {
        updateFocusables();
        active = focusableElements[focusIndex] || focusableElements[0];
      }
      if (active) {
        active.click();
      }
      break;
    case DPAD.BACK:
      e.preventDefault();
      if (window.history.length > 1) {
        history.back();
      } else {
        toggleSidebarState();
      }
      break;
    default:
      return;
  }
});

// Toggle Sidebar Helper
function toggleSidebarState() {
  if (!sidebar) return;
  sidebar.classList.toggle('collapsed');
  if (sidebar.classList.contains('collapsed')) {
    if (openSidebarBtn) openSidebarBtn.classList.remove('hidden');
  } else {
    if (openSidebarBtn) openSidebarBtn.classList.add('hidden');
  }
}

// Initialize Engine
function initEngine() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.FogExp2(0x000000, 0.008);

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 24, 58);

  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(600, 600);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvasContainer.appendChild(renderer.domElement);

  cricketSceneInstance = new CricketStadiumScene(scene, camera, null);
  cricketSceneInstance.setCameraPreset('broadcast');

  canvasContainer.addEventListener('dragstart', (e) => e.preventDefault());
  window.addEventListener('resize', onWindowResize);
  setupUIEventListeners();

  updatePlayersDropdown();
  
  // Set initial focus on first focusable element
  setTimeout(() => moveFocus('down'), 50);

  renderer.setAnimationLoop(animate);
}

// Update Player Dropdown Roster
function updatePlayersDropdown() {
  playerSelect.innerHTML = '';

  const teamData = TEAMS_ROSTERS[state.team];
  const playerList = state.mode === 'batter' ? teamData.batters : teamData.bowlers;

  if (state.mode === 'batter') {
    playerSelectLabel.textContent = "Select Batter";
    catalogLabel.textContent = "Shots Played Catalog";
  } else {
    playerSelectLabel.textContent = "Select Bowler";
    catalogLabel.textContent = "Deliveries & Trajectories Catalog";
  }

  const optAll = document.createElement('option');
  optAll.value = 'all';
  optAll.textContent = `All ${state.team} ${state.mode === 'batter' ? 'Batters' : 'Bowlers'}`;
  playerSelect.appendChild(optAll);

  playerList.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (${p.role || p.spell})`;
    playerSelect.appendChild(opt);
  });

  if (playerList.length > 0) {
    state.selectedPlayerId = playerList[0].id;
    playerSelect.value = playerList[0].id;
  } else {
    state.selectedPlayerId = 'all';
  }

  renderSelectedModeAnalytics();
}

// Render 3D Scene & Update HUD Stats Card
function renderSelectedModeAnalytics() {
  const teamData = TEAMS_ROSTERS[state.team];

  if (state.mode === 'batter') {
    tickerViewMode.textContent = "Batter 3D Spray";
    cricketSceneInstance.renderBatterWagonWheel(state.selectedPlayerId, state.team);

    let shots = T20_FINAL_2026_DELIVERIES.filter(d => d.batterTeam === state.team);
    if (state.selectedPlayerId !== 'all') {
      shots = shots.filter(d => d.batterId === state.selectedPlayerId);
      const batterObj = teamData.batters.find(b => b.id === state.selectedPlayerId);

      if (batterObj) {
        tickerPlayerName.textContent = `${batterObj.name} (${batterObj.runs})`;
        statPlayerTitle.textContent = `${batterObj.name}`;
        statP1.textContent = `${batterObj.runs} (${batterObj.balls})`;
        const sr = ((batterObj.runs / batterObj.balls) * 100).toFixed(1);
        statP2.textContent = `${sr}`;
        statP3.textContent = `${batterObj.fours}x4 | ${batterObj.sixes}x6`;
        const maxDist = Math.max(...shots.map(s => s.shot.distance), 0);
        statP4.textContent = `${maxDist.toFixed(1)} m`;
        statSummaryBadge.textContent = `${shots.length} Shots Rendered`;
      }
    } else {
      tickerPlayerName.textContent = `All ${state.team} Batters`;
      statPlayerTitle.textContent = `${teamData.name} Wagon Wheel`;
      statP1.textContent = `${shots.length} Shots`;
      statP2.textContent = `255 Runs`;
      statP3.textContent = `18x4 | 16x6`;
      statP4.textContent = `108.0 m`;
      statSummaryBadge.textContent = `Squad 3D Wagon Wheel`;
    }

    populateCatalogList(shots);
  } else {
    tickerViewMode.textContent = "Bowler Ball Map";
    cricketSceneInstance.renderBowlerTrajectoryMap(state.selectedPlayerId, state.team);

    let deliveries = T20_FINAL_2026_DELIVERIES.filter(d => d.bowlerTeam === state.team);
    if (state.selectedPlayerId !== 'all') {
      deliveries = deliveries.filter(d => d.bowlerId === state.selectedPlayerId);
      const bowlerObj = teamData.bowlers.find(b => b.id === state.selectedPlayerId);

      if (bowlerObj) {
        tickerPlayerName.textContent = `${bowlerObj.name} (${bowlerObj.spell})`;
        statPlayerTitle.textContent = `${bowlerObj.name}`;
        statP1.textContent = `${bowlerObj.spell}`;
        statP2.textContent = `${bowlerObj.econ} Econ`;
        statP3.textContent = `${bowlerObj.wkts} Wickets`;
        const yorkers = deliveries.filter(d => d.pitchSpot.z >= 6.0).length;
        statP4.textContent = `${yorkers} Yorkers`;
        statSummaryBadge.textContent = `${deliveries.length} Ball Trajectories`;
      }
    } else {
      tickerPlayerName.textContent = `All ${state.team} Bowlers`;
      statPlayerTitle.textContent = `${teamData.name} Ball Map`;
      statP1.textContent = `${deliveries.length} Deliveries`;
      statP2.textContent = `Spell Map`;
      statP3.textContent = `Full Pitch`;
      statP4.textContent = `20.12m Strip`;
      statSummaryBadge.textContent = `Squad Ball Map`;
    }

    populateCatalogList(deliveries);
  }
}

// Populate Shots Catalog List with .focusable class
function populateCatalogList(items) {
  shotsListContainer.innerHTML = '';

  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = `shot-item focusable ${idx === 0 ? 'active' : ''}`;
    card.tabIndex = 0;

    let badgeClass = 'single';
    let badgeText = item.type || '1 Run';

    if (item.type === 'Six' || item.shot.outcome.includes('6')) {
      badgeClass = 'six';
      badgeText = '6 RUNS';
    } else if (item.type === 'Four' || item.shot.outcome.includes('4')) {
      badgeClass = 'four';
      badgeText = '4 RUNS';
    } else if (item.type === 'Double' || item.shot.outcome.includes('2')) {
      badgeClass = 'double';
      badgeText = '2 RUNS';
    } else if (item.type === 'Single' || item.shot.outcome.includes('1')) {
      badgeClass = 'single';
      badgeText = '1 RUN';
    } else if (item.type === 'Wicket' || item.shot.outcome.includes('OUT')) {
      badgeClass = 'wicket';
      badgeText = 'WICKET';
    }

    card.innerHTML = `
      <div class="shot-info">
        <span class="shot-title-text">Over ${item.over}: ${item.batter}</span>
        <span class="shot-sub-text">vs ${item.bowler} &bull; ${item.shot.distance.toFixed(1)}m</span>
      </div>
      <span class="shot-badge ${badgeClass}">${badgeText}</span>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.shot-item').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });

    shotsListContainer.appendChild(card);
  });
}

function animate() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(600, 600);
}

function setupUIEventListeners() {
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', toggleSidebarState);
  }

  if (openSidebarBtn) {
    openSidebarBtn.addEventListener('click', toggleSidebarState);
  }

  teamIndBtn.addEventListener('click', () => {
    teamIndBtn.classList.add('active');
    teamNzBtn.classList.remove('active');
    state.team = 'IND';
    updatePlayersDropdown();
  });

  teamNzBtn.addEventListener('click', () => {
    teamNzBtn.classList.add('active');
    teamIndBtn.classList.remove('active');
    state.team = 'NZ';
    updatePlayersDropdown();
  });

  modeBatterBtn.addEventListener('click', () => {
    modeBatterBtn.classList.add('active');
    modeBowlerBtn.classList.remove('active');
    state.mode = 'batter';
    updatePlayersDropdown();
  });

  modeBowlerBtn.addEventListener('click', () => {
    modeBowlerBtn.classList.add('active');
    modeBatterBtn.classList.remove('active');
    state.mode = 'bowler';
    updatePlayersDropdown();
  });

  playerSelect.addEventListener('click', () => {
    if (playerSelect.options.length > 0) {
      playerSelect.selectedIndex = (playerSelect.selectedIndex + 1) % playerSelect.options.length;
      playerSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  playerSelect.addEventListener('change', (e) => {
    state.selectedPlayerId = e.target.value;
    renderSelectedModeAnalytics();
  });

  document.querySelectorAll('.cam-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      cricketSceneInstance.setCameraPreset(e.target.dataset.cam);
    });
  });
}

initEngine();
