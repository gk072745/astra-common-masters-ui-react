import { addPlumbingFixtureParameters, deleteMultiPlumbingFixtureParameters, deletePlumbingFixtureParameters, getPlumbingFixtureParameters, updatePlumbingFixtureParameters } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


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
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getPlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch({
                type: GET_PLUMBING_FIXTURE_PARAMETERS_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Plumbing Fixture Parameters",
        }))
        return err
    }

}

const addPlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addPlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Plumbing Fixture Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Plumbing Fixture Parameter",
        }))
        return err
    }
}

const updatePlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await updatePlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Plumbing Fixture Parameter Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Plumbing Fixture Parameter",
        }))
        return err
    }
}

const deleteMultiPlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deleteMultiPlumbingFixtureParameters(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Plumbing Fixture Parameters Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Plumbing Fixture Parameters",
        }))
        return err
    }
}

const deletePlumbingFixtureParametersData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await deletePlumbingFixtureParameters(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Plumbing Fixture Parameter Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Plumbing Fixture Parameter",
        }))
        return err
    }
}


export {
    reducer, getPlumbingFixtureParametersData,
    addPlumbingFixtureParametersData, updatePlumbingFixtureParametersData, deleteMultiPlumbingFixtureParametersData, deletePlumbingFixtureParametersData
}