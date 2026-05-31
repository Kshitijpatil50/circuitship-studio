localhost link - http://localhost:3000/

# Circuitship Studio

Circuitship Studio is an AI-assisted hardware IDE MVP for embedded and IoT projects. It is designed around a simple idea: hardware prototyping should feel as fast and guided as modern web development.

Instead of jumping between tutorials, datasheets, wiring diagrams, Arduino IDE setup, pinout charts, and serial monitor debugging, a user can describe what they want to build and get a guided hardware plan in one place.

Example prompt:

```text
Make a smart doorbell with motion sensor and buzzer.
Blink an LED while motion is active and print status to serial.
```

Circuitship Studio turns that into component suggestions, a pin map, a wiring diagram, safety checks, generated firmware, an upload simulation, and AI-assisted debugging guidance.

## Why This Exists

Web developers have tools like Vercel, Replit, and modern AI coding environments that make deployment and iteration feel smooth. Embedded hardware still often feels stuck in an older workflow:

- Beginners do not know which pins are safe or compatible.
- Wiring mistakes can damage boards or components.
- Voltage mismatches are easy to miss.
- Firmware examples rarely match the exact wiring.
- Debugging serial logs is confusing for new makers.
- Hardware prototyping requires too many disconnected tools.

Circuitship Studio explores what a "Vercel for hardware" could feel like.

## Core Features

- Plain-English project prompt for embedded and IoT ideas
- Board selection for Arduino Uno, ESP32 DevKit, and Raspberry Pi Pico W
- Component inference from project descriptions
- Searchable component drawer
- Capability-aware pin assignment
- Generated SVG wiring diagram
- Interactive wiring checklist with progress tracking
- Safety checks for resistors, level shifting, relays, servos, voltage rails, and missing routes
- Board compatibility score with human-readable reasons
- Firmware generation in Arduino C++ and MicroPython
- Simulated upload console
- Web Serial-ready board connection flow with simulated fallback
- Hardware AI Copilot for contextual help
- Serial log AI debugger
- Beginner and Advanced modes
- Export buttons for firmware, wiring checklist, and project JSON

## User Journey

1. Choose a board or simulate connecting one.
2. Describe the project in plain English.
3. Let the app infer useful components.
4. Search and add extra parts if needed.
5. Generate a build plan.
6. Review the wiring diagram, pin assignment, compatibility score, and safety checks.
7. Follow the interactive wiring checklist.
8. Generate Arduino C++ or MicroPython firmware.
9. Simulate upload and inspect console output.
10. Ask the Hardware AI Copilot for help or paste serial logs into the debug assistant.
11. Export firmware, checklist, or project JSON.

## Supported MVP Hardware Profiles

Boards:

- Arduino Uno
- ESP32 DevKit
- Raspberry Pi Pico W

Components:

- PIR motion sensor
- Piezo buzzer
- Status LED
- Push button
- DHT22 temperature sensor
- HC-SR04 ultrasonic sensor
- Micro servo
- OLED I2C display
- Soil moisture sensor
- Relay module

## Tech Stack

This MVP is intentionally lightweight and runs as a static web app:

- HTML
- CSS
- Vanilla JavaScript
- SVG wiring diagram rendering
- Browser Blob downloads for exports
- Web Serial-ready connection flow with simulated fallback

There is no build step, package manager, framework, backend, or database required.

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
python3 -m http.server 3000
```

Then visit:

```text
http://localhost:3000
```

## Project Structure

```text
.
├── index.html
├── README.md
├── .gitignore
└── src
    ├── app.js
    └── styles.css
```

## Current MVP Limitations

This is a product prototype, not a production flashing tool yet.

- Uploading firmware is simulated.
- Web Serial support depends on browser and hardware permissions.
- The AI Copilot is rule/context-based inside the browser, not connected to a hosted LLM.
- The component database is small and hand-authored.
- Electrical safety checks are educational and should not replace datasheets or expert review.

## Roadmap

Potential next steps:

- Real Web Serial firmware upload flow
- Larger component and board knowledge graph
- Library/package resolution for generated firmware
- Compile verification before upload
- Real LLM integration for project planning and debugging
- Saved projects and shareable build links
- Breadboard-style wiring diagram renderer
- Import/export for Arduino IDE, PlatformIO, and MicroPython
- Hardware test scripts and guided serial monitor sessions

## Vision

Circuitship Studio is a step toward AI-native hardware development: a tool where a beginner can describe an idea and get a safe, understandable path to a working connected device.

The goal is not just to generate code. The goal is to understand the relationship between the idea, the board, the components, the wiring, the firmware, and the debugging loop.

Hardware should be easier to start, safer to learn, and faster to prototype.
