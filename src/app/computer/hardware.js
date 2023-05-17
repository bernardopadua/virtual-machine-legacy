export default class Hardware {
	constructor(memory, numCores){
		this.memory = memory;
		this.processCore = numCores;
		this.usingCores = 0;
	}

	useCore(){
		if (this.usingCores < this.processCore) {
			this.usingCores++;
			return true;
		}
		else 
		{
			return false;
		}
	}

	freeCore(){
		if (this.usingCores > 0) {
			this.usingCores--;
		}
	}
}