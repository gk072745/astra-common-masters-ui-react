import { addPlumbingFixtureParameters, deleteMultiPlumbingFixtureParameters, deletePlumbingFixtureParameters, getPlumbingFixtureParameters, updatePlumbingFixtureParameters } from "../network/project.service";


// action types.........
const GET_PLUMBING_FIXTURE_PARAMETERS_SUCCESS = "GET_PLUMBING_FIXTURE_PARAMETERS_SUCCESS";

// initial state......
const initialState = {
    plumbingFixtureParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_PLUMBING_FIXTURE_PARAMETERS_SUCCESS:
            return {
                ...state,
                plumbingFixtureParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getPlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getPlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PLUMBING_FIXTURE_PARAMETERS_SUCCESS,
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

const addPlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addPlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updatePlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updatePlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiPlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiPlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deletePlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deletePlumbingFixtureParameters(data)

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
    reducer, getPlumbingFixtureParametersData,
    addPlumbingFixtureParametersData, updatePlumbingFixtureParametersData, deleteMultiPlumbingFixtureParametersData, deletePlumbingFixtureParametersData
}