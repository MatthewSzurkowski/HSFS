import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'
import axios from "axios";

import 'font-awesome/css/font-awesome.min.css';

import FileBrowser, {Icons} from 'react-keyed-file-browser'

class NestedEditableDemo extends React.Component {
  state = {
    files: []
  }

//   componentDidMount() {
//     axios.get(`http://localhost:3001/fileInfo`)
//       .then(res => {
//         const files = res.data;
//         this.setState({ files });
//       })
//   }

//   componentWillUnmount() {
    
//     location.reload();
   
//   }

  formatTime(secs) {
    let hours   = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    this.forceUpdate();
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v,i) => v !== '00' || i > 0)
        .join(':');
  }


  handleCreateFolder = (key) => {
    // Ensures that no other folders can be made at the root level
    const folderToCreate = { folderName: key};
    var hold = key;
    hold = hold.split('/');
    console.log(hold);
    if (hold.length==2){
      return;
    }
    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
      }])

      axios.post(`http://localhost:3001/createFolder`, folderToCreate)
      .then(res => {
        console.log(res.data);
      })
      window.location.reload();
      return state
    })
    this.forceUpdate();
  }

  handleCreateFiles = (files, prefix) => {
    this.setState(state => {
      const newFiles = files.map((file) => {
        let newKey = prefix
        if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
          newKey += '/'
        }
        newKey += file.name
        return {
          key: newKey,
          size: file.size,
          modified: +Moment(),
        }
      })

      const uniqueNewFiles = []
      newFiles.map((newFile) => {
        let exists = false
        state.files.map((existingFile) => {
          if (existingFile.key === newFile.key) {
            exists = true
          }
        })
        if (!exists) {
          uniqueNewFiles.push(newFile)
        }
      })
      state.files = state.files.concat(uniqueNewFiles)
      return state
    })
    this.forceUpdate();
  }

  handleRenameFolder = (oldKey, newKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key.substr(0, oldKey.length) === oldKey) {
          newFiles.push({
            ...file,
            key: file.key.replace(oldKey, newKey),
            modified: +Moment(),
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
    this.forceUpdate();
  }
  handleRenameFile = (oldKey, newKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key === oldKey) {
          newFiles.push({
            ...file,
            key: newKey,
            modified: +Moment(),
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
    this.forceUpdate();
  }
  handleDeleteFolder = (folderKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key.substr(0, folderKey.length) !== folderKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      const folderToRemove = { fileToRemove: folderKey};
      axios.post(`http://localhost:3001/deleteFolder`, folderToRemove)
      .then(res => {
        console.log(res.data);
      })
      return state
    })
    this.forceUpdate();
  }
  handleDeleteFile = (fileKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.map((file) => {
        if (file.key !== fileKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      const fileToRemove = { fileToRemove: fileKey};
      axios.post(`http://localhost:3001/deleteMarkdown`, fileToRemove)
      .then(res => {
        console.log(res.data);
      })
      return state
    })
    this.forceUpdate();
  }

  render() {
    return (
        <div>
          <center>
      <FileBrowser
        files={this.state.files}
        icons={Icons.FontAwesome(4)}

        onCreateFolder={this.handleCreateFolder}
        onCreateFiles={this.handleCreateFiles}
        onMoveFolder={this.handleRenameFolder}
        onMoveFile={this.handleRenameFile}
        // onRenameFolder={this.handleRenameFolder}
        // onRenameFile={this.handleRenameFile}
        onDeleteFolder={this.handleDeleteFolder}
        onDeleteFile={this.handleDeleteFile}
      />
      </center>
      </div>

    )
  }
}

export default NestedEditableDemo;