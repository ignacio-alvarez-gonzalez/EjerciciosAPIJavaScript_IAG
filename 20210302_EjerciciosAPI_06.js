// Ejercicio de widget de edición:

require([
    "esri/map",
    "esri/layers/FeatureLayer",

    "esri/dijit/editing/TemplatePicker",
    "esri/tasks/GeometryService",
    "esri/dijit/editing/Editor",

    "dojo/ready",
    "dojo/parser",
    "dojo/_base/array",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
], function(
    Map,
    FeatureLayer,

    TemplatePicker,
    GeometryService,
    Editor,

    ready,
    parser,
    array, 
    
    BorderContainer, 
    ContentPane
){
    
    ready(function(){

        parser.parse();

        // Creo el mapa:
        var mapaPrincipal = new Map("divMap", {
            basemap: "dark-gray-vector",
            center: [-6.97, 38.88],
            zoom: 8
        });

        // Referencio las capas editables:
        var flPuntosIncendios = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0", {
            outFields: ['*']
        });

        var flLineasIncendios = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/1", {
            outFields: ['*']
        });

        var flPoligonosIncendios = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
            outFields: ['*']
        });

        // Añado las capas al mapa:
        mapaPrincipal.addLayers([flPuntosIncendios, flLineasIncendios, flPoligonosIncendios]);

        // Indico que arranque la función de edición cuando se hayan cargado las capas en el mapa:
        mapaPrincipal.on("layers-add-result", iniciarEditor);

        // Construyo la función de edición:
        function iniciarEditor(resultados){

            // El parámetro que entra (que he llamado 'resultados') es un objeto con las capas editables:
            console.log("Parámetro de entrada en la función iniciar editor:")
            console.log(resultados);

            // Guardo en un array las layerInfo que voy a necesitar en los ajustes del editor:
            var capasInfoIncendios = array.map(resultados.layers, function (resultado) {               
                return {
                    featureLayer: resultado.layer
                };
            });
            console.log("Variable en el primer array:")
            console.log("capasInfoIncendios", capasInfoIncendios);

            // Guardo en un array las layers que voy a necesitar para la plantilla:
            var capasIncendios = array.map(resultados.layers, function (resultado) {
                return resultado.layer;
            });
            console.log("Variable en el segundo array:")
            console.log("capasIncendios", capasIncendios);

            // TEMPLATE PICKER WIDGET

            // Añado el 'custom template picker widget':
            var plantillaSeleccion = new TemplatePicker({
                featureLayers: capasIncendios,
                columns: 10
            }, "divWidgetPlantilla");

            // Inicio el widget:
            plantillaSeleccion.startup();

            // EDITOR WIDGET

            // Creo una variable con los ajustes que irán dentro de los parámetros para el editor:
            var ajustesEditor = {
                map: mapaPrincipal,
                geometryService: new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                layerInfos: capasInfoIncendios,
                toolbarVisible: true,
                templatePicker: plantillaSeleccion,
                createOptions: {
                    polygonDrawTools: [Editor.CREATE_TOOL_FREEHAND_POLYGON, Editor.CREATE_TOOL_RECTANGLE, Editor.CREATE_TOOL_TRIANGLE, Editor.CREATE_TOOL_CIRCLE]
                },
                toolbarOptions: {
                    reshapeVisible: true
                },
                enableUndoRedo: true,
                maxUndoRedoOperations: 20
            };
            
            // Creo una variable de parámetros para el editor que guarde los ajustes:
            var parametrosEditor = {
                settings: ajustesEditor
            };

            // Construyo el widget de edición:
            var widgetEditor = new Editor(parametrosEditor, "divWidgetEditor");

            // Inicio el widget:
            widgetEditor.startup();

        };

    });
    
});