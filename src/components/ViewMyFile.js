import React, { Component } from 'react';
import CustomDropdownFiles from './CustomDropdownFiles';
import axios from "axios";
const api = axios.create({
    baseURL: '/api/'
  });

class ViewMyFile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            fileUrl: "",
            fileType: ""
        };
      }

    handleChange = async (filename) => {
        this.state.fileUrl = filename;
        console.log(this.filename);
        this.forceUpdate();
      };

    render(){
        let element=<p>Choose a file from the dropdown to create a link to the file!</p>;
        const photoExts = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];
        const audioExts = ["mp3", "webm", "wav", "m4a", "ogg", "3gp", "flac"];
        const videoExts = ["mp4", "webm", "ogv"];
        const officeFileExts = ["pptx", "pdf", "docx"];

        if(this.state.fileUrl!==""){
            console.log(this.state.fileUrl)
            let ext = this.state.fileUrl.split('.');
            ext = ext[ext.length-1];
            console.log(ext)
            // element=<a href={this.state.fileUrl}>LinkedIn handle</a>;
            let rootPath = "http://149.248.54.130/api/root-drive/" + this.state.fileUrl;
            if (photoExts.includes(ext)){
                element = <img src={rootPath} width="50%" height="50%"></img>
            }
            else if (audioExts.includes(ext)){
                let modType = ("audio/" + ext);
                element = <audio controls><source src={rootPath} type={modType}></source></audio> 
            }
            else if (videoExts.includes(ext)){
                let modVidType = ("video/" + ext);
                element = <video controls><source src={rootPath} type={modVidType}/><p>Your browser doesn't support HTML5 video. Here is a <a href="myVideo.mp4">link to the video</a> instead.</p></video>
            }
            else if (officeFileExts.includes(ext)){
                let srcPath = "//docs.google.com/gview?url=" + rootPath + "&embedded=true";
                element = <iframe src={srcPath} width="100%" height="500px" frameborder="0"></iframe>
            }
            else{
                element = <p>Unsupported file type. Here is a <a href={rootPath}>link to the file</a> instead.</p>
            }
        } 
        return (
            <div>
                <CustomDropdownFiles handleChange = {this.handleChange}/>
                <div>
                    {element}
                </div>
            </div>
        );
    }
}

export default ViewMyFile;