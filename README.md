# mapBoxList v1
Simple jQuery plugin to create a mapBox map with a list beside.

![Image map](http://gdurl.com/vL9T "mapBoxList")

#How to use
Fisrt download and import required library
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
<script src="myscripts/mapBoxList_v1.js">
```
Then should create a div with an Id
```html
<div id="map"></div>
```
And simple method
```javascript
$('#map').mapBoxList({
  apiKey:'<Your apiKey here>'
});
```

#General options
The availbe options are:
  - `centerMap: [lat,lng]`
  - `zoom: numeric`
  - `apiKey:'<your apiKey here>'`
  - `type:'mapbox.<type>'` //default is 'mapbox.streets'
  - `jsonData: jsonObject`
  - `showList: boolean`
  - `mapDiv: 'id here'` //name of div to wrap map, default is mapDiv
  - `listDiv: 'id here'` //name of div to wrap list, default is mapList
  
#Map style options
```javascript
mapStyles:{
  height:'height here' //height of wrapper map
  width:'width here' //width of wrapper map
}
```
For example:
```javascript
$('#map').mapBoxList({
  apiKey:'<Your apiKey here>',
  mapStyles:{
    width: '100%'
  }
});
```
#Json Settings
Here you can set the location node where markers take it. location node is required to show markers and list items:
  - `locationNode:`
  - `markerContent: 'name of Json node with marker content'` By default only show location like a text.
  - `ItemContent: 'name of Json node with list item content'` By default only show a  `li` with a location like a text and blue background.

For example:
```javascript
$('#map').mapBoxList({
  apiKey:'<Your apiKey here>',
  jsonSettings:{
    locationNonde: 'place' By default is location
  }
});
```
#Markers settings
Here you can personalize the markers settings. The avaible options are:
- `markerSymbol` By default is `circle`. you can see more here [maki icons](https://www.mapbox.com/maki-icons/)
- `markerSize` By default is `large`
- `markerColor` By default is `#0089ff`


#Events handler
If you want to capture a event, then you can call `onEvent` method with two params; `event` and `function`.
######Example
```javascript
$("#map").mapBoxList({...})
  .onEvent('ready',function(){
    console.log("Map is ready now!!");
    })
  .onEvent('dragend',function(){
    //you code here...
  });
```
######Notes that you can add multiple calls at method.
To get full event list, visit oficial website of [mapBox](https://www.mapbox.com/mapbox.js/api/v2.4.0/)






