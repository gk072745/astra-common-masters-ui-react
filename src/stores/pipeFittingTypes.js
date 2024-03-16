import { addPipeFittingTypes, deleteMultiPipeFittingTypes, deletePipeFittingTypes, getPipeFittingTypes, updatePipeFittingTypes } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";

// action types.........
const GET_PIPE_FITTING_TYPE_SUCCESS = "GET_PIPE_FITTING_TYPE_SUCCESS";

// initial state......
const initialState = {
    pipeFittingTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_FITTING_TYPE_SUCCESS:
            return {
                ...state,
                pipeFittingTypes: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPipeFittingTypesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getPipeFittingTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_FITTING_TYPE_SUCCESS,
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

const addPipeFittingTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addPipeFittingTypes(data)

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

const updatePipeFittingTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updatePipeFittingTypes(data)

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

const deleteMultiPipeFittingTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiPipeFittingTypes(data)

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

const deletePipeFittingTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deletePipeFittingTypes(data)

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
    reducer, getPipeFittingTypesData,
    addPipeFittingTypesData, updatePipeFittingTypesData, deleteMultiPipeFittingTypesData, deletePipeFittingTypesData
}