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
  healthBadge: document.querySelector("#health-badge"),
  aiResponse: document.querySelector("#ai-response"),
  aiQuestion: document.querySelector("#ai-question"),
  askAiButton: document.querySelector("#ask-ai-button"),
  connectBoard: document.querySelector("#connect-board"),
  componentSearch: document.querySelector("#component-search"),
  componentSuggestions: document.querySelector("#component-suggestions"),
  compatibilityValue: document.querySelector("#compatibility-value"),
  compatibilitySummary: document.querySelector("#compatibility-summary"),
  compatibilityReasons: document.querySelector("#compatibility-reasons"),
  wiringChecklist: document.querySelector("#wiring-checklist"),
  checklistProgress: document.querySelector("#checklist-progress"),
  serialLogInput: document.querySelector("#serial-log-input"),
  debugLogsButton: document.querySelector("#debug-logs-button")
};

let selected = new Set(["pir", "buzzer", "led"]);
let currentBuild = null;
let currentMode = "beginner";
let connectedPortLabel = "";

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

  els.askAiButton.addEventListener("click", answerAiQuestion);
  els.aiQuestion.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      answerAiQuestion();
    }
  });
  document.querySelectorAll("[data-ai-question]").forEach((button) => {
    button.addEventListener("click", () => {
      els.aiQuestion.value = button.dataset.aiQuestion;
      answerAiQuestion();
    });
  });

  els.connectBoard.addEventListener("click", connectBoard);
  els.componentSearch.addEventListener("input", renderComponentSuggestions);
  els.debugLogsButton.addEventListener("click", analyzeSerialLogs);
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      currentMode = button.dataset.mode;
      document.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === button));
      generateBuild();
    });
  });
  document.querySelectorAll("[data-export]").forEach((button) => {
    button.addEventListener("click", () => exportArtifact(button.dataset.export));
  });
}

async function connectBoard() {
  const board = boards[els.boardSelect.value];
  els.connectBoard.textContent = "Connecting...";

  if ("serial" in navigator && window.isSecureContext) {
    try {
      const port = await navigator.serial.requestPort();
      connectedPortLabel = port.getInfo ? `USB device ${JSON.stringify(port.getInfo())}` : "Web Serial device";
      els.detectedBoard.textContent = `Connected: ${board.name}`;
      appendConsoleLine("ok", `Board connected through Web Serial as ${connectedPortLabel}`);
      els.connectBoard.textContent = "Board connected";
      return;
    } catch (error) {
      appendConsoleLine("warn", "Web Serial connection was cancelled or blocked");
    }
  }

  connectedPortLabel = board.serial;
  els.detectedBoard.textContent = `Simulated connection: ${board.name}`;
  appendConsoleLine("ok", `Simulated board connection on ${board.serial}`);
  els.connectBoard.textContent = "Simulated board";
}

function renderComponentSuggestions() {
  const query = els.componentSearch.value.trim().toLowerCase();
  if (!query) {
    els.componentSuggestions.innerHTML = "";
    return;
  }

  const matches = Object.entries(components)
    .filter(([, part]) => {
      const haystack = `${part.name} ${part.type} ${part.keywords.join(" ")} ${part.power}`.toLowerCase();
      return haystack.includes(query);
    })
    .slice(0, 4);

  els.componentSuggestions.innerHTML = matches.length
    ? matches
        .map(
          ([id, part]) => `
          <button type="button" data-add-component="${id}">
            <strong>${part.name}</strong>
            <span>${selected.has(id) ? "Selected" : `Add ${part.type}`}</span>
          </button>
        `
        )
        .join("")
    : `<div class="empty-state">No matching part in this MVP library.</div>`;

  els.componentSuggestions.querySelectorAll("[data-add-component]").forEach((button) => {
    button.addEventListener("click", () => {
      selected.add(button.dataset.addComponent);
      els.componentSearch.value = "";
      els.componentSuggestions.innerHTML = "";
      renderComponentList();
      generateBuild();
    });
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
  const compatibility = calculateCompatibility(board, selectedParts, assignments, safety, confidence);

  currentBuild = { board, selectedParts, assignments, safety, libraries, confidence, compatibility };

  els.detectedBoard.textContent = connectedPortLabel ? `Connected: ${board.name}` : `USB board detected: ${board.name}`;
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
  renderCompatibility(compatibility);
  renderWiringChecklist(board, selectedParts, assignments, safety);
  renderAiSummary(board, selectedParts, assignments, safety);
  writeConsole([
    ["ok", `Detected ${board.name} on ${board.serial}`],
    ["ok", `Generated ${assignments.length} signal routes from project prompt`],
    ["warn", "Upload is simulated in this MVP; no device is flashed"]
  ]);
}

function renderAiSummary(board, parts, assignments, safety) {
  const warnings = safety.filter((item) => item.level !== "ok");
  const routed = assignments.filter((item) => item.pin).length;
  const intro = `${board.name} plan: ${routed}/${assignments.length} signals routed across ${parts.length} parts.`;
  const nextStep = warnings.length
    ? `Start with "${warnings[0].title}" before upload.`
    : "Next step: wire one component, open Serial Monitor, then test each signal.";

  els.aiResponse.innerHTML = `
    <strong>${intro}</strong>
    <span>${nextStep}</span>
  `;
}

function answerAiQuestion() {
  if (!currentBuild) generateBuild();

  const question = els.aiQuestion.value.trim().toLowerCase();
  const { board, selectedParts, assignments, safety } = currentBuild;
  const warnings = safety.filter((item) => item.level !== "ok");
  const danger = safety.find((item) => item.level === "danger");
  const firstAssignment = assignments.find((item) => item.pin);
  let answer = "";

  if (!question) {
    answer = `Tell me what failed: upload, wiring, sensor readings, or code. I already know this build is using ${board.name} with ${selectedParts.length} selected parts.`;
  } else if (question.includes("upload") || question.includes("block")) {
    answer = danger
      ? `Upload should stay blocked because ${danger.title.toLowerCase()}. Fix that hardware risk first, then regenerate and upload.`
      : `This build is upload-ready in the MVP. If a real board fails, check USB cable, selected port, board package, and Serial baud rate.`;
  } else if (question.includes("wire") || question.includes("safe") || question.includes("connect")) {
    answer = firstAssignment
      ? `Start with ${firstAssignment.part}: connect ${firstAssignment.signal} to ${firstAssignment.pin}, then connect ${board.voltage} and GND rails. Wire one module at a time and retest after each connection.`
      : `No routed signal is available yet. Remove a component or choose a board with more compatible pins.`;
  } else if (question.includes("test") || question.includes("first")) {
    answer = `First test power and ground, then run firmware with only Serial prints. Confirm each input changes in logs before enabling outputs like buzzers, servos, or relays.`;
  } else if (question.includes("buzzer")) {
    const buzzer = assignments.find((item) => item.partId === "buzzer");
    answer = buzzer
      ? `The buzzer signal is on ${buzzer.pin}. Use a small passive buzzer for direct GPIO drive. If it is an active/high-current buzzer, add a transistor driver.`
      : "Add the Piezo buzzer from the component drawer, then regenerate the build so I can assign a PWM-capable pin.";
  } else if (question.includes("sensor") || question.includes("reading")) {
    answer = `If readings look wrong, verify the sensor power rail matches ${board.voltage}, confirm the signal pin in the pin table, and print raw values before adding app logic.`;
  } else {
    answer = warnings.length
      ? `Most important fix: ${warnings[0].title}. ${warnings[0].detail}`
      : `This plan looks clean. Build it in stages: power rails first, one sensor next, then outputs, then upload the generated firmware.`;
  }

  els.aiResponse.innerHTML = `
    <strong>AI support</strong>
    <span>${answer}</span>
  `;
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

function calculateCompatibility(board, parts, assignments, safety, confidence) {
  const reasons = [];
  const missingRoutes = assignments.filter((item) => !item.pin).length;
  const dangerCount = safety.filter((item) => item.level === "danger").length;
  const warnCount = safety.filter((item) => item.level === "warn").length;
  let score = confidence;

  if (board.voltage === "3.3V" && parts.some((part) => part.id === "ultrasonic")) {
    reasons.push("HC-SR04 echo needs level shifting on 3.3V boards.");
  }
  if (parts.some((part) => part.id === "servo")) {
    reasons.push("Servo should use external 5V power with common ground.");
  }
  if (parts.some((part) => part.id === "oled") && !board.pins.some((pin) => pin.caps.includes("i2c"))) {
    reasons.push("OLED needs I2C pins that this board profile does not expose.");
    score -= 12;
  }
  if (missingRoutes) {
    reasons.push(`${missingRoutes} signal${missingRoutes > 1 ? "s" : ""} could not be routed.`);
  }
  if (!reasons.length) {
    reasons.push("All selected components have compatible pins in this board profile.");
  }

  score -= dangerCount * 4 + warnCount * 2;
  score = Math.max(35, Math.min(99, score));

  const label = score >= 88 ? "Strong fit" : score >= 72 ? "Usable with care" : "Needs changes";
  return { score, label, reasons };
}

function renderCompatibility(compatibility) {
  els.compatibilityValue.textContent = `${compatibility.score}%`;
  els.compatibilitySummary.textContent = compatibility.label;
  els.compatibilityReasons.innerHTML = compatibility.reasons.map((reason) => `<span>${reason}</span>`).join("");
}

function buildWiringSteps(board, parts, assignments, safety) {
  const steps = [];
  const byPart = new Map(parts.map((part) => [part.id, part]));

  parts.forEach((part) => {
    steps.push({
      type: "power",
      text: `Connect ${part.name} VCC to ${board.voltage} and GND to board ground.`
    });
  });

  assignments.forEach((assignment) => {
    if (!assignment.pin) {
      steps.push({
        type: "danger",
        text: `Resolve missing route for ${assignment.part} ${assignment.signal}.`
      });
      return;
    }
    steps.push({
      type: "signal",
      text: `Connect ${assignment.part} ${assignment.signal} to ${assignment.pin}.`
    });
  });

  safety
    .filter((item) => item.level !== "ok")
    .forEach((item) => {
      steps.push({
        type: item.level,
        text: `${item.title}: ${item.detail}`
      });
    });

  if (currentMode === "advanced") {
    assignments.forEach((assignment) => {
      const part = byPart.get(assignment.partId);
      if (assignment.pin && part) {
        steps.push({
          type: "advanced",
          text: `Advanced: ${assignment.pin} is used as ${assignment.cap.toUpperCase()} for ${part.name}; avoid sharing it with conflicting buses.`
        });
      }
    });
  }

  return steps;
}

function renderWiringChecklist(board, parts, assignments, safety) {
  const steps = buildWiringSteps(board, parts, assignments, safety);
  els.checklistProgress.textContent = `0/${steps.length} done`;
  els.wiringChecklist.innerHTML = steps
    .map(
      (step, index) => `
      <label class="checklist-item ${step.type}">
        <input type="checkbox" data-check-step="${index}" />
        <span>${step.text}</span>
      </label>
    `
    )
    .join("");

  els.wiringChecklist.querySelectorAll("[data-check-step]").forEach((checkbox) => {
    checkbox.addEventListener("change", updateChecklistProgress);
  });
}

function updateChecklistProgress() {
  const checkboxes = Array.from(els.wiringChecklist.querySelectorAll("[data-check-step]"));
  const done = checkboxes.filter((checkbox) => checkbox.checked).length;
  els.checklistProgress.textContent = `${done}/${checkboxes.length} done`;
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

function analyzeSerialLogs() {
  if (!currentBuild) generateBuild();
  const log = els.serialLogInput.value.trim().toLowerCase();
  const { board, assignments, safety } = currentBuild;
  let answer = "";

  if (!log) {
    answer = "Paste a serial monitor log first. I can look for upload errors, timeout patterns, stuck sensor readings, resets, and missing board output.";
  } else if (log.includes("avrdude") || log.includes("not in sync") || log.includes("permission")) {
    answer = `This looks like an upload/port issue. Confirm ${board.name} is selected, close other serial monitors, reconnect USB, then retry upload.`;
  } else if (log.includes("timeout") || log.includes("pulsein")) {
    const ultrasonic = assignments.find((item) => item.partId === "ultrasonic");
    answer = ultrasonic
      ? `Timeout points at the ultrasonic wiring. Recheck TRIG/ECHO pins in the map and verify echo voltage safety before retesting.`
      : "Timeout usually means the code is waiting for a sensor response. Check the signal pin, power rail, and sensor ground.";
  } else if (log.includes("nan") || log.includes("null")) {
    answer = "NaN/null readings usually mean the sensor library cannot read valid data. Check power, data pin, pull-up requirements, and library choice.";
  } else if (log.match(/(^|\\D)0(\\D|$)/) || log.includes("always low")) {
    answer = "A constant zero/LOW reading usually means the signal pin is floating, connected to ground, or mapped to the wrong pin.";
  } else if (log.includes("rst") || log.includes("brownout") || log.includes("reset")) {
    answer = "Reset/brownout logs point to power instability. Disconnect high-current outputs, power servos separately, and connect grounds together.";
  } else {
    const warning = safety.find((item) => item.level !== "ok");
    answer = warning
      ? `I do not see a known log pattern, but your build still has this hardware risk: ${warning.title}. ${warning.detail}`
      : "Logs look structurally normal. Add raw sensor prints one at a time so we can isolate the first failing signal.";
  }

  els.aiResponse.innerHTML = `
    <strong>Serial log AI</strong>
    <span>${answer}</span>
  `;
  appendConsoleLine("ok", "Serial logs analyzed by Hardware AI Copilot");
}

function exportArtifact(type) {
  if (!currentBuild) generateBuild();
  const { board, selectedParts, assignments, safety, libraries, compatibility } = currentBuild;
  let filename = "circuitship-export.txt";
  let mime = "text/plain";
  let content = "";

  if (type === "firmware") {
    filename = els.languageSelect.value === "python" ? "circuitship-main.py" : "circuitship-firmware.ino";
    content = els.firmwareCode.textContent;
  } else if (type === "checklist") {
    filename = "circuitship-wiring-checklist.md";
    content = [
      `# ${board.name} Wiring Checklist`,
      "",
      ...buildWiringSteps(board, selectedParts, assignments, safety).map((step) => `- [ ] ${step.text}`)
    ].join("\n");
  } else {
    filename = "circuitship-project.json";
    mime = "application/json";
    content = JSON.stringify(
      {
        prompt: els.prompt.value,
        mode: currentMode,
        board: board.name,
        firmware: els.languageSelect.value,
        components: selectedParts.map((part) => part.name),
        assignments,
        safety,
        libraries,
        compatibility
      },
      null,
      2
    );
  }

  downloadText(filename, content, mime);
  appendConsoleLine("ok", `Exported ${filename}`);
}

function downloadText(filename, content, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
