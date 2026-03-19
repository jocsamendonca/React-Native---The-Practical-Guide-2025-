import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

export function init() {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )        
        `);
}

export function insertPlace(place) {
  return database.runAsync(
    `
            INSERT INTO places (title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ],
  ).then(result => {
    console.log("insertPlace resultado: ", result);
    return result;
  }).catch(error => {
    console.log("Erro no insertPlace: ", error);
    throw error;
  });
}

export async function fetchPlaces() {
  console.log("fetchPlaces chamada")

  try {
    const result = await database.getAllAsync("SELECT * FROM places;");
    console.log("fetchPlaces resultado do banco: ", result);
    console.log("Número de registros encontrados: ", result.length);
    
    const places = [];

    for (const place of result) {
      places.push(
        new Place(
          place.title,
          place.imageUri,
          { address: place.address, lat: place.lat, lng: place.lng },
          place.id,
        ),
      );
    }

    console.log("fetchPlaces retornando places:", places);
    console.log("Número de places criados:", places.length);

    return places;

  } catch (error) {
    console.error("Erro no fetchPlaces:", error);
    throw error;
  }
}
