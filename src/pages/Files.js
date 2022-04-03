import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import "./styles/Common.css";
import "./styles/Files.css";
import MyFileViewer from "../components/MyFileViewer";
import CustomDropdown from '../components/CustomDropdown';
import FileUpload from "../components/FileUpload";

class Files extends Component{

  handleChange = async (foldername) => {
    this.foldername.updateSelf(foldername);
    console.log(foldername);
  };
  
  render(){
    return (
      <Container>
        <h2 className="page-title">Files</h2>
        <div className='file-viewer-container'>
            <MyFileViewer/>
        </div>
        <div>
          <h2>Upload a file</h2>
          <div>
            {/* Add a prop here that updates which folder to select */}
            <CustomDropdown handleChange = {this.handleChange}/>
            <FileUpload ref={(ip) => {this.foldername = ip}}/>
            {/* add a upload file button here that takes that prop and sends the file to that folder */}
          </div>
        </div>
      </Container>
  );
  }
}

export default Files;
