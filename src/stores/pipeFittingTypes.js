import { addPipeFittingTypes, deleteMultiPipeFittingTypes, deletePipeFittingTypes, getPipeFittingTypes, updatePipeFittingTypes } from "../network/project.service";

// action types.........
const GET_PIPE_FITTING_TYPE_SUCCESS = "GET_PIPE_FITTING_TYPE_SUCCESS";

// initial state......
const initialState = {
    pipeFittingTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PIPE_FITTING_TYPE_SUCCESS:
            return {
                ...state,
                pipeFittingTypes: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPipeFittingTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getPipeFittingTypes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PIPE_FITTING_TYPE_SUCCESS,
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

const addPipeFittingTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addPipeFittingTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updatePipeFittingTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updatePipeFittingTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiPipeFittingTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiPipeFittingTypes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deletePipeFittingTypesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deletePipeFittingTypes(data)

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
    reducer, getPipeFittingTypesData,
    addPipeFittingTypesData, updatePipeFittingTypesData, deleteMultiPipeFittingTypesData, deletePipeFittingTypesData
}