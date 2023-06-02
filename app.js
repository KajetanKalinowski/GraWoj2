var map = L.map('map').setView([52.15088015338915, 18.979287672131708], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{minZoom:7,maxZoom: 7,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
var wojL = []
var wojSprawdz = ""
var losy=0
var dobrze = []

var zle = []



function mapa(){
    for(let i=0;i<=woje.features.length-1;i++){
        var woj = woje.features[i]
        var mapwoje = L.geoJSON(woj,{color:"blue"}).addTo(map)
        mapwoje.on("mouseover",(e)=>{
        if(wojL[i].options.color=="blue"){
                wojL[i].setStyle({
                    color:"pink",
                    weight:3,
                })
            }
        })
        mapwoje.on("mouseout",(e)=>{
            if(wojL[i].options.color =="blue"){
                wojL[i].setStyle({
                    color:"blue",
                    
                })
            }
        })
        mapwoje.name= woje.features[i].properties.nazwa
        wojL.push(mapwoje)
    }
}
mapa()
var wojela = L.geoJson(woje.features).addTo(map);
wojela.setStyle({color:"none"})
var wojdos = wojela.getLayers()
function losuj() {
    if (wojdos.length === 0) {
        return null;
    }
    var wylosowanyIndex = Math.floor(Math.random() * wojdos.length)
    var wylosowane = wojdos[wylosowanyIndex]
    var nazwaWojewodztwa = wylosowane.feature.properties.nazwa
    wojdos.splice(wylosowanyIndex, 1)
    return nazwaWojewodztwa
}
function start() {
    document.getElementById("losuj").style.visibility = "hidden"
    var wylosowaneWojewodztwo = losuj()
    if (wylosowaneWojewodztwo !== null) {
        wojSprawdz =  wylosowaneWojewodztwo
        for(let i=0;i<=wojL.length-1;i++){
            if(wojL[i].licznik==1&& wojL[i].options.color =="yellow"){
                wojL[i].setStyle({color:"red"})
                wojL[i].options.color = "red"
            }
            if(wojL[i].name==wylosowaneWojewodztwo){
                wojL[i].setStyle({color:"yellow"})
                wojL[i].options.color = "yellow"
                wojL[i].licznik = 1
            }
        }
    } else {
    }
    console.log(losy)
    
}
function sprawdz(){ 
        for(let i=0;i<=wojL.length-1;i++){
            console.log(wojL[i].name)
            if(wojL[i].name == wojSprawdz){
            if(document.getElementById("input").value==wojSprawdz){
                wojL[i].setStyle({color:"green"})
                wojL[i].options.color = "green"
                dobrze.push(wojSprawdz)
                losy++

            }
            else{
                wojL[i].setStyle({color:"red"})
                wojL[i].options.color = "red"
                zle.push(wojSprawdz)
                losy++
            }
            }
        }

        if(losy==16){
            document.getElementById("koniec").style.zIndex = 5
            document.getElementById("ul1").innerHTML ="Dobre odpowiedzi: "+dobrze
            document.getElementById("ul2").innerHTML ="Złe odpowiedzi: "+zle
        
            
        }
        start()
}