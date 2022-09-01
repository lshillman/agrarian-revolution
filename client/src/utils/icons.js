import L from "leaflet";


const artichokes = new L.icon({
    iconUrl: require("./icons/artichokes.png").default,
    iconSize: [50, 50]
  });

const carrots = new L.icon({
    iconUrl: require("./icons/carrots.png").default,
    iconSize: [50, 50]
  });

const spinach = new L.icon({
    iconUrl: require("./icons/spinach.png").default,
    iconSize: [50, 50]
});

const icons = {artichokes, carrots, spinach};
export default icons;