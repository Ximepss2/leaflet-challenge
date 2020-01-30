var mymap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
}).addTo(mymap);

// Load in geojson data
var myurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(myurl, d =>{
    d.features.forEach(m =>{
        var color = "";
        if(m.properties.mag>5){
            color = "#E31A1C";
        }else if(m.properties.mag>4){
            color = "#FC4E2A";
        }else if(m.properties.mag>3){
            color = "#FD8D3C";
        }else if(m.properties.mag>2){
            color = "#FEB24C";
        }else if(m.properties.mag>1){
            color = "#FED976";
        }else{
            color= "'#FFEDA0'";
        };
        L.circle([m.geometry.coordinates[1],m.geometry.coordinates[0]],{
            fillOpacity: 0.75,
            color: color,
            fillColor: color,
            radius : m.properties.mag * 10000
        }).bindPopup("<h2>" + m.properties.title + "</h2> <hr> <h3>" + m.properties.type + "</h3>").addTo(mymap);
    })
});

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 50  ? '#BD0026' :
           d > 40  ? '#E31A1C' :
           d > 30  ? '#FC4E2A' :
           d > 20   ? '#FD8D3C' :
           d > 10   ? '#FEB24C' :
           d > 0   ? '#FED976' :
                      '#FFEDA0';
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["0", "1", "2", "3", "4", "5"],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] * 10 ) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);



