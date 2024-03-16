import { useEffect, useRef } from "react";
import { Grid, Card, CardContent, TextField, Button, CardHeader, Paper, CardActions } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const passwordRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const correctPassword = import.meta.env.VITE_AUTH;

  const login = () => {
    const enteredPassword = passwordRef.current.value;

    if (enteredPassword === correctPassword) {
      localStorage.setItem('auth', enteredPassword);
      navigate(location.state ? location.state.prevRoute : '/');
    } else {
      alert('Incorrect password');
    }

    console.log(enteredPassword, correctPassword)
  };

  useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (auth && auth == correctPassword) {
      return navigate(location.state ? location.state.prevRoute : '/');
    }

  }, []);

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
    >
      <Grid item xs={8} sm={6} md={3} mt={2}>

        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <TextField
              fullWidth
              label="Password"
              type="password"
              inputRef={passwordRef}
            />
          </CardContent>
          <CardActions>
            <Button variant="text" color="primary" onClick={login}>
              Login
            </Button>
          </CardActions>
        </Card>

      </Grid>
    </Grid>
  );
};

export default Login;
