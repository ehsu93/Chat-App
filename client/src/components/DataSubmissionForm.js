import React, {useState, useEffect } from "react";
import {postToDB, getAll, getAllFromDB} from "../actions/baseActions";

class DataSubmissionForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleIdChange(event) {
        this.setState({
            id: event.target.value
        })
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    async handleClick(event) {
        event.preventDefault();
        await postToDB(this.state.id, this.state.name);
        await getAllFromDB();
        this.setState({
            id:'',
            name:''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleClick} >
                <label>
                    ID:
                    <input type="text" name="id" value = {this.state.id} onChange={this.handleIdChange} required/>
                </label>    
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} required/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default DataSubmissionForm