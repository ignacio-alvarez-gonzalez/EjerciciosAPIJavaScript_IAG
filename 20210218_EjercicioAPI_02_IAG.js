var myMap;
require(["esri/map", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/FeatureLayer", "esri/dijit/BasemapToggle", "esri/dijit/Legend", "esri/geometry/Extent", "dojo/parser", "dojo/on", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer, FeatureLayer, BasemapToggle, Legend, Extent, parser, on) {

    parser.parse();

    myMap = new Map("divMap", {
        basemap: "topo",
        extent: new Extent({
            xmax: -5404773.346713248,
            xmin: -17174852.7101747,
            ymax: 8704064.900408281,
            ymin: 1640060.4944073097,
            spatialReference: {
                wkid: 102100
            }
        })
    });

    var myDynamicLayer = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
        opacity: 0.5 
    });
    myMap.addLayer(myDynamicLayer);
    // También se puede pasar un array de capas al mapa con addLayers

    var myFeatureLayer = new FeatureLayer("https://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0", {

    });
    myMap.addLayer(myFeatureLayer);
    myFeatureLayer.setDefinitionExpression("MAGNITUDE > 3");

    var myToggle = new BasemapToggle({
            map: myMap,
            basemap: "satellite"
        }, "BasemapToggle");
    myToggle.startup();

    // Leyenda creando un evento (dentro del cual está creado el objeto de leyenda)
    myMap.on("layers-add-result", function(){
    var myLegend = new Legend({
        map: myMap,
        arrangement: Legend.ALIGN_RIGHT
      }, "divLegend");
      myLegend.startup();
    });
});

