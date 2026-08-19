import * as THREE from 'three';
import { T20_FINAL_2026_DELIVERIES } from './cricketData.js';

export class CricketStadiumScene {
  constructor(scene, camera, controls) {
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;

    if (this.controls) {
      this.controls.zoomSpeed = 2.5;
      this.controls.panSpeed = 2.5;
      this.controls.rotateSpeed = 1.8;
      this.controls.dampingFactor = 0.1;
    }

    this.stadiumGroup = new THREE.Group();
    this.trajectoryGroup = new THREE.Group();
    this.fieldersGroup = new THREE.Group();
    this.heatmapGroup = new THREE.Group();
    this.lightsGroup = new THREE.Group();

    this.scene.add(this.stadiumGroup);
    this.scene.add(this.trajectoryGroup);
    this.scene.add(this.fieldersGroup);
    this.scene.add(this.heatmapGroup);
    this.scene.add(this.lightsGroup);

    this.setupStadiumLighting();
    this.buildStadiumEnvironment();
  }

  // 💡 Lighting System
  setupStadiumLighting() {
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x064e3b, 0.6);
    this.lightsGroup.add(hemiLight);

    const artificialLight1000W = new THREE.DirectionalLight(0xffffff, 0.5);
    artificialLight1000W.position.set(0, 45, 12);
    artificialLight1000W.target.position.set(0, 0, 8);
    artificialLight1000W.castShadow = true;
    this.lightsGroup.add(artificialLight1000W);
    this.lightsGroup.add(artificialLight1000W.target);

    const northLight = new THREE.DirectionalLight(0x38bdf8, 0.7);
    northLight.position.set(0, 30, 60);
    northLight.target.position.set(0, 0, 8);
    this.lightsGroup.add(northLight);
    this.lightsGroup.add(northLight.target);

    const southLight = new THREE.DirectionalLight(0x818cf8, 0.7);
    southLight.position.set(0, 30, -45);
    southLight.target.position.set(0, 0, 8);
    this.lightsGroup.add(southLight);
    this.lightsGroup.add(southLight.target);

    const eastLight = new THREE.DirectionalLight(0x34d399, 0.7);
    eastLight.position.set(60, 30, 8);
    eastLight.target.position.set(0, 0, 8);
    this.lightsGroup.add(eastLight);
    this.lightsGroup.add(eastLight.target);

    const westLight = new THREE.DirectionalLight(0xf472b6, 0.7);
    westLight.position.set(-60, 30, 8);
    westLight.target.position.set(0, 0, 8);
    this.lightsGroup.add(westLight);
    this.lightsGroup.add(westLight.target);

    const pitchGlow = new THREE.PointLight(0x06b6d4, 0.8, 20);
    pitchGlow.position.set(0, 2, 8);
    this.lightsGroup.add(pitchGlow);
  }

  // 🏟️ Build Stadium Environment
  buildStadiumEnvironment() {
    const outfieldGeo = new THREE.CylinderGeometry(52, 54, 0.3, 64);
    const outfieldMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.7, metalness: 0.15 });
    const outfield = new THREE.Mesh(outfieldGeo, outfieldMat);
    outfield.position.y = -0.15;
    outfield.receiveShadow = true;
    this.stadiumGroup.add(outfield);

    for (let r = 8; r <= 50; r += 6) {
      const ringGeo = new THREE.RingGeometry(r, r + 3.2, 64);
      ringGeo.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 12 === 0 ? 0x166534 : 0x15803d,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.38
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 0.01;
      this.stadiumGroup.add(ring);
    }

    const pitchLength = 20.12;
    const pitchWidth = 3.05;
    const pitchGeo = new THREE.PlaneGeometry(pitchWidth, pitchLength);
    pitchGeo.rotateX(-Math.PI / 2);
    const pitchMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85, metalness: 0.05 });
    const pitch = new THREE.Mesh(pitchGeo, pitchMat);
    pitch.position.set(0, 0.025, pitchLength / 2 - 2);
    pitch.receiveShadow = true;
    this.stadiumGroup.add(pitch);

    const pitchFrameGeo = new THREE.PlaneGeometry(pitchWidth + 0.3, pitchLength + 0.3);
    pitchFrameGeo.rotateX(-Math.PI / 2);
    const pitchFrameMat = new THREE.MeshBasicMaterial({ color: 0x78350f });
    const pitchFrame = new THREE.Mesh(pitchFrameGeo, pitchFrameMat);
    pitchFrame.position.set(0, 0.015, pitchLength / 2 - 2);
    this.stadiumGroup.add(pitchFrame);

    const innerCircleGeo = new THREE.RingGeometry(27.3, 27.55, 64);
    innerCircleGeo.rotateX(-Math.PI / 2);
    const innerCircleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.55 });
    const innerCircle = new THREE.Mesh(innerCircleGeo, innerCircleMat);
    innerCircle.position.set(0, 0.03, pitchLength / 2 - 2);
    this.stadiumGroup.add(innerCircle);

    const boundaryRopeGeo = new THREE.TorusGeometry(47.5, 0.3, 12, 64);
    boundaryRopeGeo.rotateX(Math.PI / 2);
    const boundaryRopeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, emissive: 0x7f1d1d });
    const boundaryRope = new THREE.Mesh(boundaryRopeGeo, boundaryRopeMat);
    boundaryRope.position.set(0, 0.3, pitchLength / 2 - 2);
    this.stadiumGroup.add(boundaryRope);

    this.addCreaseLines(0);
    this.addCreaseLines(pitchLength);
    this.createWickets(0, 0, 0);
    this.createWickets(0, 0, pitchLength);
    this.buildStadiumStands();
    this.buildFloodlightTowers();
  }

  addCreaseLines(zOffset) {
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const poppingGeo = new THREE.PlaneGeometry(2.44, 0.08);
    poppingGeo.rotateX(-Math.PI / 2);
    const poppingLine = new THREE.Mesh(poppingGeo, lineMat);
    poppingLine.position.set(0, 0.035, zOffset);
    this.stadiumGroup.add(poppingLine);

    [-1.22, 1.22].forEach(x => {
      const returnGeo = new THREE.PlaneGeometry(0.06, 2.44);
      returnGeo.rotateX(-Math.PI / 2);
      const returnLine = new THREE.Mesh(returnGeo, lineMat);
      returnLine.position.set(x, 0.035, zOffset - 1.22);
      this.stadiumGroup.add(returnLine);
    });
  }

  createWickets(x, y, z) {
    const stumpMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2, metalness: 0.8 });
    const ledMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xd97706, emissiveIntensity: 0.8 });

    const stumpPositions = [-0.09, 0, 0.09];
    stumpPositions.forEach(stumpX => {
      const stumpGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.55, 12);
      const stump = new THREE.Mesh(stumpGeo, stumpMat);
      stump.position.set(x + stumpX, y + 0.275, z);
      stump.castShadow = true;
      this.stadiumGroup.add(stump);
    });

    const bailGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.22, 8);
    bailGeo.rotateZ(Math.PI / 2);
    const bail = new THREE.Mesh(bailGeo, ledMat);
    bail.position.set(x, y + 0.56, z);
    this.stadiumGroup.add(bail);
  }

  buildStadiumStands() {
    const tierGeo = new THREE.CylinderGeometry(62, 53, 10, 64, 1, true);
    const tierMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, side: THREE.BackSide });
    const tier = new THREE.Mesh(tierGeo, tierMat);
    tier.position.set(0, 4.5, 8);
    this.stadiumGroup.add(tier);

    const ledRingGeo = new THREE.TorusGeometry(54, 0.35, 12, 64);
    ledRingGeo.rotateX(Math.PI / 2);
    const ledRingMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const ledRing = new THREE.Mesh(ledRingGeo, ledRingMat);
    ledRing.position.set(0, 4, 8);
    this.stadiumGroup.add(ledRing);
  }

  buildFloodlightTowers() {
    const towerPositions = [{ x: 42, z: 42 }, { x: -42, z: 42 }, { x: 42, z: -42 }, { x: -42, z: -42 }];
    towerPositions.forEach(pos => {
      const towerGroup = new THREE.Group();
      const poleGeo = new THREE.CylinderGeometry(0.5, 0.8, 30, 12);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 15;
      towerGroup.add(pole);

      const boardGeo = new THREE.BoxGeometry(5.5, 3.5, 0.5);
      const boardMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.position.set(0, 29, 0);
      board.lookAt(0, 0, 8);
      towerGroup.add(board);

      const bulbGeo = new THREE.PlaneGeometry(4.8, 2.8);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const bulbs = new THREE.Mesh(bulbGeo, bulbMat);
      bulbs.position.set(0, 29, 0.3);
      bulbs.lookAt(0, 0, 8);
      towerGroup.add(bulbs);

      towerGroup.position.set(pos.x, 0, pos.z);
      this.stadiumGroup.add(towerGroup);
    });
  }

  // 🏏 MODE 1: BATTER 3D WAGON WHEEL SPRAY MODE (ALL SHOTS SIMULTANEOUSLY)
  renderBatterWagonWheel(batterId, teamId) {
    this.clearGroup(this.trajectoryGroup);
    this.clearGroup(this.heatmapGroup);

    let shots = T20_FINAL_2026_DELIVERIES.filter(d => d.batterTeam === teamId);
    if (batterId !== 'all') {
      shots = shots.filter(d => d.batterId === batterId);
    }

    shots.forEach(del => {
      if (del.shot && del.shot.hasHit && del.shot.distance > 0) {
        const shot = del.shot;
        const imp = del.impact;
        const angleRad = (shot.sprayAngle * Math.PI) / 180;
        const endX = Math.sin(angleRad) * shot.distance;
        const endZ = -Math.cos(angleRad) * shot.distance;

        let colorHex = 0x10b981;
        let emissiveHex = 0x059669;

        if (del.type === 'Six' || shot.outcome.includes('6')) {
          colorHex = 0xfacc15;
          emissiveHex = 0xeab308;
        } else if (del.type === 'Four' || shot.outcome.includes('4')) {
          colorHex = 0x06b6d4;
          emissiveHex = 0x0891b2;
        } else if (del.type === 'Double' || shot.outcome.includes('2')) {
          colorHex = 0x818cf8;
          emissiveHex = 0x4f46e5;
        } else if (del.type === 'Wicket' || shot.outcome.includes('OUT')) {
          colorHex = 0xef4444;
          emissiveHex = 0xdc2626;
        }

        const shotCurvePoints = [
          new THREE.Vector3(imp.x, imp.y, imp.z),
          new THREE.Vector3(endX * 0.3, shot.apexHeight * 0.7, endZ * 0.3),
          new THREE.Vector3(endX * 0.65, shot.apexHeight, endZ * 0.65),
          new THREE.Vector3(endX, 0.1, endZ)
        ];

        const shotCurve = new THREE.CatmullRomCurve3(shotCurvePoints);
        const shotGeo = new THREE.TubeGeometry(shotCurve, 80, 0.06, 8, false);
        const shotMat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: emissiveHex,
          emissiveIntensity: 0.8,
          roughness: 0.2
        });
        const shotMesh = new THREE.Mesh(shotGeo, shotMat);
        this.trajectoryGroup.add(shotMesh);

        const ringGeo = new THREE.RingGeometry(0.4, 0.9, 24);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(endX, 0.04, endZ);
        this.trajectoryGroup.add(ring);
      }
    });

    this.renderFielders(shots.length > 0 ? shots[0].fielders : null);
  }

  // 🎯 MODE 2: BOWLER BALL TRAJECTORIES & 3D PITCH MAP MODE (ALL DELIVERIES SIMULTANEOUSLY)
  renderBowlerTrajectoryMap(bowlerId, teamId) {
    this.clearGroup(this.trajectoryGroup);
    this.clearGroup(this.heatmapGroup);

    let deliveries = T20_FINAL_2026_DELIVERIES.filter(d => d.bowlerTeam === teamId);
    if (bowlerId !== 'all') {
      deliveries = deliveries.filter(d => d.bowlerId === bowlerId);
    }

    deliveries.forEach(del => {
      const rel = del.release;
      const bnc = del.pitchSpot;
      const imp = del.impact;

      const curvePoints = [
        new THREE.Vector3(rel.x, rel.y, rel.z),
        new THREE.Vector3(bnc.x * 0.5 + rel.x * 0.5, (rel.y + 0.1) * 0.5, (rel.z + bnc.z) * 0.5),
        new THREE.Vector3(bnc.x, 0.08, bnc.z),
        new THREE.Vector3(imp.x, imp.y, imp.z)
      ];

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.065, 10, false);

      let colorHex = 0x06b6d4; // Good Length Cyan
      if (bnc.z >= 6.0 || del.type === 'Wicket' || del.title.includes('WICKET')) {
        colorHex = 0xef4444; // Yorker / Wicket Red
      } else if (bnc.z <= 3.8 || del.type === 'Six') {
        colorHex = 0xfacc15; // Short / Boundary Gold
      }

      const tubeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.9,
        roughness: 0.15
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      this.trajectoryGroup.add(tubeMesh);

      // Pitch Landing Disc
      const discGeo = new THREE.CircleGeometry(0.38, 24);
      discGeo.rotateX(-Math.PI / 2);
      const discMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.position.set(bnc.x, 0.04, bnc.z);
      this.heatmapGroup.add(disc);

      const auraGeo = new THREE.RingGeometry(0.38, 0.65, 24);
      auraGeo.rotateX(-Math.PI / 2);
      const auraMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
      const aura = new THREE.Mesh(auraGeo, auraMat);
      aura.position.set(bnc.x, 0.041, bnc.z);
      this.heatmapGroup.add(aura);
    });

    this.renderFielders(deliveries.length > 0 ? deliveries[0].fielders : null);
  }

  renderFielders(fieldersList) {
    this.clearGroup(this.fieldersGroup);

    // If fieldersList is null or empty, remove fielders cleanly
    if (!fieldersList || !Array.isArray(fieldersList) || fieldersList.length === 0) {
      return;
    }

    fieldersList.forEach(f => {
      const fielderGroup = new THREE.Group();

      const sphereGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const isCatchFielder = f.role.includes("Boundary Catch") || f.role.includes("Fielder at Boundary Catch");
      const sphereMat = new THREE.MeshStandardMaterial({
        color: isCatchFielder ? 0xec4899 : (f.role.includes("Boundary") ? 0x6366f1 : 0x06b6d4),
        roughness: 0.25,
        metalness: 0.35,
        emissive: isCatchFielder ? 0xbe185d : 0x000000,
        emissiveIntensity: isCatchFielder ? 0.6 : 0.1
      });
      const sphereBody = new THREE.Mesh(sphereGeo, sphereMat);
      sphereBody.position.y = 0.45;
      sphereBody.castShadow = true;
      fielderGroup.add(sphereBody);

      const pinRingGeo = new THREE.RingGeometry(0.3, 0.55, 24);
      pinRingGeo.rotateX(-Math.PI / 2);
      const pinRingMat = new THREE.MeshBasicMaterial({
        color: isCatchFielder ? 0xec4899 : 0x6366f1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const pinRing = new THREE.Mesh(pinRingGeo, pinRingMat);
      pinRing.position.y = 0.025;
      fielderGroup.add(pinRing);

      const nameLabel = this.createFielderNameLabel(f.name);
      nameLabel.position.set(0, 1.45, 0);
      fielderGroup.add(nameLabel);

      fielderGroup.position.set(f.pos[0], f.pos[1], f.pos[2]);
      fielderGroup.userData = { name: f.name, role: f.role };
      this.fieldersGroup.add(fielderGroup);
    });
  }

  setCameraPreset(presetName) {
    const pitchCenterZ = 8;

    if (presetName === 'broadcast') {
      this.camera.position.set(0, 24, 58);
      if (this.controls) this.controls.target.set(0, 2, pitchCenterZ);
      else this.camera.lookAt(0, 2, pitchCenterZ);
    } else if (presetName === 'topdown') {
      this.camera.position.set(0, 85, pitchCenterZ);
      if (this.controls) this.controls.target.set(0, 0, pitchCenterZ);
      else this.camera.lookAt(0, 0, pitchCenterZ);
    } else if (presetName === 'pitchcam') {
      this.camera.position.set(8, 5, 22);
      if (this.controls) this.controls.target.set(0, 1, 5);
      else this.camera.lookAt(0, 1, 5);
    } else if (presetName === 'batterpov') {
      this.camera.position.set(0, 2.2, -8);
      if (this.controls) this.controls.target.set(0, 1.5, 14);
      else this.camera.lookAt(0, 1.5, 14);
    }
    if (this.controls) this.controls.update();
  }

  clearGroup(group) {
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material.dispose();
      }
    }
  }
}
