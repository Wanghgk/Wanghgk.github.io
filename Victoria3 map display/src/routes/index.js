import Map_OnePointThree from "../pages/1.3Map/Map.js";
import ReadMe from "../pages/ReadMe/ReadMe";
import React from "react";

export default [
    {
      path: '/',
      element: <ReadMe/>
    },
    {
        path:'/1.3',
        element: <Map_OnePointThree/>
    }
]