const Weather = ({weather}) => {
    if (!weather) {
        return <div>Loading ...</div>
    } else {
        const iconId = weather.weather[0].icon
        return (
        <div>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`}></img>
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
        )
    }
}

export default Weather