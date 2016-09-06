/*
mapBoxList.js v.1.0.1
Copyright (c) 2016 ocampogeric

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/
(function ( $ ) {
    $.fn.mapBoxList = function(options) {
        var $this = this;
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
            mapDiv: 'mapDiv',
            listDiv: 'mapList',
            jsonSettings:{
                locationNode: 'location',
                markerContent: 'markerContent',
                ItemContent: 'itemContent'
            },
            mapStyles:{
                height: '600px',
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
            height: defaults.mapStyles.height,
        });
        listDiv.append('<ul></ul>');
        if(defaults.on!=''){
            map.on(defaults.on,defaults.function);
        }
        
        $.fn.loadMap = function () {
            if(defaults.showList){     
                if($(window).width() >= 600){
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
                }else{
                    if($(window).height()<=700){
                        listDiv.css({
                        width:'100%',
                        height: '300px',
                        float:'left',
                        overflow: 'auto'
                        });
                       mapDiv.css({
                        width:'100%',
                        height:'200px',
                        float:'left'
                        }); 
                    }else{
                       listDiv.css({
                        width:'100%',
                        height: '300px',
                        float:'left',
                        overflow: 'auto'
                        });
                        mapDiv.css({
                        width:'100%',
                        height:'300px',
                        float:'left'
                        }); 
                    }
                    
                }
                $(window).resize(function(){
                    if ($(window).width() <= 600) {
                        if($(window).height()<=700){
                            listDiv.css({
                            width:'100%',
                            height: '300px',
                            float:'left',
                            overflow: 'auto'
                            });
                            mapDiv.css({
                                width:'100%',
                                height:'200px',
                                float:'left'
                            }); 
                        }else{
                            listDiv.css({
                                width:'100%',
                                height: '300px',
                                float:'left',
                                overflow: 'auto'
                            });
                            mapDiv.css({
                                width:'100%',
                                height:'300px',
                                float:'left'
                            }); 
                        }   
                    }else{
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
                    }
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
                if($(window).width() >= 600){
                    listDiv.css({
                        display: 'none'
                    });
                    mapDiv.css({
                        width:'100%',
                        height:'100%',
                        float:'left'
                    });    
                }else{
                    if($(window).height()<=700){
                        listDiv.css({
                            dispaly:'none'
                        });
                        mapDiv.css({
                            width:'100%',
                            height:'300px',
                            float:'left'
                        });
                        mapWrapper.css({
                            height: '300px'
                        });
                    }else{
                        listDiv.css({
                            display: 'none'
                        });
                        mapDiv.css({
                        width:'100%',
                        height:'100%',
                        float:'left'
                        });
                        mapWrapper.css({
                            height: settings.mapStyles.height
                        });
                    }
                }
                $(window).resize(function(){
                    if ($(window).width() <= 600) {
                        if($(window).height()<=700){
                            listDiv.css({
                                display: 'none'
                            });
                            mapDiv.css({
                                width:'100%',
                                height:'300px',
                                float:'left'
                            });
                            mapWrapper.css({
                                height: '300px'
                            });
                        }else{
                            listDiv.css({
                                display: 'none'
                            });
                            mapDiv.css({
                                width:'100%',
                                height:'100%',
                                float:'left'
                            });
                            mapWrapper.css({
                                height: settings.mapStyles.height
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
                    }
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
        $this.onEvent = function (event,func) {
                map.on(event,func);
                return $this;
        }
        return $this;
    };
}( jQuery ));