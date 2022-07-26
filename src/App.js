import { useState, useEffect } from "react";
import "./App.css";
import "./assets/fonts.css";
import axios from "axios";

import tacos from "./assets/tacos.jpeg";

//https://deliveroobackendorion.herokuapp.com

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://deliveroobackendorion.herokuapp.com"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      {isLoading === true ? (
        <h1>En cours de chargement</h1>
      ) : (
        <>
          <section className="banner">
            <div className="banner-left">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div className="banner-right">
              <img src={data.restaurant.picture} alt="" />
            </div>
          </section>
          <section>
            <div className="categorie-left">
              {data.categories.map((categorie) => {
                return (
                  categorie.meals.length > 0 && (
                    <div className="sub-categorie">
                      <h2> {categorie.name}</h2>
                      <div className="meals-flex-container">
                        {categorie.meals.map((meal) => {
                          console.log(meal.picture);
                          return (
                            <div className="item">
                              <div className="text">
                                <p>{meal.title}</p>
                                <p>{meal.price}</p>
                                {meal.popular === true && (
                                  <p style={{ color: "orange" }}>Populaire</p>
                                )}
                              </div>
                              <div className="image">
                                <img
                                  src={meal.picture ? meal.picture : tacos}
                                  alt=""
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
