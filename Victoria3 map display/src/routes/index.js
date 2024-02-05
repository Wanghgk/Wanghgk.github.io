import React from "react";
import Map_OnePointThree from "../pages/1.3Map/Map.js";
import Map_OnePointFour from "../pages/1.4Map/Map"
import ReadMe from "../pages/ReadMe/ReadMe";
import Edition from "../pages/Edition/Edition";

export default [
    {
      path: '/',
      element: <ReadMe/>
    },
    {
        path:'/edition',
        element: <Edition/>,
    },
    {
        path:'/1.3',
        element: <Map_OnePointThree/>
    },
    {
        path: '/1.4',
        element: <Map_OnePointFour/>
    },
    {
        path: '/1.5',
        element: <Map_OnePointFour/>
    }
]