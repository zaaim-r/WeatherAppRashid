/*
Welcome to my Weather App ForecastRashid! This app can be used to determine the weather for essentially any location across the globe! The UI of this app is as follows: we have
two text boxes where the user can input the latitude and longitude of the location they want to fetch the weather data from (negative for south and west, positive for north and east).
Once these numbers are entered, the user can simply press the "Enter" button, and they will receive all kinds of weather information for that city! Some of the specific pieces of data
include current temp, high and low temps for the day, UV index, wind speed, humidity, feels like temperature, and a 7-day forecast that includes some of the information mentioned
above. There is also an icon that corresponds with the current weather, as well as a short description underneath. Another feature to note is that the location the user has searched 
for is displayed at the top of the app, so that the user knows where the weather data is for.

There are certain limitations regarding my app. First of all, for a split second once the app starts, the weather data is all 0s and N/A, as the API takes time to receive all of the 
data and display it. Moreover, if the "Enter" button is pressed without inputting any coordinates, random weather data is displayed, and the location remains as its default 
(Randolph). This is similarly the case if a user inputs an invalid longitude or latitude. While the app does not take in these values, no popup is displayed that tells the user the
values they entered are incorrect. One final issue to note is with regards to the aesthetics. For the weekly forecast, there is some odd spacing for the date of the weather within
each box. This could be an issue with my FlatList, but I have not found a fix for it.
*/

import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native';
import moment from 'moment';

export default function App() {
const image = {uri: "https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/e6/b5/b3/e6b5b35f-8c1c-5f0f-f370-699d1728408c/source/512x512bb.jpg"}
const [number, onChangeNumber] = React.useState(null);

//longtitude is east to west
//"+newLat+"

const [long, setLong] = useState(0);
const [lat, setLat] = useState(0);
const [newLong, setNewLong] = useState(-74.5747);
const [newLat, setNewLat] = useState(40.8478);

const [current, setCurrent] = useState([]);
const [currentTemp, setCurrentTemp] = useState("");
const [lowTemp, setLowTemp] = useState([""]);
const [highTemp, setHighTemp] = useState([""]);
const [feelsLikeTemp, setfeelsLikeTemp] = useState([]);
const [windSpeed, setWindSpeed] = useState([]);
const [UVIndex, setUVIndex] = useState([]);
const [humidity, setHumidity] = useState([]);
const [city, setCity] = useState([]);
const [state, setState] = useState([]);
const [country, setCountry] = useState([]);
const [icon, setIcon] = useState([]);
const [desc, setDesc] = useState([]);
const [dailyWeather, setDaily] = useState([{temp:{max:"0"},temp:{max:"0"}}]);
const [futureDaily, setFutureDaily] = useState();
const [currentWeather, setCurrentWeather] = useState([""]);

const findLocation = async () => {
  try {
    const getLocation = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+newLat+"&lon="+newLong+"&zoom=10&format=jsonv2"
    const response2 = await fetch(getLocation);
    const result2 = await response2.json();
    setCity(result2.address.city);
    setState(result2.address.state);
    setCountry(result2.address.country);
  } catch {
    console.log("jit")
  }
}

const getWeatherInfo = async () => {
  try {
  const weatherInfo = "https://api.openweathermap.org/data/2.5/onecall?lat="+newLat+"&lon="+newLong+"&appid=f8abc9adb5b9bb1a9728fa0ab4262efa&units=imperial"
  const response = await fetch(weatherInfo);
  const result = await response.json();
  setCurrentTemp(result.current.temp);
  setCurrent(result.current);
  setfeelsLikeTemp(result.current.feels_like);
  setCurrentWeather(result.current.weather);
  setWindSpeed(result.current.wind_speed);
  setHumidity(result.current.humidity);
  setUVIndex(result.current.uvi);
  setHighTemp(result.daily[0].temp.max);
  setLowTemp(result.daily[0].temp.min);
  setIcon(result.current.weather[0].icon);
  setDesc(result.current.weather[0].description);
  setDaily(result.daily);
  setFutureDaily(result.daily.slice(1));
  updateBg(result.current.weather);
  } catch {
    console.log("buggin")
  }
} 

useEffect(() => {
  findLocation()
  getWeatherInfo()
}, [newLat, newLong]);

return (
  <ImageBackground source={image} resizeMode="cover" style={styles.background}>
    <SafeAreaView style={styles.container}>
      <StatusBar style="autcmdo" />
        <SafeAreaView style={[styles.rowFormat, {marginTop: 30}]}>
          <Text style={[styles.locationText, styles.location]}>{city}, {state}, {country}</Text>
        </SafeAreaView>
        <View style={[styles.rowFormat, {paddingHorizontal: 30}]}>
            <View style={[styles.columnFormatLongLat, {marginHorizontal: 20}]}>
              <TextInput
                style={styles.textBox}
                onChangeText={onChangeNumber}
                onChangeText={(value) => {setLat(value);}}
                value={number}
                returnKeyType="done"
                placeholder="Enter latitude"
                placeholderTextColor="white"
              />
            </View>
            <TouchableOpacity
              onPress = {() => {
                if (long >= -180 && long <= 180 && long != null){
                  if (lat >= -90 && lat <= 90 && lat != null){
                    setNewLong(long)
                    setNewLat(lat)
                  }
                }
              }}>
                <Text style={styles.enterText}>Enter</Text>
            </TouchableOpacity>
            <View style={[styles.columnFormatLongLat, {marginHorizontal: 20}]}>
              <TextInput
                style={styles.textBox}
                onChangeText={onChangeNumber}
                onChangeText={(value) => {setLong(value);}}
                value={number}
                returnKeyType="done"
                placeholder="Enter longitude"
                placeholderTextColor="white"
              />
            </View>
            </View>
        <View style={[styles.weatherIcon, styles.rowFormat]}>
          <Image
            source={{uri: "http://openweathermap.org/img/wn/" + icon + "@2x.png"}}
            style={styles.weatherIconDesign}
            />  
        </View>
        <View>
          <Text style={styles.descriptionText}>{desc}</Text>
        </View>
        <View style={styles.rowFormat}>
            <Text style={[styles.tempText, {marginHorizontal: 50}]}>{Math.round(currentTemp)}°</Text>
            <Text style={styles.tempText}>{Math.round(highTemp)}°/{Math.round(lowTemp)}°</Text>
        </View>  
          
            <View style={styles.rowFormat}>
              <View style={[styles.columnFormat, {marginHorizontal: 20}]}>
                <Text style={styles.infoText}>Feels like: {Math.round(feelsLikeTemp)}°</Text>
              </View>
              <View style={[styles.columnFormat, {marginHorizontal: 20}]}>
                <Text style={styles.infoText}>Wind Speed: {Math.round(windSpeed)} mph</Text>
              </View>
            </View>
            <View style={styles.rowFormat}>
              <View style={[styles.columnFormat, {marginHorizontal: 20}, {marginBottom: 30}]}>
                <Text style={styles.infoText}>UV Index: {Math.round(UVIndex)} of 10</Text>  
              </View>
              <View style={[styles.columnFormat, {marginHorizontal: 20}, {marginBottom: 30}]}>
                <Text style={styles.infoText}>Humidity: {"\n"} {Math.round(humidity)}%</Text>  
              </View>
            </View>
            <View style={styles.rowFormat}>
            <FlatList
              horizontal={true}
              data={futureDaily}
              renderItem={({ item }) => (
                <View style={styles.dailyViewColumn}>
                  <Text style = {styles.infoText}>{moment.unix(item.dt).format('dddd')}</Text>
                  <Text style = {styles.infoText}>{moment.unix(item.dt).format('L')}</Text>
                  <Image style={styles.weeklyWeatherIconDesign}
                  source={{uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}}/>
                  <Text style={styles.infoText}> High: {Math.round(item.temp.max)}°F</Text>
                  <Text style = {styles.infoText}> Low: {Math.round(item.temp.min)}°F</Text>
                  <Text style = {styles.infoText}> Wind: {Math.round(item.wind_speed)} mph</Text>
                  <Text style = {styles.infoText}> Humidity: {Math.round(item.humidity)}%</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
    </SafeAreaView>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  rowFormat: {
    flexDirection: "row",
    //backgroundColor: 'rgba(53, 65, 232, 0.5)',
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    
  },
  columnFormat: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(53, 65, 232, 0.25)',
    borderColor: "black",
    borderWidth: 1.5,
    height: 60,
    width: 60,
  },
  dailyViewColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(53, 65, 232, 0.25)',
    borderColor: "black",
    borderWidth: 1.5,
    height: 180,
    width: 90,
    borderRadius: 10,
    margin: 10,
  },
  columnFormatLongLat: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: 'rgba(53, 65, 232, 0.25)',
    
  },
  titleText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
  },
  bodyText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
  },
  enterText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
    backgroundColor: 'rgba(53, 65, 232, 0.5)',
    borderRadius: 10
  },
  tempText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 60,
  },
  infoText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    height: 60,
    width: 100,
    margin: 12,
    padding: 10,
    shadowColor: 'grey',
    color: 'white',
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1.5,
  },
  weekWeather: {
    
  },
  weatherIconDesign: {
    width: 80,
    height: 80,
  },
  weeklyWeatherIconDesign: {
    width: 40,
    height: 40,
  },
  weatherIcon: {
    alignItems: "center",
  },
  location: {
    flex: 1,
  },
  locationText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
  },
  descriptionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
