import React, { useEffect,useState  } from 'react';
// import * as place from "../../data/location.json"
import ReactMapGL, { GeolocateControl, Marker,AttributionControl,Popup } from 'react-map-gl';
// import d3 from 'd3-ease';

const MapDirection = () => {
 const [place,setPlace]=useState([]);

useEffect(()=>{
    fetch('./location.json')
    .then(res => res.json())
    .then(data => {
        setPlace(data)
        console.log(data)
    });
},[]);






const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 23.777176,
    longitude: 90.399452,
    zoom: 7,
  pitch: 50
  });





// -----------styles-position------------

  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  const attributionStyle= {
    right: 0,
    top: 0
  };



  
  return (
    <ReactMapGL
   
    mapStyle={"mapbox://styles/mapbox/dark-v9"}
    
    mapboxApiAccessToken={'pk.eyJ1IjoibW9lZW4xMCIsImEiOiJja3YzcjA5d3o4amRtMnBxNmFodjFjdXYzIn0.CwPAAoUmFN-hlCThUGB4VA'}
      {...viewport}
      
      onViewportChange={nextViewport => setViewport(nextViewport)}
    
      attributionControl={false} >
      <AttributionControl compact={true} style={attributionStyle} />


         <GeolocateControl
    style={geolocateControlStyle}
    positionOptions={{enableHighAccuracy: true}}
    trackUserLocation={true}
    auto
  />



        {place.map((place)=> (
             <Marker key={place.key} latitude={	place.latitude} longitude={place.longitude} offsetTop={(-viewport.zoom *5)/2} >
     
    
             <img src="https://cdn1.iconfinder.com/data/icons/ui-colored-3-of-3/100/UI_3__1-512.png"  width={viewport.zoom*5} height={viewport.zoom*5}/>
               
              <p style={{color:"yellow"}}>{place.name}</p>  
            </Marker>
        ))}
       
        </ReactMapGL>
  );




};


export default MapDirection;












// -----------------------ager-------------------








// import mapboxgl from 'mapbox-gl';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
// // import './MapDirection.css'
// mapboxgl.accessToken = 'pk.eyJ1IjoicHJvZ3JhbW1pbmdoZXJvIiwiYSI6ImNrdXc3OG04MzFsbHgzM255ZnU0NDRtbmsifQ.sEGTkRu5uz5PBIoho1An0w';





// useEffect(() => {
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [90.389099, 23.791599],
//         zoom: 2
//     });

//     map.addControl(
//         new MapboxDirections({
//             accessToken: mapboxgl.accessToken
//         }),
//         'top-left'
//     );
// }, [])
// return (
//     <div>
//         <div id="map"></div>
//     </div>
// );






// <Marker latitude={	23.777176} longitude={90.399452} offsetTop={(-viewport.zoom *5)/2} >
          
        
// <img src="https://cdn1.iconfinder.com/data/icons/ui-colored-3-of-3/100/UI_3__1-512.png"  width={viewport.zoom*5} height={viewport.zoom*5}/>
// </Marker>
















// ----------------------------------------main---------------------------------
// const [place,setPlace]=useState([]);

// useEffect(()=>{
//     fetch('./location.json')
//     .then(res => res.json())
//     .then(data => {
//         setPlace(data)
//         console.log(data)
//     });
// },[]);






// const [viewport, setViewport] = useState({
//     width: 400,
//     height: 400,
//     latitude: 23.777176,
//     longitude: 90.399452,
//     zoom: 7,
//   pitch: 50
//   });





// // -----------styles-position------------

//   const geolocateControlStyle = {
//     right: 10,
//     top: 10
//   };

//   const attributionStyle= {
//     right: 0,
//     top: 0
//   };



  
//   return (
//     <ReactMapGL
   
//     mapStyle={"mapbox://styles/mapbox/dark-v9"}
    
//     mapboxApiAccessToken={'pk.eyJ1IjoibW9lZW4xMCIsImEiOiJja3YzcjA5d3o4amRtMnBxNmFodjFjdXYzIn0.CwPAAoUmFN-hlCThUGB4VA'}
//       {...viewport}
      
//       onViewportChange={nextViewport => setViewport(nextViewport)}
    
//       attributionControl={false} >
//       <AttributionControl compact={true} style={attributionStyle} />


//          <GeolocateControl
//     style={geolocateControlStyle}
//     positionOptions={{enableHighAccuracy: true}}
//     trackUserLocation={true}
//     auto
//   />



//         {place.map((place)=> (
//              <Marker key={place.key} latitude={	place.latitude} longitude={place.longitude} offsetTop={(-viewport.zoom *5)/2} >
     
    
//              <img src="https://cdn1.iconfinder.com/data/icons/ui-colored-3-of-3/100/UI_3__1-512.png"  width={viewport.zoom*5} height={viewport.zoom*5}/>
               
//               <p style={{color:"yellow"}}>{place.name}</p>  
//             </Marker>
//         ))}
       
//         </ReactMapGL>
//   );