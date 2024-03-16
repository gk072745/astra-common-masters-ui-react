import { addMasterPipes, deleteMasterPipes, deleteMultiMasterPipes, getMasterPipes, updateMasterPipes } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";

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
                ...state,
                masterPipes: payload
            };
        default:
            return state;
    }
};

// actions.............

const getMasterPipesData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart());
    try {
        const r = await getMasterPipes(data);

        if (r.status === 200) {
            dispatch({
                type: GET_MASTER_PIPES_SUCCESS,
                payload: r.data.data
            });
            dispatch(loadingEnd());
        }

        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Master Pipes",
        }));
        return err;
    }
};

const addMasterPipesData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await addMasterPipes(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Master Pipes Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Master Pipes",
        }));
        return err;
    }
};

const updateMasterPipesData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await updateMasterPipes(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Master Pipes Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Master Pipes",
        }));
        return err;
    }
};

const deleteMultiMasterPipesData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await deleteMultiMasterPipes(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Master Pipes Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Master Pipes",
        }));
        return err;
    }
};

const deleteMasterPipesData = (data) => async (dispatch) => {
    dispatch(loadingStart());
    try {
        const r = await deleteMasterPipes(data);
        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Master Pipes Successfully",
            }));
        }
        return r;
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Master Pipe",
        }));
        return err;
    }
};

export {
    reducer,
    getMasterPipesData,
    addMasterPipesData,
    updateMasterPipesData,
    deleteMasterPipesData,
    deleteMultiMasterPipesData,
};
