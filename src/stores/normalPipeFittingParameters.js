import { addNormalPipeFittingParameters, deleteMultiNormalPipeFittingParameters, deleteNormalPipeFittingParameters, getNormalPipeFittingParameters, updateNormalPipeFittingParameters } from "../network/project.service";


// action types.........
const GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS = "GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    normalPipeFittingParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS:
            return {
                ...state,
                normalPipeFittingParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_NORMAL_PIPE_FITTING_PARAMETERS_SUCCESS,
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

const addNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiNormalPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteNormalPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteNormalPipeFittingParameters(data)

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
    reducer, getNormalPipeFittingParametersData,
    addNormalPipeFittingParametersData, updateNormalPipeFittingParametersData, deleteMultiNormalPipeFittingParametersData, deleteNormalPipeFittingParametersData
}