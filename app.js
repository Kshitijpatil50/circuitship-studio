const boards = {
  uno: {
    name: "Arduino Uno",
    mcu: "ATmega328P",
    voltage: "5V",
    serial: "COM4",
    pins: [
      { id: "D2", caps: ["digital", "interrupt"] },
      { id: "D3", caps: ["digital", "pwm", "interrupt"] },
      { id: "D4", caps: ["digital"] },
      { id: "D5", caps: ["digital", "pwm"] },
      { id: "D6", caps: ["digital", "pwm"] },
      { id: "D7", caps: ["digital"] },
      { id: "D8", caps: ["digital"] },
      { id: "D9", caps: ["digital", "pwm"] },
      { id: "D10", caps: ["digital", "pwm", "spi"] },
      { id: "A0", caps: ["analog", "digital"] },
      { id: "A1", caps: ["analog", "digital"] },
      { id: "A4", caps: ["i2c", "digital"] },
      { id: "A5", caps: ["i2c", "digital"] }
    ],
    reserved: ["D0", "D1"],
    libraries: ["Arduino core"]
  },
  esp32: {
    name: "ESP32 DevKit",
    mcu: "ESP32-WROOM",
    voltage: "3.3V",
    serial: "/dev/tty.usbserial-ESP32",
    pins: [
      { id: "GPIO4", caps: ["digital", "analog"] },
      { id: "GPIO5", caps: ["digital", "pwm", "spi"] },
      { id: "GPIO12", caps: ["digital", "analog"] },
      { id: "GPIO13", caps: ["digital", "pwm"] },
      { id: "GPIO14", caps: ["digital", "pwm"] },
      { id: "GPIO18", caps: ["digital", "pwm", "spi"] },
      { id: "GPIO19", caps: ["digital", "pwm", "spi"] },
      { id: "GPIO21", caps: ["digital", "i2c"] },
      { id: "GPIO22", caps: ["digital", "i2c"] },
      { id: "GPIO25", caps: ["digital", "analog", "pwm"] },
      { id: "GPIO26", caps: ["digital", "analog", "pwm"] },
      { id: "GPIO27", caps: ["digital", "analog", "pwm"] },
      { id: "GPIO32", caps: ["digital", "analog"] },
      { id: "GPIO33", caps: ["digital", "analog"] }
    ],
    reserved: ["GPIO0", "GPIO2", "GPIO15"],
    libraries: ["Arduino-ESP32 core"]
  },
  pico: {
    name: "Raspberry Pi Pico W",
    mcu: "RP2040",
    voltage: "3.3V",
    serial: "/dev/ttyACM0",
    pins: [
      { id: "GP0", caps: ["digital", "i2c"] },
      { id: "GP1", caps: ["digital", "i2c"] },
      { id: "GP2", caps: ["digital"] },
      { id: "GP3", caps: ["digital"] },
      { id: "GP4", caps: ["digital", "i2c"] },
      { id: "GP5", caps: ["digital", "i2c"] },
      { id: "GP6", caps: ["digital", "pwm"] },
      { id: "GP7", caps: ["digital", "pwm"] },
      { id: "GP8", caps: ["digital"] },
      { id: "GP9", caps: ["digital"] },
      { id: "GP26", caps: ["analog", "digital"] },
      { id: "GP27", caps: ["analog", "digital"] },
      { id: "GP28", caps: ["analog", "digital"] }
    ],
    reserved: [],
    libraries: ["Pico SDK compatibility"]
  }
};

const components = {
  pir: {
    name: "PIR motion sensor",
    type: "Input",
    keywords: ["motion", "pir", "presence"],
    signals: [{ name: "OUT", cap: "digital", direction: "input" }],
    power: "5V tolerant module; use 3.3V output for ESP32/Pico when possible",
    libraries: []
  },
  buzzer: {
    name: "Piezo buzzer",
    type: "Output",
    keywords: ["buzzer", "beep", "sound", "alarm"],
    signals: [{ name: "SIG", cap: "pwm", direction: "output" }],
    power: "GPIO drive only for small passive buzzers",
    libraries: []
  },
  led: {
    name: "Status LED",
    type: "Output",
    keywords: ["led", "blink", "status", "light"],
    signals: [{ name: "ANODE", cap: "digital", direction: "output" }],
    power: "Add a 220 ohm series resistor",
    libraries: []
  },
  button: {
    name: "Push button",
    type: "Input",
    keywords: ["button", "press", "manual"],
    signals: [{ name: "SW", cap: "digital", direction: "input_pullup" }],
    power: "Use internal pull-up and wire the switch to ground",
    libraries: []
  },
  dht: {
    name: "DHT22 temperature sensor",
    type: "Sensor",
    keywords: ["temperature", "humidity", "dht"],
    signals: [{ name: "DATA", cap: "digital", direction: "input" }],
    power: "3.3V or 5V depending on module",
    libraries: ["DHT sensor library"]
  },
  ultrasonic: {
    name: "HC-SR04 distance sensor",
    type: "Sensor",
    keywords: ["distance", "ultrasonic", "parking", "range"],
    signals: [
      { name: "TRIG", cap: "digital", direction: "output" },
      { name: "ECHO", cap: "digital", direction: "input" }
    ],
    power: "Echo is 5V on classic HC-SR04; level shift for 3.3V boards",
    libraries: []
  },
  servo: {
    name: "Micro servo",
    type: "Actuator",
    keywords: ["servo", "gate", "arm", "lock"],
    signals: [{ name: "PWM", cap: "pwm", direction: "output" }],
    power: "Use external 5V supply; connect grounds together",
    libraries: ["Servo"]
  },
  oled: {
    name: "0.96in OLED display",
    type: "Display",
    keywords: ["oled", "display", "screen"],
    signals: [
      { name: "SDA", cap: "i2c", direction: "bus" },
      { name: "SCL", cap: "i2c", direction: "bus" }
    ],
    power: "Most modules accept 3.3V; verify your breakout",
    libraries: ["Adafruit SSD1306", "Adafruit GFX"]
  },
  soil: {
    name: "Soil moisture sensor",
    type: "Sensor",
    keywords: ["soil", "moisture", "plant"],
    signals: [{ name: "AO", cap: "analog", direction: "input" }],
    power: "Prefer capacitive sensors; cheap resistive probes corrode",
    libraries: []
  },
  relay: {
    name: "Relay module",
    type: "Actuator",
    keywords: ["relay", "mains", "lamp", "pump"],
    signals: [{ name: "IN", cap: "digital", direction: "output" }],
    power: "Never switch mains without an isolated rated enclosure",
    libraries: []
  }
};

const svgColors = ["#6ea8ff", "#43d49b", "#f4b84a", "#b794ff", "#35d0c2", "#ff6b64", "#9fb2c2", "#ff9f43"];

const els = {
  boardSelect: document.querySelector("#board-select"),
  languageSelect: document.querySelector("#language-select"),
  prompt: document.querySelector("#project-prompt"),
  componentList: document.querySelector("#component-list"),
  componentCount: document.querySelector("#component-count"),
  generateButton: document.querySelector("#generate-button"),
  uploadButton: document.querySelector("#upload-button"),
  resetButton: document.querySelector("#reset-demo"),
  detectedBoard: document.querySelector("#detected-board"),
  wiringSvg: document.querySelector("#wiring-svg"),
  pinTable: document.querySelector("#pin-table"),
  safetyList: document.querySelector("#safety-list"),
  firmwareCode: document.querySelector("#firmware-code"),
  consoleLog: document.querySelector("#console-log"),
  copyCode: document.querySelector("#copy-code"),
  confidenceValue: document.querySelector("#confidence-value"),
  meterFill: document.querySelector("#meter-fill"),
  pinUsed: document.querySelector("#pin-used"),
  powerRail: document.querySelector("#power-rail"),
  libraryCount: document.querySelector("#library-count"),
  healthBadge: document.querySelector("#health-badge")
};

let selected = new Set(["pir", "buzzer", "led"]);
let currentBuild = null;

function init() {
  Object.entries(boards).forEach(([id, board]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = board.name;
    els.boardSelect.appendChild(option);
  });

  renderComponentList();
  attachEvents();
  generateBuild();
}

function attachEvents() {
  els.generateButton.addEventListener("click", () => {
    inferComponentsFromPrompt();
    generateBuild();
  });

  els.uploadButton.addEventListener("click", uploadFirmware);

  els.resetButton.addEventListener("click", () => {
    els.prompt.value = "Make a smart doorbell with motion sensor and buzzer. Blink an LED while motion is active and print status to serial.";
    els.boardSelect.value = "uno";
    els.languageSelect.value = "cpp";
    selected = new Set(["pir", "buzzer", "led"]);
    renderComponentList();
    generateBuild();
  });

  els.boardSelect.addEventListener("change", generateBuild);
  els.languageSelect.addEventListener("change", generateBuild);

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      els.prompt.value = button.dataset.prompt;
      inferComponentsFromPrompt();
      generateBuild();
    });
  });

  els.copyCode.addEventListener("click", async () => {
    await navigator.clipboard.writeText(els.firmwareCode.textContent);
    els.copyCode.textContent = "Copied";
    setTimeout(() => {
      els.copyCode.textContent = "Copy";
    }, 1100);
  });
}

function renderComponentList() {
  els.componentList.innerHTML = "";
  Object.entries(components).forEach(([id, part]) => {
    const label = document.createElement("label");
    label.className = "component-option";
    label.innerHTML = `
      <input type="checkbox" value="${id}" ${selected.has(id) ? "checked" : ""} />
      <span>
        <strong>${part.name}</strong>
        <small>${part.power}</small>
      </span>
      <span class="part-chip">${part.type}</span>
    `;
    label.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) {
        selected.add(id);
      } else {
        selected.delete(id);
      }
      generateBuild();
    });
    els.componentList.appendChild(label);
  });
  els.componentCount.textContent = `${selected.size} selected`;
}

function inferComponentsFromPrompt() {
  const text = els.prompt.value.toLowerCase();
  const inferred = new Set(selected);
  Object.entries(components).forEach(([id, part]) => {
    if (part.keywords.some((keyword) => text.includes(keyword))) {
      inferred.add(id);
    }
  });
  selected = inferred;
  renderComponentList();
}

function generateBuild() {
  const board = boards[els.boardSelect.value];
  const selectedParts = Array.from(selected).map((id) => ({ id, ...components[id] }));
  const assignments = allocatePins(board, selectedParts);
  const safety = buildSafetyChecks(board, selectedParts, assignments);
  const libraries = collectLibraries(board, selectedParts);
  const confidence = calculateConfidence(assignments, safety);

  currentBuild = { board, selectedParts, assignments, safety, libraries, confidence };

  els.detectedBoard.textContent = `USB board detected: ${board.name}`;
  els.componentCount.textContent = `${selected.size} selected`;
  els.confidenceValue.textContent = `${confidence}%`;
  els.meterFill.style.width = `${confidence}%`;
  els.meterFill.style.background = confidence > 84 ? "var(--green)" : confidence > 68 ? "var(--amber)" : "var(--red)";
  els.pinUsed.textContent = assignments.filter((item) => item.pin).length;
  els.powerRail.textContent = board.voltage;
  els.libraryCount.textContent = libraries.length;

  renderDiagram(board, selectedParts, assignments);
  renderPinTable(assignments);
  renderSafety(safety);
  renderFirmware(board, selectedParts, assignments, libraries);
  writeConsole([
    ["ok", `Detected ${board.name} on ${board.serial}`],
    ["ok", `Generated ${assignments.length} signal routes from project prompt`],
    ["warn", "Upload is simulated in this MVP; no device is flashed"]
  ]);
}

function allocatePins(board, parts) {
  const used = new Set();
  const assignments = [];

  parts.forEach((part) => {
    part.signals.forEach((signal) => {
      const pin = board.pins.find((candidate) => !used.has(candidate.id) && candidate.caps.includes(signal.cap));
      if (pin) {
        used.add(pin.id);
      }
      assignments.push({
        partId: part.id,
        part: part.name,
        signal: signal.name,
        cap: signal.cap,
        direction: signal.direction,
        pin: pin ? pin.id : null
      });
    });
  });

  return assignments;
}

function buildSafetyChecks(board, parts, assignments) {
  const checks = [
    {
      level: assignments.some((item) => !item.pin) ? "danger" : "ok",
      title: assignments.some((item) => !item.pin) ? "Pin capacity exceeded" : "Pins are capability-matched",
      detail: assignments.some((item) => !item.pin)
        ? "One or more signals could not be routed on this board."
        : "Each signal was assigned to a pin that supports the required mode."
    },
    {
      level: "ok",
      title: `${board.voltage} logic rail selected`,
      detail: "The generated wiring labels keep sensor power and GPIO logic explicit."
    }
  ];

  if (parts.some((part) => part.id === "led")) {
    checks.push({
      level: "warn",
      title: "LED resistor required",
      detail: "Place a 220 ohm resistor in series with the status LED."
    });
  }

  if (board.voltage === "3.3V" && parts.some((part) => part.id === "ultrasonic")) {
    checks.push({
      level: "danger",
      title: "Level shift HC-SR04 echo",
      detail: "Classic HC-SR04 echo outputs 5V. Add a divider or use a 3.3V-safe module."
    });
  }

  if (parts.some((part) => part.id === "servo")) {
    checks.push({
      level: "warn",
      title: "Servo needs external power",
      detail: "Do not power the servo from a GPIO pin. Use a 5V supply and common ground."
    });
  }

  if (parts.some((part) => part.id === "relay")) {
    checks.push({
      level: "danger",
      title: "Relay isolation required",
      detail: "Use a rated module and enclosure before switching mains or inductive loads."
    });
  }

  checks.push({
    level: "ok",
    title: "Serial debug enabled",
    detail: "Firmware prints sensor state so runtime behavior is explainable."
  });

  return checks;
}

function collectLibraries(board, parts) {
  return Array.from(new Set([...board.libraries, ...parts.flatMap((part) => part.libraries)]));
}

function calculateConfidence(assignments, safety) {
  let score = 96;
  score -= assignments.filter((item) => !item.pin).length * 22;
  score -= safety.filter((item) => item.level === "danger").length * 12;
  score -= safety.filter((item) => item.level === "warn").length * 5;
  return Math.max(42, Math.min(99, score));
}

function renderDiagram(board, parts, assignments) {
  const width = 860;
  const boardX = 330;
  const boardY = 98;
  const boardW = 206;
  const boardH = 324;
  const partW = 196;
  const partH = 74;
  const pinPositions = {};
  const partPositions = {};
  const leftParts = parts.slice(0, Math.ceil(parts.length / 2));
  const rightParts = parts.slice(leftParts.length);

  board.pins.slice(0, 14).forEach((pin, index) => {
    const side = index % 2 === 0 ? "left" : "right";
    const row = Math.floor(index / 2);
    pinPositions[pin.id] = {
      x: side === "left" ? boardX : boardX + boardW,
      y: boardY + 42 + row * 36,
      side
    };
  });

  leftParts.forEach((part, index) => {
    partPositions[part.id] = { x: 42, y: 72 + index * 112 };
  });
  rightParts.forEach((part, index) => {
    partPositions[part.id] = { x: width - 238, y: 72 + index * 112 };
  });

  let svg = `
    <rect x="0" y="0" width="860" height="520" fill="transparent"></rect>
    <rect x="${boardX}" y="${boardY}" width="${boardW}" height="${boardH}" rx="16" class="board-body"></rect>
    <circle cx="${boardX + 35}" cy="${boardY + 36}" r="13" fill="#43d49b"></circle>
    <rect x="${boardX + 65}" y="${boardY + 22}" width="84" height="28" rx="5" fill="#b7c8d5"></rect>
    <text x="${boardX + boardW / 2}" y="${boardY + 88}" fill="#ffffff" text-anchor="middle" font-size="20" font-weight="800" class="board-label">${board.name}</text>
    <text x="${boardX + boardW / 2}" y="${boardY + 113}" fill="#b8c4ce" text-anchor="middle" font-size="13" class="board-label">${board.mcu} / ${board.voltage}</text>
    <rect x="${boardX + 45}" y="${boardY + 142}" width="116" height="92" rx="8" fill="#111820" stroke="#4a5864"></rect>
    <text x="${boardX + boardW / 2}" y="${boardY + 194}" fill="#93c5fd" text-anchor="middle" font-size="13" font-weight="800" class="board-label">AI PIN MAP</text>
  `;

  Object.entries(pinPositions).forEach(([pin, pos]) => {
    svg += `
      <circle cx="${pos.x}" cy="${pos.y}" r="8" class="pin-dot"></circle>
      <text x="${pos.side === "left" ? pos.x - 14 : pos.x + 14}" y="${pos.y + 4}" fill="#dce8ef" text-anchor="${pos.side === "left" ? "end" : "start"}" font-size="11" class="pin-label">${pin}</text>
    `;
  });

  parts.forEach((part) => {
    const pos = partPositions[part.id];
    if (!pos) return;
    const isRight = pos.x > boardX;
    const nameLines = wrapSvgText(part.name, 19);
    svg += `
      <rect x="${pos.x}" y="${pos.y}" width="${partW}" height="${partH}" rx="8" class="component-card"></rect>
      <circle cx="${pos.x + 24}" cy="${pos.y + 27}" r="12" fill="#16232d" stroke="#58758b"></circle>
      <text x="${pos.x + 45}" y="${pos.y + (nameLines.length > 1 ? 24 : 31)}" fill="#edf6f9" font-size="13" font-weight="800" class="component-label">
        ${nameLines.map((line, lineIndex) => `<tspan x="${pos.x + 45}" dy="${lineIndex === 0 ? 0 : 15}">${line}</tspan>`).join("")}
      </text>
      <text x="${pos.x + 45}" y="${pos.y + 58}" fill="#93a8b7" font-size="11" class="component-label">${part.type} / ${part.signals.length} signal${part.signals.length > 1 ? "s" : ""}</text>
      <circle cx="${isRight ? pos.x : pos.x + partW}" cy="${pos.y + 37}" r="6" fill="#d6e4ee"></circle>
    `;
  });

  assignments.forEach((assignment, index) => {
    if (!assignment.pin || !partPositions[assignment.partId] || !pinPositions[assignment.pin]) return;
    const partPos = partPositions[assignment.partId];
    const partRight = partPos.x > boardX;
    const startX = partRight ? partPos.x : partPos.x + partW;
    const startY = partPos.y + 36 + (index % 3) * 8 - 8;
    const end = pinPositions[assignment.pin];
    const mid = partRight ? end.x + 78 : end.x - 78;
    const color = svgColors[index % svgColors.length];
    svg += `
      <path d="M ${startX} ${startY} C ${mid} ${startY}, ${mid} ${end.y}, ${end.x} ${end.y}" class="wire-shadow"></path>
      <path d="M ${startX} ${startY} C ${mid} ${startY}, ${mid} ${end.y}, ${end.x} ${end.y}" class="wire" stroke="${color}"></path>
      <text x="${(startX + end.x) / 2}" y="${Math.min(startY, end.y) - 8}" fill="${color}" font-size="11" font-weight="800" text-anchor="middle" class="pin-label">${assignment.signal}</text>
    `;
  });

  svg += `
    <rect x="322" y="448" width="224" height="38" rx="8" fill="#101820" stroke="#3f596b"></rect>
    <text x="434" y="472" fill="#edf6f9" text-anchor="middle" font-size="13" font-weight="800" class="board-label">Power: ${board.voltage} + GND rails labeled</text>
  `;

  els.wiringSvg.innerHTML = svg;
}

function wrapSvgText(text, maxLength) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxLength) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 2);
}

function renderPinTable(assignments) {
  els.pinTable.innerHTML = assignments
    .map(
      (item) => `
      <tr>
        <td>${item.part}</td>
        <td>${item.signal}</td>
        <td>${item.pin || "No route"}</td>
      </tr>
    `
    )
    .join("");
}

function renderSafety(safety) {
  const hasDanger = safety.some((item) => item.level === "danger");
  const hasWarn = safety.some((item) => item.level === "warn");
  els.healthBadge.textContent = hasDanger ? "Needs fix" : hasWarn ? "Review" : "Safe";
  els.healthBadge.style.background = hasDanger
    ? "rgba(255, 107, 100, 0.14)"
    : hasWarn
      ? "rgba(244, 184, 74, 0.14)"
      : "rgba(67, 212, 155, 0.13)";
  els.healthBadge.style.color = hasDanger ? "var(--red)" : hasWarn ? "var(--amber)" : "#74e7b7";

  els.safetyList.innerHTML = safety
    .map(
      (item) => `
      <div class="safety-item ${item.level}">
        <span class="safety-icon">${item.level === "ok" ? "OK" : item.level === "warn" ? "!" : "X"}</span>
        <span>
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </span>
      </div>
    `
    )
    .join("");
}

function renderFirmware(board, parts, assignments, libraries) {
  const language = els.languageSelect.value;
  els.firmwareCode.textContent =
    language === "python"
      ? makePythonFirmware(board, parts, assignments)
      : makeCppFirmware(board, parts, assignments, libraries);
}

function pinFor(assignments, partId, signalName) {
  return assignments.find((item) => item.partId === partId && item.signal === signalName)?.pin || "UNASSIGNED";
}

function makeCppFirmware(board, parts, assignments, libraries) {
  const has = (id) => parts.some((part) => part.id === id);
  const includes = libraries
    .filter((lib) => !lib.includes("core") && !lib.includes("SDK"))
    .map((lib) => `// Library: ${lib}`)
    .join("\n");
  const pinConstants = assignments
    .map((item) => `const int ${constantName(item.partId, item.signal)} = ${cppPin(item.pin)};`)
    .join("\n");

  const setupLines = assignments
    .map((item) => {
      if (item.direction === "input_pullup") return `  pinMode(${constantName(item.partId, item.signal)}, INPUT_PULLUP);`;
      if (item.direction === "input") return `  pinMode(${constantName(item.partId, item.signal)}, INPUT);`;
      if (item.direction === "output") return `  pinMode(${constantName(item.partId, item.signal)}, OUTPUT);`;
      return `  // ${item.signal} uses shared ${item.cap.toUpperCase()} bus`;
    })
    .join("\n");

  const loopLines = [
    has("pir") ? `  int motion = digitalRead(${constantName("pir", "OUT")});` : "",
    has("button") ? `  int buttonPressed = !digitalRead(${constantName("button", "SW")});` : "",
    has("soil") ? `  int moisture = analogRead(${constantName("soil", "AO")});` : "",
    has("ultrasonic")
      ? `  long distanceCm = readDistanceCm(${constantName("ultrasonic", "TRIG")}, ${constantName("ultrasonic", "ECHO")});`
      : "",
    has("led") && has("pir") ? `  digitalWrite(${constantName("led", "ANODE")}, motion ? HIGH : LOW);` : "",
    has("buzzer") && has("pir")
      ? `  if (motion) tone(${constantName("buzzer", "SIG")}, 1800, 120);`
      : has("buzzer")
        ? `  tone(${constantName("buzzer", "SIG")}, 1200, 80);`
        : "",
    has("servo") ? `  // servo.write(distanceCm < 20 ? 90 : 0);` : "",
    `  Serial.println(buildStatusLine());`,
    `  delay(250);`
  ]
    .filter(Boolean)
    .join("\n");

  const helper =
    has("ultrasonic")
      ? `
long readDistanceCm(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 30000);
  return duration / 58;
}
`
      : "";

  return `// Circuitship generated firmware
// Board: ${board.name}
${includes}

${pinConstants}

String buildStatusLine() {
  String status = "status:";
${parts.map((part) => `  status += " ${part.id}=ready";`).join("\n")}
  return status;
}
${helper}
void setup() {
  Serial.begin(115200);
${setupLines}
  Serial.println("Circuitship firmware online");
}

void loop() {
${loopLines}
}`;
}

function makePythonFirmware(board, parts, assignments) {
  const has = (id) => parts.some((part) => part.id === id);
  const pinConstants = assignments
    .map((item) => `${constantName(item.partId, item.signal)} = ${pythonPin(item.pin)}`)
    .join("\n");
  const pinObjects = assignments
    .map((item) => {
      const name = constantName(item.partId, item.signal).toLowerCase();
      const mode = item.direction.includes("input") ? "Pin.IN" : "Pin.OUT";
      const pull = item.direction === "input_pullup" ? ", Pin.PULL_UP" : "";
      return `${name} = Pin(${constantName(item.partId, item.signal)}, ${mode}${pull})`;
    })
    .join("\n");
  const loop = [
    has("pir") ? "    motion = pir_out.value()" : "",
    has("led") && has("pir") ? "    led_anode.value(1 if motion else 0)" : "",
    has("buzzer") && has("pir") ? "    buzzer_sig.value(1 if motion else 0)" : "",
    has("soil") ? "    moisture = soil_ao.read_u16()" : "",
    "    print('Circuitship status: running')",
    "    sleep(0.25)"
  ]
    .filter(Boolean)
    .join("\n");

  return `# Circuitship generated MicroPython firmware
# Board: ${board.name}
from machine import Pin, ADC
from time import sleep

${pinConstants}

${pinObjects}

print("Circuitship firmware online")

while True:
${loop}
`;
}

function constantName(partId, signal) {
  return `${partId}_${signal}`.replace(/[^a-zA-Z0-9]/g, "_").toUpperCase();
}

function cppPin(pin) {
  if (!pin) return "-1";
  if (pin.startsWith("GPIO")) return pin.replace("GPIO", "");
  if (pin.startsWith("GP")) return pin.replace("GP", "");
  return pin;
}

function pythonPin(pin) {
  if (!pin) return "-1";
  if (pin.startsWith("GPIO")) return pin.replace("GPIO", "");
  if (pin.startsWith("GP")) return pin.replace("GP", "");
  if (pin.startsWith("D")) return pin.replace("D", "");
  if (pin.startsWith("A")) return `"${pin}"`;
  return `"${pin}"`;
}

function uploadFirmware() {
  if (!currentBuild) generateBuild();
  const board = currentBuild.board;
  const hasDanger = currentBuild.safety.some((item) => item.level === "danger");
  const gateLine = hasDanger
    ? ["warn", "Hardware safety gate would block a real upload until fixes are confirmed"]
    : ["ok", "Static safety gate passed with warnings reviewed"];
  const lines = [
    ["ok", `Opening ${board.serial}`],
    ["ok", `Compiling for ${board.mcu}`],
    gateLine,
    ["ok", "Writing firmware image"],
    ["ok", "Verifying flash checksum"],
    ["ok", "Done. Serial monitor attached at 115200 baud"]
  ];
  writeConsole([]);
  lines.forEach((line, index) => {
    setTimeout(() => {
      appendConsoleLine(line[0], line[1]);
    }, index * 360);
  });
}

function writeConsole(lines) {
  els.consoleLog.innerHTML = "";
  lines.forEach((line) => appendConsoleLine(line[0], line[1]));
}

function appendConsoleLine(level, text) {
  const span = document.createElement("span");
  span.className = `console-line ${level}`;
  span.textContent = `> ${text}`;
  els.consoleLog.appendChild(span);
  els.consoleLog.scrollTop = els.consoleLog.scrollHeight;
}

init();
