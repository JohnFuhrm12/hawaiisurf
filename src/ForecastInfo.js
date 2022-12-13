import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import pipelineIMG from './static/pipeF.jpg';
import jawsIMG from './static/jawsF.jpg';
import waikikiIMG from './static/waikikiF.jpg';
import waimeaIMG from './static/waimeaF.jpg';
import haleiwaIMG from './static/haleiwaF.jpg';
import honoluaIMG from './static/honoluaF.jpg';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function ForecastInfo( {...props} ) {
  // Open Ocean Swell Min, Avg, and Max wave heights in feet and meters
  const [swellWaveHeightsMinMeters, setSwellWaveHeightsMinMeters] = useState(0);
  const [swellWaveHeightsAvgMeters, setSwellWaveHeightsAvgMeters] = useState(0);
  const [swellWaveHeightsMaxMeters, setSwellWaveHeightsMaxMeters] = useState(0);

  const [swellWaveHeightsMinFeet, setSwellWaveHeightsMinFeet] = useState(0);
  const [swellWaveHeightsAvgFeet, setSwellWaveHeightsAvgFeet] = useState(0);
  const [swellWaveHeightsMaxFeet, setSwellWaveHeightsMaxFeet] = useState(0);

  // Near Shore Wind Swell Min, Avg, and Max wave heights in feet and meters
  const [windWaveHeightsMinMeters, setWindWaveHeightsMinMeters] = useState(0);
  const [windWaveHeightsAvgMeters, setWindWaveHeightsAvgMeters] = useState(0);
  const [windWaveHeightsMaxMeters, setWindWaveHeightsMaxMeters] = useState(0);

  const [windWaveHeightsMinFeet, setWindWaveHeightsMinFeet] = useState(0);
  const [windWaveHeightsAvgFeet, setWindWaveHeightsAvgFeet] = useState(0);
  const [windWaveHeightsMaxFeet, setWindWaveHeightsMaxFeet] = useState(0);

  // Rounded wave height in feet for primary prediction
  const [waveHeightsMinFeetRounded, setWaveHeightsMinFeetRounded] = useState(0);
  const [waveHeightsMaxFeetRounded, setWaveHeightsMaxFeetRounded] = useState(0);

  // Open Ocean Swell Cardinal Direction and Degrees + Wave Period
  const [waveDirectionDegrees, setWaveDirectionDegrees] = useState(0);
  const [waveDirectionCompass, setWaveDirectionCompass] = useState("N");
  const [wavePeriodSeconds, setWavePeriodSeconds] = useState(0);

  // Near Shore Wind Swell Cardinal Direction and Degrees + Wave Period
  const [windWaveDirectionDegrees, setWindWaveDirectionDegrees] = useState(0);
  const [windWaveDirectionCompass, setWindWaveDirectionCompass] = useState("N");
  const [windWavePeriodSeconds, setWindWavePeriodSeconds] = useState(0);

  // Air Temp in C and F
  const [airTempCelsius, setAirTempCelsius] = useState(0);
  const [airTempFahrenheit, setAirTempFahrenheit] = useState(0);

  // Wind Speed in MPH and KPH and Wind Cardinal Direction and degrees
  const [windSpeedMPH, setWindSpeedMPH] = useState(0);
  const [windSpeedKPH, setWindSpeedKPH] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const [windDirectionCompass, setWindDirectionCompass] = useState("N");

  // Current weather conditions description
  const [currentWeatherConditions, setCurrentWeatherConditions] = useState("Sunny");

  // Wave Quality
  const [waveQuality, setWaveQuality] = useState("Fair");
  const [bubbleColor, setBubbleColor] = useState("lime");

  // Raw Forecast Data
  const [forecastDates, setForecastDates] = useState([]);
  const [waveheights, setWaveHeights] = useState([]);
  const [windWaveHeights, setWindWaveHeights] = useState([]);

  const [windWaveChart, setWindWaveChart] = useState(false);

  // 8-Day Forecast Data - Wave Height For Chart
  const [chartdataloaded, setChartdataloaded] = useState(false);
  const [forecastData, setForecastData] = useState({ 
    labels: forecastDates,
    datasets: [{
      label: "Weekly Forecast",
      data: waveheights,
      backgroundColor: ["rgba(19, 79, 171)"]
    }]
  });

  // Current Date
  var day = 0;
  var month = 0;
  var year = 0;

  // Forecast Information for Each Site
  const pipelineDesc = "The Banzai Pipeline is a reef break located in Hawaii, off Ehukai Beach Park in Pupukea on O'ahu's North Shore. Pipeline is known for huge waves that break in shallow water just above a sharp and cavernous reef, forming large, hollow, thick curls of water that surfers can tube ride. There are three reefs at Pipeline in progressively deeper water that activate according to the increasing size of swell.";
  const jawsDesc = "Pe’ahi is Maui’s biggest surfing break, and the yearly Big Wave Awards have listed Jaws as the winning break more than any other place. When Jaws is going off, the top names in surfing flock here, and mere mortals follow to watch in awe. “Jaws” is certainly the most well known name for the surf break. The name “Pe’ahi” has also become more popular with surfers as of late.";
  const waikikiDesc = "Waikiki Beach consists of numerous spots that offer rights and lefts, as well as world-renowned crowds. It is one of the birthplaces of recreational surfing and a pillar in the quintessential Hawaiian surfing experience. Surf Waikiki and you'll share waves with people from all over the world, many just learning how to surf.";
  const waimeaDesc = "Waimea Bay is a legendary surf spot located on the North Shore of Oahu. A hectic and dangerous place during winter, and a quiet portrait of the Hawaiian ocean life during summer. Welcome to a surf break known for its mammoth waves and death-defying rides.";
  const haleiwaDesc = "Haleiwa is located at the western end of the Seven-Mile Miracle, in the North Shore of Oahu, Hawaii. Its tricky reef usually works best during the winter season, with mid-period Northwest swells coming far away from the Pacific Ocean. Haleiwa is known for the hollow rights, rippable sections, and powerful closeouts.";
  const honoluaDesc = "Honolua Bay is not only the best wave in Maui, it is one of the best in the world.Honolua Bay has just that magical angle, producing a perfect righthander that can line up flawlessly in a series of barrel and turn sections for the better part of a quarter-mile.";

  const [forecastDescription, setForecastDescription] = useState(pipelineDesc);
  const [forecastIMG, setForecastIMG] = useState(pipelineIMG);

  useEffect(() => {
    var today = new Date();
    day = String(today.getDate()).padStart(2, '0');
    month = String(today.getMonth() + 1).padStart(2, '0'); 
    year = today.getFullYear();
    getData();
    setChartdataloaded(true);
  }, [])

  useEffect(() => {
    loadWindWaveData();
  }, [windWaveChart])

  useEffect(() => {
    WaveHeight();
    WaveQuality();
    if (props.forecastLocation === "Pipeline") {
      setForecastDescription(pipelineDesc);
      setForecastIMG(pipelineIMG);
    }
    if (props.forecastLocation === "Jaws") {
      setForecastDescription(jawsDesc);
      setForecastIMG(jawsIMG);
    }
    if (props.forecastLocation === "Waikiki") {
      setForecastDescription(waikikiDesc);
      setForecastIMG(waikikiIMG);
    }
    if (props.forecastLocation === "Waimea") {
      setForecastDescription(waimeaDesc);
      setForecastIMG(waimeaIMG);
    }
    if (props.forecastLocation === "Haleiwa") {
      setForecastDescription(haleiwaDesc);
      setForecastIMG(haleiwaIMG);
    }
    if (props.forecastLocation === "Honolua") {
      setForecastDescription(honoluaDesc);
      setForecastIMG(honoluaIMG);
    }
  })

  window.addEventListener('scroll', loadChart);

  function loadChart() {
      var chart = document.querySelectorAll('.forecastChart')

      for (var i = 0; i < chart.length; i++) {
          var windowheight = window.innerHeight;
          var revealtop = chart[i].getBoundingClientRect().top;
          var revealpoint = 10;

          if (revealtop < windowheight - revealpoint && windWaveChart === false) {
            loadData();
          }
          if (revealtop < windowheight - revealpoint && windWaveChart) {
            loadWindWaveData();
          }
      }
  }

  function loadData() {
    setForecastData({ 
      labels: forecastDates,
      datasets: [{
        label: "Weekly Forecast",
        data: waveheights,
        backgroundColor: ["rgba(19, 79, 171)"]
      }]
    });
  }

  function loadWindWaveData() {
    setForecastData({ 
      labels: forecastDates,
      datasets: [{
        label: "Weekly Forecast",
        data: windWaveHeights,
        backgroundColor: ["rgba(19, 79, 171)"]
      }]
    });
  }

  // Call Open-Meteo API
  const getData = () => {
    // Fetch Weekly Swell Information (Open-Meteo API)
    axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${props.forecastLatitude}&longitude=${props.forecastLongitude}&hourly=wave_height,wind_wave_height`).then((res) => {
      const dates = [];
      const waves = [];
      const windWaves = [];

      const resDates = res.data.hourly.time;
      const resWaves = res.data.hourly.wave_height;
      const resWindWaves = res.data.hourly.wind_wave_height;

      dates.push(resDates[0]);
      dates.push(resDates[24]);
      dates.push(resDates[48]);
      dates.push(resDates[72]);
      dates.push(resDates[96]);
      dates.push(resDates[120]);
      dates.push(resDates[144]);
      dates.push(resDates[167]);

      waves.push((resWaves[0] * 3.28084).toFixed(2));
      waves.push((resWaves[24] * 3.28084).toFixed(2));
      waves.push((resWaves[48] * 3.28084).toFixed(2));
      waves.push((resWaves[72] * 3.28084).toFixed(2));
      waves.push((resWaves[96] * 3.28084).toFixed(2));
      waves.push((resWaves[120] * 3.28084).toFixed(2));
      waves.push((resWaves[144] * 3.28084).toFixed(2));
      waves.push((resWaves[167] * 3.28084).toFixed(2));

      windWaves.push((resWindWaves[0] * 3.28084).toFixed(2));
      windWaves.push((resWaves[24] * 3.28084).toFixed(2));
      windWaves.push((resWaves[48] * 3.28084).toFixed(2));
      windWaves.push((resWaves[72] * 3.28084).toFixed(2));
      windWaves.push((resWaves[96] * 3.28084).toFixed(2));
      windWaves.push((resWaves[120] * 3.28084).toFixed(2));
      windWaves.push((resWaves[144] * 3.28084).toFixed(2));
      windWaves.push((resWaves[167] * 3.28084).toFixed(2));

      setForecastDates(dates);
      setWaveHeights(waves);
      setWindWaveHeights(windWaves);

      setForecastData({ 
        labels: forecastDates,
        datasets: [{
          label: "Weekly Forecast",
          data: waveheights,
          backgroundColor: ["rgba(19, 79, 171)"]
        }]
      });
    });
    // Fetch Today's Swell Information (Open-Meteo API)
    axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${props.forecastLatitude}&longitude=${props.forecastLongitude}&hourly=wave_direction,wind_wave_height,wind_wave_direction,wind_wave_period,wave_period,swell_wave_height&start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}`).then((res) => { // Pipeline TODAY ONLY
        const swellWaveHeights = res.data.hourly.swell_wave_height;
        const windWaveHeights = res.data.hourly.wind_wave_height;
        const waveDirection = res.data.hourly.wave_direction[0];
        const wavePeriod = res.data.hourly.wave_period[0];

        const windWaveDirection = res.data.hourly.wind_wave_direction[0];
        const windWavePeriod = res.data.hourly.wind_wave_period[0];

        var swellTotal = 0;
        for(var i = 0; i < swellWaveHeights.length; i++) {
          swellTotal += swellWaveHeights[i];
        }
        var swellAvg = swellTotal / swellWaveHeights.length;

        var windSwellTotal = 0;
        for(var i = 0; i < swellWaveHeights.length; i++) {
          windSwellTotal += windWaveHeights[i];
        }
        var windSwellAvg = windSwellTotal / windWaveHeights.length;

        setWaveDirectionDegrees(waveDirection);
        setWavePeriodSeconds(wavePeriod);

        setWindWaveDirectionDegrees(windWaveDirection);
        setWindWavePeriodSeconds(windWavePeriod);

        setSwellWaveHeightsMinMeters(Math.min(...swellWaveHeights).toFixed(2));
        setSwellWaveHeightsAvgMeters(swellAvg.toFixed(2));
        setSwellWaveHeightsMaxMeters(Math.max(...swellWaveHeights).toFixed(2));

        setWindWaveHeightsMinMeters(Math.min(...windWaveHeights).toFixed(2));
        setWindWaveHeightsAvgMeters(windSwellAvg.toFixed(2));
        setWindWaveHeightsMaxMeters(Math.max(...windWaveHeights).toFixed(2));

        setSwellWaveHeightsMinFeet((Math.min(...swellWaveHeights) * 3.28084).toFixed(2));
        setSwellWaveHeightsAvgFeet(((swellAvg) * 3.28084).toFixed(2));
        setSwellWaveHeightsMaxFeet((Math.max(...swellWaveHeights) * 3.28084).toFixed(2));

        setWindWaveHeightsMinFeet((Math.min(...windWaveHeights) * 3.28084).toFixed(2));
        setWindWaveHeightsAvgFeet(((windSwellAvg) * 3.28084).toFixed(2));
        setWindWaveHeightsMaxFeet((Math.max(...windWaveHeights) * 3.28084).toFixed(2));

        if (waveDirection === 0) {
          setWaveDirectionCompass("N");
        }
        if (waveDirection > 0 && waveDirection < 45) {
          setWaveDirectionCompass("NNE");
        }
        if (waveDirection === 45) {
          setWaveDirectionCompass("NE");
        }
        if (waveDirection > 45 && waveDirection < 90) {
          setWaveDirectionCompass("ENE");
        }
        if (waveDirection === 90) {
          setWaveDirectionCompass("E");
        }
        if (waveDirection > 90 && waveDirection < 135) {
          setWaveDirectionCompass("ESE");
        }
        if (waveDirection === 135) {
          setWaveDirectionCompass("SE");
        }
        if (waveDirection > 135 && waveDirection < 180) {
          setWaveDirectionCompass("SSE");
        }
        if (waveDirection === 180) {
          setWaveDirectionCompass("S");
        }
        if (waveDirection > 180 && waveDirection < 225) {
          setWaveDirectionCompass("SSW");
        }
        if (waveDirection === 225) {
          setWaveDirectionCompass("SW");
        }
        if (waveDirection > 225 && waveDirection < 270) {
          setWaveDirectionCompass("WSW");
        }
        if (waveDirection === 270) {
          setWaveDirectionCompass("W");
        }
        if (waveDirection > 270 && waveDirection < 315) {
          setWaveDirectionCompass("WNW");
        }
        if (waveDirection === 315) {
          setWaveDirectionCompass("NW");
        }
        if (waveDirection > 315) {
          setWaveDirectionCompass("NNW");
        }

        if (windWaveDirection === 0) {
          setWindWaveDirectionCompass("N");
        }
        if (windWaveDirection > 0 && windWaveDirection < 45) {
          setWindWaveDirectionCompass("NNE");
        }
        if (windWaveDirection === 45) {
          setWindWaveDirectionCompass("NE");
        }
        if (windWaveDirection > 45 && windWaveDirection < 90) {
          setWindWaveDirectionCompass("ENE");
        }
        if (windWaveDirection === 90) {
          setWindWaveDirectionCompass("E");
        }
        if (windWaveDirection > 90 && windWaveDirection < 135) {
          setWindWaveDirectionCompass("ESE");
        }
        if (windWaveDirection === 135) {
          setWindWaveDirectionCompass("SE");
        }
        if (windWaveDirection > 135 && windWaveDirection < 180) {
          setWindWaveDirectionCompass("SSE");
        }
        if (windWaveDirection === 180) {
          setWindWaveDirectionCompass("S");
        }
        if (windWaveDirection > 180 && windWaveDirection < 225) {
          setWindWaveDirectionCompass("SSW");
        }
        if (windWaveDirection === 225) {
          setWindWaveDirectionCompass("SW");
        }
        if (windWaveDirection > 225 && windWaveDirection < 270) {
          setWindWaveDirectionCompass("WSW");
        }
        if (windWaveDirection === 270) {
          setWindWaveDirectionCompass("W");
        }
        if (windWaveDirection > 270 && windWaveDirection < 315) {
          setWindWaveDirectionCompass("WNW");
        }
        if (windWaveDirection === 315) {
          setWindWaveDirectionCompass("NW");
        }
        if (windWaveDirection > 315) {
          setWindWaveDirectionCompass("NNW");
        }
    });
    // Fetch Today's Weather Information (OpenWeather API)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.forecastLatitude}&lon=${props.forecastLongitude}&appid=73a95bf4ecd5b065a38ec246784e64ee`).then((res) => {
      const airTempC = ((res.data.main.temp) - (273.15)).toFixed(2);
      const airTempF = ((airTempC * 1.8) + (32)).toFixed(2);
      const windSpeedK = (res.data.wind.speed * 3.6).toFixed(2);
      const windSpeedM = (windSpeedK * 0.62137119223733).toFixed(2);
      const windDir = res.data.wind.deg;

      const conditions = res.data.weather[0].description;
      const words = conditions.split(" ");

      const conditionsUpperCase = words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
      }).join(" ");

      setAirTempCelsius(airTempC);
      setAirTempFahrenheit(airTempF);

      setWindSpeedKPH(windSpeedK);
      setWindSpeedMPH(windSpeedM);
      setWindDirection(windDir);

      setCurrentWeatherConditions(conditionsUpperCase);

      if (windDir === 0) {
        setWindDirectionCompass("N")
      }
      if (windDir > 0 && windDir < 45) {
        setWindDirectionCompass("NNE")
      }
      if (windDir === 45) {
        setWindDirectionCompass("NE")
      }
      if (windDir > 45 && windDir < 90) {
        setWindDirectionCompass("ENE")
      }
      if (windDir === 90) {
        setWindDirectionCompass("E")
      }
      if (windDir > 90 && windDir < 135) {
        setWindDirectionCompass("ESE")
      }
      if (windDir === 135) {
        setWindDirectionCompass("SE")
      }
      if (windDir > 135 && windDir < 180) {
        setWindDirectionCompass("SSE")
      }
      if (windDir === 180) {
        setWindDirectionCompass("S")
      }
      if (windDir > 180 && windDir < 225) {
        setWindDirectionCompass("SSW")
      }
      if (windDir === 225) {
        setWindDirectionCompass("SW")
      }
      if (windDir > 225 && windDir < 270) {
        setWindDirectionCompass("WSW")
      }
      if (windDir === 270) {
        setWindDirectionCompass("W")
      }
      if (windDir > 270 && windDir < 315) {
        setWindDirectionCompass("WNW")
      }
      if (windDir === 315) {
        setWindDirectionCompass("NW")
      }
      if (windDir > 315) {
        setWindDirectionCompass("NNW")
      }
    });
  };

  function WaveHeight() {
    // Set Predicted Wave Height to wind, or swell depending on if swell direction is correct
    if (waveDirectionDegrees > 260 && waveDirectionDegrees < 360 && props.forecastLocation === "Pipeline") {
      setWaveHeightsMinFeetRounded(Math.round(swellWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(swellWaveHeightsMaxFeet));
    }
    if (waveDirectionDegrees < 260 && waveDirectionDegrees > 0 && props.forecastLocation === "Pipeline") {
      setWaveHeightsMinFeetRounded(Math.round(windWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(windWaveHeightsMaxFeet));
      setWindWaveChart(true);
    }
    if (waveDirectionDegrees > 270 || waveDirectionDegrees < 90 && props.forecastLocation === "Waikiki") {
      setWaveHeightsMinFeetRounded(Math.round(windWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(windWaveHeightsMaxFeet));
      setWindWaveChart(true);
    }
    if (waveDirectionDegrees < 315 && waveDirectionDegrees > 45 && props.forecastLocation === "Honolua") {
      setWaveHeightsMinFeetRounded(Math.round(windWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(windWaveHeightsMaxFeet));
      setWindWaveChart(true);
    }
    else if (windWaveChart === false) {
      setWaveHeightsMinFeetRounded(Math.round(swellWaveHeightsMinFeet));
      setWaveHeightsMaxFeetRounded(Math.round(swellWaveHeightsMaxFeet));
    }
  }

  function WaveQuality() {
    const waveHeightFeet = waveHeightsMaxFeetRounded;
    if (waveHeightFeet < 1) {
       setWaveQuality("Flat");
    }
    // If 15mph+ winds and onshore - than
    if (windSpeedMPH > 15 && (windDirection > 45 || windDirection < 225)) {
      setWaveQuality("Poor");
    }
    // If less than 20mph winds and waveheight over 2ft and offshore - than
    if (windSpeedMPH < 20 && waveHeightFeet > 2 && (windDirection > 0 && windDirection < 180)) {
      setWaveQuality("Fair");
    }
     // If less than 5mph winds and waveheight over 2ft and onshore - than
     if (windSpeedMPH < 5 && waveHeightFeet > 2 && (windDirection > 180 && windDirection < 360)) {
      setWaveQuality("Fair");
    }
     // If less than 10mph winds and waveheight over 4ft and offshore - than
     if (windSpeedMPH < 10 && waveHeightFeet > 4 && (windDirection > 0 && windDirection < 180)) {
      setWaveQuality("Great");
    }
    // If less than 10mph winds and waveheight over 6ft and offshore - than
    if (windSpeedMPH < 10 && waveHeightFeet > 6 && (windDirection > 180 && windDirection < 360)) {
      setWaveQuality("Firing");
    }

    if (waveQuality === "Flat") {
      setBubbleColor("grey");
    }
    if (waveQuality === "Poor") {
      setBubbleColor("blue");
    }
    if (waveQuality === "Fair") {
      setBubbleColor("lime");
    }
    if (waveQuality === "Great") {
      setBubbleColor("orange");
    }
    if (waveQuality === "Firing") {
      setBubbleColor("red");
    }
  }

  function showHome() {
    props.setHome(true);
    props.setForecastInfo(false);
  }

  function showForecasts() {
    props.setForecasts(true);
    props.setForecastInfo(false);
  }

  function showLogin() {
    props.setForecastInfo(false);
    props.setLogin(true);
  }

  return (
    <>
    <div className='page'>
      <div className='navbar'>
        <h1 onClick={showHome} className='navHome'>Hawai'i Surf</h1>
        <div className='navbarRight'>
          <h1 onClick={showForecasts} className='navbarItem'>Forecasts</h1>
          <h1 className='navbarItem'>Favorites</h1>
          <h1 onClick={showLogin} className='navbarItem'>Login</h1>
        </div>
      </div>
      <div className='forecastInfoVerticalWrapper'>
        <div className='forecastInfoWrapper'>
            <div className='forecastTitleBlock'>
                <h1 className='forecastInfoTitle'>CURRENT CONDITIONS: {props.forecastLocation.toUpperCase()}</h1>
                <img className='forecastInfoIMG' src={forecastIMG} alt='Pipeline'/>
            </div>
            <div className='mainForecastBlock'>
                <h2 className='heightTitle'>Surf Height</h2>
                <div className='surfHeightBubble' style={{"backgroundColor": bubbleColor}}>
                    <h2 className='surfHeight'>{waveHeightsMinFeetRounded}-{waveHeightsMaxFeetRounded} ft. - {waveQuality}</h2>
                </div>
                <div className='forecastTextWrapper'>
                <p className='forecastText'>{forecastDescription}</p>
                </div>
            </div>
        </div>
        <div className='forecastInfoSecondColumnWrapper'>
            <div className='swellWindBlock'>
                <h2 className='swellWindTitle'>SWELL AND WIND</h2>
                <h2 className='swellTitle'>Primary Swell</h2>
                <h2 className='swellWindDetails'>Wave Height (FT.): {swellWaveHeightsAvgFeet} ft. at {wavePeriodSeconds} seconds {waveDirectionCompass} @ {waveDirectionDegrees}°</h2>
                <h2 className='swellWindDetails'>Wave Height (M): {swellWaveHeightsAvgMeters} m. at {wavePeriodSeconds}  seconds {waveDirectionCompass} @ {waveDirectionDegrees}°</h2>
                <h2 className='swellTitle'>Wind Swell</h2>
                <h2 className='swellWindDetails'>Wave Height (FT.): {windWaveHeightsAvgFeet} ft. at {windWavePeriodSeconds} seconds {windWaveDirectionCompass} @ {windWaveDirectionDegrees}°</h2>
                <h2 className='swellWindDetails'>Wave Height (M): {windWaveHeightsAvgMeters} m. at {windWavePeriodSeconds}  seconds {windWaveDirectionCompass} @ {windWaveDirectionDegrees}°</h2>
                <h2 className='windTitle'>Wind Direction</h2>
                <h2 className='swellWindDetails'>Wind Speed (MPH): {windSpeedMPH} mph. {windDirectionCompass} @ {windDirection}°</h2>
                <h2 className='swellWindDetails'>Wind Speed (KPH): {windSpeedKPH} kph. {windDirectionCompass} @ {windDirection}°</h2>
            </div>
            <div className='weatherConditionsBlock'>
              <h2 className='conditionsTitle'>WEATHER CONDITIONS</h2>
              <h2 className='airTemp'>Current Conditions</h2>
              <h2 className='ConditionsDetails'>{currentWeatherConditions}</h2>
              <h2 className='airTemp'>Air Temperature</h2>
              <h2 className='ConditionsDetails'>Fahrenheit: {airTempFahrenheit}°F</h2>
              <h2 className='ConditionsDetails'>Celsius: {airTempCelsius}°C</h2>
            </div>
        </div>
      </div>
      <div className='forecastChart'>
        {chartdataloaded ? <Bar data={forecastData}/> : <></>}
      </div>
      <div className='footer'>
        <h2 className='footerItem'>Hawai'i Surf</h2>
      </div>
    </div>
    </>
  );
}

export default ForecastInfo;