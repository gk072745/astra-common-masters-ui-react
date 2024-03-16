import { addPipeNetworkTypes, deleteMultiPipeNetworkTypes, deletePipeNetworkTypes, getPipeNetworkTypes, updatePipeNetworkTypes } from "../network/project.service";


// action types.........
const GET_PIPE_NETWORK_TYPES_SUCCESS = "GET_PIPE_NETWORK_TYPES_SUCCESS";

// initial state......
const initialState = {
    pipeNetworkTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_NETWORK_TYPES_SUCCESS:
            return {
                ...state,
                pipeNetworkTypes: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPipeNetworkTypesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getPipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_NETWORK_TYPES_SUCCESS,
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

const addPipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addPipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updatePipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updatePipeNetworkTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiPipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiPipeNetworkTypes(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deletePipeNetworkTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deletePipeNetworkTypes(data)

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
    reducer, getPipeNetworkTypesData,
    addPipeNetworkTypesData, updatePipeNetworkTypesData, deleteMultiPipeNetworkTypesData, deletePipeNetworkTypesData
}