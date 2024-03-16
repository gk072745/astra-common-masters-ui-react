// action types.........
export const LOADING_START = "LOADING_START";
export const LOADING_END = "LOADING_END";
export const FEEDBACK = "FEEDBACK";

// initial state......
const initialState = {
    showOverlayLoader: false,
    snackbarState: false,
    snackbarText: "",
};

// reducer.......
const reducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case LOADING_START:
            return {
                showOverlayLoader: true,
                snackbarState: false,
                snackbarText: "",
            };
        case LOADING_END:
            return {
                showOverlayLoader: false,
                snackbarState: false,
                snackbarText: "",
            };
        case FEEDBACK:
            return {
                showOverlayLoader: false,
                snackbarState: true,
                snackbarText: payload,
            };

        default:
            return state
    }

};

// actions.............



export { reducer }
