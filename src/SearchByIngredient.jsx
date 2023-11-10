import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Ingredients from "./Ingredients.jsx";
import {Autocomplete, TextField} from "@mui/material";
import AppNavBar from "./AppNavBar.jsx";

async function getCocktails(searchString, getResult) {
    const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchString
    );
    if (response.data.drinks === undefined) {
        getResult([]);
        return;
    }
    const result = await Promise.all(
        await response.data.drinks.slice(0, 20).map(async (drink) => {
                const response = await axios.get(
                    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink.idDrink
                );
                return await response.data.drinks[0];
            }
        )
    );
    await getResult(result || []);
}

async function getIngredients(getResult) {
    const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
    );
    getResult(response.data.drinks.map((row) => {
        return row.strIngredient1;
    }).sort());
}

function SearchByIngredient() {
    const [request, updateRequest] = useState("Gin");
    const [ingredient, updateIngredient] = useState("");
    const [serverResponse, updateServerResponse] = useState([]);
    const [serverResponseIngredients, updateServerResponseIngredients] = useState([]);

    useEffect(() => {
        getIngredients(updateServerResponseIngredients);
        // getCocktails(debouncedInputValue, updateServerResponse);
    }, []);

    useEffect(() => {
        getCocktails(request, updateServerResponse);
    }, [request]);

    return (
        <>
            <AppNavBar active="ingredient"/>
            <div className="row w-100 justify-content-center g-3 align-items-center m-0">
                <div className="col">
                    <Autocomplete
                        id="combo-box-demo"
                        options={serverResponseIngredients}
                        value={request}
                        groupBy={(option) => option[0]}
                        onChange={(event, newValue) => {
                            updateRequest(newValue);
                        }}
                        inputValue={ingredient}
                        onInputChange={(event, newInputValue) => {
                            updateIngredient(newInputValue);
                        }} renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Ingredient name"

                        />
                    }
                    />
                </div>
            </div>
            {
                serverResponse.map(
                    row => (
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
                )
            }

        </>
    );
}

export default SearchByIngredient;
