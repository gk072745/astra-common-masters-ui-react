import { addPipeData, deleteMultiPipeData, deletePipeData, getPipeData, updatePipeData } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";

// action types.........
const GET_PIPE_DATA_TYPE_SUCCESS = "GET_PIPE_DATA_TYPE_SUCCESS";
const SET_PROJECT_RANGE = "SET_PROJECT_RANGE";

// initial state......
const initialState = {
    pipeData: [],
    productRange: '',
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_DATA_TYPE_SUCCESS:
            return {
                ...state,
                pipeData: payload,
            };

        case SET_PROJECT_RANGE:
            return {
                ...state,
                productRange: payload,
            };

        default:
            return state
    }

};

// actions.............

const setProjectRangeData = (data) => (dispatch) => {
    dispatch({
        type: SET_PROJECT_RANGE,
        payload: data
    })
}

const getPipeDataData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getPipeData(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_DATA_TYPE_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Pipe Fitting Types",
        }))
        return err
    }

}

const addPipeDataData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addPipeData(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Pipe Fitting Type Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Pipe Fitting Type",
        }))
        return err
    }
}

const updatePipeDataData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updatePipeData(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Pipe Fitting Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Pipe Fitting Type",
        }))
        return err
    }
}

const deleteMultiPipeDataData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiPipeData(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Pipe Fitting Types Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Pipe Fitting Types",
        }))
        return err
    }
}

const deletePipeDataData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deletePipeData(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Pipe Fitting Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Pipe Fitting Type",
        }))
        return err
    }
}


export {
    reducer, getPipeDataData,
    addPipeDataData, updatePipeDataData, deleteMultiPipeDataData, deletePipeDataData,
    setProjectRangeData
}