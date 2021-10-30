import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { InputBase, IconButton, Paper, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import { fetchOpenWeatherData } from "../utils/api";
import {
	setStoredCities,
	getStoredCities,
	setStoredOptions,
	getStoredOptions,
	LocalStorageOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([]);
	const [cityInput, setCityInput] = useState<string>("");
	const [options, setOptions] = useState<LocalStorageOptions | null>(null);

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities));
		getStoredOptions().then((options) => setOptions(options));
	}, []);

	const handleCityClick = () => {
		if (cityInput === "") {
			return;
		}
		const updatedCities = [...cities, cityInput];
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities);
			setCityInput("");
		});
	};
	const handleCityDelete = (index: number) => {
		cities.splice(index, 1);
		const updatedCities = [...cities];
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities);
		});
	};
	const handleTempScaleButtonClick = () => {
		const updateOptions: LocalStorageOptions = {
			...options,
			tempScale: options.tempScale === "metric" ? "imperial" : "metric",
		};
		setStoredOptions(updateOptions).then(() => {
			setOptions(updateOptions);
		});
	};
	if (!options) {
		return null;
	}
	return (
		<Box mx="8px" my="16px">
			<Grid container justify="space-evenly">
				<Grid item>
					<Paper>
						<Box px="15px">
							<InputBase
								placeholder="Add city name"
								value={cityInput}
								onChange={(e) => setCityInput(e.target.value)}
							/>
							<IconButton>
								<AddIcon onClick={handleCityClick} />
							</IconButton>
						</Box>
					</Paper>
				</Grid>
				<Grid>
					<Box>
						<Paper>
							<IconButton onClick={handleTempScaleButtonClick}>
								{options.tempScale === "metric" ? "\u2103" : "\u2109"}
							</IconButton>
						</Paper>
					</Box>
				</Grid>
			</Grid>
			{options.homeCity != "" && (
				<WeatherCard city={options.homeCity} tempScale={options.tempScale} />
			)}
			{cities.map((city, index) => {
				return (
					<WeatherCard
						city={city}
						key={index}
						onDelete={() => handleCityDelete(index)}
						tempScale={options.tempScale}
					/>
				);
			})}
			<Box height="12px" />
		</Box>
	);
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
