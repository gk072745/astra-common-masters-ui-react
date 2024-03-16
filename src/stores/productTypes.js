import { getProductTypes, deleteMultiProductTypes, deleteProductType, addProductTypes, updateProductTypes } from "../network/project.service";


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

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getProductTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PRODUCT_TYPES_SUCCESS,
                payload: r.data.data
            })
            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Fetching Project Types', type: 'Feedback' })
        return err
    }

}

const addProductTypeData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addProductTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Project Type', type: 'Feedback' })
        return err
    }
}

const updateProductTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateProductTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Project Type', type: 'Feedback' })
        return err
    }
}

const deleteMultiProductData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiProductTypes(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Project Types', type: 'Feedback' })
        return err
    }
}

const deleteProductTypeData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteProductType(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Deleting Project Type', type: 'Feedback' })
        return err
    }
}

const importData = (data) => async (dispatch) => {

}





export { reducer, getProductTypesData, addProductTypeData, deleteMultiProductData, deleteProductTypeData, updateProductTypesData }
