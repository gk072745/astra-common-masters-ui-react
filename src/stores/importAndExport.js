import { ImportFiles, exportFiles } from "../network/project.service";
import { feedbackStart, loadingEnd, loadingStart } from "./uiFeedback";

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

    dispatch(loadingStart())
    try {

        const r = await ImportFiles(data)

        if (r.status === 200) {
            dispatch(feedbackStart({
                snackbarType: "success",
                snackbarText: "Import started successfully",
            }))
        }
        return r
    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: `Error Importing File`,
        }))
        return err
    }

}

const exportTables = (data) => async (dispatch) => {
    console.log(data)

    dispatch(loadingStart())

    try {
        const result = await exportFiles(data)

        const currentDT = new Date()

        const formattedDateAndTime = `${(currentDT.getMonth() + 1).toString().padStart(2, '0')}/${currentDT.getDate().toString().padStart(2, '0')}/${currentDT.getFullYear()}_${currentDT.getHours().toString().padStart(2, '0')}:${currentDT.getMinutes().toString().padStart(2, '0')}_${currentDT.getHours() >= 12 ? 'PM' : 'AM'}`

        if (result.status === 200) {
            if (data.format == 'xlsx') {
                const blob = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')

                a.href = url
                a.download = `${data.type}-${formattedDateAndTime}.xlsx`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
            }
            else if (data.format == 'csv') {
                const blob = new Blob([result.data], { type: 'text/csv' })
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')

                a.href = url
                a.download = `${data.type}-${formattedDateAndTime}.csv`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
            }
            dispatch(loadingEnd())
        } else {
            dispatch(feedbackStart({
                snackbarType: "error",
                snackbarText: `Error While Exporting`,
            }))
        }

    } catch (err) {
        dispatch(feedbackStart({
            snackbarType: "error",
            snackbarText: `Error While Exporting`,
        }))
        console.log(err)
    }

}



export { reducer, importData, exportTables }
