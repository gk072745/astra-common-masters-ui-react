import { addMasterPipes, deleteMasterPipes, deleteMultiMasterPipes, getMasterPipes, updateMasterPipes } from "../network/project.service";


// action types.........
const GET_MASTER_PIPES_SUCCESS = "GET_MASTER_PIPES_SUCCESS";

// initial state......
const initialState = {
    masterPipes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_MASTER_PIPES_SUCCESS:
            return {
                ...state, masterPipes: payload
            };

        default:
            return state
    }

};

// actions.............

const getMasterPipesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getMasterPipes(data)

        if (r.status === 200) {
            dispatch({
                type: GET_MASTER_PIPES_SUCCESS,
                payload: r.data.data
            })
            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Fetching Master Pipes', type: 'Feedback' })
        return err
    }

}

const addMasterPipesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addMasterPipes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Master Pipes', type: 'Feedback' })
        return err
    }
}

const updateMasterPipesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateMasterPipes(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Master Pipes', type: 'Feedback' })
        return err
    }
}

const deleteMultiMasterPipesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiMasterPipes(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Master Pipes', type: 'Feedback' })
        return err
    }
}

const deleteMasterPipesData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMasterPipes(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Deleting Master Pipes', type: 'Feedback' })
        return err
    }
}







export { reducer, deleteMasterPipesData, deleteMultiMasterPipesData, updateMasterPipesData, addMasterPipesData, getMasterPipesData }
