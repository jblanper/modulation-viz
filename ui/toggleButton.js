import { html } from '../helper.js';

export default class ToggleButton {
    constructor ({
        parent, prop, scope = null, updateFn, value, labelTrue = 'on', labelFalse = 'off', title = null
    }) {
        this.prop = prop;
        this.scope = scope;
        this.updateFn = updateFn;

        this.labelTrue = labelTrue;
        this.labelFalse = labelFalse;
        this.value = value;
        this.title = title;

        this.node = null;
        this.parent = parent;

        this.render();
        this.eventListener();
    }

    render () {
        this.node = html('button', {
            id: this.prop, classes: ['toggle']
        }, null);

        if (this.title) this.node.title = this.title;

        if (!this.value) {
            this.node.classList.add('deactivated')
            this.node.innerHTML = this.labelFalse
        } else {
            this.node.innerHTML = this.labelTrue
        };

        this.parent.appendChild(this.node);
    }

    eventListener () {
        this.node.addEventListener('click', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        this.node.classList.toggle('deactivated');

        this.value = !this.value

        if (!this.value) this.node.innerHTML = this.labelFalse;
        else this.node.innerHTML = this.labelTrue;

        if (this.scope) this.scope[this.prop] = this.value;

        this.updateFn();
    }
}
