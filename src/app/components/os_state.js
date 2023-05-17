import React from 'react';

export default class OsState extends React.Component {

	constructor(props){
		super(props);
		this.state = {os: this.props.os};
	}

	render() {
		var os = this.state.os;
		return (
			<div className="os-state">
				OS / {os.nameOS} <br />
				<ul>
					
					<li>Memory Unused: {os.kernel.memoryUnused}</li>
					<li>Memory Using: {os.kernel.memoryUsing}</li>

				</ul>
			</div>
		);
	}

	refreshOsState(osSpec){
		this.setState({os: osSpec});
	}

}

module.exports = OsState;