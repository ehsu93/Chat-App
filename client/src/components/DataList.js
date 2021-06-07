import React, {useState, useEffect } from "react";
import {deleteFromDB, getAllFromDB} from '../actions/baseActions';

const fields = ["pId", "name"]

function getHeader(fields){
    return fields.map((key, index) => {
        return <th key={key} style={{textAlign: 'center'}}>{key}</th>
    })
}

function getKeys(inp) {
    return Object.keys(inp.data[0]);
}

function checkField(field) {
    let inp = field.toLowerCase();
    console.log('inp is');
    console.log(inp);
    switch(inp) {
        case "pid":
            return true;
        case "name":
            return true;
         default:
             return false;
    }
}

function getRowData(inp) {
    if(inp.data.length === 0) {
        return (<div>No items displayed</div>);
    }
    var items = inp.data;
    var keys = getKeys(inp);
    return items.map((row, index) => {
        return (
            <tr key={row._id}>
                <RenderRow data={row} keys={keys}/>
                <td>
                    <button onClick={() => deleteRow(row._id)}>X</button>
                </td>
            </tr>
        )
    })
}

async function deleteRow(id){
    await deleteFromDB(id);
    await getAllFromDB();
}

const RenderRow = (props) => {
    console.log("keys are");
    console.log(props.keys);
    return props.keys.filter((key) => checkField(key)).map((key, index) => {
        console.log(key);
        return <td key={props.data[key]} style={{textAlign: 'center'}}>{props.data[key]}</td>
    });
};

function DataList(props) {
    return (
        <div>
            <table className="jumbotron">
                <thead>
                    <tr>
                        {getHeader(fields)}
                    </tr>
                </thead>
                <tbody>
                    {getRowData(props)}
                </tbody>
            </table>
        </div>
    )
}

export default DataList;