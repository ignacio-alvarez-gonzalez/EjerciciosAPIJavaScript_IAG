var myMap;
require([
    "esri/map", 
    "esri/layers/ArcGISDynamicMapServiceLayer", 
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent",

    "esri/toolbars/draw",

    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/graphic", 
    "esri/Color",

    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
], function(
    Map,
    ArcGISDynamicMapServiceLayer, 
    FeatureLayer,
    Extent,
    Draw,
    SimpleFillSymbol,
    SimpleLineSymbol,
    Graphic,
    Color,
    dom, 
    on) {

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


    
    // Drawing graphics on the map
    myMap.on("load", iniciarDibujado);

    // console.log(myMap);

    function iniciarDibujado() {
        var myToolbar = new Draw(myMap);
        // myMap.disableMapNavigation();
        myToolbar.activate(Draw.POLYLINE);
        myToolbar.on("draw-complete", addToMap);
    };       

    function addToMap(event) {
        console.log("Se dibuja la geometría", event);

        var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 127, 0]), 2), new Color([255, 127, 0, 0.3]));

        var myGraphic = new Graphic(event.geometry, symbol);
        
        myMap.graphics.add(myGraphic);
    };

});