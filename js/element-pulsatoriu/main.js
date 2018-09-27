var count = 1,
    isForward = true;

function contentLoadedHandler() {
    let element = document.querySelector('.pulsating-element--js'),
        animationConfig = {
            target: element,
            minSize: 100,
            maxSize: 200,
            time: 1000,
            step: 2.2
        }

    window.requestAnimationFrame(init.bind(animationConfig));
};

function init() {
    let currentDiameter = this.target.offsetWidth;
    
    if (isForward) {
        this.target.style.width = currentDiameter + this.step + "px";
        this.target.style.height = currentDiameter + this.step + "px";
        isForward = currentDiameter + this.step < this.maxSize; 
    }

    if (!isForward) {
        this.target.style.width = currentDiameter - this.step + "px";
        this.target.style.height = currentDiameter - this.step + "px";
        isForward = currentDiameter - this.step < this.minSize; 
    }

    window.requestAnimationFrame(init.bind(this));
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
