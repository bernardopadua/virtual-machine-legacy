import OperatingSystem from './OS.js';

export default class Kernel {

	constructor(newHardware){
		this.hardware = newHardware;
		this.maxMemory = this.hardware.memory;
	}

	allocateMemory(memory){
		if (memory < this.hardware.memory) {
			this.hardware.memory -= memory;
			return true;
		} 
		else 
		{
			return { error: "Memory can't stash this!" };
		}
	}

	deallocateMemory(memory){
		if (memory <= this.getUsingMemory()) {
			this.hardware.memory += memory;
			return true;
		} 
		else 
		{
			return { error: "This amount of memory can't be deallocated!" };
		}
	}

	getMemoryUnused(){
		return this.hardware.memory;
	}

	getUsingMemory(){
		return this.maxMemory - this.hardware.memory;
	}

	getMaxMemory(){
		return this.maxMemory;
	}

} 