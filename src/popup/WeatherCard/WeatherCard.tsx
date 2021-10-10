import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { fetchOpenWeatherData, OpenWeatherData } from "../../utils/api";

const WeatherCardContainer: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<Box mx={"4px"} my={"16px"}>
			<Card>{children}</Card>
		</Box>
	);
};

type WeatherCardState = "loading" | "ready" | "error";

const WeatherCard: React.FC<{
	city: string;
}> = ({ city }) => {
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
			<WeatherCardContainer>
				<Typography variant="body2">
					{cardState == "loading" ? "Loading..." : "Error: city not found"}
				</Typography>
			</WeatherCardContainer>
		);
	}

	return (
		<WeatherCardContainer>
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
