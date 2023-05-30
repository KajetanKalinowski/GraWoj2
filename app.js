var map = L.map('map').setView([52.44251260319042, 18.921683024307846], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.doubleClickZoom.disable()
map.scrollWheelZoom.disable()
function liczba(){
    return Math.floor(Math.random() * wojewodztwa.features.length-1)
}

console.log(wojewodztwa.features)

var points=0
var live=3



function start(){
     licz=liczba()
    var woj=document.getElementById('woj')
    
    var wojewodztwo=wojewodztwa.features[licz].properties.nazwa
    
    woj.innerHTML=wojewodztwo
    //console.log(wojewodztwo)
    document.getElementById('punkty').innerHTML="punkty: "+points
    document.getElementById('live').innerHTML="lives: "+live


}

var warstwa=[]
for(let i=0;i<=wojewodztwa.features.length-1;i++){
    
    var wojewodztwo=wojewodztwa.features[i]
    var mapwoj= L.geoJSON(wojewodztwo).addTo(map)
    
    mapwoj.on('click',function(e){
        
const wybrane=e.layer.feature.properties.nazwa
console.log(wybrane)

        if(wybrane==wojewodztwa.features[licz].properties.nazwa){
            document.getElementById('odp').innerHTML='dobrze'
            console.log("dobrze")
            points=points+1
            document.getElementById('punkty').innerHTML="punkty: "+points
            marker(e.latlng)
            start()

        }
else{ 
    document.getElementById('odp').innerHTML='źle'
    console.log("źle")
    document.getElementById('live').innerHTML="lives: "+live
    live=live-1
    marker(e.latlng)


start()
}   
if(live==0){
    document.getElementById('odp').innerHTML='Game Over'
    return 0
}
function marker(latlng){
    L.marker(latlng).addTo(map)
}

document.getElementById("gora").innerHTML=""
})      
}