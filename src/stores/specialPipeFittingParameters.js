import { addSpecialPipeFittingParameters, deleteMultiSpecialPipeFittingParameters, deleteSpecialPipeFittingParameters, getSpecialPipeFittingParameters, updateSpecialPipeFittingParameters } from "../network/project.service";


// action types.........
const GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS = "GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    specialPipeFittingParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS:
            return {
                ...state,
                specialPipeFittingParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_SPECIAL_PIPE_FITTING_PARAMETERS_SUCCESS,
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

const addSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiSpecialPipeFittingParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteSpecialPipeFittingParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteSpecialPipeFittingParameters(data)

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
    reducer, getSpecialPipeFittingParametersData,
    addSpecialPipeFittingParametersData, updateSpecialPipeFittingParametersData, deleteMultiSpecialPipeFittingParametersData, deleteSpecialPipeFittingParametersData
}