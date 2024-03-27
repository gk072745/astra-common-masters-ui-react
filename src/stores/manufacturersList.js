import { addManufacturers, deleteManufacturers, deleteMultiManufacturers, getManufacturers, updateManufacturers } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";

// action types.........
const GET_MANUFACTURERS_SUCCESS = "GET_MANUFACTURERS_SUCCESS";

// initial state......
const initialState = {
    manufacturers: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MANUFACTURERS_SUCCESS:
            return {
                ...state,
                manufacturers: payload
            };
        default:
            return state;
    }
};

// actions.............

const getManufacturersData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart());
    try {
        const r = await getManufacturers(data);

        if (r.status === 200) {
            dispatch({
                type: GET_MANUFACTURERS_SUCCESS,
                payload: r.data.data
            });
            dispatch(loadingEnd());
        }

        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Manufacturers",
        }));
        return err;
    }
};

const addManufacturersData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await addManufacturers(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Manufacturers Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Manufacturers",
        }));
        return err;
    }
};

const updateManufacturersData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await updateManufacturers(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Manufacturers Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Manufacturers",
        }));
        return err;
    }
};

const deleteMultiManufacturersData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await deleteMultiManufacturers(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Manufacturers Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Manufacturers",
        }));
        return err;
    }
};

const deleteManufacturersData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await deleteManufacturers(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Manufacturers Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Manufacturers",
        }));
        return err;
    }
};

export {
    reducer,
    getManufacturersData,
    addManufacturersData,
    updateManufacturersData,
    deleteManufacturersData,
    deleteMultiManufacturersData,
};
