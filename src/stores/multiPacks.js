import { addMultiPacks, deleteMultiMultiPacks, deleteMultiPacks, getMultiPacks, updateMultiPacks } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_MULTI_PACKS_SUCCESS = "GET_MULTI_PACKS_SUCCESS";

// initial state......
const initialState = {
    multiPacks: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_MULTI_PACKS_SUCCESS:
            return {
                ...state, multiPacks: payload
            };

        default:
            return state
    }

};

// actions.............

const getMultiPacksData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getMultiPacks(data)

        if (r.status === 200) {
            dispatch({
                type: GET_MULTI_PACKS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Project Ranges",
        }))
        return err
    }

}

const addMultiPacksData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addMultiPacks(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Project Ranges Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Project Ranges",
        }))
        return err
    }
}

const updateMultiPacksData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateMultiPacks(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Project Ranges Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Project Ranges",
        }))
        return err
    }
}

const deleteMultiMultiPacksData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiMultiPacks(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Project Ranges Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Project Ranges",
        }))
        return err
    }
}

const deleteMultiPacksData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiPacks(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Project Ranges Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Project Ranges",
        }))
        return err
    }
}


export { reducer, getMultiPacksData, addMultiPacksData, deleteMultiMultiPacksData, deleteMultiPacksData, updateMultiPacksData }
