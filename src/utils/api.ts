const OPEN_WEATHER_API_KEY = "15f39a24d3f7ee824a882fe05e0a4aa6";

export interface OpenWeatherData {
	name: string;
	main: {
		feels_like: number;
		humidity: number;
		pressure: number;
		temp: number;
		temp_max: number;
		temp_min: number;
	};
	weather: {
		description: string;
		icon: string;
		id: number;
		main: string;
	}[];
	wind: {
		deg: number;
		speed: number;
	};
}

export async function fetchOpenWeatherData(city: string): Promise<any> {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
	);
	if (!res.ok) {
		throw new Error("city not found");
	}
	const data: OpenWeatherData = await res.json();
	return data;
}
