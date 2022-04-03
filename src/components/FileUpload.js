import React from "react";

import axios from "axios";
const api = axios.create({
    baseURL: '/api/'
  });
  

class FileUpload extends React.Component{
    constructor(props){
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            foldername: "",
            file: undefined,
        }
        this.uploadFiles = this.uploadFiles.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
    }


    updateSelf = (value) => {
        this.setState({...this.state, foldername: value});
    }

    uploadFiles = async (e) =>{
        e.preventDefault();

        const formData = new FormData();
        const file = document.getElementById("myFile").files[0];
        formData.append("file", file);
        this.hold = this.state.foldername;
        formData.append("location", this.hold);
        const requestOptions = {
            mode: "no-cors",
            method: "POST",
            files: file,
            body: formData
        };
        console.log(requestOptions);

        await fetch("/api/upload", requestOptions).then(
            (response) => {
                console.log(response.data);
            }
        );
        window.location.reload();
    }

    fileChangeHandler(e){
        this.setState({...this.state, file: e.target.files[0]});
    }

    render = () =>{
        return(
            <div>
                <input type="file" id="myFile" name="file" onChange={this.fileChangeHandler}/>
                <button type="submit" onClick={this.uploadFiles}>Submit</button>
            </div>
        );
    }
}

export default FileUpload;