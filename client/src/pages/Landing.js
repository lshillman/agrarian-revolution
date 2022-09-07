import { useQuery } from '@apollo/client';
import VeggiePopup from '../components/VeggiePopup';
import { QUERY_VEGGIES } from '../utils/queries';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import icons from '../utils/icons';

const userCoords = JSON.parse(localStorage.getItem("coordinates"));


const Landing = () => {
  const { loading, data } = useQuery(QUERY_VEGGIES);
  const veggies = data?.veggies || [];

  return (
    <>
      <main id="landing-main">
        <div className="landing-section">
          <h1>Join the agrarian revolution</h1>
          <p>Meet your new neighborhood crop swap. Agrarify helps gardening enthusiasts share their surplus, and helps everyone get some fresh, seasonal, hyper-local veggies — all for free. Sign up now to get started.</p>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>

              <div style={{ width: "100%" }}>
                <MapContainer center={userCoords || [37.87114171034828, -122.27379801035863]} zoom={13} style={{ height: "600px" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />

                  {veggies.map((veggie, key) => {
                      return <Marker key={key} position={veggie.coordinates} icon={icons[veggie.type]} data={veggie._id}>
                        <VeggiePopup veggie={veggie} />
                      </Marker>
                  })}
                </MapContainer>
              </div>
          </>
        )}
      </main>
    </>
  );
};

export default Landing;