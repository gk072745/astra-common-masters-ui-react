import { addMechanicalEquipmentParameters, deleteMechanicalEquipmentParameters, deleteMultiMechanicalEquipmentParameters, getMechanicalEquipmentParameters, updateMechanicalEquipmentParameters } from "../network/project.service";


// action types.........
const GET_MECH_EQU_PARAMS_SUCCESS = "GET_MECH_EQU_PARAMS_SUCCESS";

// initial state......
const initialState = {
    mechanicalEquipmentParameters: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_MECH_EQU_PARAMS_SUCCESS:
            return {
                ...state,
                mechanicalEquipmentParameters: payload,
            };

        default:
            return state
    }

};

// actions.............

const getMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_MECH_EQU_PARAMS_SUCCESS,
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

const addMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Connection Types', type: 'Feedback' })
        return err
    }
}

const updateMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMechanicalEquipmentParameters(data)

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
    reducer, getMechanicalEquipmentParametersData,
    addMechanicalEquipmentParametersData, updateMechanicalEquipmentParametersData, deleteMultiMechanicalEquipmentParametersData, deleteMechanicalEquipmentParametersData
}