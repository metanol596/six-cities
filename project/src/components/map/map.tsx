import { useEffect, useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';

import { Offer } from '../../types/offer';

import pin from './pin.svg';
import pinActive from './pin-active.svg';

type PropsType = {
  className: string;
  offers: Offer[];
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

function Map({className, offers, selectedPoint}: PropsType): JSX.Element {
  const currentCity = offers[0].city;
  const {location: {latitude: lat, longitude: lng}, zoom} = currentCity;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      offers.forEach(({id, location: {latitude, longitude}}) => {
        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });

        marker.setIcon(
          selectedPoint !== undefined && id === selectedPoint ? currentCustomIcon : defaultCustomIcon,
        ).addTo(map);
      });
      map.flyTo([lat, lng], zoom);
    }
  }, [lat, lng, map, offers, selectedPoint, zoom]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    />
  );
}

export default Map;
