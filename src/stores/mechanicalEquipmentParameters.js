import { addMechanicalEquipmentParameters, deleteMechanicalEquipmentParameters, deleteMultiMechanicalEquipmentParameters, getMechanicalEquipmentParameters, updateMechanicalEquipmentParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


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
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_MECH_EQU_PARAMS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Mech. Equipment Parameters",
        }))
        return err
    }

}

const addMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Mech. Equipment Parameter Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Mech. Equipment Parameter",
        }))
        return err
    }
}

const updateMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Mech. Equipment Parameter Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Mech. Equipment Parameter",
        }))
        return err
    }
}

const deleteMultiMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiMechanicalEquipmentParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Mech. Equipment Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Mech. Equipment Parameters",
        }))
        return err
    }
}

const deleteMechanicalEquipmentParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMechanicalEquipmentParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Mech. Equipment Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Mech. Equipment Parameter",
        }))
        return err
    }
}


export {
    reducer, getMechanicalEquipmentParametersData,
    addMechanicalEquipmentParametersData, updateMechanicalEquipmentParametersData, deleteMultiMechanicalEquipmentParametersData, deleteMechanicalEquipmentParametersData
}