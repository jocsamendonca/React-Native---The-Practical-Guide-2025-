import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      console.log("AllPlaces: Carregando places...");
      const places = await fetchPlaces();
      console.log("AllPlaces: Places recebidos:", places);
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curentPlaces) => [...curentPlaces, route.params.place]);
    }
  }, [isFocused]);

  console.log("AllPlaces: Renderizando com loadedPlaces:", loadedPlaces);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
