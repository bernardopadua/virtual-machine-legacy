import React from 'react';

export default class SoftwareComponent extends React.Component {
	constructor(props){
		super(props);

		this.software = this.props.software.software;
		this.inParameter = this.props.software.inParameter;
		this.interface = this.props.software.interface;
	}

	closeSoft(){
		this.props.software.close();
		this.props.eventMessage.type = "close-software";
		this.props.eventMessage.object = this.props.software;
		this.props.eventMessage.callback();

		//File Unlocking
		if (this.inParameter.file !== null) {
			this.inParameter.file.unlockMe();
		}
	}

	render() {
		return (
			<div style={{backgroundColor: "gray", width: "250px"}}>
				<div>
					{this.interface.header}> 
					<div style={{float: "right"}}> <a href="#" onClick={()=>{ this.closeSoft(); }}>[ close ]</a> </div>
				</div>
				{this.interface.body(this.inParameter)}
				{this.interface.footer}
			</div>
		);
	}
}