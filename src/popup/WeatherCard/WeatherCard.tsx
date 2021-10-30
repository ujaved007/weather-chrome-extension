import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@material-ui/core";
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api";

const WeatherCardContainer: React.FC<{
	children: React.ReactNode;
	onDelete?: () => void;
}> = ({ children, onDelete }) => {
	return (
		<Box mx={"4px"} my={"16px"}>
			<Card>
				{children}
				<CardActions>
					{onDelete && (
						<Button onClick={onDelete} color="secondary">
							Delete
						</Button>
					)}
				</CardActions>
			</Card>
		</Box>
	);
};

type WeatherCardState = "loading" | "ready" | "error";

const WeatherCard: React.FC<{
	city: string;
	onDelete?: () => void;
}> = ({ city, onDelete }) => {
	const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
	const [cardState, setCardState] = useState<WeatherCardState>("loading");

	useEffect(() => {
		fetchOpenWeatherData(city)
			.then((data) => {
				setWeatherData(data);
				setCardState("ready");
			})
			.catch((err) => {
				console.log(err);
				setCardState("error");
			});
	}, [city]);

	if (cardState == "loading" || cardState == "error") {
		return (
			<WeatherCardContainer onDelete={onDelete}>
				<Typography variant="body2">
					{cardState == "loading" ? "Loading..." : "Error: city not found"}
				</Typography>
			</WeatherCardContainer>
		);
	}

	return (
		<WeatherCardContainer onDelete={onDelete}>
			<CardContent>
				<Typography variant="h5">{weatherData.name} </Typography>
				<Typography variant="body1">
					{Math.round(weatherData.main.temp)}{" "}
				</Typography>
				<Typography variant="body1">
					Feels Like: {Math.round(weatherData.main.feels_like)}{" "}
				</Typography>
			</CardContent>
		</WeatherCardContainer>
	);
};

export default WeatherCard;
