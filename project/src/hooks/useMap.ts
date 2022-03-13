import { MutableRefObject, useEffect, useState } from 'react';
import leaflet, { Map } from 'leaflet';

import { City } from '../types/offer';

const MAP_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instanceMap = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet.tileLayer(
        MAP_LAYER,
        {
          attribution: MAP_ATTRIBUTION,
        },
      ).addTo(instanceMap);

      setMap(instanceMap);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
