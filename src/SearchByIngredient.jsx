import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Ingredients from "./Ingredients.jsx";
import {Link} from "react-router-dom";

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

function SearchByIngredient() {
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    const [request, updateRequest] = useState("");
    const [serverResponse, updateServerResponse] = useState([]);

    useEffect(() => {
        getCocktails(debouncedInputValue, updateServerResponse);
    }, [debouncedInputValue]);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedInputValue(request);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [request, 500]);

    return (
        <>
            <nav className="navbar bg-light">
                <Link className="btn btn-outline-success me-2" to="/">
                    Search cocktail by name
                </Link>
                <Link className="btn btn-outline-success me-2 active" to="/SearchByIngredient">
                    Search cocktail by ingredient
                </Link>
            </nav>

            <div className="row">
                <div className="col">
                    <input className="rounded-3 h2 p-2" value={request}
                           onChange={(e) => updateRequest(e.target.value)}
                           placeholder="Ingredient name"
                    />
                </div>
            </div>
            <div className="row w-100 justify-content-center g-3 align-items-center m-0">
                {
                    serverResponse.map(
                        (row) =>
                            <>
                                <div className="col-3">
                                    <img src={`${row.strDrinkThumb}/preview`} width="100%" alt={row.strDrink}
                                         loading="lazy"/>
                                </div>
                                <div className="col-9 text-start">
                                    <p className="h2">{row.strDrink}</p>
                                    {row.strInstructions}
                                    <Ingredients data={row}/>
                                </div>
                            </>
                    )
                }
            </div>

        </>
    );
}

export default SearchByIngredient;
