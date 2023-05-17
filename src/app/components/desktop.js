import React from 'react';
import SoftwareComponent from './software.js';

export default class Desktop extends React.Component {
	constructor(props){
		super(props);

		this.styles = {
			globalEvent: {
				shown: {
					display: "block",
					width: "100%",
					backgroundColor: "yellow",
					padding: "10px",
					fontFamily: "Verdana",
					fontWeight: "bold"
				}
			},
			hidden: {
				display: "none"
			}
		}

		this.state = {
			globalEvent: {
				style: this.styles.hidden
			},
			openSofts: []
		}

		this.props.eventMessage.callback = (()=>{ this.eventMessage(); });
	}

	eventMessage() {
		var evmsg = this.props.eventMessage;

		if (evmsg.type == 'to-user') {
			this.state.globalEvent.style = this.styles.globalEvent.shown;
			this.setState(this.state.globalEvent);
			setTimeout(()=>{
				this.state.globalEvent.style = this.styles.hidden;
				this.setState(this.state.globalEvent);
			}, this.props.eventMessage.timeMessage);
		}
		else if (evmsg.type == 'open-software') {
			this.state.openSofts.push(this.props.eventMessage.object);
			this.setState({openSofts: this.state.openSofts});
		}
		else if (evmsg.type == 'close-software') {
			var softIndex = this.state.openSofts.indexOf(this.props.eventMessage.object);
			console.log("soft-index");
			console.log(softIndex);
			if (softIndex !== -1) {
				this.state.openSofts.splice(softIndex, 1);
				this.setState(this.state.openSofts);
			}
		}
	}

	render(){
		
		var softComp = this.state.openSofts.map((s)=>{

			return (
				<SoftwareComponent key={s.software.process.getPid()} software={s} eventMessage={this.props.eventMessage} />
			);

		});

		return (
			<div id="desktop-os">
				<div style={this.state.globalEvent.style}> {this.props.eventMessage.message} </div>
				<ul>
					{softComp}
				</ul>
			</div>
		);
	}
}