import { addImports } from "../network/project.service";
import { LOADING_END, LOADING_START } from "./uiFeedback";

// action types.........

// initial state......
const initialState = {
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        default:
            return state
    }

};

// actions.............

const importData = (data) => async (dispatch) => {
    console.log(data)

    dispatch({ type: LOADING_START })
    try {

        const r = await addImports(data)

        if (r.status === 200) {
            dispatch({ type: LOADING_END })
        }
        return r
    } catch (err) {
        dispatch({ payload: 'Error Importing File', type: 'Feedback' })
        return err
    }

}

// const exportImportLogFile = (type, data) => async (dispatch) => {
//     let url
//     if (type == 'import') {
//         url = data.importedFileUrl
//     } else {
//         url = data.errorLogsUrl
//     }

//     console.log(url)

//     dispatch({ type: LOADING_START })

//     try {
//         const response = await downloadFile(url)


//         const blob = new Blob([response.data])
//         const link = document.createElement('a')

//         const formattedDate = `${new Date(data.createdAt).getDate()}_${new Date(data.createdAt).getMonth() + 1}_${new Date(data.createdAt).getFullYear() % 100}`

//         link.href = window.URL.createObjectURL(blob)
//         link.download = `${data._id}_${data.modelName}_${formattedDate}${type == 'import' ? "_imported" : "_error"}.csv`

//         link.click()

//     } catch (error) {
//         console.error('Error downloading file:', error)
//     }
// }

export { reducer, importData }
