import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Error from "./Error.jsx";
import SearchByIngredient from "./SearchByIngredient.jsx";
import PreferenceContext from "./PreferenceContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>
    },
    {
        path: "/searchByIngredient",
        element: <SearchByIngredient/>,
        errorElement: <Error/>
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <PreferenceContext>
        <RouterProvider router={router}/>
    </PreferenceContext>
);
