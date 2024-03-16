import { addDWVPipeFittingParameters, deleteDWVPipeFittingParameters, deleteMultiDWVPipeFittingParameters, getDWVPipeFittingParameters, updateDWVPipeFittingParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";

// action types.........
const GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS = "GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    dwvPipeFittingParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS:
            return {
                ...state,
                dwvPipeFittingParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getDWVPipeFittingParametersData = (data) => async (dispatch) => {

    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching DWV Pipe Fitting Parameters",
        }))
        return err
    }

}

const addDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added DWV Pipe Fitting Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding DWV Pipe Fitting Parameter",
        }))
        return err
    }
}

const updateDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated DWV Pipe Fitting Parameter Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating DWV Pipe Fitting Parameter",
        }))
        return err
    }
}

const deleteMultiDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted DWV Pipe Fitting Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting DWV Pipe Fitting Parameters",
        }))
        return err
    }
}

const deleteDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteDWVPipeFittingParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted DWV Pipe Fitting Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting DWV Pipe Fitting Parameter",
        }))
        return err
    }
}


export {
    reducer, getDWVPipeFittingParametersData,
    addDWVPipeFittingParametersData, updateDWVPipeFittingParametersData, deleteMultiDWVPipeFittingParametersData, deleteDWVPipeFittingParametersData
}