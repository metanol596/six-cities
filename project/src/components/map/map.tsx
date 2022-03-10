import { useEffect, useRef } from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';

import { City, Offer } from '../../types/offer';

import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';


type PropsType = {
  className: string;
  offers: Offer[];
  city: City;
  selectedPoint?: number | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({className, offers, city, selectedPoint}: PropsType): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

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
      style={{height: '801px'}}
      ref={mapRef}
    />
  );
}

export default Map;
