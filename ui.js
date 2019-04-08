import Slider from './slider.js';
import ToggleButton from './toggleButton.js';

export function createControlPanel (
    { wave, label, num, activeWaves, updateFn }
) {
    const ui = document.querySelector('#ui');
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = label;
    div.appendChild(p);
    ui.appendChild(div);

    const ampSlider = new Slider({
        parent: div, max: 400, min: -400, value: wave.amp, label: 'amp',
        prop: 'amp', scope: wave, updateFn
    });
    const freqSlider = new Slider({
        parent: div, max: 400, min: 1, value: wave.freq, label: 'freq',
        prop: 'freq', scope: wave, updateFn
    });
    const phaseSlider = new Slider({
        parent: div, max: 200, min: 0, value: wave.phase, label: 'phase',
        prop: 'phase', scope: wave, updateFn
    });
    const vShiftSlider = new Slider({
        parent: div, max: 300, min: -300, value: wave.vShift, label: 'vShift',
        prop: 'vShift', scope: wave, updateFn
    });

    if (num !== 1) {
        const toggleButton = new ToggleButton({
            parent: div, prop: 'wave' + String(num), scope: activeWaves, value: false,
            updateFn: function () {
                if (this.value) {
                    ampSlider.enable();
                    freqSlider.enable();
                    phaseSlider.enable();
                    vShiftSlider.enable();
                } else {
                    ampSlider.disable();
                    freqSlider.disable();
                    phaseSlider.disable();
                    vShiftSlider.disable();
                }
                updateFn();
            }
        });
        toggleButton.updateFn();
    }
    return {ampSlider, freqSlider, phaseSlider, vShiftSlider};
}

export function createTogglePanelButton () {
    const panel = document.querySelector('#panel');
    const togglePanelDiv = document.querySelector('#toggle-panel');

    const toggleButton = new ToggleButton({
        parent: togglePanelDiv, prop: 'toggle-panel-btn', value: false,
        labelTrue: 'O', labelFalse: 'X',
        updateFn: function () {
            if (this.value) panel.classList.add('hide'); 
            else panel.classList.remove('hide'); 
        }
    });

    return toggleButton;
}
