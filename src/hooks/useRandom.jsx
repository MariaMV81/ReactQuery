//custom hooks

import { useQuery } from "@tanstack/react-query";

//Función para obtener la data, esta la dejamos porque siempre se va a utilizar
const getRandomNumberFromApi = async () => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const numberString = await res.text();

  //throw new Error("Auxilio!!");
  return numberString;
};

export const useRandom = () => {
  const query = useQuery(
    ["randomNumber"], // el primer array le va a indicar a useQuey como queremos que maneje nuestro caché
    getRandomNumberFromApi //funcion que le vamos a dar para traer nuestra Data
  );

  return query;
};
