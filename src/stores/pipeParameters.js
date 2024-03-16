import { addPipeParameters, deleteMultiPipeParameters, deletePipeParameters, getPipeParameters, updatePipeParameters } from "../network/project.service";


// action types.........
const GET_PIPE_PARAMETERS_SUCCESS = "GET_PIPE_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    pipeParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_PARAMETERS_SUCCESS:
            return {
                ...state,
                pipeParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPipeParametersData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getPipeParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_PARAMETERS_SUCCESS,
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

const addPipeParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addPipeParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updatePipeParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updatePipeParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiPipeParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiPipeParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deletePipeParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deletePipeParameters(data)

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
    reducer, getPipeParametersData,
    addPipeParametersData, updatePipeParametersData, deleteMultiPipeParametersData, deletePipeParametersData
}