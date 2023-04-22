import "./App.css";
import { useRandom } from "./hooks/useRandom";

//Hacemos una cópia de la APP (AppOld) para trabajar ahora con React Query. Es una manera de trabajar con peticiones asíncronas o mejor dicho promesas
//UseQuery manejara todos los estados y otro monton de cosas inclusive el caché de los mismos

export const App = () => {
  const query = useRandom();

  return (
    <div className="App App-header">
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>Número aleatorio: {query.data}</h2>
      )}

      {!query.isLoading && query.isError && <h3>`${query.error}`</h3>}

      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? "..." : " Nuevo Número"}
      </button>
    </div>
  );
};
