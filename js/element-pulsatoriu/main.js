var iteration = 0,
    prevTime = 0;

function contentLoadedHandler() {
    let element = document.querySelector('.pulsating-element--js'),
        controllers = document.querySelectorAll('.controller'),
        animationConfig = {
            target: element,
            minSizeInput: controllers[0],
            maxSizeInput: controllers[1],
            durationInput: controllers[2]
        };

        element.style.height = animationConfig.minSize + 'px';
        element.style.width = animationConfig.minSize + 'px';

    window.requestAnimationFrame(init.bind(animationConfig));
};

function init(timestamp) {
    let minSize = +this.minSizeInput.value,
        difference = +this.maxSizeInput.value - minSize,
        step = difference / 2 / +this.durationInput.value,
        sin = difference / 2 * Math.sin(iteration);
    
    if (isFinite(step)) {
        iteration += step;
    }
    
    this.target.style.width = minSize + difference / 2 + sin + 'px';
    this.target.style.height = minSize + difference / 2 + sin + 'px';

    prevTime = timestamp;

    window.requestAnimationFrame(init.bind(this));
}

document.addEventListener("DOMContentLoaded", contentLoadedHandler);
