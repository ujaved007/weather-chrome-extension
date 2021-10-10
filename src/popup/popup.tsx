import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { InputBase, IconButton, Paper, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import { fetchOpenWeatherData } from "../utils/api";

const App: React.FC<{}> = () => {
	const [cities, setCities] = useState<string[]>(["Perth", "Sydney", "Error"]);
	return (
		<Box>
			<Grid container>
				<Grid item>
					<Paper>
						<Box px="15px">
							<InputBase placeholder="Add city name" />
							<IconButton>
								<AddIcon />
							</IconButton>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			{cities.map((city, index) => {
				return <WeatherCard city={city} key={index} />;
			})}
		</Box>
	);
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
