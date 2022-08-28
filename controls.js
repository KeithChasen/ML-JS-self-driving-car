class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        this.#addKeyboardListeners();
    }

    #keyListenerCallback(e, val) {
        switch (e.key) {
            case 'ArrowLeft':
                this.left = val;
                break;
            case 'ArrowRight':
                this.right = val;
                break;
            case 'ArrowUp':
                this.forward = val;
                break;
            case 'ArrowDown':
                this.reverse = val;
                break;
        }
        console.table(this)
    }

    #addKeyboardListeners() {
        document.onkeydown = e => this.#keyListenerCallback(e,true)
        document.onkeyup = e => this.#keyListenerCallback(e, false)
    }
}
