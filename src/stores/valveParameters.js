import { addValveParameters, deleteMultiValveParameters, deleteValveParameters, getValveParameters, updateValveParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_VALVE_PARAMETERS_SUCCESS = "GET_VALVE_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    valveParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_VALVE_PARAMETERS_SUCCESS:
            return {
                ...state,
                valveParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getValveParametersData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getValveParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_VALVE_PARAMETERS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Valve Parameterss",
        }))
        return err
    }

}

const addValveParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addValveParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Valve Parameters Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Valve Parameters",
        }))
        return err
    }
}

const updateValveParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateValveParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Valve Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Valve Parameters",
        }))
        return err
    }
}

const deleteMultiValveParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiValveParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Valve Parameterss Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Valve Parameterss",
        }))
        return err
    }
}

const deleteValveParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteValveParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Valve Parameters Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Valve Parameters",
        }))
        return err
    }
}


export {
    reducer, getValveParametersData,
    addValveParametersData, updateValveParametersData, deleteMultiValveParametersData, deleteValveParametersData
}