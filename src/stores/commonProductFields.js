import { addCommonProductFields, deleteCommonProductFields, deleteMultiCommonProductFields, getCommonProductFields, updateCommonProductFields, } from "../network/project.service";


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

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getCommonProductFields(data)

        if (r.status === 200) {
            dispatch({
                type: GET_COMMON_PRODUCT_FIELDS_SUCCESS,
                payload: r.data.data
            })
            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Fetching Connection Types', type: 'Feedback' })
        return err
    }

}

const addCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addCommonProductFields(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateCommonProductFields(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiCommonProductFields(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteCommonProductFieldsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteCommonProductFields(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Deleting Country', type: 'Feedback' })
        return err
    }
}


export {
    reducer, getCommonProductFieldsData,
    addCommonProductFieldsData, updateCommonProductFieldsData, deleteMultiCommonProductFieldsData, deleteCommonProductFieldsData
}