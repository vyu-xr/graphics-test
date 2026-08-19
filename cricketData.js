// ICC Men's T20 World Cup 2026 Final: Complete Team Rosters & Full Delivery Dataset

export const TEAMS_ROSTERS = {
  IND: {
    name: "India (IND)",
    batters: [
      { id: "samson", name: "Sanju Samson (wk)", role: "Opener", runs: 89, balls: 46, fours: 7, sixes: 6 },
      { id: "abhishek", name: "Abhishek Sharma", role: "Opener", runs: 54, balls: 21, fours: 5, sixes: 4 },
      { id: "surya", name: "Suryakumar Yadav (c)", role: "Middle Order", runs: 42, balls: 20, fours: 4, sixes: 2 },
      { id: "hardik_bat", name: "Hardik Pandya", role: "All-rounder", runs: 45, balls: 19, fours: 3, sixes: 4 },
      { id: "dube", name: "Shivam Dube", role: "Middle Order", runs: 22, balls: 11, fours: 2, sixes: 1 },
      { id: "rinku", name: "Rinku Singh", role: "Finisher", runs: 3, balls: 3, fours: 0, sixes: 0 }
    ],
    bowlers: [
      { id: "bumrah", name: "Jasprit Bumrah", role: "Fast Bowler", spell: "4-0-18-4", wkts: 4, econ: "4.50" },
      { id: "kuldeep", name: "Kuldeep Yadav", role: "Spin Bowler", spell: "4-0-22-3", wkts: 3, econ: "5.50" },
      { id: "hardik", name: "Hardik Pandya", role: "Fast All-rounder", spell: "3.5-0-28-2", wkts: 2, econ: "7.30" },
      { id: "arshdeep", name: "Arshdeep Singh", role: "Fast Bowler", spell: "4-0-32-1", wkts: 1, econ: "8.00" }
    ]
  },
  NZ: {
    name: "New Zealand (NZ)",
    batters: [
      { id: "conway", name: "Devon Conway (wk)", role: "Opener", runs: 12, balls: 14, fours: 2, sixes: 0 },
      { id: "williamson", name: "Kane Williamson", role: "Batter", runs: 34, balls: 28, fours: 3, sixes: 1 },
      { id: "mitchell", name: "Daryl Mitchell", role: "Middle Order", runs: 46, balls: 32, fours: 4, sixes: 2 },
      { id: "phillips", name: "Glenn Phillips", role: "All-rounder", runs: 28, balls: 18, fours: 2, sixes: 2 },
      { id: "santner_bat", name: "Mitchell Santner (c)", role: "All-rounder", runs: 18, balls: 12, fours: 1, sixes: 1 },
      { id: "ferguson_bat", name: "Lockie Ferguson", role: "Tailender", runs: 6, balls: 7, fours: 1, sixes: 0 }
    ],
    bowlers: [
      { id: "boult", name: "Trent Boult", role: "Left-arm Fast", spell: "4-0-42-2", wkts: 2, econ: "10.50" },
      { id: "santner", name: "Mitchell Santner", role: "Left-arm Spin", spell: "4-0-38-1", wkts: 1, econ: "9.50" },
      { id: "ferguson", name: "Lockie Ferguson", role: "Fast Bowler", spell: "4-0-54-1", wkts: 1, econ: "13.50" },
      { id: "henry", name: "Matt Henry", role: "Fast Bowler", spell: "4-0-48-1", wkts: 1, econ: "12.00" }
    ]
  }
};

function generateDeliveries() {
  const deliveries = [];

  // 1st INNINGS: INDIA BATTING vs NEW ZEALAND BOWLING
  const indInningsRaw = [
    { batterId: "abhishek", batter: "Abhishek Sharma", bowlerId: "boult", bowler: "Trent Boult", over: "0.1", outcome: "6 RUNS (102m Pull Six)", type: "Six", distance: 102, apex: 29, spray: -140, exitV: 156, pitchZ: 3.2, pitchX: -0.3 },
    { batterId: "abhishek", batter: "Abhishek Sharma", bowlerId: "boult", bowler: "Trent Boult", over: "0.2", outcome: "1 RUN (Steered to Third Man)", type: "Single", distance: 24, apex: 1.8, spray: 65, exitV: 112, pitchZ: 4.8, pitchX: 0.3 },
    { batterId: "samson", batter: "Sanju Samson (wk)", bowlerId: "boult", bowler: "Trent Boult", over: "0.3", outcome: "1 RUN (Nudged to Mid-Wicket)", type: "Single", distance: 22, apex: 2.0, spray: -28, exitV: 105, pitchZ: 5.2, pitchX: -0.2 },
    { batterId: "abhishek", batter: "Abhishek Sharma", bowlerId: "boult", bowler: "Trent Boult", over: "0.4", outcome: "4 RUNS (Cover Drive)", type: "Four", distance: 58, apex: 4.2, spray: 42, exitV: 138, pitchZ: 4.8, pitchX: 0.4 },
    
    { batterId: "abhishek", batter: "Abhishek Sharma", bowlerId: "henry", bowler: "Matt Henry", over: "1.1", outcome: "2 RUNS (Driven to Deep Cover)", type: "Double", distance: 42, apex: 3.2, spray: 38, exitV: 128, pitchZ: 5.0, pitchX: 0.2 },
    { batterId: "samson", batter: "Sanju Samson (wk)", bowlerId: "henry", bowler: "Matt Henry", over: "2.4", outcome: "2 RUNS (Flicked past Deep Mid-Wicket)", type: "Double", distance: 46, apex: 4.0, spray: -45, exitV: 132, pitchZ: 4.4, pitchX: -0.3 },
    { batterId: "samson", batter: "Sanju Samson (wk)", bowlerId: "henry", bowler: "Matt Henry", over: "4.3", outcome: "6 RUNS (88m Straight Drive)", type: "Six", distance: 88, apex: 22, spray: 4, exitV: 148, pitchZ: 5.5, pitchX: 0.1 },

    { batterId: "samson", batter: "Sanju Samson (wk)", bowlerId: "ferguson", bowler: "Lockie Ferguson", over: "7.1", outcome: "6 RUNS (94m Mid-Wicket Six)", type: "Six", distance: 94, apex: 25, spray: -38, exitV: 151, pitchZ: 4.2, pitchX: -0.2 },
    { batterId: "surya", batter: "Suryakumar Yadav (c)", bowlerId: "santner", bowler: "Mitchell Santner", over: "9.5", outcome: "1 RUN (Swept to Deep Fine Leg)", type: "Single", distance: 28, apex: 2.5, spray: -135, exitV: 118, pitchZ: 4.0, pitchX: 0.1 },
    { batterId: "surya", batter: "Suryakumar Yadav (c)", bowlerId: "santner", bowler: "Mitchell Santner", over: "11.2", outcome: "4 RUNS (Reverse Sweep)", type: "Four", distance: 54, apex: 8.0, spray: 68, exitV: 138, pitchZ: 4.2, pitchX: 0.45 },
    
    { batterId: "surya", batter: "Suryakumar Yadav (c)", bowlerId: "boult", bowler: "Trent Boult", over: "13.4", outcome: "6 RUNS (360° Fine Leg Scoop)", type: "Six", distance: 82, apex: 26, spray: -155, exitV: 144, pitchZ: 6.2, pitchX: -0.1 },
    { batterId: "hardik_bat", batter: "Hardik Pandya", bowlerId: "santner", bowler: "Mitchell Santner", over: "15.1", outcome: "1 RUN (Driven to Long-On)", type: "Single", distance: 34, apex: 2.2, spray: -8, exitV: 120, pitchZ: 5.1, pitchX: -0.1 },
    { batterId: "hardik_bat", batter: "Hardik Pandya", bowlerId: "henry", bowler: "Matt Henry", over: "17.4", outcome: "2 RUNS (Clipped off pads)", type: "Double", distance: 44, apex: 3.5, spray: -75, exitV: 130, pitchZ: 4.2, pitchX: -0.4 },
    { batterId: "hardik_bat", batter: "Hardik Pandya", bowlerId: "ferguson", bowler: "Lockie Ferguson", over: "18.2", outcome: "6 RUNS (108m Extra Cover Six)", type: "Six", distance: 108, apex: 31, spray: 28, exitV: 158, pitchZ: 4.8, pitchX: -0.45 },
    { batterId: "dube", batter: "Shivam Dube", bowlerId: "ferguson", bowler: "Lockie Ferguson", over: "18.5", outcome: "1 RUN (Drop & Run)", type: "Single", distance: 18, apex: 1.5, spray: 12, exitV: 98, pitchZ: 5.5, pitchX: 0.2 },
    { batterId: "dube", batter: "Shivam Dube", bowlerId: "henry", bowler: "Matt Henry", over: "19.2", outcome: "6 RUNS (Smashed over Long-On)", type: "Six", distance: 96, apex: 27, spray: -12, exitV: 152, pitchZ: 5.0, pitchX: -0.2 },
    { batterId: "rinku", batter: "Rinku Singh", bowlerId: "henry", bowler: "Matt Henry", over: "19.5", outcome: "2 RUNS (Slashed into Deep Point)", type: "Double", distance: 40, apex: 2.8, spray: 82, exitV: 125, pitchZ: 4.5, pitchX: 0.3 }
  ];

  indInningsRaw.forEach((d, idx) => {
    deliveries.push({
      id: `ind_inn_del_${idx}`,
      batterTeam: "IND",
      bowlerTeam: "NZ",
      innings: 1,
      over: d.over,
      batterId: d.batterId,
      batter: d.batter,
      bowlerId: d.bowlerId,
      bowler: d.bowler,
      title: `${d.batter} - ${d.outcome} (vs ${d.bowler})`,
      pitchSpot: { x: d.pitchX, z: d.pitchZ },
      bounceType: `Pitch Spot: ${d.pitchZ.toFixed(1)}m`,
      release: { x: d.pitchX * 1.2, y: 2.1, z: 10.0 },
      impact: { x: d.pitchX * 0.4, y: 0.8, z: 0.2 },
      type: d.type,
      shot: {
        hasHit: true,
        exitVelocity: d.exitV,
        launchAngle: d.type === "Six" ? 34 : (d.type === "Four" ? 12 : 5),
        sprayAngle: d.spray,
        distance: d.distance,
        outcome: d.outcome,
        apexHeight: d.apex
      },
      fielders: null // Null fielders per user request
    });
  });

  // 2nd INNINGS: NEW ZEALAND BATTING vs INDIA BOWLING
  const nzInningsRaw = [
    { batterId: "conway", batter: "Devon Conway (wk)", bowlerId: "bumrah", bowler: "Jasprit Bumrah", over: "1.1", outcome: "1 RUN (Glanced to Fine Leg)", type: "Single", distance: 26, apex: 1.8, spray: -135, exitV: 110, pitchZ: 5.2, pitchX: -0.2 },
    { batterId: "conway", batter: "Devon Conway (wk)", bowlerId: "bumrah", bowler: "Jasprit Bumrah", over: "1.4", outcome: "WICKET (Bumrah In-swing Yorker)", type: "Wicket", distance: 22, apex: 2.8, spray: -20, exitV: 124, pitchZ: 6.8, pitchX: 0.15 },
    { batterId: "williamson", batter: "Kane Williamson", bowlerId: "arshdeep", bowler: "Arshdeep Singh", over: "3.2", outcome: "2 RUNS (Pushed past Cover)", type: "Double", distance: 44, apex: 3.0, spray: 35, exitV: 126, pitchZ: 4.8, pitchX: 0.3 },
    { batterId: "williamson", batter: "Kane Williamson", bowlerId: "bumrah", bowler: "Jasprit Bumrah", over: "5.3", outcome: "WICKET (Bumrah Out-swinger Edge)", type: "Wicket", distance: 18, apex: 1.5, spray: 85, exitV: 132, pitchZ: 5.8, pitchX: 0.4 },

    { batterId: "williamson", batter: "Kane Williamson", bowlerId: "kuldeep", bowler: "Kuldeep Yadav", over: "9.3", outcome: "WICKET (Kuldeep Googly LBW)", type: "Wicket", distance: 0, apex: 0, spray: 0, exitV: 0, pitchZ: 3.8, pitchX: -0.55 },
    { batterId: "mitchell", batter: "Daryl Mitchell", bowlerId: "kuldeep", bowler: "Kuldeep Yadav", over: "10.4", outcome: "1 RUN (Tapped to Mid-Wicket)", type: "Single", distance: 22, apex: 2.1, spray: -25, exitV: 108, pitchZ: 4.2, pitchX: -0.1 },
    { batterId: "mitchell", batter: "Daryl Mitchell", bowlerId: "hardik", bowler: "Hardik Pandya", over: "13.5", outcome: "2 RUNS (Worked to Square Leg)", type: "Double", distance: 46, apex: 3.5, spray: -68, exitV: 130, pitchZ: 4.5, pitchX: -0.3 },
    { batterId: "mitchell", batter: "Daryl Mitchell", bowlerId: "hardik", bowler: "Hardik Pandya", over: "14.2", outcome: "6 RUNS (86m Straight Six)", type: "Six", distance: 86, apex: 23, spray: 2, exitV: 146, pitchZ: 5.1, pitchX: 0.2 },

    { batterId: "phillips", batter: "Glenn Phillips", bowlerId: "arshdeep", bowler: "Arshdeep Singh", over: "15.2", outcome: "1 RUN (Steered to Third Man)", type: "Single", distance: 28, apex: 2.0, spray: 70, exitV: 115, pitchZ: 5.0, pitchX: 0.4 },
    { batterId: "phillips", batter: "Glenn Phillips", bowlerId: "arshdeep", bowler: "Arshdeep Singh", over: "16.4", outcome: "4 RUNS (Slashed past Point)", type: "Four", distance: 56, apex: 5.0, spray: 48, exitV: 139, pitchZ: 4.4, pitchX: 0.5 },
    { batterId: "ferguson_bat", batter: "Lockie Ferguson", bowlerId: "hardik", bowler: "Hardik Pandya", over: "19.5", outcome: "WICKET (Suryakumar Relay Catch)", type: "Wicket", distance: 63.8, apex: 24, spray: 12, exitV: 142, pitchZ: 5.2, pitchX: 0.25 }
  ];

  nzInningsRaw.forEach((d, idx) => {
    deliveries.push({
      id: `nz_inn_del_${idx}`,
      batterTeam: "NZ",
      bowlerTeam: "IND",
      innings: 2,
      over: d.over,
      batterId: d.batterId,
      batter: d.batter,
      bowlerId: d.bowlerId,
      bowler: d.bowler,
      title: `${d.batter} - ${d.outcome} (vs ${d.bowler})`,
      pitchSpot: { x: d.pitchX, z: d.pitchZ },
      bounceType: `Pitch Spot: ${d.pitchZ.toFixed(1)}m`,
      release: { x: d.pitchX * 1.1, y: 2.0, z: 10.0 },
      impact: { x: d.pitchX * 0.4, y: 0.7, z: 0.2 },
      type: d.type,
      shot: {
        hasHit: d.distance > 0,
        exitVelocity: d.exitV,
        launchAngle: d.type === "Six" ? 34 : (d.type === "Four" ? 12 : 5),
        sprayAngle: d.spray,
        distance: d.distance,
        outcome: d.outcome,
        apexHeight: d.apex
      },
      fielders: null // Null fielders per user request
    });
  });

  return deliveries;
}

export const T20_FINAL_2026_DELIVERIES = generateDeliveries();
