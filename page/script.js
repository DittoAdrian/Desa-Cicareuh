// =======================
// INIT MAP
// =======================
const map = L.map("map").setView([-6.889547, 106.692372], 11);

// =======================
// BASE MAP
// =======================
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// =======================
// ICON
// =======================
const iconTitik = L.icon({
  iconUrl: "../../icon/pointRed.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30]
});

// =======================
// MARKER GROUP
// =======================
const markerGroup = L.layerGroup().addTo(map);

// =======================
// FETCH & RENDER DATA WISATA
// =======================
fetch("../../data/wisata.json")
  .then(res => {
    if (!res.ok) throw new Error("Gagal memuat JSON");
    return res.json();
  })
  .then(data => {
    console.log("✅ Data wisata:", data);

    data.forEach(item => {
      // VALIDASI KOORDINAT
      if (!item.koordinat || item.koordinat.length !== 2) return;

      const marker = L.marker(item.koordinat, {
        icon: iconTitik
      });

      marker.bindTooltip(item.nama, {
  permanent: true,
  direction: "top",
  offset: [0, -35],
  className: "marker-label",
})

      markerGroup.addLayer(marker);
    });
  })
  .catch(err => console.error(err));

// =======================
// GEOJSON BATAS DESA
// =======================
fetch("../data/Cicareuh_AR.geojson")
  .then((res) => {
    if (!res.ok) throw new Error("GeoJSON gagal dimuat");
    return res.json();
  })
  .then((data) => {
    let batasDesa = L.geoJSON(data, { 
      style: {
        fillColor : "",
        fillOpacity: 0.1,
        color: 'green',
        weight: 1,
      },
    }).addTo(map);

    map.fitBounds(batasDesa.getBounds());
  })
  .catch((err) => console.error(err));

