import React from 'react';
import {routes} from "./routes";
import {useRoutes} from "react-router-dom";

const RenderRoutes = ({ routes }) => {

    routes = routes.map(route => {
        return {path: route.path, element: route.element}
    })

    const renderRoutes = useRoutes([...routes])

    return (
        <>
            {renderRoutes}
        </>
    );
};

export default RenderRoutes;