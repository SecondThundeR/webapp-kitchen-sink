import {
  Layer,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  Source,
  useMap,
} from "@vis.gl/react-maplibre";
import type { StyleSpecification } from "maplibre-gl";
import { setWorkerUrl } from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { useEffect, useMemo, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LocationData } from "telegram-web-app";

setWorkerUrl(maplibreWorkerUrl);

const COURSE_MAPPING: Record<number, string> = {
  0: "North",
  90: "East",
  180: "South",
  270: "West",
};

const EARTH_RADIUS_METERS = 6_371_008.8;
const ACCURACY_CIRCLE_SEGMENTS = 64;

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    openstreetmap: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    },
  },
  layers: [
    {
      id: "openstreetmap-raster",
      type: "raster",
      source: "openstreetmap",
    },
  ],
};

type AccuracyCircleFeature = {
  type: "Feature";
  properties: Record<string, never>;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

interface LocationMapProps {
  data: Omit<LocationData, "vertical_accuracy">;
}

const removeNullOrMinusOne = (value: number | null) =>
  value === null || value === -1 ? null : value;

function createAccuracyCircle(
  latitude: number,
  longitude: number,
  radius: number | null,
): AccuracyCircleFeature | null {
  if (radius === null || radius <= 0 || !Number.isFinite(radius)) {
    return null;
  }

  const angularDistance = radius / EARTH_RADIUS_METERS;
  const latitudeRadians = (latitude * Math.PI) / 180;
  const longitudeRadians = (longitude * Math.PI) / 180;
  const coordinates: number[][] = [];

  for (let index = 0; index <= ACCURACY_CIRCLE_SEGMENTS; index += 1) {
    const bearing = (2 * Math.PI * index) / ACCURACY_CIRCLE_SEGMENTS;
    const circleLatitude = Math.asin(
      Math.sin(latitudeRadians) * Math.cos(angularDistance) +
        Math.cos(latitudeRadians) *
          Math.sin(angularDistance) *
          Math.cos(bearing),
    );
    const circleLongitude =
      longitudeRadians +
      Math.atan2(
        Math.sin(bearing) *
          Math.sin(angularDistance) *
          Math.cos(latitudeRadians),
        Math.cos(angularDistance) -
          Math.sin(latitudeRadians) * Math.sin(circleLatitude),
      );
    coordinates.push([
      (circleLongitude * 180) / Math.PI,
      (circleLatitude * 180) / Math.PI,
    ]);
  }

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [coordinates],
    },
  };
}

function RecenterMap({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const { current: map } = useMap();

  useEffect(() => {
    map?.flyTo({ center: [longitude, latitude] });
  }, [latitude, longitude, map]);

  return null;
}

export const LocationMap = ({ data }: LocationMapProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const preparedCourse = removeNullOrMinusOne(data.course);
  const preparedSpeed = removeNullOrMinusOne(data.speed);
  const preparedAccuracy = removeNullOrMinusOne(data.horizontal_accuracy);
  const accuracyCircle = useMemo(
    () => createAccuracyCircle(data.latitude, data.longitude, preparedAccuracy),
    [data.latitude, data.longitude, preparedAccuracy],
  );

  return (
    <div id="map">
      <MapLibreMap
        initialViewState={{
          latitude: data.latitude,
          longitude: data.longitude,
          zoom: 13,
        }}
        mapStyle={MAP_STYLE}
        attributionControl={{ compact: false }}
        style={{ height: "300px", width: "100%" }}
      >
        <RecenterMap latitude={data.latitude} longitude={data.longitude} />
        <NavigationControl position="top-right" />
        {accuracyCircle ? (
          <Source id="location-accuracy" type="geojson" data={accuracyCircle}>
            <Layer
              id="location-accuracy-fill"
              type="fill"
              paint={{ "fill-color": "#2563eb", "fill-opacity": 0.1 }}
            />
            <Layer
              id="location-accuracy-outline"
              type="line"
              paint={{ "line-color": "#2563eb", "line-width": 2 }}
            />
          </Source>
        ) : null}
        <Marker
          latitude={data.latitude}
          longitude={data.longitude}
          anchor="center"
          onClick={(event) => {
            event.originalEvent?.stopPropagation();
            setIsPopupOpen(true);
          }}
        >
          <button
            type="button"
            aria-label="Show location data"
            className="flex size-5 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-md"
          >
            <span className="size-1.5 rounded-full bg-white" />
          </button>
        </Marker>
        {isPopupOpen ? (
          <Popup
            latitude={data.latitude}
            longitude={data.longitude}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setIsPopupOpen(false)}
          >
            <b>Location data:</b>
            <br />
            {preparedCourse !== null ? (
              <>
                Course: {preparedCourse} ({COURSE_MAPPING[preparedCourse]})
                <br />
              </>
            ) : null}
            {preparedSpeed !== null ? (
              <>
                Speed: {(preparedSpeed * 3.6).toFixed(1)} km/h
                <br />
              </>
            ) : null}
            {data.altitude !== null ? (
              <>Altitude: {Number(data.altitude)}m</>
            ) : null}
          </Popup>
        ) : null}
      </MapLibreMap>
    </div>
  );
};
