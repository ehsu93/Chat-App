import React, { useState, useEffect } from "react";

import {DataList, DataSubmissionForm} from "../components";
import store from '../store/baseStore';
import { getAllFromDB } from "../actions/baseActions";

function Placeholder() {
    const [data, setData] = useState(store.getData());

    useEffect(() => {
        console.log("use effect");
        store.addChangeListener(onChange);
        if (store.getData().length === 0) {
            getAllFromDB();
        }
        return () => store.removeChangeListener(onChange);
    }, []);

    function onChange() {
        console.log("onChange");
        setData(store.getData());
    }

    return (
        <div>
            <DataSubmissionForm />
            <DataList data ={data} />
         </div> 
    );
}//<PostLists posts={placeholders} />

export default Placeholder;
