var mymap = L.map('map', {
    center: [47.7511, -120.7401],
    zoom: 7,
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

var airports = null;

var colors = chroma.scale('Dark2').mode('lch').colors(2);

for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

airports= L.geoJson.ajax("assets/airports.geojson", {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.CNTL_TWR);
        return feature.properties.AIRPT_NAME;
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR == "Y") { id = 0; }
        else { id = 1;}
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-broadcast-tower marker-color-' + (id + 1).toString() })});
    },
    attribution: 'Airport location data'
}).addTo(mymap);

colors = chroma.scale('YlOrRd').colors(5);

function setColor(density) {
    var id = 0;
    if (density > 61) { id = 4; }
    else if (density > 46 && density <= 60) { id = 3; }
    else if (density > 12 && density <= 45) { id = 2; }
    else if (density > 3 &&  density <= 11) { id = 1; }
    else  { id = 0; }
    return colors[id];
}

function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}

L.geoJson.ajax("assets/us-states.geojson", {
    style: style
}).addTo(mymap);

var legend = L.control({position: 'topright'});

legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'legend');
  div.innerHTML += '<b># Airports in the State</b><br />';
  div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p> 61+ </p>';
  div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p> 46-60 </p>';
  div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p> 12-45 </p>';
  div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 3-11 </p>';
  div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0-2 </p>';
  div.innerHTML += '<hr><b>Company<b><br />';
  div.innerHTML += '<i class="fa fa-broadcast-tower marker-color-0"></i><p> Has No Control Tower </p>';
  div.innerHTML += '<i class="fa fa-broadcast-tower marker-color-1"></i><p> Has Control Tower </p>';

  return div;
};

legend.addTo(mymap);

L.control.scale({position: 'bottomleft'}).addTo(mymap);
