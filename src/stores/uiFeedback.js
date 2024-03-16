// action types.........
export const LOADING_START = "LOADING_START";
export const LOADING_END = "LOADING_END";
export const FEEDBACK_START = "FEEDBACK_START";
export const FEEDBACK_END = "FEEDBACK_END";

// initial state......
const initialState = {
    showOverlayLoader: false,
    snackbarState: false,
    snackbarText: "",
    snackbarType: "",
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case LOADING_START:
            return {
                ...state,
                showOverlayLoader: true,
                // snackbarState: false,
                // snackbarText: "",
            };
        case LOADING_END:
            return {
                ...state,
                showOverlayLoader: false,
            };
        case FEEDBACK_START:
            return {
                showOverlayLoader: false,
                snackbarState: true,
                ...payload
            };
        case FEEDBACK_END:
            return {
                ...initialState
            };

        default:
            return state
    }

};

// actions.............

const loadingStart = () => (dispatch) => {
    dispatch({ type: LOADING_START })
}

const loadingEnd = () => (dispatch) => {
    dispatch({ type: LOADING_END })
}

const feedbackStart = (payload) => (dispatch) => {
    dispatch({ type: FEEDBACK_START, payload })
    setTimeout(() => {
        dispatch({ type: FEEDBACK_END })
    }, 3000)
}

const feedbackEnd = () => (dispatch) => {
    dispatch({ type: FEEDBACK_END })
}

export { reducer, loadingStart, loadingEnd, feedbackStart, feedbackEnd }
