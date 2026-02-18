import L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import type { LocationData } from "telegram-web-app";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const DisableAttribution = () => {
  const map = useMap();
  map.attributionControl.remove();
  return null;
};

const COURSE_MAPPING: Record<number, string> = {
  0: "North",
  90: "East",
  180: "South",
  270: "West",
};

interface LocationMapProps {
  data: Omit<LocationData, "vertical_accuracy">;
}

const removeNullOrMinusOne = (value: number | null) =>
  value === null || value === -1 ? null : value;

function DeviceStatus({ data }: LocationMapProps) {
  const { latitude, longitude, horizontal_accuracy, course, speed, altitude } =
    data;

  const preparedCourse = removeNullOrMinusOne(course);
  const preparedSpeed = removeNullOrMinusOne(speed);

  return (
    <>
      {horizontal_accuracy && (
        <Circle
          center={[latitude, longitude]}
          radius={horizontal_accuracy}
          pathOptions={{ fillOpacity: 0.1, color: "blue" }}
        />
      )}

      <Marker position={[latitude, longitude]}>
        <Popup>
          <b>Location data:</b>
          <br />
          {preparedCourse !== null ? (
            <>
              Course: {course} ({COURSE_MAPPING[preparedCourse]})
              <br />
            </>
          ) : null}
          {preparedSpeed !== null ? (
            <>
              Speed: {(Number(preparedSpeed) * 3.6).toFixed(1)} km/h
              <br />
            </>
          ) : null}
          {altitude !== null ? <>Altitude: {Number(altitude)}m</> : null}
        </Popup>
      </Marker>
    </>
  );
}

export const LocationMap = ({ data }: LocationMapProps) => {
  const position = [data.latitude, data.longitude] as [number, number, number?];

  return (
    <div id="map">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DeviceStatus data={data} />
        <DisableAttribution />
      </MapContainer>
    </div>
  );
};
