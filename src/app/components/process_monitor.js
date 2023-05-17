import React from 'react';

export default class ProcessMonitor extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		var processes = this.props.prcPool.map((prc)=>{
			return (
				<Process process={prc} key={prc.processInfo.pid} />
			);
		});

		return (
			<div className="os-state">
				<ul>
					{processes}
				</ul>
			</div>
		);
	}
}

export class Process extends React.Component {

	render(){
		return (
			<li> 
				Pid: {this.props.process.processInfo.pid} | 
				Name: {this.props.process.processInfo.name} | 
				Mem: {this.props.process.processInfo.memory}
			</li>
		);
	}

}