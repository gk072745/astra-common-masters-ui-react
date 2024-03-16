import { addSpecialPipeFittingParameters, deleteMultiSpecialPipeFittingParameters, deleteSpecialPipeFittingParameters, getSpecialPipeFittingParameters, updateSpecialPipeFittingParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS = "GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    specialPipeFittingParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS:
            return {
                ...state,
                specialPipeFittingParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await getSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Special Pipe Fitting Parameters",
        }))
        return err
    }

}

const addSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await addSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Special Pipe Fitting Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Special Pipe Fitting Parameter",
        }))
        return err
    }
}

const updateSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await updateSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Special Pipe Fitting Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Special Pipe Fitting Parameter",
        }))
        return err
    }
}

const deleteMultiSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Special Pipe Fitting Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Special Pipe Fitting Parameters",
        }))
        return err
    }
}

const deleteSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteSpecialPipeFittingParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Special Pipe Fitting Parameter Successfully",
            }))


        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Special Pipe Fitting Parameter",
        }))
        return err
    }
}


export {
    reducer, getSpecialPipeFittingParametersData,
    addSpecialPipeFittingParametersData, updateSpecialPipeFittingParametersData, deleteMultiSpecialPipeFittingParametersData, deleteSpecialPipeFittingParametersData
}