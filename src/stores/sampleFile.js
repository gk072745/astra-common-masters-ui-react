import { LOADING_END, LOADING_START } from "./uiFeedback";
import { downloadFile, getSampleFile } from '../network/project.service'
// action types.........
export const GET_SAMPLE_FILE_SUCCESS = "GET_SAMPLE_FILE_SUCCESS ";

// initial state......
const initialState = {
    sampleFile: {},
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_SAMPLE_FILE_SUCCESS:
            return {
                ...state, sampleFile: payload
            };

        default:
            return state
    }

};

// actions.............

const getSampleFileData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: LOADING_START })
    try {

        const r = await getSampleFile(data)
        if (r.status === 200) {
            dispatch({
                type: GET_SAMPLE_FILE_SUCCESS,
                payload: r.data.data
            })
            dispatch({ type: LOADING_END })

        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Fetching Sample File', type: 'Feedback' })
        return err
    }

}

const downloadSampleFileData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: LOADING_START })

    try {
        const response = await downloadFile(data)

        const blob = new Blob([response.data])
        const link = document.createElement('a')

        link.href = window.URL.createObjectURL(blob)
        link.download = `Sample${data.split('/')[data.split('/').length - 1]}`
        link.click()
        dispatch({ type: LOADING_END })

    } catch (error) {
        dispatch({ payload: 'Error Downloading File', type: 'Feedback' })
        return error
    }

}



export { reducer, getSampleFileData, downloadSampleFileData }
