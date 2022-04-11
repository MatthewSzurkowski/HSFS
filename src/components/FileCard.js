import React from "react";
import "./styles/FileCard.css";


function FileCard(props){
    let element=<p>Loading element</p>;
    const photoExts = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];
    const audioExts = ["mp3", "webm", "wav", "m4a", "ogg", "3gp", "flac"];
    const videoExts = ["mp4", "webm", "ogv"];
    const officeFileExts = ["pptx", "pdf", "docx"];
    let holdBaseURL = window.location.href;
    holdBaseURL = (holdBaseURL.split("/"));
    holdBaseURL = (holdBaseURL[0] + "//" + holdBaseURL[2]);

    let label = props.fileUrl.split('/');
    label = label[label.length-1];
    let ext = props.fileUrl.split('.');
    ext = ext[ext.length-1];
    let mainLink = "";
    // element=<a href={this.state.fileUrl}>LinkedIn handle</a>;
    let rootPath =  (holdBaseURL + "/api/root-drive" + props.fileUrl);
    if (photoExts.includes(ext)){
        mainLink = rootPath;
        element = <a href={mainLink}><img src={rootPath} className="fixed-image" width="200px" height="200px"></img></a>
    }
    else if (audioExts.includes(ext)){
        let modType = ("audio/" + ext);
        element = <audio controls><source src={rootPath} type={modType}></source></audio> 
        mainLink = rootPath;
    }
    else if (videoExts.includes(ext)){
        let modVidType = ("video/" + ext);
        element = <video controls><source src={rootPath} type={modVidType}/><p>Your browser doesn't support HTML5 video. Here is a <a href="myVideo.mp4">link to the video</a> instead.</p></video>
        mainLink = rootPath;
    }
    else if (officeFileExts.includes(ext)){
        let srcPath = "//docs.google.com/gview?url=" + rootPath + "&embedded=true";
        element = <iframe src={srcPath} width="100%" height="200px" frameborder="0"></iframe>
        mainLink = srcPath;
    }
    else{
        // Here is a <a href={rootPath}>link to the file</a> instead.
        element = <p>Unsupported file type.</p>
        mainLink = rootPath;
    }


    return (
        
        <div className="file_container">
            {element}
            <h5><b>Filename:</b></h5>
            <p><a href={mainLink}>{label}</a></p>
        </div>
    );
}

export default FileCard;