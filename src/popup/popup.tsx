import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { InputBase, IconButton, Paper, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import { fetchOpenWeatherData } from "../utils/api";
import { setStoredCities, getStoredCities } from "../utils/storage";

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>([]);
	const [cityInput, setCityInput] = useState<string>("");

	useEffect(() => {
		getStoredCities().then((cities) => setCities(cities));
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
	return (
		<Box>
			<Grid container>
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
			</Grid>
			{cities.map((city, index) => {
				return (
					<WeatherCard
						city={city}
						key={index}
						onDelete={() => handleCityDelete(index)}
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
