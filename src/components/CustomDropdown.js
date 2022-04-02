import React from 'react';
import axios from "axios";
import { wait } from '@testing-library/user-event/dist/utils';
const api = axios.create({
    baseURL: '/api/'
  });
class CustomDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            folders: []
        };
        this.changeSelect = this.changeSelect.bind(this);
        this.changeInitialRender = this.changeInitialRender.bind(this);
      }
    
    changeInitialRender(val){
      this.props.handleChange(val);
    }

    updateFiles = async (e) =>{
        try {
          this.setState({...this.state, isFetching: true});
          const response = await api.get('/folderInfo');
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

    changeSelect(e){
        this.props.handleChange(e.target.value);
    }


    render () {
        let paths = this.state.folders;
        let optionItems = paths.map((path) =>
                <option key={path.key}>{path.value}</option>
            );

        return (
         <div>
             <select onChange={this.changeSelect}>
                {optionItems}
             </select>
         </div>
        )
    }
}

export default CustomDropdown;