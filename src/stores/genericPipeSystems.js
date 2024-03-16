import { addGenericPipeSystems, deleteGenericPipeSystems, deleteMultiGenericPipeSystems, getGenericPipeSystems, updateGenericPipeSystems } from "../network/project.service";


// action types.........
const GET_GENERIC_PIPE_SYSTEMS_SUCCESS = "GET_GENERIC_PIPE_SYSTEMS_SUCCESS";

// initial state......
const initialState = {
    genericPipeSystems: [],
    genericPipeSystemsForTable: []
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_GENERIC_PIPE_SYSTEMS_SUCCESS:
            const genericPipeSystemsForTable =
                payload.map(data => {
                    const masterPipes = data.master_pipes.map(pipe => {
                        if (data.unitType == "mm") {
                            return pipe.metricDisplayText
                        } else {
                            return pipe.imperialDisplayText
                        }
                    })

                    data.displayMasterPipes = masterPipes.join(", ")

                    return { ...data }
                })

            return {
                ...state,
                genericPipeSystems: payload,
                genericPipeSystemsForTable
            };

        default:
            return state
    }

};

// actions.............

const getGenericPipeSystemsData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getGenericPipeSystems(data)

        if (r.status === 200) {
            dispatch({
                type: GET_GENERIC_PIPE_SYSTEMS_SUCCESS,
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

const addGenericPipeSystemsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addGenericPipeSystems(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateGenericPipeSystemsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateGenericPipeSystems(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiGenericPipeSystemsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiGenericPipeSystems(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteGenericPipeSystemsData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteGenericPipeSystems(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Deleting Country', type: 'Feedback' })
        return err
    }
}


export { reducer, addGenericPipeSystemsData, updateGenericPipeSystemsData, deleteGenericPipeSystemsData, deleteMultiGenericPipeSystemsData, getGenericPipeSystemsData }