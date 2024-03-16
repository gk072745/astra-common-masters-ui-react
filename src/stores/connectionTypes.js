import { addConnectionTypes, deleteConnectionTypes, deleteMultiConnectionTypes, getConnectionTypes, updateConnectionTypes } from "../network/project.service";


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

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getConnectionTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_CONNECTION_TYPE_SUCCESS,
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

const addConnectionTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addConnectionTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateConnectionTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateConnectionTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiConnectionTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiConnectionTypes(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteConnectionTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteConnectionTypes(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Deleting Country', type: 'Feedback' })
        return err
    }
}


export { reducer, deleteConnectionTypesData, deleteMultiConnectionTypesData, updateConnectionTypesData, addConnectionTypesData, getConnectionTypesData }