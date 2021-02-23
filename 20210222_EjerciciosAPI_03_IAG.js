var mapId = "a3f059a6bcf14682b10a9cae8033b049";

// require(["esri/arcgis/utils", "dojo/ready"], function(arcgisUtils, ready) { 
//     ready(function(){
//         arcgisUtils.createMap(mapId, "mapa1").then(function(response){
//             // Get the map from the response
//             map = response.map
//         }); 
//     });
// });

require(["esri/arcgis/utils", "esri/dijit/Legend", "esri/dijit/Search", "esri/tasks/locator", "dojo/domReady!"], function(arcgisUtils, Legend, Search, Locator) { 
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

        // Locator task
        // Construct and bind the task
        var myLocator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
        // Prepare input parameters
        var myLocatorParameters = {
            address: myAddress
        };
        // Wire event handlers
        myLocator.on(("address-to-locations-complete"), showResults);
        // Call an execution method
        myLocator.addressToLocations(myLocatorParameters);
        // Process the results
        function showResults(evt){
            // Display address location
        };

    });       
});