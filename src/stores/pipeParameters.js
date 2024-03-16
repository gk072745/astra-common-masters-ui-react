import { addPipeParameters, deleteMultiPipeParameters, deletePipeParameters, getPipeParameters, updatePipeParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";



// action types.........
const GET_PIPE_PARAMETERS_SUCCESS = "GET_PIPE_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    pipeParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_PARAMETERS_SUCCESS:
            return {
                ...state,
                pipeParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPipeParametersData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getPipeParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_PARAMETERS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Pipe Parameters",
        }))
        return err
    }

}

const addPipeParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addPipeParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Pipe Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Pipe Parameters",
        }))
        return err
    }
}

const updatePipeParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updatePipeParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Pipe Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Pipe Parameters",
        }))
        return err
    }
}

const deleteMultiPipeParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiPipeParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Pipe Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Pipe Parameters",
        }))
        return err
    }
}

const deletePipeParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deletePipeParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Pipe Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Pipe Parameter",
        }))
        return err
    }
}


export {
    reducer, getPipeParametersData,
    addPipeParametersData, updatePipeParametersData, deleteMultiPipeParametersData, deletePipeParametersData
}