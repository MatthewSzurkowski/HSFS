import React, { Component } from 'react';
import axios from "axios";
import FileCard from './FileCard';
import "./styles/ViewMyFile.css";


const api = axios.create({
    baseURL: '/api/'
  });

class ViewMyFile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            fileUrl: "",
            fileType: "",
            folders: []
        };
      }

    handleChange = async (filename) => {
        this.state.fileUrl = filename;
        this.forceUpdate();
      };

      updateFiles = async (e) =>{
        try {
          this.setState({...this.state, isFetching: true});
          const response = await api.get('/getFileInfo');
          this.setState({...this.state, folders: response.data});
          const holdFolders = this.state.folders[0];
          this.changeInitialRender(holdFolders["value"]);
          this.setState({...this.state, isFetching: false});
      } catch (e) {
          console.log(e);
          this.setState({...this.state, isFetching: false});
        }
      }

    componentDidMount() {
        this.updateFiles();
        this.timer = setInterval(() => this.updateFiles(), 3600000);
      }
    
      componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
      }

    render(){
        return (
            <div>
                {/* <CustomDropdownFiles handleChange = {this.handleChange}/> */}
                <div className="files_container">
                    {
                        this.state.folders.map((item) => (
                            <FileCard fileUrl={item.value}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ViewMyFile;