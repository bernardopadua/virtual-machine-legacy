export default class Process {
	constructor(pid, memory, speed){
		this.processInfo = {
			pid: pid,
			name: null,
			memory: memory,
			type: 'normal',
			duration: null,
			speed: speed,
			isDone: false,
			isRunning: false,
			lpProcess: null,
			callback: null
		}
	}

	run(){
		this.processInfo.isRunning = true;

		if (this.processInfo.type !== 'software') {
			this.processInfo.lpProcess = setInterval(() => {

				this.processInfo.duration = this.processInfo.duration - this.processInfo.speed;
				this.processInfo.isDone = (this.processInfo.duration <= 0 ? true : false);

				if (this.processDone()) {
					if(this.processInfo.callback !== null) {
						this.processInfo.callback();
					}
					clearInterval(this.processInfo.lpProcess);
				}

			}, (this.processInfo.speed*1000)/this.processInfo.speed);
		}
	}

	setProcessProperty(name, value){
		this.processInfo[name] = value;
	}

	setDuration(maxMemory){
		this.processInfo.duration = (this.processInfo.memory*(this.processInfo.speed*0.04));
	}

	setProcessInfo(objInfo) {
		this.processInfo = Object.assign(this.processInfo, objInfo);
	}

	getMemory() {
		return this.processInfo.memory;
	}

	processDone() {
		return this.processInfo.isDone;
	}

	getPid(){
		return this.processInfo.pid;
	}

	getType() {
		return this.processInfo.type;
	}

	isRunning() {
		return this.processInfo.isRunning;
	}

	setCallbackProcessing(prcCallback){
		this.processInfo.callback = prcCallback;
	}

	closeMe(){
		this.processInfo.isDone = true;
	}
}