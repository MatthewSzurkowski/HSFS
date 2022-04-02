import React, { Component } from 'react';
// import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';
import CustomDropdownFiles from './CustomDropdownFiles';

class ViewMyFile extends Component{

    handleChange = async (filename) => {
        this.filename = filename;
        console.log(this.filename);
      };

    render(){
        return (
            <div>
                <CustomDropdownFiles handleChange = {this.handleChange}/>
                {/* <FileViewer
                fileType={type}
                filePath={this.filename}
                errorComponent={CustomErrorComponent}
                onError={this.onError}/> */}
            </div>
        );
    }
}

export default ViewMyFile;