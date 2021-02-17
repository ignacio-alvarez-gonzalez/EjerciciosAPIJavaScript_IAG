// Función para referenciar un mapa de la API.

// Cargar el mapa en una ubicación usando 'center'.

// require(["esri/map", "dojo/domReady!"], function(Map) {
//     var myMap  = new Map("divMap", {
//         basemap: "topo",
//         center: [-6.969914630051957, 38.878753273782536],
//         zoom: 14
//     });
// });

// Cargar el mapa en una ubicación usando 'extent'.

var myMap;
// Los parámetros de la función tienen que ir en el mismo orden en el que los importamos en el require.
require(["esri/map", "esri/dijit/BasemapToggle","esri/geometry/Extent", "dojo/domReady!"], function(Map, BasemapToggle, Extent) {
    myMap = new Map("divMap", {
        basemap: "topo",
        extent: new Extent({
            xmax: -371134.65959865594,
            xmin: -463088.4046255991,
            ymax: 4954047.924221569,
            ymin: 4898860.389799747,
            spatialReference: {
                wkid: 102100
            }
            })
    });
    var toggle = new BasemapToggle({
        map: myMap,
        basemap: "satellite"
      }, "BasemapToggle");
      toggle.startup();
});
