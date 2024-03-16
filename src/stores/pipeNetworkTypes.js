import { addPipeNetworkTypes, deleteMultiPipeNetworkTypes, deletePipeNetworkTypes, getPipeNetworkTypes, updatePipeNetworkTypes } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_PIPE_NETWORK_TYPES_SUCCESS = "GET_PIPE_NETWORK_TYPES_SUCCESS";

// initial state......
const initialState = {
    pipeNetworkTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_NETWORK_TYPES_SUCCESS:
            return {
                ...state,
                pipeNetworkTypes: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPipeNetworkTypesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getPipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_NETWORK_TYPES_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())
        }
        return r
    } catch (err) {

        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Pipe Network Types",
        }))
        return err
    }

}

const addPipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await addPipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Pipe Network Type Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Pipe Network Type",
        }))
        return err
    }
}

const updatePipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updatePipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Pipe Network Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Pipe Network Type",
        }))
        return err
    }
}

const deleteMultiPipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiPipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Pipe Network Types Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Pipe Network Types",
        }))
        return err
    }
}

const deletePipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deletePipeNetworkTypes(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Pipe Network Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Pipe Network Type",
        }))
        return err
    }
}


export {
    reducer, getPipeNetworkTypesData,
    addPipeNetworkTypesData, updatePipeNetworkTypesData, deleteMultiPipeNetworkTypesData, deletePipeNetworkTypesData
}