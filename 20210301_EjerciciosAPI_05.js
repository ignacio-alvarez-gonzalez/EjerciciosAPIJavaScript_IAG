var mapaPrincipal;

require([
    "esri/map",

    "esri/tasks/GeometryService",
    "esri/tasks/BufferParameters",

    "esri/toolbars/draw",
    "esri/graphic",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",

    "dojo/ready",
    "dojo/parser",
    "dojo/on",
    "dojo/dom",
    "dojo/_base/array"
], function(
    Map,

    GeometryService,
    BufferParameters,

    Draw,
    Graphic,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Color,

    ready,
    parser,
    on,
    dom,
    array
){
    ready(function() {

        parser.parse();

        mapaPrincipal = new Map("divMap", {
            basemap: "topo",
            center: [-6.97, 38.88],
            zoom: 10
        });

        var servicioGeometria = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer")

        mapaPrincipal.on("load", iniciarDibujo);

        function iniciarDibujo() {
            dibujo = new Draw(mapaPrincipal);
            dibujo.activate(Draw.POLYLINE);
            dibujo.on("draw-end", herramientaAreaInfluencia);
        };

        on(dom.byId("divClear"), "click", function(){
            mapaPrincipal.graphics.clear();
            iniciarDibujo();
        });

        function herramientaAreaInfluencia(evento){

            dibujo.deactivate();

            var geometria = evento.geometry;
            var simbolo = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255,0,0]), 1);

            var grafico = new Graphic(geometria, simbolo);
            mapaPrincipal.graphics.add(grafico);

            var parametrosAI = new BufferParameters();
            parametrosAI.distances = [5, 10];
            parametrosAI.unit = GeometryService.UNIT_KILOMETER;
            parametrosAI.geometries = [geometria];
            parametrosAI.outSpatialReference = mapaPrincipal.spatialReference;

            servicioGeometria.buffer(parametrosAI);
            servicioGeometria.on("buffer-complete", dibujarAreaInfluencia);

            console.log("Se ha realizado el buffer");

        };

        function dibujarAreaInfluencia(geometriasAI) {

            console.log(geometriasAI);

            var simboloAI = new SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255,0,0,0.65]), 2
                ),
                new Color([255,0,0,0.35])
            );
  
            array.forEach(geometriasAI.geometries, function(geometriaInterna) {

                console.log(geometriaInterna);

                var graficoAI = new Graphic(geometriaInterna, simboloAI);
                mapaPrincipal.graphics.add(graficoAI);
            });

            console.log("Se ha dibujado el buffer");
  
        };
            
    });

});