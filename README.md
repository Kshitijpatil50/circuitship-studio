#preview link - 
http://localhost:5173/

# Circuitship Studio

Circuitship Studio is a self-contained webapp MVP for a "Vercel for hardware" workflow: describe an embedded/IoT project, select a board and components, then get a wiring plan, pin map, safety checks, generated firmware, and a simulated upload console.

## Features

- Plain-English embedded project prompt
- Board detection mock for Arduino Uno, ESP32 DevKit, and Raspberry Pi Pico W
- Component inference and manual component drawer
- Capability-aware pin assignment
- Generated wiring diagram
- Safety warnings for voltage, level shifting, resistors, relay use, and servo power
- Firmware generation in Arduino C++ or MicroPython
- Simulated upload console

## Run Locally

This is a static prototype, so it does not need a package install or build step.

Open `index.html` directly in a browser, or run a tiny local server:

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Project Structure

```text
.
├── index.html
├── src
│   ├── app.js
│   └── styles.css
└── README.md
```
