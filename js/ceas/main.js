var msInSecond = 1e3,
    msInMinute = 6e4,
    msInHour = 36e5,
    clock,
    paddingBetweenHours = 20,
    clockMiddle = 100,
    textFontSize = 16,
    secondsLine, minutesLine, hoursLine,
    secondsLineRotation = 0, minutesLineRotation = 0, hoursLineRotation = 0,
    secondStepAngle = 360 / 60,
    minuteStepAngle = 360 / 60,
    hourStepAngle = 360 / 12;

function contentLoadedHandler() {
    clock = document.getElementById('clock');
    paintHours();
    paintTrakers();
    
    setInterval(function() {
        secondsLineRotation += secondStepAngle;
        secondsLine.style.transform = `rotate(${ secondsLineRotation }deg)`; 
    }, msInSecond)

    setInterval(function() {
        minutesLineRotation += minuteStepAngle;
        minutesLine.style.transform = `rotate(${ minutesLineRotation }deg)`; 
    }, 10000)

    setInterval(function() {
        hoursLineRotation += hourStepAngle;
        hoursLine.style.transform = `rotate(${ hoursLineRotation }deg)`; 
    }, 20000)
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
        currentTime = new Date();

    secondsLineRotation += secondsLineRotation + (secondStepAngle * currentTime.getSeconds())
    minutesLineRotation += minutesLineRotation + (minuteStepAngle * currentTime.getMinutes());
    hoursLineRotation += hoursLineRotation + (hourStepAngle * currentTime.getHours());
   
    secondsLine = document.createElementNS("http://www.w3.org/2000/svg", 'line')
    secondsLine.setAttribute('x1', trackerOrigin)
    secondsLine.setAttribute('y1', trackerOrigin)

    secondsLine.setAttribute('x2', trackerOrigin)
    secondsLine.setAttribute('y2', trackerOrigin - 70)
    secondsLine.setAttribute('stroke', '#000')
    secondsLine.style.transformOrigin = `${ trackerOrigin }px ${ trackerOrigin }px`;
    secondsLine.style.transform = `rotate(${ secondsLineRotation }deg)`; 
    clock.appendChild(secondsLine);
    
    minutesLine = document.createElementNS("http://www.w3.org/2000/svg", 'line')
    minutesLine.setAttribute('x1', trackerOrigin)
    minutesLine.setAttribute('y1', trackerOrigin)

    minutesLine.setAttribute('x2', trackerOrigin)
    minutesLine.setAttribute('y2', trackerOrigin - 50)
    minutesLine.setAttribute('stroke', '#c00')
    minutesLine.style.transformOrigin = `${ trackerOrigin }px ${ trackerOrigin }px`;
    minutesLine.style.transform = `rotate(${ minutesLineRotation }deg)`; 
    clock.appendChild(minutesLine);
    
    hoursLine = document.createElementNS("http://www.w3.org/2000/svg", 'line')
    hoursLine.setAttribute('x1', trackerOrigin)
    hoursLine.setAttribute('y1', trackerOrigin)

    hoursLine.setAttribute('x2', trackerOrigin)
    hoursLine.setAttribute('y2', trackerOrigin - 30)
    hoursLine.setAttribute('stroke', '#0c0')
    hoursLine.style.transformOrigin = `${ trackerOrigin }px ${ trackerOrigin }px`;
    hoursLine.style.transform = `rotate(${ hoursLineRotation }deg)`; 
    clock.appendChild(hoursLine);
}


document.addEventListener("DOMContentLoaded", contentLoadedHandler);
