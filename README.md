# mapBoxList
Simple jQuery plugin to create a mapBox map with a list beside.

![alt text](https://lh6.googleusercontent.com/idbc3iZw2Lp89fsE--FY51oOe0L0ui_D-HSj77LHFs4c8BbaqjNMPxhr8PFjtjD36Cej6u0I4phGhO4=w1680-h925-rw "Logo Title Text 1")

#How to use
Fisrt import required library
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
<script src="myscripts/mapBoxList.js">
```
Then I should create a div with an Id
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
  - `markerContent` By default only show location like a text.
  - `ItemContent` By default only show a  `li` with a location like a text and blue background.

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











