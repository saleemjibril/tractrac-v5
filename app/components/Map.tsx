import { useState, useEffect } from "react";
import loader from "../googleMapsLoader";

const Map = ({ addresses }: { addresses: string[] }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  useEffect(() => {
    loader.importLibrary("maps").then(() => {
      const geocoder = new window.google.maps.Geocoder();

      const mapOptions: google.maps.MapOptions = {
        center: new window.google.maps.LatLng(9.0820, 8.6753),
        zoom: 6,
      };
      const documentMap = document?.getElementById("map") as HTMLElement;
      const newMap = new window.google.maps.Map(documentMap, mapOptions);

      addresses.forEach((address) => {
        geocoder.geocode({ address }, (results: any, status: any) => {
          if (status === "OK") {
          
            // const documentMap = document?.getElementById("map");
            // if (documentMap) {
            // const newMap = new window.google.maps.Map(
            //   documentMap,
            //   mapOptions
            // );
            const marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              map: newMap,
              
            })
            setMap(newMap);
            // }
          }
        });
      });
    });
  }, [addresses]);
  return <div id="map" style={{ height: "360px" }}></div>;
};
export default Map;