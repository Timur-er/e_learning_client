import React from 'react';
import HeaderMenu from "../Components/HeaderMenu/HeaderMenu";
import Footer from "../Components/Footer/Footer";
import RenderRoutes from "./RenderRoutes";
import {useSelector} from "react-redux";
import {getIsAuth, getUserRole} from "../store/User/selectors";
import {routes} from "./routes";
import {Fab} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../common/helpers/backToTop";

const AppRoutes = () => {
    const is_auth = useSelector(getIsAuth)
    const user_role = useSelector(getUserRole);

    const availableRoutes = routes.filter(route => route.permission.includes(user_role || 'GUEST'))

    return (
        <>
            <HeaderMenu routes={availableRoutes}/>
            <RenderRoutes routes={availableRoutes}/>
            <Footer />
            <ScrollTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
};

export default AppRoutes;