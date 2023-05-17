export default class Software {
	constructor(objSoft, objInterface){
		this.software = {
			name: objSoft.name,
			description: objSoft.description,
			extensions: objSoft.extensions,
			size: objSoft.size,
			process: null,
			isOpened: false
		};

		this.inParameter = {
			text: null,
			file: null
		};

		this.interface = {
			header: objInterface.header,
			body: objInterface.body,
			footer: objInterface.footer
		};
	}

	close(){
		this.software.process.closeMe();
		this.software.isOpened = false;
	}

	setProcess(pProcess) {
		this.software.process = pProcess;
		this.software.isOpened = true;
	}

	setFileToOpen(file) {
		this.inParameter.file = file;
	}

	setTextParameter(parameter) {
		this.inParameter.text = parameter;
	}

	getFile() {
		return this.inParameter.file;
	}

	isOpen(){
		return this.software.isOpened;
	}

	doYouOpen(ext) {
		if (this.software.extensions[0] == 'any') {
			return true;
		} 
		else 
		{
			var iDo = null;
			iDo = this.sofware.extensions.find(ex=>ex==ext);
			return (iDo !== null ? true : false);
		}
	}
}