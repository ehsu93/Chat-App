import {HOST, GET_URI, POST_URI, DELETE_URI} from '../constants';

export const getAll = async () => {
    try {
        const response = await fetch(HOST + GET_URI);
        const json = await response.json();
        return json;
    }
    catch(err) {
        console.error("error getting all");
        console.error(err);
    }
}

export const postOne = async(pId, name) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            pId: pId,
            name: name
        })
    };
    try {
        await fetch(HOST + POST_URI, requestOptions);
        console.log("saveApp");
    }
    catch(err) {
        console.error(err);
    }
}

export const deleteOne = async(id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
    try {
        console.log("deleting " + id);
        await fetch(HOST + DELETE_URI + "?_id="+id, requestOptions);
    }
    catch(err) {
        console.error(err);
    }
}