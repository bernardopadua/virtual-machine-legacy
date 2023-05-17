import React from 'react';
import FileSystem from '../core/filesystem.js';
import BoundLink from '../core/boundlink.js';

export default class VirtualFileSystem extends React.Component {
	constructor(props){
		super(props);

		this.styles = {
			shown: {
				display: "block"
			},
			hidden: {
				display: "none"
			}
		}

		this.state = {
			currentFolder: FileSystem.currentLocation,
			options: {
				createFile: {
					style: this.styles.hidden,
					fileName: "Teste.txt",
					fileData: "testing RawText",
					fileSize: 150
				},
				createFolder: {
					style: this.styles.hidden,
					folderName: "teste"
				}
			}
		}

		BoundLink.openChannel('VFS', ()=>{ this.openChannel(); });
	}

	openChannel(){
		var boundData = BoundLink.getData('VFS');
		if (boundData.action == "build-workspace") {
			this.buildWorkSpace();
		}
	}

	buildWorkSpace(){
		this.setState({currentFolder: FileSystem.currentLocation});
	}

	createFile() {
		var createFile = this.state.options.createFile;
		FileSystem.createFile(createFile.fileName, createFile.fileData, Number.parseInt(createFile.fileSize));
		
		createFile.style = this.styles.hidden;
		this.setState(createFile);
	}

	createFolder() {
		var createFolder = this.state.options.createFolder;
		FileSystem.createFolder(this.state.options.createFolder.folderName);

		createFolder.style = this.styles.hidden;
		this.setState(createFolder);
	}

	onChangeField(e, fieldName, container) {
		var options = {};
		options[fieldName] = e.target.value;
		container = Object.assign(container, options);
		this.setState(container);
	}

	toogleValues(container) {
		if(container.style == this.styles.shown) {
			container.style = this.styles.hidden;
		} 
		else 
		{
			container.style = this.styles.shown;
		}
		this.setState(container);
	}

	render(){
		var createFile   = this.state.options.createFile;
		var createFolder = this.state.options.createFolder;
		return (
			<div>
				<div id="virtual-options">
					<ul>
						<li> 
							<span style={{cursor: 'pointer'}} onClick={()=>{this.toogleValues(createFile)}}>
								Create file
							</span>
							<div style={createFile.style}> 
								FileName: <input type="text" defaultValue={createFile.fileName} onChange={(e)=>{this.onChangeField(e, "fileName", createFile);}} /><br />
								Data: <textarea defaultValue={createFile.fileData} onChange={(e)=>{this.onChangeField(e, "fileData", createFile);}}></textarea><br />
								FileSize: <input type="text" defaultValue={createFile.fileSize} onChange={(e)=>{this.onChangeField(e, "fileSize", createFile);}} /><br />
								<button onClick={()=>{this.createFile();}}>Create File</button>
							</div>
						</li>
						<li>
							<span style={{cursor: 'pointer'}} onClick={()=>{this.toogleValues(createFolder)}}>
								Create folder
							</span>
							<div style={createFolder.style}>
								Folder name: <input type="text" defaultValue={createFolder.folderName} onChange={(e)=>{this.onChangeField(e, "folderName", createFolder);}} />
								<button onClick={()=>{this.createFolder();}}>Create folder</button>
							</div>
						</li>
					</ul> 
				</div>
				<div id="virtual-workspace">
					<ul> 
						<FolderComponent eventMessage={this.state.eventMessage} folder={this.state.currentFolder} />
					</ul>
				</div>
			</div>
		);
	}
}

export class FolderComponent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			orignstyle: {
				display: "none"
			},
			nonorign: {
				display: "block"
			}
		}
	}

	backFolder(){
		FileSystem.setCurrentFolder(this.props.folder.folderInfo.parentFolder);
		BoundLink.setDataCall('VFS', {action: "build-workspace"});
	}

	render (){
		var filesFolder = this.props.folder.folderInfo.files.map((file) => {
			return(
				<FileComponent key={file.fileInfo.unqId} file={file} />
			); 
		});

		var styleOpt = this.state.nonorign;
		if (this.props.folder.folderInfo.fdqId === './home') {
			styleOpt = this.state.orignstyle;
		}

		var pasteFolder = <a href="#" onClick={()=>{ this.props.folder.pasteFile(); }}> paste </a>;
		var backFolder = <a href="#" style={styleOpt} onClick={()=>{ this.backFolder(); }}> back </a>;

		var foldersFolder = this.props.folder.folderInfo.folders.map((folder)=>{
			return (
				<FolderFileComponent key={folder.folderInfo.fdqId} folder={folder} />
			);
		});

		return (
			<div>
				<div style={{fontFamily: "Verdana", fontSize: "12px"}}>#{this.props.folder.folderInfo.fdqId}> </div>
				<div style={{fontSize: "12px", paddingLeft: "20px"}}> 
					{backFolder} | {pasteFolder}
				</div>
				<div>
					<ul style={{fontSize: "12px"}}>
						{filesFolder}
						{foldersFolder}
					</ul>
				</div>
			</div>
		);
	}
}

export class FileComponent extends React.Component {
	copyFile() {
		FileSystem.copyToClipboard(this.props.file);
	}

	deleteFile(){
		this.props.file.deleteFromFolder();
		BoundLink.setDataCall('VFS', {action: "build-workspace"});
	}

	openFile(){
		this.props.file.open();
	}

	render(){
		var file = this.props.file.fileInfo;
		return (
			<li> 
				{file.name} (size: {file.size}) --
				<a href="#" onClick={() => {this.openFile()}}>open</a> |
				<a href="#" onClick={() => {this.copyFile()}}>copy</a> | 
				<a href="#" onClick={() => {this.deleteFile()}}>delete</a>
			</li>
		);
	}
}

export class FolderFileComponent extends React.Component {
	openFolder(){
		FileSystem.setCurrentFolder(this.props.folder);
		BoundLink.setDataCall('VFS', {action: "build-workspace"});
	}

	render(){
		var folder = this.props.folder.folderInfo;
		return (
			<li> 
				{folder.folderName} []
				<a href="#" onClick={() => { this.openFolder(); }}> open</a> | 
			</li>
		);
	}
}