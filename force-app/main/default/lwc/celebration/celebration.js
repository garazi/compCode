import { LightningElement, api, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class Celebration extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    initialized = false;
    @track cssClasses = "container hideIt";

    start() {
        if (!this.initialized) {
            
            // The inline SVG elements
            this.square1 = (color) => `<?xml version="1.0" encoding="UTF-8"?> <svg id="rootShape" width="145px" height="145px" viewBox="0 0 145 145" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch --> <title>Outline square</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="shapes" transform="translate(-119.000000, -384.000000)" stroke="${color}" stroke-width="20"> <rect id="Outline-square" transform="translate(191.500000, 456.500000) rotate(-180.000000) translate(-191.500000, -456.500000) " x="129" y="394" width="125" height="125" rx="30"></rect> </g> </g> </svg>`;
            this.square2 = (color) => `<?xml version="1.0" encoding="UTF-8"?> <svg id="rootShape" width="145px" height="145px" viewBox="0 0 145 145" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch --> <title>solid square</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="shapes" transform="translate(-631.000000, -384.000000)" fill="${color}" stroke="${color}" stroke-width="5"> <rect id="solid-square" transform="translate(703.500000, 456.500000) rotate(-180.000000) translate(-703.500000, -456.500000) " x="633.5" y="386.5" width="140" height="140" rx="30"></rect> </g> </g> </svg>`;
            this.square3 = (color) => `<?xml version="1.0" encoding="UTF-8"?> <svg id="rootShape" width="145px" height="145px" viewBox="0 0 145 145" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch --> <title>solid & concentric square</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="shapes" transform="translate(-864.000000, -388.000000)" fill="${color}" fill-rule="nonzero"> <path d="M899,398 C885.192881,398 874,409.192881 874,423 L874,498 C874,511.807119 885.192881,523 899,523 L974,523 C987.807119,523 999,511.807119 999,498 L999,423 C999,409.192881 987.807119,398 974,398 L899,398 Z M899,388 L974,388 C993.329966,388 1009,403.670034 1009,423 L1009,498 C1009,517.329966 993.329966,533 974,533 L899,533 C879.670034,533 864,517.329966 864,498 L864,423 C864,403.670034 879.670034,388 899,388 Z M959,513 L914,513 C897.431458,513 884,499.568542 884,483 L884,438 C884,421.431458 897.431458,408 914,408 L959,408 C975.568542,408 989,421.431458 989,438 L989,483 C989,499.568542 975.568542,513 959,513 Z" id="solid-&-concentric-square" transform="translate(936.500000, 460.500000) rotate(-180.000000) translate(-936.500000, -460.500000) "></path> </g> </g> </svg>`;
            this.square4 = (color) => `<?xml version="1.0" encoding="UTF-8"?> <svg id="rootShape" width="151px" height="151px" viewBox="0 0 151 151" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch --> <title>lined square</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="shapes" transform="translate(-362.000000, -381.000000)" stroke="${color}" stroke-width="5"> <path d="M510,431.029856 L510,460.618761 L433.629773,384 L405.541274,384 L510,488.79867 L510,499 C510,504.558522 508.488273,509.763962 505.85353,514.22761 L380.030966,387.995578 C384.436561,385.45409 389.54847,384 395,384 L405.541274,384 L510,488.79867 L510,460.618761 L433.629773,384 L463.122698,384 L510,431.029856 L510,414 C510,397.431458 496.568542,384 480,384 L463.122698,384 L510,431.029856 Z M505.85353,514.22761 C502.399604,520.079073 497.015776,524.655767 490.577731,527.082007 L367.029306,403.131514 C369.519236,396.728103 374.144661,391.391253 380.030966,387.995578 L505.85353,514.22761 Z M490.577731,527.082007 C487.28812,528.321729 483.723269,529 480,529 L464.401003,529 L365,429.275513 L365,457.455422 L436.312503,529 L406.819578,529 L365,487.044327 L365,499 C365,515.568542 378.431458,529 395,529 L406.819578,529 L365,487.044327 L365,457.455422 L436.312503,529 L464.401003,529 L365,429.275513 L365,414 C365,410.166763 365.718929,406.501441 367.029306,403.131514 L490.577731,527.082007 Z" id="lined-square"></path> </g> </g> </svg>`;
            
            this.circles = this.template.querySelectorAll(".circle");
            this.initialized = true;
            this.counter = 0;
            this.windowHeight = window.innerHeight;
            
            // Setting the SVG
            this.setConfettiStyle(this.square1, "green", this.circles[0]);
            this.setConfettiStyle(this.square2, "green", this.circles[1]);
            
            requestAnimationFrame(this.animate.bind(this));

            for (var i = 0; i < this.circles.length; i++) {
                var circle = this.circles[i];
                circle.count = 0;
                circle.increment = this.getRandomNumber(1, 10) / 10;
                circle.xpos = this.getRandomNumber(0, window.innerWidth);

                circle.sign = Math.random() < 0.5 ? 1 : -1;

                var size = Math.round(this.getRandomNumber(10, 100));
                circle.style.width = size + "px";
                circle.style.height = size + "px";
                circle.ypos = -1 * size + 20;

                this.setTranslate(circle.xpos, circle.ypos, circle);
            }
        }
    }

    animate() {
        this.counter += .01;

        for (var i = 0; i < this.circles.length; i++) {
            var circle = this.circles[i];
            var newX = circle.xpos + circle.sign * 2 * Math.cos(this.counter + circle.increment);
            circle.xpos = newX;

            var newY = 3 + circle.ypos + 4 * circle.increment;
            circle.ypos = newY;

            this.setTranslate(newX, newY, circle);
        }

        var foo = requestAnimationFrame(() => {
            this.animate();
        });

        console.log("running");

        if (this.counter > 4) {
            cancelAnimationFrame(foo);
            this.cssClasses = "container";
            this.initialized = false;
            console.log("stopped");
        }
    }

    setConfettiStyle(style, color, el) {
      el.style.backgroundImage = "url('data:image/svg+xml;base64," + window.btoa(style(color)) + "')";
    }

    setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    getRandomNumber(low, high) {
        var r = Math.floor(Math.random() * (high - low + 1)) + low;
        return r;
    }

    connectedCallback() {
        registerListener('startAnimation', this.handleAnimation, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleAnimation(e) {
        if (e == "Sold") {
            this.cssClasses = "container";
            this.start();
        }
    }
}
