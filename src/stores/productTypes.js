import { getProductTypes, deleteMultiProductTypes, deleteProductType, addProductTypes, updateProductTypes } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_PRODUCT_TYPES_SUCCESS = "GET_PRODUCT_TYPES_SUCCESS";

// initial state......
const initialState = {
    productTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PRODUCT_TYPES_SUCCESS:
            return {
                ...state, productTypes: payload
            };

        default:
            return state
    }

};

// actions.............

const getProductTypesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getProductTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PRODUCT_TYPES_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Project Types",
        }))
        return err
    }

}

const addProductTypeData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addProductTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Project Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Project Type",
        }))
        return err
    }
}

const updateProductTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateProductTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Project Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Project Type",
        }))
        return err
    }
}

const deleteMultiProductData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiProductTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Project Types Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Project Types",
        }))
        return err
    }
}

const deleteProductTypeData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteProductType(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Project Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Project Type",
        }))
        return err
    }
}


export { reducer, getProductTypesData, addProductTypeData, deleteMultiProductData, deleteProductTypeData, updateProductTypesData }
