var mapId = "a3f059a6bcf14682b10a9cae8033b049";

// require(["esri/arcgis/utils", "dojo/ready"], function(arcgisUtils, ready) { 
//     ready(function(){
//         arcgisUtils.createMap(mapId, "mapa1").then(function(response){
//             // Get the map from the response
//             map = response.map
//         }); 
//     });
// });

require([
    "esri/arcgis/utils", 
    "esri/dijit/Legend", 
    "esri/dijit/Search", 
    "esri/tasks/locator", 
    "esri/dijit/Directions", 
    "esri/dijit/Print", 
    "esri/tasks/PrintTemplate", 
    "esri/graphic", 
    "esri/toolbars/draw",
    "dojo/dom",
    "dojo/on", 
    "dojo/domReady!"
    ], function(
        arcgisUtils, 
        Legend, 
        Search, 
        Locator, 
        Directions, 
        Print, 
        PrintTemplate, 
        Graphic,
        Draw,
        dom,
        on
        ) { 
    arcgisUtils.createMap(mapId, "divMap").then(function(response){

        const myMap = response.map;

        var legendLayers = arcgisUtils.getLegendLayers(response);
        var myLegend = new Legend({
            map: myMap,
            layerInfo: legendLayers
        }, "divLegend");
        myLegend.startup();

        var mySearch = new Search({
            map: myMap
        },"divSearch");
        mySearch.startup();

        // // Locator task
        // // Construct and bind the task
        // var myLocator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
        // // Prepare input parameters
        // var myLocatorParameters = {
        //     address: myAddress
        // };
        // // Wire event handlers
        // myLocator.on(("address-to-locations-complete"), showResults);
        // // Call an execution method
        // myLocator.addressToLocations(myLocatorParameters);
        // // Process the results
        // function showResults(evt){
        //     // Display address location
        // };

        var myDirections = new Directions({
            map: myMap,
            routeTaskUrl: "http://utility.arcgis.com/usrsvcs/appservices/OM1GNiiACNJceMRn/rest/services/World/Route/NAServer/Route_World"
        }, "divDirections");
        myDirections.startup();

        // var myTemplates = new PrintTemplate({
        //     label: "Map",
        //     format: "PDF",
        //     layout: "MAP_ONLY",
        //     exportOptions: {
        //       width: 500,
        //       height: 400,
        //       dpi: 96
        //     }
        //   }, {
        //     label: "Layout",
        //     format: "PDF",
        //     layout: "A4 Portrait",
        //     layoutOptions: {
        //       titleText: "My Print",
        //       authorText: "esri",
        //       copyrightText: "My Company",
        //       scalebarUnit: "Miles",
        //     }
        //   })
            
        var myPrint = new Print({
            map: myMap,
            url: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute",
            // templates: myTemplates
        }, "divPrint");
        myPrint.startup();

        // myMap.on("click", function(event) {
        //     var myGraphic = new Graphic(event.mapPoint, symbol);
        //     myMap.graphics.add(myGraphic);
        // });
        
        // Drawing graphics on the map
        myMap.on("load", iniciar);

        console.log(myMap);

        function iniciar() {
            var myToolbar = new Draw(myMap);
            // myMap.disableMapNavigation();
            myToolbar.activate(Draw.POLYLINE);
            myToolbar.on("draw-complete", addToMap);
        };       

        function addToMap(evt) {
            console.log("dibujo", evt);
            // myToolbar.deactivate();
            // var symbol;
            // if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
            // symbol = markerSymbol;
            // } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
            // symbol = lineSymbol;
            // } else {
            // symbol = fillSymbol;
            // }
            // var graphic = new Graphic(evt.geometry, symbol);
            // myMap.graphics.add(graphic);
        };

    });       
});