export default class Wave {
    constructor ({ amp, freq, phase = 0, vShift = 0 }) {
        // sine wave options
        this.amp = amp;
        this.freq = freq;
        this.phase = phase;
        this.vShift = vShift;
    }

    getPoint (x) {
        // formula A sin(B / x + C) + D
        return this.amp * Math.sin(x / this.freq + this.phase) + this.vShift;
    }
};
