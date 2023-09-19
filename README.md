# WeatherAppRashid
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
