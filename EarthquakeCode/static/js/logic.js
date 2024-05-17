
// Creates map 

let myMap = L.map("map", {
    center: [50,30],
    zoom: 1.9
  });

// Adds tile to map

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


var depth_array = [];


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {

    var data_piece = data.features;
    for (i = 0; i < data_piece.length; i ++){
        depth_array.push(data_piece[i]['geometry']['coordinates'][2]);
    };
    
    



    L.geoJSON(data['features'], {
        'pointToLayer': circlePoints,
        'onEachFeature': eachFeature

    }).addTo(myMap);
    
});



// Function which selects appropriate circle marker color based on depth value

function colorSelection (depth){
    var minimum_depth_value = Math.min(...depth_array);
    var maximum_depth_value = Math.max(...depth_array);
    var range = maximum_depth_value - minimum_depth_value;

    if (depth <= 0.2 * range){
        return "red";
    }
    else if (depth > 0.2 * range && depth <=0.4 * range){
        return "orange";
    }
    else if (depth > 0.4 * range && depth <= 0.6 * range){
        return "yellow";
    }
    else if (depth > 0.6 * range && depth <=0.8 * range){
        return "green";
    }
    else if (depth > 0.8 * range){
        return "blue";
    }
};


// Makes a function which creates circle markers for each data point

function circlePoints(feature, latlng) {
    
    const depth = feature.geometry.coordinates[2];
    const attributes = {
        'radius': feature.properties.mag * 3,
        'fillColor': colorSelection(feature.geometry.coordinates[2]),
        'fillOpacity': 0.5,
        'color': "white",
        
    };
    
    return L.circleMarker(latlng, attributes);
  
};
  

// Function which creates pop-up and fills with information for each circle marker

function eachFeature (feature, layer){
    layer.bindPopup(`<h4> Magnitude: ${feature.properties.mag}</h4>
                     <h4> Location: ${feature.properties.place}</h4>
                     <h4> Depth: ${feature.geometry.coordinates[2]}</h4>`)
                    
};



// Creates legend which details the colors and their corresponding depth values   

var legend = L.control({'position': 'topright'}); 


legend.onAdd = function(){
    var legendDiv = L.DomUtil.create('div', 'legend info');
    legendDiv.style.backgroundColor = "lightgray";
    legendDiv.style.border = "1px solid black";
    legendDiv.innerHTML = `<b> Depth Legend </b> <br>
                          <div style="background: red; width: 15px; height: 15px; display: inline-block; margin-right: 5px; margin-left: 2px"></div> <=${0.2*626.652.toFixed(2)} <br>
                          <div style="background: orange; width: 15px; height: 15px; display: inline-block; margin-right: 5px; margin-left: 2px"></div> ${0.2*626.652.toFixed(2)} - ${0.4*626.652.toFixed(2)} <br>
                          <div style="background: yellow; width: 15px; height: 15px; display: inline-block; margin-right: 5px; margin-left: 2px"></div> ${0.4*626.652.toFixed(2)} - ${0.6*626.652.toFixed(0)} <br>
                          <div style="background: green; width: 15px; height: 15px; display: inline-block; margin-right: 5px; margin-left: 2px"></div> ${0.6*626.652.toFixed(0)} - ${0.8*626.652.toFixed(2)} <br>
                          <div style="background: blue; width: 15px; height: 15px; display: inline-block; margin-right: 5px; margin-left: 2px"></div> >= ${0.8*626.652.toFixed(2)}`;                                    
                           
    return legendDiv;
};

// Adds legend to map 

legend.addTo(myMap);


