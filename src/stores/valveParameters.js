import { addValveParameters, deleteMultiValveParameters, deleteValveParameters, getValveParameters, updateValveParameters } from "../network/project.service";



// action types.........
const GET_VALVE_PARAMETERS_SUCCESS = "GET_VALVE_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    valveParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_VALVE_PARAMETERS_SUCCESS:
            return {
                ...state,
                valveParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getValveParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getValveParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_VALVE_PARAMETERS_SUCCESS,
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

const addValveParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addValveParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateValveParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateValveParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiValveParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiValveParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteValveParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteValveParameters(data)

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
    reducer, getValveParametersData,
    addValveParametersData, updateValveParametersData, deleteMultiValveParametersData, deleteValveParametersData
}