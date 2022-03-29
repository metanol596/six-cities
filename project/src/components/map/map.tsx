import { useEffect, useRef } from 'react';
import leaflet, {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '../../hooks/useMap';

import { Offer } from '../../types/offer';

const PIN = {
  DEFAULT_URL: '/img/pin.svg',
  CUSTOM_URL: '/img/pin-active.svg',
};

type PropsType = {
  className: string;
  offers: Offer[];
  selectedPoint: number | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: PIN.DEFAULT_URL,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: PIN.CUSTOM_URL,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function Map({className, offers, selectedPoint}: PropsType): JSX.Element {
  const currentCity = offers[0].city;
  const {location: {latitude: lat, longitude: lng, zoom}} = currentCity;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    const markers = leaflet.layerGroup();

    if (map) {
      markers.addTo(map);

      offers.forEach((offer) => {
        const {location} = offer;

        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker.setIcon(
          selectedPoint && offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon,
        ).addTo(map);
      });
      map.flyTo([lat, lng], zoom, {animate: false, duration: 0.2});
    }

    return () => {
      markers.clearLayers();
    };
  }, [lat, lng, map, offers, selectedPoint, zoom]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    />
  );
}

export default Map;
