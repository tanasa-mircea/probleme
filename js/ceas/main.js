var clock,
    clockMiddle = 100,
    textFontSize = 16,
    trackersConfig = [
        {
            name: 'Seconds',
            marginOffset: 70,
            strokeColor: '#000',
            currentRotation: 0,
            stepAngle: 360 / 60,
            interval: 1000
        }, {
            name: 'Minutes',
            marginOffset: 60,
            strokeColor: '#c00',
            currentRotation: 0,
            stepAngle: 360 / 60,
            interval: 60 * 1000
        }, {
            name: 'Hours',
            marginOffset: 40,
            strokeColor: '#0f0',
            currentRotation: 0,
            stepAngle: 360 / 12,
            interval: 60 * 60 * 1000
        }
    ]

function contentLoadedHandler() {
    clock = document.getElementById('clock');
    paintHours();
    paintTrakers();
};

function paintHours() {
    let hour = document.createElementNS("http://www.w3.org/2000/svg", 'text'),
        sinIterator = 0;
    
    for (let index = 12; index >= 1; index--) {
        sinIterator = (-index * 2 * Math.PI / 12);
        hour.textContent = '' + index;
        hour.setAttribute('x', clockMiddle + -clockMiddle * Math.sin(sinIterator));
        hour.setAttribute('y', clockMiddle + textFontSize + -clockMiddle * Math.cos(sinIterator));
        clock.appendChild(hour.cloneNode(true));
    }
}

function paintTrakers() {
    let trackerOrigin = clockMiddle + 8,
        currentTime = new Date(),
        untilZero = 0;

    let line = document.createElementNS("http://www.w3.org/2000/svg", 'line')
    line.setAttribute('x1', trackerOrigin)
    line.setAttribute('y1', trackerOrigin)
    line.setAttribute('x2', trackerOrigin)
    line.style.transformOrigin = `${ trackerOrigin }px ${ trackerOrigin }px`;
    var line2;
    
    for (let index = 0; index < trackersConfig.length; index++) {
        let currentTraker = trackersConfig[index],
            rotation = currentTraker.currentRotation + currentTraker.stepAngle * currentTime[`get${currentTraker.name}`]();

        line.setAttribute('y2', trackerOrigin - currentTraker.marginOffset);
        line.setAttribute('stroke', currentTraker.strokeColor);
        line.style.transform = `rotate(${ rotation }deg)`;
        line.id = `traker${ currentTraker.name }`;
        lineClone = line.cloneNode(true);
        clock.appendChild(lineClone);

        currentTraker.currentRotation = rotation;
        currentTraker.node = lineClone;

        if (currentTraker.name === 'Minutes') {
            untilZero = (60 - currentTime.getSeconds()) * 1000;
        }

        if (currentTraker.name === 'Hours') {
            untilZero = (60 - currentTime.getMinutes()) * 60 * 1000;
        }

        setTimeout(function() {
            intervalHandler(currentTraker);

            setInterval(function() {
                intervalHandler(currentTraker);
            }, currentTraker.interval)
        }, untilZero)    
    }
}

function intervalHandler(currentTraker) {
    currentTraker.currentRotation =  currentTraker.currentRotation + currentTraker.stepAngle;
    currentTraker.node.style.transform = `rotate(${ currentTraker.currentRotation }deg)`;
}


document.addEventListener("DOMContentLoaded", contentLoadedHandler);
