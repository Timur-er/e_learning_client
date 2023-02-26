import './App.css';
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider} from "@mui/material";
import theme from "./common/theme";
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import {useAuth} from "./hooks/auth.hook";
import {authFunctionsActions} from "./store/User/actions";
import CustomSnackbar from "./Components/CustomSnackbar/CustomSnackbar";

function App() {
    const dispatch = useDispatch();
    const {login} = useAuth();

    useEffect(() => {
        dispatch(authFunctionsActions(login));

    }, [dispatch, login])


    return (
    <>
        <ThemeProvider theme={theme}>
            <AppRoutes />
            <CustomSnackbar />
        </ThemeProvider>
    </>
  );
}

export default App;
