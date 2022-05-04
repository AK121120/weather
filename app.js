var namev=document.getElementById("name");
var tempv=document.getElementById("temp-value");
var descv=document.getElementById("climate");
var newName = document.getElementById("cityInput");
let icon = document.getElementById("imagei");
function GetInfo() {
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=abb64f0c9690c6e886af5ad87a0a9aae')
.then(response => response.json())
.then(data => {
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Math.round(data.list[i].main.temp_min - 273.15);
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Math.round(data.list[i].main.temp_max - 273.15);
    }
    
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    console.log(data)
})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

for(i = 0; i<5; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}

function locate() {
    navigator.geolocation.getCurrentPosition(function(position){
        let lat=position.coords.latitude;
        let long=position.coords.longitude;
        getweather(lat,long);
    });
}

function getweather( la, lo){
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+la+'&lon='+lo+'&appid=abb64f0c9690c6e886af5ad87a0a9aae')
            .then(response => response.json())
            .then(data => {
                var namevalue= data['name'];
                var tempvalue= data['main']['temp'];
                var descvalue= data['weather'][0]['description'];
                var id=data['weather'][0]['id'];
                namev.innerText = namevalue;
                tempv.innerText = Math.round(tempvalue-273);
                descv.innerText = descvalue;
                icon_manager(id);
                GetInfowithlatitude(namevalue);
            })
                .catch(err => alert("Wrong city name!"))
}

function send(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=abb64f0c9690c6e886af5ad87a0a9aae')
.then(response => response.json())
.then(data => {
    var namevalue= data['name'];
    var tempvalue= data['main']['temp'];
    var descvalue= data['weather'][0]['description'];
    var identity=data['weather'][0]['id'];
    namev.innerHTML = namevalue;
    tempv.innerHTML = Math.round(tempvalue-273);
    descv.innerHTML = descvalue;
    GetInfo();
    icon_manager(identity);
})
.catch(err => alert("Wrong city name!"))
}
function icon_manager(iden){
    if (iden<250){
        icon.src="./icons/storm.png";
    }
    else if (iden<350){
        icon.src="./icons/rainy.png";
    }
    else if (iden<550){
        icon.src="./icons/rainy-day.png";
    }
    else if (iden<650){
        icon.src="./icons/snowman.png";
    }
    else if (iden<800){
        icon.src="./icons/atmosphere.png";
    }
    else if (iden===800){
        icon.src="./icons/clear-sky.png";
    }
    else if (iden>800){
        icon.src="./icons/clear-sky.png";
    }
}
function GetInfowithlatitude(a){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+a+'&appid=abb64f0c9690c6e886af5ad87a0a9aae')
.then(response => response.json())
.then(data => {
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Math.round(data.list[i].main.temp_min - 273.15);
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Math.round(data.list[i].main.temp_max - 273.15);
    }
    
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    console.log(data)
})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}