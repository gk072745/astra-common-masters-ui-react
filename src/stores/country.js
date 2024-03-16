import { addCountry, deleteCountry, deleteMultiCountry, getCountry, updateCountry } from "../network/project.service";


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

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await getCountry(data)

        if (r.status === 200) {
            dispatch({
                type: GET_COUNTRY_SUCCESS,
                payload: r.data.data
            })
            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Fetching Countries', type: 'Feedback' })
        return err
    }

}

const addCountryData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await addCountry(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const updateCountryData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await updateCountry(data)

        if (r.status === 200) {
            dispatch({ type: 'LOADING_END' })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteMultiCountryData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteMultiCountry(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Adding Country', type: 'Feedback' })
        return err
    }
}

const deleteCountryData = (data) => async (dispatch) => {

    dispatch({ type: 'LOADING_START' })
    try {

        const r = await deleteCountry(data)

        if (r.status === 200) {

            dispatch({ type: 'LOADING_END' })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Deleting Country', type: 'Feedback' })
        return err
    }
}







export { reducer, deleteCountryData, deleteMultiCountryData, updateCountryData, addCountryData, getCountryData }
