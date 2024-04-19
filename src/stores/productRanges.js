import { addProductRanges, deleteMultiProductRanges, deleteProductRanges, getProductRanges, updateProductRanges } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_PROJECT_RANGES_SUCCESS = "GET_PROJECT_RANGES_SUCCESS";

// initial state......
const initialState = {
    productRanges: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PROJECT_RANGES_SUCCESS:
            return {
                ...state, productRanges: payload
            };

        default:
            return state
    }

};

// actions.............


const getSinglePipeRangeData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getProductRanges(data)


        dispatch(loadingEnd())

        if (r.status === 200) {
            return r.data
        }
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching A Project Range",
        }))
        return err
    }

}


const getProductRangesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getProductRanges(data)
        console.log(r)
        if (r.status === 200) {
            dispatch({
                type: GET_PROJECT_RANGES_SUCCESS,
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

const addProductRangesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addProductRanges(data)

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

const updateProductRangesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateProductRanges(data)

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

const deleteMultiProductRangesData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiProductRanges(data)

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

const deleteProductRangesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteProductRanges(data)

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


export { reducer, getProductRangesData, addProductRangesData, deleteMultiProductRangesData, deleteProductRangesData, updateProductRangesData, getSinglePipeRangeData }
