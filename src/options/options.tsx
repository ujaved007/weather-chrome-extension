import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
	Card,
	CardContent,
	Box,
	Grid,
	Typography,
	TextField,
	Button,
} from "@material-ui/core";
import {
	getStoredOptions,
	setStoredOptions,
	LocalStorageOptions,
} from "../utils/storage";
import "./options.css";
import "fontsource-roboto";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
	const [options, setOptions] = useState<LocalStorageOptions | null>(null);
	const [formState, setFormState] = useState<FormState>("ready");

	useEffect(() => {
		getStoredOptions().then((options) => setOptions(options));
	}, []);

	const handleHomeCityChange = (homeCity: string) => {
		setOptions({ ...options, homeCity });
	};
	if (!options) {
		return null;
	}

	const handleSaveButtonClick = () => {
		setFormState("saving");
		setStoredOptions(options).then(() => {
			setTimeout(() => {
				setFormState("ready");
			}, 1000);
		});
	};

	const isFieldsDiabled = formState === "saving";

	return (
		<Box mx="10%" my="2%">
			<Card>
				<CardContent>
					<Grid container direction="column">
						<Grid item>
							<Typography variant="h4">Weather Extension Options</Typography>
						</Grid>
						<Box my="20px">
							<Grid item>
								<Typography variant="body1">Home City Name</Typography>
								<TextField
									fullWidth
									placeholder="Enter Home City Name"
									value={options.homeCity}
									onChange={(e) => handleHomeCityChange(e.target.value)}
									disabled={isFieldsDiabled}
								/>
							</Grid>
						</Box>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={handleSaveButtonClick}
								disabled={isFieldsDiabled}
							>
								{formState === "ready" ? "Save" : "Saving..."}
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
