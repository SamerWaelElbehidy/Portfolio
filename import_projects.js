/**
 * import_projects.js
 * Run with: node import_projects.js
 * Reads s:\Projects folders, infers category + description,
 * appends new entries to js/projects.js.
 */

const fs   = require('fs');
const path = require('path');

// Already-handled IDs from projects.js (to avoid duplicates)
const EXISTING_IDS = new Set([
  'small_wheelchair','gaze_wheelchair','brain_tumor','blind_glasses','blind_stick',
  'blind_watch','smart_splint','sleep_driver','ann_breast_cancer','stroke_prediction',
  'smart_cast','facial_emotion','handwritten_digit','face_recognition_attendance',
  'battery_rul','houses_prices','gender_recognition','smart_greenhouse','auto_watering',
  'smart_planter_stm','mist_project','smart_lab','smart_building','smart_gate',
  'smart_lecture_hall',
]);

// Category classification rules — ordered by priority
const RULES = [
  // Medical
  { cat:'medical',      keywords:['wheelchair','blind','cast','splint','drug','insulin','heart_sensor','brain','tumor','mri','cancer','stroke','drowsiness','sleep','swinging_bed','gaze','gaze_wheelchair'] },
  // AI / ML
  { cat:'ai_ml',        keywords:['cnn','ann','ml','recognition','prediction','lstm','xgboost','emotion','gender','digit','battery_rul','houses','feature_selection','neural','deep'] },
  // Speech & Vision
  { cat:'speech_vision',keywords:['speech','siri','tts','text_to_speech','text to speech','sound_direction','mini siri','gazetracking','gaze_keyboard','keyboard','air_mouse','flex_sensor','sound_watch'] },
  // Agriculture
  { cat:'agriculture',  keywords:['greenhouse','watering','planter','mist','irrigation','soil','plant'] },
  // Robotics
  { cat:'robotics',     keywords:['car','robot','vehicle','motor','line_follower','maze','sumo','pid','fighter','fire_car','military','drone','4wd','firefighter','car_counter','car_charging','ultrasonic_radar','vibration_switch','joystick'] },
  // VR / Games
  { cat:'vr_games',     keywords:['vr','unity','game','simulation','planets','memory game','memorygame','playtopia','firefighter simulator','firefighter_simulator','3d'] },
  // Smart Home / IoT
  { cat:'smart_home',   keywords:['smart','lab','building','gate','lecture','bin','wallet','helmet','parking','bike','safe','gloves','bin_code','coffee','clock','lcd','oled','rfid','alarm','solar','data_center','smart data','cashiq'] },
  // Hardware / Electronics
  { cat:'hardware',     keywords:['esp','arduino','stm','sensor','test','load_cell','dfplayer','touch_lcd','vibration','max30102','l2988','compass','astro','period','big_','eldabos','huissen','laz','joe','122','1.3_','esp.ino'] },
  // Web & Apps
  { cat:'web_apps',     keywords:['web','react','app','backend','cashiq','podix'] },
];

function folderToId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function folderToTitle(name) {
  // Keep existing capitalisation but clean up underscores
  return name
    .replace(/_/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function inferCategory(name) {
  const lower = name.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some(k => lower.includes(k))) return rule.cat;
  }
  return 'hardware'; // default
}

function generateDesc(name, cat) {
  const descs = {
    medical:       `A medical / assistive technology project focused on healthcare solutions.`,
    ai_ml:         `A machine learning or AI-powered project with intelligent decision making.`,
    speech_vision: `A speech recognition or computer vision project processing audio/visual input.`,
    agriculture:   `An agriculture or environmental monitoring project using smart sensors.`,
    robotics:      `A robotics or autonomous vehicle project with motor control and sensing.`,
    vr_games:      `An interactive VR, simulation, or gaming experience project.`,
    smart_home:    `An IoT / smart home project with connected sensors and automation.`,
    hardware:      `An embedded electronics project using microcontrollers and sensors.`,
    web_apps:      `A web or mobile application project with a user-facing interface.`,
  };
  return descs[cat] || 'An engineering project.';
}

function generateTags(name, cat) {
  const lower = name.toLowerCase();
  const baseTags = {
    medical:       ['Arduino','ESP32','sensors','healthcare'],
    ai_ml:         ['Python','ML','deep learning','classification'],
    speech_vision: ['Python','speech','audio','recognition'],
    agriculture:   ['ESP32','sensors','IoT','automation'],
    robotics:      ['Arduino','motors','embedded','robotics'],
    vr_games:      ['Unity','C#','VR','simulation'],
    smart_home:    ['ESP32','IoT','WiFi','dashboard'],
    hardware:      ['Arduino','sensors','embedded','electronics'],
    web_apps:      ['JavaScript','React','web','dashboard'],
  };
  const tags = [...(baseTags[cat] || ['Arduino'])];
  if (lower.includes('esp32'))    tags.push('ESP32');
  if (lower.includes('stm'))      tags.push('STM32');
  if (lower.includes('raspberry') || lower.includes('pi')) tags.push('Raspberry Pi');
  if (lower.includes('python'))   tags.push('Python');
  if (lower.includes('firebase')) tags.push('Firebase');
  if (lower.includes('cnn'))      tags.push('CNN');
  if (lower.includes('rfid'))     tags.push('RFID');
  return [...new Set(tags)];
}

// --- Main ---
const projectsFile = path.join(__dirname, 'js', 'projects.js');
const projectsRoot = path.join(__dirname, '..');

const folders = fs.readdirSync(projectsRoot, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'Portfolio' && d.name !== 'Products')
  .map(d => d.name);

console.log(`Found ${folders.length} project folders.`);

const newEntries = [];
for (const folder of folders) {
  const id = folderToId(folder);
  if (EXISTING_IDS.has(id)) {
    console.log(`  SKIP (existing): ${folder}`);
    continue;
  }
  const cat  = inferCategory(folder);
  const title = folderToTitle(folder);
  const desc  = generateDesc(folder, cat);
  const tags  = generateTags(folder, cat);

  newEntries.push({
    id,
    name: title,
    category: cat,
    featured: false,
    tags,
    shortDesc: desc,
    fullDesc: `${title} — ${desc} This project is part of Samer Wael's 120+ engineering portfolio.`,
    howItWorks: [
      'Project implementation using embedded hardware and software.',
      'Sensors gather data and process it in real-time.',
      'Results are displayed or transmitted to a control interface.'
    ],
    codeSnippet: `// ${title}\n// Source code available in the project repository.`,
    techStack: tags,
  });
  console.log(`  ADD [${cat}]: ${title}`);
}

console.log(`\nAdding ${newEntries.length} new projects to projects.js...`);

// Build JS snippet to append
const js = newEntries.map(p => {
  const tagsStr  = JSON.stringify(p.tags);
  const howStr   = JSON.stringify(p.howItWorks).replace(/^\[/, '[\n      ').replace(/,"/g, ',\n      "').replace(/\]$/, '\n    ]');
  return `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    category: ${JSON.stringify(p.category)},
    featured: false,
    tags: ${tagsStr},
    shortDesc: ${JSON.stringify(p.shortDesc)},
    fullDesc: ${JSON.stringify(p.fullDesc)},
    howItWorks: ${howStr},
    codeSnippet: ${JSON.stringify(p.codeSnippet)},
    techStack: ${tagsStr}
  }`;
}).join(',\n');

// Read current projects.js, find the closing ]; and inject before it
let src = fs.readFileSync(projectsFile, 'utf8');
const closingIdx = src.lastIndexOf('];');
if (closingIdx === -1) {
  console.error('Could not find closing ]; in projects.js');
  process.exit(1);
}

const before = src.slice(0, closingIdx);
const after  = src.slice(closingIdx);

// Make sure there's a trailing comma after last entry
const trimmed = before.trimEnd();
const needsComma = !trimmed.endsWith(',');

const newSrc = trimmed + (needsComma ? ',\n\n' : '\n\n') +
  `  // ─────────────────────────────────────────────────────────\n` +
  `  // AUTO-IMPORTED PROJECTS (120+ from project folders)\n` +
  `  // ─────────────────────────────────────────────────────────\n` +
  js + '\n' + after;

fs.writeFileSync(projectsFile, newSrc, 'utf8');
console.log('Done! projects.js updated successfully.');
