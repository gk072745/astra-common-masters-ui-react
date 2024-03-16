import { addNormalPipeFittingParameters, deleteMultiNormalPipeFittingParameters, deleteNormalPipeFittingParameters, getNormalPipeFittingParameters, updateNormalPipeFittingParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS = "GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    normalPipeFittingParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS:
            return {
                ...state,
                normalPipeFittingParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await getNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Normal Pipe Fitting Parameters",
        }))
        return err
    }

}

const addNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Normal Pipe Fitting Parameter Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Normal Pipe Fitting Parameter",
        }))
        return err
    }
}

const updateNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Normal Pipe Fitting Parameter Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Normal Pipe Fitting Parameter",
        }))
        return err
    }
}

const deleteMultiNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Normal Pipe Fitting Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Normal Pipe Fitting Parameters",
        }))
        return err
    }
}

const deleteNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteNormalPipeFittingParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Normal Pipe Fitting Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Normal Pipe Fitting Parameter",
        }))
        return err
    }
}


export {
    reducer, getNormalPipeFittingParametersData,
    addNormalPipeFittingParametersData, updateNormalPipeFittingParametersData, deleteMultiNormalPipeFittingParametersData, deleteNormalPipeFittingParametersData
}