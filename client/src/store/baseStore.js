import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _data = [];

class BaseStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getData() {
        return _data;
    }
}

const store = new BaseStore();

dispatcher.register((action) => {
    console.log(action.actionTypes);
    switch (action.actionTypes) {
        case actionTypes.GET_ALL:
            _data = action.data;
            console.log(_data);
            store.emitChange();
            break;
        case actionTypes.POST:
            store.emitChange();
            break;
        case actionTypes.DELETE_ONE:
            store.emitChange();
            break;
        default:
    }
});

export default store;