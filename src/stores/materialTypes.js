import { addMaterialTypes, deleteMaterialTypes, deleteMultiMaterialTypes, getMaterialTypes, updateMaterialTypes } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_MATERIAL_TYPE_SUCCESS = "GET_MATERIAL_TYPE_SUCCESS";

// initial state......
const initialState = {
    materialTypes: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_MATERIAL_TYPE_SUCCESS:
            return {
                ...state, materialTypes: payload
            };

        default:
            return state
    }

};

// actions.............

const getMaterialTypesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getMaterialTypes(data)
        if (r.status === 200) {
            dispatch({
                type: GET_MATERIAL_TYPE_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error fetching material types",
        }))
        return err
    }

}

const addMaterialTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addMaterialTypes(data)
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Material Type Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Material Type",
        }))
        return err
    }
}

const updateMaterialTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updateMaterialTypes(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated material type successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating MasterPipes Type",
        }))
        return err
    }
}

const deleteMultiMaterialTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiMaterialTypes(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Material Types Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Material Types",
        }))
        return err
    }
}

const deleteMaterialTypesData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMaterialTypes(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Material Type Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Material Type",
        }))
        return err
    }
}







export { reducer, deleteMaterialTypesData, deleteMultiMaterialTypesData, updateMaterialTypesData, addMaterialTypesData, getMaterialTypesData }
