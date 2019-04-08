import { html } from './helper.js';

export default class ToggleButton {
    constructor ({
        parent, prop, scope = null, updateFn, value, labelTrue = 'on', labelFalse = 'off'
    }) {
        this.prop = prop;
        this.scope = scope;
        this.updateFn = updateFn;

        this.labelTrue = labelTrue;
        this.labelFalse = labelFalse;
        this.value = value;

        this.node = null;
        this.parent = parent;

        this.render();
        this.eventListener();
    }

    render () {
        this.node = html('button', {
            id: this.prop, classes: ['toggle']
        }, null);

        if (!this.value) {
            this.node.classList.add('deactivated')
            this.node.textContent = this.labelFalse
        } else {
            this.node.textContent = this.labelTrue
        };

        this.parent.appendChild(this.node);
    }

    eventListener () {
        this.node.addEventListener('click', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        this.node.classList.toggle('deactivated');

        this.value = !this.value

        if (!this.value) this.node.textContent = this.labelFalse;
        else this.node.textContent = this.labelTrue;

        if (this.scope) this.scope[this.prop] = this.value;

        this.updateFn();
    }
}
