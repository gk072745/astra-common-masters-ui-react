import { addConnectionTypes, deleteConnectionTypes, deleteMultiConnectionTypes, getConnectionTypes, updateConnectionTypes } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_CONNECTION_TYPE_SUCCESS = "GET_CONNECTION_TYPE_SUCCESS";

// initial state......
const initialState = {
    connectionTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_CONNECTION_TYPE_SUCCESS:
            return {
                ...state, connectionTypes: payload
            };

        default:
            return state
    }

};

// actions.............

const getConnectionTypesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getConnectionTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_CONNECTION_TYPE_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Connection Types",
        }))
        return err
    }

}

const addConnectionTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addConnectionTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Connection Type Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Connection Type",
        }))
        return err
    }
}

const updateConnectionTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateConnectionTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Connection Type Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Connection Type",
        }))
        return err
    }
}

const deleteMultiConnectionTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiConnectionTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Connection Types Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Connection Types",
        }))
        return err
    }
}

const deleteConnectionTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteConnectionTypes(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Connection Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Connection Type",
        }))
        return err
    }
}


export { reducer, deleteConnectionTypesData, deleteMultiConnectionTypesData, updateConnectionTypesData, addConnectionTypesData, getConnectionTypesData }