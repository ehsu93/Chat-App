import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";
import {getAll, postOne, deleteOne} from "../api/base.api";

export async function getAllFromDB() {
    try {
        console.log("getting all from db");
        let response = await getAll();
        dispatcher.dispatch({
            actionTypes: actionTypes.GET_ALL,
            data: response,
        })
    }
    catch(err) {
        console.error("Error performing action get all from db");
        console.error(err);
    }
}

export async function postToDB(pId, name) {
    let response = await postOne(pId, name);
    dispatcher.dispatch({
        actionTypes: actionTypes.POST,
        data: response
    })
}

export async function deleteFromDB(id) {
    let response = await deleteOne(id);
    dispatcher.dispatch({
        actionTypes: actionTypes.DELETE_ONE,
        data: response
    })
}