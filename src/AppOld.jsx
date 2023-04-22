import { useEffect, useReducer, useState } from "react";
import "./App.css";

//Este ejercicio es un ejemplo de todos los peticiones (fetch ) y estados que tenemos que manejar y que con React Query se resuelve de una manera menos densa y más elegante

const getRandomNumberFromApi = async () => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await res.text();

  //Cuando el backend de un error porque lo pedimos mal o nos de un status 400.. razones por las que pueda fallar
  //throw new Error("Auxilio!!");
  return numberString;
};

export const App = () => {
  const [number, setNumber] = useState();
  //Mejorar la experiencia de usuario, por si su navegador va más lento
  const [isLoading, setIsLoading] = useState(true);
  //Cuando algo falla
  const [error, setError] = useState();
  //tener un número que cambie y con ese combio forzar el efecto para que se vuelva a disparar
  const [key, forceRefetch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getRandomNumberFromApi()
      .then(setNumber)
      .catch((error) => setError(error.message));
  }, [key]);

  useEffect(() => {
    if (number) setIsLoading(false);
  }, [number]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <div className="App App-header">
      {isLoading ? <h2>Cargando...</h2> : <h2>Número aleatorio: {number}</h2>}

      {!isLoading && error && <h3>{error}</h3>}

      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? "..." : " Nuevo Número"}
      </button>
    </div>
  );
};
