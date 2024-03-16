import { addCountry, deleteCountry, deleteMultiCountry, getCountry, updateCountry } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";


// action types.........
const GET_COUNTRY_SUCCESS = "GET_COUNTRY_SUCCESS";

// initial state......
const initialState = {
    countries: [],
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_COUNTRY_SUCCESS:
            return {
                ...state, countries: payload
            };

        default:
            return state
    }

};

// actions.............

const getCountryData = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {

        const r = await getCountry(data)

        if (r.status === 200) {
            dispatch({
                type: GET_COUNTRY_SUCCESS,
                payload: r.data.data
            })
            dispatch(loadingEnd())

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Fetching Countries",
        }))
        return err
    }

}

const addCountryData = (data) => async (dispatch) => {

    dispatch(loadingStart())

    try {

        const r = await addCountry(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Added Project Type Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Adding Project Type",
        }))
        return err
    }
}

const updateCountryData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await updateCountry(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Updated Country Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Updating Country",
        }))
        return err
    }
}

const deleteMultiCountryData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteMultiCountry(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Countries Successfully",
            }))

        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Countries",
        }))
        return err
    }
}

const deleteCountryData = (data) => async (dispatch) => {

    dispatch(loadingStart())
    try {

        const r = await deleteCountry(data)

        if (r.status === 200) {

            dispatch(feedbackStart({
                snackbarType: "warning",
                snackbarText: "Deleted Country Successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: "Error Deleting Country",
        }))
        return err
    }
}







export { reducer, deleteCountryData, deleteMultiCountryData, updateCountryData, addCountryData, getCountryData }
