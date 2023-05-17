import Hardware from '../computer/hardware.js';
import Kernel from './kernel.js';
import BoundLink from './boundlink.js';

import Process from './process.js';
import Software from './software.js';

export default class OperatingSystem {

	constructor(memory, num_cores){
		//Core
		this.kernel = null;
		this.pidList = 1; //Initializing pid list.
		this.processPool = [];
		this.intervalProcessPool = null;

		//Specs
		this.specs = {
			nameOS: null,
			memoryUsage: null,
			kernel: {
				memoryUnused: null,
				memoryUsing: null
			}
		};

		//Softwares
		this.installedSoftwares = [];

		//Hardware Specs
		this.hardware = new Hardware(memory, num_cores);

		//Message event for desktop
		this.eventMessages = {
			message: null,
			timeMessage: 4000,
			object: null,
			type: null,
			callback: null
		}
	}

	processDummy(memory){
		var newProcess = new Process(this.pidList, memory, this.hardware.processCore);
		newProcess.setDuration(this.getKernel().getMaxMemory());
		this.allocateProcess(newProcess);
	}

	getSoftwareToFile(extension){
		var softReturn = null;

		this.installedSoftwares.map((s)=>{

			if (s.doYouOpen(extension)) {
				softReturn = s;
			};

		});

		return softReturn;
	}

	installCrankshaft() {
		//Crankshaft Specs
		this.specs.nameOS = "Crankshaft";
		this.specs.memoryUsage = 350;

		//Installing Kernel
		this.kernel = new Kernel(this.hardware);
		
		//Allocate OS process
		var osProcess = new Process(this.pidList, this.specs.memoryUsage, this.hardware.processCore);
		osProcess.setProcessInfo({name: this.specs.nameOS, type: 'os'});
		this.allocateProcess(osProcess);

		//Initiate desktop
		BoundLink.setDataCall('VM', {type: 'desktop', action: "set-eventmessage", evtmsg: this.eventMessages});

		//Initializes the process looping
		this.intervalProcessPool = setInterval(() => { this.loopProcessPool(); }, 1000);
	}

	installSoftware(softSpec){
		var newProcess = new Process(this.pidList, softSpec.software.size, this.hardware.processCore);
		newProcess.setDuration(this.getKernel().getMaxMemory());
		newProcess.setProcessProperty("name", "installing-"+softSpec.software.name);

		var newSoftware = new Software(softSpec.software, softSpec.interface);

		newProcess.setCallbackProcessing(()=>{ 
			this.installedSoftwares.push(newSoftware);

			//Event messages in desktop
			this.eventMessages.type = 'to-user';
			this.eventMessages.message = "["+newSoftware.software.name+"] installed!";
			this.eventMessages.callback();
		});
		this.allocateProcess(newProcess);
	}

	automaticFileOpen(file) {
		var soft = this.getSoftwareToFile(file.extension);
		if (soft !== null) {
			if (!soft.isOpen()) {
				var softProcess = this.createProcess(soft.software.name, 'software', soft.software.size);
				soft.setProcess(softProcess);
				this.allocateProcess(softProcess);
				soft.setFileToOpen(file);

				//File locking
				file.lockMe();

				//Event messages in desktop
				this.eventMessages.type = 'open-software';
				this.eventMessages.object = soft;
				this.eventMessages.callback();
			} else {
				//Event messages software already open
				this.eventMessages.type = 'to-user';
				this.eventMessages.message = soft.software.name + " already is open, close it first!\nClose it to open another file!";
				this.eventMessages.callback();
			}
		}
	}

	refreshProcessMonitor(){
		BoundLink.setDataCall('VM', {type: 'process-monitor', data: this.processPool});
	}

	getProcessPool(){
		return this.processPool;
	}

	loopProcessPool(){
		//Process run cycle
		for (var prc of this.processPool) {
			
			var procType = prc.getType();

			if (procType !== 'os') {
				if (!prc.isRunning() && this.hardware.useCore()) {
					prc.run();
					this.refreshProcessMonitor();
				}
				if (prc.processDone()) {
					console.log("free-process");
					console.log(prc);
					this.hardware.freeCore();
					this.deallocateProcess(prc);
					this.refreshProcessMonitor();
				}
			}

		}
	}

	killProcessByPid(prId){
		this.processPool.map((prc)=>{ 

			if (prc.processInfo.pid == prId) {
				this.deallocateProcess(prc);
				//Call desktop
			}

		});
	}

	createProcess(name, type, sizeMem) {
		var newProcess = new Process(this.pidList, sizeMem, this.hardware.processCore);
		var prcInfo = {name: name, type: type};
		newProcess.setProcessInfo(prcInfo);

		return newProcess;
	}

	allocateProcess(objProcess){
		var memoryAllocate = this.getKernel().allocateMemory(objProcess.getMemory());

		if (memoryAllocate == true) {
			this.processPool.push(objProcess);
			this.pidList++;

			BoundLink.setData('VM', {type:'memory', action:'allocate-memory'});
			BoundLink.callReverse('VM');
		} else {
			BoundLink.setData('VM', {type:'memory', action:'error', error: memoryAllocate.error});
			BoundLink.callReverse('VM');
		}
	}

	deallocateProcess(objProcess) {
		var memoryDeallocate = this.getKernel().deallocateMemory(objProcess.getMemory());

		if(memoryDeallocate) {
			(() => {
				var pos = this.processPool.indexOf(objProcess);
				this.processPool.splice(pos, 1); //Removing process from pool
			})();
			BoundLink.setData('VM', {type:'memory', action:'allocate-memory'});
			BoundLink.callReverse('VM');
		} else {
			BoundLink.setData('VM', {type:'memory', action:'error', error: memoryAllocate.error});
			BoundLink.callReverse('VM');
		}
	}

	getSpecs() {
		this.specs.kernel.memoryUnused = this.kernel.getMemoryUnused();
		this.specs.kernel.memoryUsing = this.kernel.getUsingMemory();
		return this.specs;
	}

	getKernel(){
		return this.kernel;
	}

	getOS(){
		return this;
	}
}

module.exports = OperatingSystem;