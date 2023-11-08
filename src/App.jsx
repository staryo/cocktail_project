import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Ingredients from "./Ingredients.jsx";

async function getCocktails(searchString, getResult) {
    const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchString
    );
    getResult(response.data.drinks || []);
}

function App() {
    const [request, updateRequest] = useState("");
    const [serverResponse, updateServerResponse] = useState([]);
    useEffect(() => {
        getCocktails(request, updateServerResponse);
    }, [request]);
    console.log(serverResponse);
    return (
        <>
            <div className="row">
                <div className="col">
                    <input className="rounded-3 h2 p-2" value={request}
                           onChange={(e) => updateRequest(e.target.value)}
                           placeholder="Cocktail name"
                    />
                </div>
            </div>
            <div className="row w-100 justify-content-center g-3 align-items-center m-0">
                {
                    serverResponse.map(
                        (row) =>
                            <>
                                <div className="col-3">
                                    <img src={row.strDrinkThumb} width="100%" alt={row.strDrink}
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

export default App;
