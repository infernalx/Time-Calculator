class Time {
	constructor(hours, mins, secs, millis) {
		this.hours = hours;
		this.mins = mins;
		this.secs = secs;
		this.millis = millis;
	}
}

let totalLabel = document.querySelector('.time');
let startStopBtn = document.querySelector('.controlBtn');
let presjekBtn = document.querySelector('.timeBtn');

var timer = null;
var timing = false;
let lastInput = null;
/*
startStopBtn.addEventListener('click', function() {
	if (timing == false) {
		addNewField();
		timing = true;
		timer = setInterval(setTotalTime, 1);
		startStopBtn.innerHTML = "Stop";
	} else {
		timing = false;
		clearInterval(timer);
		startStopBtn.innerHTML = "Start";
	}
	presjekBtn.classList.toggle('hide');
	startStopBtn.classList.toggle('started');
});

presjekBtn.addEventListener('click', function() {
	addNewField();
});
*/
let input = document.getElementById("myInput");

input.addEventListener("keyup", function(event) {
	eventHandle(event);
});

function eventHandle(e) {
	e.preventDefault();
	if (e.keyCode === 13) {
		addNewField();
		setTotalTime();
	}
}

function addNewField() {
	let x = document.createElement("input");
    x.setAttribute("type", "text");
    x.setAttribute("id", "myInput");
    x.setAttribute("class", "free");
    document.getElementById('wrapper').appendChild(x);
	lastInput = x;
	lastInput.addEventListener('keyup', eventHandle);
}

function getTime(input) {
	let val = input.value;
	if (val.length == 0) return new Time(0,0,0,0);
	let hours = Number.parseInt(val.substring(0,2));
	let mins = Number.parseInt(val.substring(3,5));
	let secs = Number.parseInt(val.substring(6,8));
	let millis = Number.parseInt(val.substring(9,12));
	return new Time(hours, mins, secs, millis);
}

function setTotalTime() {
	let inputs = document.querySelectorAll('input');
	if (inputs.length == 0) addNewField();
	let time = new Time(0,0,0,0);
	for (let i=0; i<inputs.length-1; i++) {
		let tmpTime = getTime(inputs[i]);
		time.hours += tmpTime.hours;
		time.mins += tmpTime.mins;
		time.secs += tmpTime.secs;
		time.millis += tmpTime.millis;
		while(time.mins >= 60){
			time.hours++;
			time.mins -= 60;
		}
		while(time.secs >= 60) {
			time.mins++;
			time.secs -= 60;
		}
		while(time.millis >= 1000) {
			time.secs++;
			time.millis -= 1000;
		}
	}
	totalLabel.value = (time.hours < 10 ? "0"+time.hours : time.hours) + ":" + (time.mins < 10 ? "0"+time.mins : time.mins) + ":" + (time.secs < 10 ? "0"+time.secs : time.secs) + "." + (time.millis < 100 ? "0" : "") + (time.millis < 10 ? "0"+time.millis : time.millis);
}