import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Ingredients from "./Ingredients.jsx";
import AppNavBar from "./AppNavBar.jsx";
import {TextField} from "@mui/material";
import {Clear} from "@mui/icons-material";

async function getCocktails(searchString, getResult) {
    const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchString
    );
    getResult(response.data.drinks || []);
}

function App() {
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    const [request, updateRequest] = useState("");
    const [serverResponse, updateServerResponse] = useState([]);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedInputValue(request);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [request]);

    useEffect(() => {
        getCocktails(debouncedInputValue, updateServerResponse);
    }, [debouncedInputValue]);
    return (
        <>
            <AppNavBar active="name"/>

            <div className="row w-100 justify-content-center g-3 align-items-center m-0">
                <div className="col-12">
                    <TextField
                        value={request}
                        type="search"
                        fullWidth
                        onChange={(e) => updateRequest(e.target.value)}
                        label="Cocktail name"
                    />
                </div>
            </div>
            {
                serverResponse.map(
                    (row) =>
                        <div key={row.strDrink} className="row w-100 justify-content-center g-3 align-items-center m-0">
                            <div className="col-3">
                                <img src={`${row.strDrinkThumb}/preview`} width="100%" alt={row.strDrink}
                                     loading="lazy"/>
                            </div>
                            <div className="col-9 text-start">
                                <p className="h2">{row.strDrink}</p>
                                {row.strInstructions}
                                <Ingredients data={row}/>
                            </div>
                        </div>
                )
            }
        </>
    );
}

export default App;
