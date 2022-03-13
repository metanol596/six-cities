import { useEffect, useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';

import { City, Offer } from '../../types/offer';

import pin from './pin.svg';
import pinActive from './pin-active.svg';

type PropsType = {
  className: string;
  offers: Offer[];
  city: City;
  selectedPoint?: number | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: pin,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: pinActive,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

let mapHeight: string;

function Map({className, offers, city, selectedPoint}: PropsType): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  switch (className) {
    case 'property__map':
      mapHeight = '579px';
      break;
    case 'cities__map':
      mapHeight = '100%';
      break;
  }

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const {location} = offer;

        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker.setIcon(
          selectedPoint !== undefined && offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon,
        ).addTo(map);
      });
    }
  }, [map, offers, selectedPoint]);

  return (
    <section
      className={`${className} map`}
      style={{height: mapHeight}}
      ref={mapRef}
    />
  );
}

export default Map;
