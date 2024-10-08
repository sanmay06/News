(() => {
    function updateTime(f) {
        let d = new Date();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        document.getElementsByClassName("DD")[0].innerText = d.getDate();
        document.getElementsByClassName("MM")[0].innerText = d.getMonth() + 1;
        document.getElementsByClassName("YY")[0].innerText = d.getFullYear();
        document.getElementsByClassName("day")[0].innerText = weekday[d.getDay()];
        let h = d.getHours();
        let m = d.getMinutes();

        if (h >= 19 || h < 6) { // Night: 7 PM to 6 AM
            document.body.style.backgroundImage = "url('background/nightsky.jpg')";
            document.body.style.color = 'white';
            //console.log("night");
        } 
        else if (h >= 6 && h <= 12) { // Morning: 6 AM to 12 PM
            document.body.style.backgroundImage = "url('background/1165039.jpg')";
            document.body.style.color = '#1A237E';
            //console.log("morning");
        } 
        else if (h > 12 && h <= 16) { // Afternoon: 12 PM to 4 PM
            document.body.style.backgroundImage = "url('background/afternoon.jpeg')";
            document.body.style.color = '#1A237E';
            //console.log("afternoon");
        } 
        else if (h > 16 && h <= 19) { // Evening: 4 PM to 7 PM
            document.body.style.backgroundImage = "url('background/evening.jpg')";
            document.body.style.color = '#ffffff';
            //console.log("evening");
        }
        

        if (f)
            if (h > 12)
                h = h - 12;
        if (h <= 9)
            document.getElementById("hour").innerText = "0" + String(h);
        else
            document.getElementById("hour").innerText = String(h);
        if (m <= 9)
            document.getElementById("minutes").innerText = "0" + String(m);
        else
            document.getElementById("minutes").innerText = String(m);
    }

     async function getWeather(location, tf , wf, ff) {
        const encodedLocation = encodeURIComponent(location);
        const weatherEndpoint = `https://wttr.in/${encodedLocation}?format=j1`;

        fetch(weatherEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const weatherData = data;
                console.log(weatherData)
                dict = {
                    113: "☀️",  // Clear/Sunny
                    116: "⛅",  // Partly Cloudy
                    119: "☁️",  // Cloudy
                    122: "🌥️",  // Overcast
                    143: "🌫️",  // Mist
                    176: "🌦️",  // Patchy Rain Nearby
                    179: "🌨️",  // Patchy Snow Nearby
                    182: "🌨️",  // Patchy Sleet Nearby
                    185: "🌧️",  // Patchy Freezing Drizzle Nearby
                    200: "⛈️",  // Thundery Outbreaks Nearby
                    227: "🌬️",  // Blowing Snow
                    230: "❄️",  // Blizzard
                    248: "🌫️",  // Fog
                    260: "🌫️",  // Freezing Fog
                    263: "🌧️",  // Patchy Light Drizzle
                    266: "🌧️",  // Light Drizzle
                    281: "🌧️",  // Freezing Drizzle
                    284: "🌧️",  // Heavy Freezing Drizzle
                    293: "🌦️",  // Patchy Light Rain
                    296: "🌦️",  // Light Rain
                    299: "🌧️",  // Moderate Rain at Times
                    302: "🌧️",  // Moderate Rain
                    305: "🌧️",  // Heavy Rain at Times
                    308: "🌧️",  // Heavy Rain
                    311: "🌧️",  // Light Freezing Rain
                    314: "🌧️",  // Moderate or Heavy Freezing Rain
                    317: "🌨️",  // Light Sleet
                    320: "🌨️",  // Moderate or Heavy Sleet
                    323: "🌨️",  // Patchy Light Snow
                    326: "🌨️",  // Light Snow
                    329: "❄️",  // Patchy Moderate Snow
                    332: "❄️",  // Moderate Snow
                    335: "❄️",  // Patchy Heavy Snow
                    338: "❄️",  // Heavy Snow
                    350: "🌨️",  // Ice Pellets
                    353: "🌧️",  // Light Rain Shower
                    356: "🌧️",  // Moderate or Heavy Rain Shower
                    359: "🌧️",  // Torrential Rain Shower
                    362: "🌨️",  // Light Sleet Showers
                    365: "🌨️",  // Moderate or Heavy Sleet Showers
                    368: "🌨️",  // Light Snow Showers
                    371: "❄️",  // Moderate or Heavy Snow Showers
                    374: "🌨️",  // Light Showers of Ice Pellets
                    377: "🌨️",  // Moderate or Heavy Showers of Ice Pellets
                    386: "⛈️",  // Patchy Light Rain with Thunder
                    389: "⛈️",  // Moderate or Heavy Rain with Thunder
                    392: "⛈️",  // Patchy Light Snow with Thunder
                    395: "⛈️"   // Moderate or Heavy Snow with Thunder
                  };
                console.log(weatherData.current_condition[0].weatherCode);
                document.getElementById("cloud").innerHTML = dict[weatherData.current_condition[0].weatherCode];
                document.getElementsByClassName("weather-description")[0].innerText = weatherData.current_condition[0].weatherDesc[0].value;
                document.getElementsByClassName("loc")[0].innerText = location.replace(",", " ");
                document.getElementById("Pressure").innerText = weatherData.current_condition[0].pressure;
                document.getElementById("Humidity").innerText = weatherData.current_condition[0].humidity + "%";
                document.getElementById("Precipitaion").innerText = weatherData.current_condition[0].precipMM + " MM";
                document.getElementById('sun-rise').innerText = weatherData.weather[0].astronomy[0].sunrise;
                document.getElementById('sun-set').innerText = weatherData.weather[0].astronomy[0].sunset;
                if(!tf){
                    document.getElementById("ctemp").innerText = weatherData.current_condition[0].temp_F + " F";
                    document.getElementById("avgtemp").innerHTML = weatherData.weather[0].avgtempF + " F";
                    document.getElementById("mtemp").innerText = weatherData.weather[0].maxtempF + " F";
                    document.getElementById("mintemp").innerText = weatherData.weather[0].mintempF + " F";
                    document.getElementById("feel").innerText = weatherData.current_condition[0].FeelsLikeF + " F";
                }
                else
                {
                    document.getElementById("ctemp").innerText = weatherData.current_condition[0].temp_C + " C";
                    document.getElementById("avgtemp").innerHTML = weatherData.weather[0].avgtempC + " C";
                    document.getElementById("mtemp").innerText = weatherData.weather[0].maxtempC + " C";
                    document.getElementById("mintemp").innerText = weatherData.weather[0].mintempC + " C";
                    document.getElementById("feel").innerText = weatherData.current_condition[0].FeelsLikeC + "C";
                }
                document.getElementById("uv").innerText = weatherData.weather[0].uvIndex;
                document.getElementById("sunhour").innerText = weatherData.weather[0].sunHour;
                document.getElementById("snow").innerText = weatherData.weather[0].totalSnow_cm;
                if(wf){
                    document.getElementById("WindSpeed").innerText = weatherData.current_condition[0].windspeedKmph + "Km/h";
                }
                else
                {
                    document.getElementById("WindSpeed").innerText = weatherData.current_condition[0].windspeedMiles + "Miles/h";
                }
                document.getElementById("visible").innerText = weatherData.current_condition[0].visibility;
                document.getElementById("dir").innerText = weatherData.current_condition[0].winddir16Point;
                document.getElementById("deg").innerText = weatherData.current_condition[0].winddirDegree;
                document.getElementById("cover").innerText = weatherData.current_condition[0].cloudcover + " %";
                document.getElementById("tomdate").innerText = weatherData.weather[1].date;
                document.getElementById("trise").innerText = weatherData.weather[1].astronomy[0].sunrise;
                document.getElementById("tset").innerText = weatherData.weather[1].astronomy[0].sunset;
                if(ff){
                    document.getElementById("tavgtemp").innerText = weatherData.weather[1].avgtempC + " C";
                    document.getElementById("atavgtemp").innerText = weatherData.weather[2].avgtempC + " C";
                }
                else
                {
                    document.getElementById("tavgtemp").innerText = weatherData.weather[1].avgtempF + " F";
                    document.getElementById("atavgtemp").innerText = weatherData.weather[2].avgtempF + " F";
                }
                document.getElementById("tuv").innerText = weatherData.weather[1].uvIndex;
                document.getElementById("atdate").innerText = weatherData.weather[2].date;
                document.getElementById("atrise").innerText = weatherData.weather[2].astronomy[0].sunrise;
                document.getElementById("atset").innerText = weatherData.weather[2].astronomy[0].sunset;
                document.getElementById("atuv").innerText = weatherData.weather[2].uvIndex;
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    const getLocationFromLatLong = async (lat, lng) => {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.address) {
                const address = `${data.address.road || ''}, ${data.address.city || ''}, ${data.address.country || ''}`;
                return address.trim();
            } else {
                console.error('No address found');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    async function getLocation() {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    async function (position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        const location = await getLocationFromLatLong(latitude, longitude);
                        if (location) {
                            const city = location.split(",")[1] || location;
                            //getWeather(city);
                            resolve(city);
                        }
                        resolve("");
                    },
                    function (error) {
                        console.error('Error getting location:', error);
                        reject(error);
                    }
                );
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            return "";
        }
    }

    async function main() {
        let f = true;
        let ff = true;
        let tf = true;
        let wf = true;
        const loc = await getLocation();
        console.log("Location:", loc);
        await getWeather(loc, tf, wf, ff);

        setInterval(() => updateTime(f), 1000); 
        updateTime(f);

        document.getElementsByClassName("temperature")[0].addEventListener("click", function() {
            tf = !tf;
            getWeather(loc, tf, wf, ff);
        })

        document.getElementsByClassName("WindSpeed")[0].addEventListener("click", function() {
            wf = !wf;
            getWeather(loc, tf, wf, ff);
        })

        document.getElementsByClassName("forecast")[0].addEventListener("click", function() {
            ff = !ff;
            getWeather(loc, tf, wf, ff);
        })

        document.getElementsByClassName("Time")[0].addEventListener("click", function () {
            f = !f;
            updateTime(f);
        });
    }

    main();
})();