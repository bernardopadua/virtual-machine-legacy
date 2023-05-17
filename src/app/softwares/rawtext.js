import React from 'react';

export default class RawText {
	constructor() {
		this.software = {
			name: "RawText",
			description: "Reads raw file.",
			extensions: ["any"],
			size: 1,
			process: null
		};

		this.inParameter = {
			text: null,
			file: null
		};

		this.interface = {
			header: (
				<div><h3>{this.software.name}</h3></div>
			),
			body: ((inParameter)=>{
				var defaultValue = (inParameter.file !== null ? inParameter.file.fileData.data : "");
				return (
					<div>
						<div><textarea defaultValue={defaultValue} onChange={(e)=>{defaultValue = e.target.value;}}></textarea></div>
						<div><button onClick={()=>{ inParameter.file.save(defaultValue); }}>save changes</button></div>
					</div>
				);
			})
			/*(
				//<div><textarea defaultValue={(this.inParameter.file !== null ? this.inParameter.file.fileData.data : "")}> </textarea></div>

				<div><textarea defaultValue={this.inParameter.file.fileData.data}> </textarea></div>
			)*/,
			footer: (
				<div> RawText - Virtual Machine </div>
			)
		};
	}
}