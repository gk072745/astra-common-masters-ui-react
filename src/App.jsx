import { Backdrop, CircularProgress, Snackbar, SnackbarContent, Alert } from "@mui/material";
import DefaultLayout from "./layouts/DefaultLayout";
import { useSelector } from "react-redux";
// import MainRoutes from "./router/MainRoute";

function App() {
  const a = useSelector((store) => store.uiFeedbackReducer)
  let { showOverlayLoader, snackbarState, snackbarText, snackbarType } = a
  console.log(a)
  return (
    <>
      <DefaultLayout />
      <Backdrop open={showOverlayLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={snackbarState}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
