import { addCommonProductFields, deleteCommonProductFields, deleteMultiCommonProductFields, getCommonProductFields, updateCommonProductFields, } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_COMMON_PRODUCT_FIELDS_SUCCESS = "GET_COMMON_PRODUCT_FIELDS_SUCCESS";

// initial state......
const initialState = {
    commonProductFields: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_COMMON_PRODUCT_FIELDS_SUCCESS:
            return {
                ...state,
                commonProductFields: payload,
            };

        default:
            return state
    }

};

// actions.............

const getCommonProductFieldsData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getCommonProductFields(data)

        if (r.status === 200) {
            dispatch({
                type: GET_COMMON_PRODUCT_FIELDS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Common Product Fields",
        }))
        return err
    }

}

const addCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addCommonProductFields(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Common Product Fields Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Common Product Fields",
        }))
        return err
    }
}

const updateCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateCommonProductFields(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Common Product Fields Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Common Product Fields",
        }))
        return err
    }
}

const deleteMultiCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiCommonProductFields(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Common Product Fields Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Common Product Fields",
        }))
        return err
    }
}

const deleteCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteCommonProductFields(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Common Product Fields  Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Common Product Fields ",
        }))
        return err
    }
}


export {
    reducer, getCommonProductFieldsData,
    addCommonProductFieldsData, updateCommonProductFieldsData, deleteMultiCommonProductFieldsData, deleteCommonProductFieldsData
}