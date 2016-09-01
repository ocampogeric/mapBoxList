(function ( $ ) {
    $.fn.mapBoxList = function(options) {
        var map;
        // This is the easiest way to have default options.
        var settings = {
            // These are the defaults.
            centerMap:[29.4816561,-98.6544885],
            zoom:6,
            apiKey:'',
            type:'mapbox.streets',
            jsonData:[],
            showList: true,
            addressClass: "address",
            mapDiv: 'mapDiv',
            listDiv: 'mapList',
            jsonSettings:{
                locationNode: 'location',
                markerContent: 'markerContent',
                ItemContent: 'itemContent'
            },
            mapStyles:{
                Height: '600px',
                width: '100%'
            },
            markerSettings:{
                markerSymbol:'circle',
                markerSize: 'large',
                markerColor: '#0089ff'
            },
            on:'',
            function: function(event){console.log(event)}
        };
        var defaults = $.extend(true, settings,options);
        var mapWrapper = this;
        mapWrapper.append('<div id="'+defaults.listDiv+'"></div><div id="'+defaults.mapDiv+'"></div>');
        var mapDiv = $("#"+defaults.mapDiv);
        var listDiv = $("#"+defaults.listDiv);
        L.mapbox.accessToken = defaults.apiKey;
		map = L.mapbox.map(defaults.mapDiv, defaults.type).setView(defaults.centerMap, defaults.zoom);
        map.on('ready',function(){
            $(this).loadMap();
            map.invalidateSize();
        });
        mapWrapper.css({
            width: defaults.mapStyles.width,
            height: '600px',
            background: 'red'
        });
        listDiv.append('<ul></ul>');
        if(defaults.on!=''){
            map.on(defaults.on,defaults.function);
        }
        $.fn.loadMap = function () {
            if(defaults.showList){      
                listDiv.css({
                    width:'30%',
                    height: '100%',
                    float:'left',
                    overflow: 'auto'
                });
                mapDiv.css({
                    width:'70%',
                    height:'100%',
                    float:'left'
                });
                if(defaults.jsonData.length>0){
                    jQuery.each(defaults.jsonData, function(i, item) {
                        if(item[defaults.jsonSettings.locationNode]){
                            console.log(defaults);
                            var layer= L.mapbox.featureLayer({
                                type: 'Feature',
                                geometry: {
                                type: 'Point',
                                // coordinates here are in longitude, latitude order because
                                // x, y is the standard for GeoJSON and many formats
                                coordinates: [item[defaults.jsonSettings.locationNode][0],item[defaults.jsonSettings.locationNode][1]]
                            },properties: {
                                'marker-size': defaults.markerSettings.markerSize,
                                'marker-color': defaults.markerSettings.markerColor,
                                'marker-symbol': defaults.markerSettings.markerSymbol
                            }
                            });
                            var content = "";
                            if(item[defaults.jsonSettings.markerContent]){
                                content = item[defaults.jsonSettings.markerContent];
                            }else{
                                content = "<h3>"+item[defaults.jsonSettings.locationNode]+"</h3>";
                            }
                            layer.addTo(map);
                            layer.bindPopup(content);
                            var listItem = '<li>';
                            if(item[defaults.jsonSettings.ItemContent]){
                                listItem+= item[defaults.jsonSettings.ItemContent];
                            }else{
                                listItem+= 'Location: '+item[defaults.jsonSettings.locationNode];
                                
                            }
                            listItem +='</li>';
                            listDiv.find('ul').append(listItem);
                        }else{
                            console.log("No location node found in jsonData on position "+i);
                        }
                    });
                    listDiv.find('ul').css({
                        padding:'0',
                        margin: 0
                    });
                    listDiv.find('li').css({
                        height:'200px',
                        width: '100%',
                        background: '#0089FF',
                        listStyle: 'none',
                        overflow: 'auto',
                        borderBottom: 'solid 1px #FFFx'
                    });
                }
            }else{
                listDiv.css({
                    display: 'none'
                });
                mapDiv.css({
                    width:'100%',
                    height:'100%',
                    float:'left'
                });
                if(defaults.jsonData.length>0){
                    jQuery.each(defaults.jsonData, function(i, item) {
                        if(item[defaults.jsonSettings.locationNode]){
                            var layer= L.mapbox.featureLayer({
                                type: 'Feature',
                                geometry: {
                                type: 'Point',
                                // coordinates here are in longitude, latitude order because
                                // x, y is the standard for GeoJSON and many formats
                                coordinates: [item[defaults.jsonSettings.locationNode][0],item[defaults.jsonSettings.locationNode][1]]
                            },properties: {
                                'marker-size': defaults.markerSettings.markerSize,
                                'marker-color': defaults.markerSettings.markerColor,
                                'marker-symbol': defaults.markerSettings.markerSymbol
                            }
                            });
                            var content = "";
                            if(item[defaults.jsonSettings.markerContent]){
                                content = item[defaults.jsonSettings.markerContent];
                            }else{
                                content = "<h3>"+item[defaults.jsonSettings.locationNode]+"</h3>";
                            }
                            layer.addTo(map);
                            layer.bindPopup(content);
                        }else{
                            console.log("No location node found in jsonData on position "+i);
                        }
                    }); 
                }
            }
        }
        $.fn.reloadMap = function () {
            map.eachLayer(function (layer) {
                if (layer.feature!=undefined){
                    if(layer.feature.type=="Feature"){
                        map.removeLayer(layer);
                    }
                }
            });
            listDiv.find('ul').empty();
            $(this).loadMap();
        }
        $.fn.getMapa = function(){
            return map;
        }
        $.fn.reloadJson = function (json) {
            defaults.jsonData = json;
            $(this).reloadMap();
        }
    };
}( jQuery ));