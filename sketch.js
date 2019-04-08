import Wave from './wave.js';
import { createControlPanel, createTogglePanelButton } from './ui.js';
import { createCanvas } from './helper.js';

// variables
const ctx = createCanvas();
const width = ctx.canvas.clientWidth;
const height = ctx.canvas.clientHeight;

const wave1 = new Wave({amp: 100, freq: 100, phase: 0, vShift: 0});
const wave2 = new Wave({amp: 100, freq: 100, phase: 0, vShift: 0});
const wave3 = new Wave({amp: 100, freq: 100, phase: 0, vShift: 0});
const wave4 = new Wave({amp: 100, freq: 100, phase: 0, vShift: 0});
const wave5 = new Wave({amp: 100, freq: 100, phase: 0, vShift: 0});

let activeWaves = {wave2: false, wave3: false, wave4: false, wave5: false};

// ui
let wave1ControlPanel = createControlPanel({
    wave: wave1, label: 'Signal', num: 1, activeWaves, updateFn: draw
});
let wave2ControlPanel = createControlPanel({
    wave: wave2, label: 'Modulator 1: signal amp', num: 2, activeWaves, updateFn: draw
});
let wave3ControlPanel = createControlPanel({
    wave: wave3, label: 'Modulator 2: signal freq', num: 3, activeWaves, updateFn: draw
});
let wave4ControlPanel = createControlPanel({
    wave: wave4, label: 'Modulator 3: signal phase', num: 4, activeWaves, updateFn: draw
});
let wave5ControlPanel = createControlPanel({
    wave: wave5, label: 'Modulator 4: signal vShift', num: 5, activeWaves, updateFn: draw
});

createTogglePanelButton();

// draw method
function draw () {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        if (activeWaves.wave2) {
            wave1.amp = wave2.getPoint(x);
            wave1ControlPanel.ampSlider.disable();
        } else {
            wave1ControlPanel.ampSlider.enable();
        }
        if (activeWaves.wave3) {
            wave1.freq = wave3.getPoint(x);
            wave1ControlPanel.freqSlider.disable();
        } else {
            wave1ControlPanel.freqSlider.enable();
        }
        if (activeWaves.wave4) {
            wave1.phase = wave4.getPoint(x);
            wave1ControlPanel.phaseSlider.disable();
        } else {
            wave1ControlPanel.phaseSlider.enable();
        }
        if (activeWaves.wave5) {
            wave1.vShift = wave5.getPoint(x);
            wave1ControlPanel.vShiftSlider.disable();
        } else {
            wave1ControlPanel.vShiftSlider.enable();
        }

        let y = wave1.getPoint(x);
        //if (activeWaves.wave2) y = wave2.getPoint(y);
        //if (activeWaves.wave3) y = wave3.getPoint(y);
        //if (activeWaves.wave4) y = wave4.getPoint(y);
        //if (activeWaves.wave5) y = wave5.getPoint(y);

        ctx.lineTo(x, y + height - (height / 2));
    }
    ctx.stroke();
}

draw();
