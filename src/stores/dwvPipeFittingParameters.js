import { addDWVPipeFittingParameters, deleteDWVPipeFittingParameters, deleteMultiDWVPipeFittingParameters, getDWVPipeFittingParameters, updateDWVPipeFittingParameters } from "../network/project.service";

// action types.........
const GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS = "GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    dwvPipeFittingParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS:
            return {
                ...state,
                dwvPipeFittingParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_DWV_PIPE_FITTING_PARAMETERS_SUCCESS,
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

const addDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiDWVPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteDWVPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteDWVPipeFittingParameters(data)

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
    reducer, getDWVPipeFittingParametersData,
    addDWVPipeFittingParametersData, updateDWVPipeFittingParametersData, deleteMultiDWVPipeFittingParametersData, deleteDWVPipeFittingParametersData
}