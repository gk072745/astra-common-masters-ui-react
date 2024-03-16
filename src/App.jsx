import { Backdrop, CircularProgress, Snackbar, SnackbarContent } from "@mui/material";
import DefaultLayout from "./layouts/DefaultLayout";
import { useSelector } from "react-redux";
// import MainRoutes from "./router/MainRoute";

function App() {
  const { showOverlayLoader, snackbarState, snackbarText } = useSelector((store) => store.uiFeedbackReducer)
  return (
    <>
      <DefaultLayout />
      <Backdrop open={showOverlayLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbarState}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        message={snackbarText}
        sx={{ justifyContent: 'center' }}
      >


      </Snackbar>
      {/* <MainRoutes /> */}
    </>
  );
}

export default App;
