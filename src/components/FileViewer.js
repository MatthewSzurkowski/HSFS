import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Moment from 'moment'
import axios from "axios";

import 'font-awesome/css/font-awesome.min.css';

import FileBrowser, {Icons} from 'react-keyed-file-browser'

const api = axios.create({
  baseURL: '/api/'
});


class NestedEditableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        files: []
    };
  }

  updateFiles = async (e) =>{
    try {
      this.setState({...this.state, isFetching: true});
      const response = await api.get('/fileInfo');
      this.setState({...this.state, files: response.data});
      this.setState({...this.state, isFetching: false});
  } catch (e) {
      console.log(e);
      this.setState({...this.state, isFetching: false});
    }
  }

  // findDegree = async (e) =>{
  //   let tempData = await api.get(
  //       '/fileInfo');
  //   console.log(tempData.data.files);
  // }

  componentDidMount() {
    this.updateFiles();
    this.timer = setInterval(() => this.updateFiles(), 3600000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
}

  // componentWillUnmount() {
    
  //   window.location.reload();
   
  // }

  formatTime(secs) {
    let hours   = Math.floor(secs / 3600);
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    window.location.reload();
    return [hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        .filter((v,i) => v !== '00' || i > 0)
        .join(':');
  }


  handleCreateFolder = async (key) => {
    // Ensures that no other folders can be made at the root level
    const folderToCreate = { folderName: key};
    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
      }])

      api.post(`/createFolder`, folderToCreate);
      window.location.reload();
      return state
    })
    window.location.reload();
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
    window.location.reload();
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
    window.location.reload();
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
    window.location.reload();
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
      const folderToRemove = { folderToRemove: folderKey};
      api.post(`/deleteFolder`, folderToRemove)
      return state
    })
    window.location.reload();
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
      api.post(`/deleteFile`, fileToRemove)
      return state
    })
    window.location.reload();
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
      <p>{this.state.isFetching ? 'Fetching data...' : ''}</p>
      </div>

    )
  }
}

export default NestedEditableDemo;