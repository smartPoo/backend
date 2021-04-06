import React, { useState, useEffect } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	makeStyles,
	Container,
} from "@material-ui/core";
import { FormSelectorState, BuildingInfo } from "../dataInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

const useStyles = makeStyles((theme) => ({
	homeFormContainer: {
		display: "flex",
		justifyContent: "flex-end",
		paddingLeft: "5px",
		paddingRight: "5px",
	},
	homeFormControl: {
		minWidth: "90px",
		marginLeft: "5px",
		marginBottom: "20px",
	},
	homeFormInputLabel: {
		fontSize: "0.7em",
	},
}));

interface HomeFilterTagProps {
	formSelector: FormSelectorState;
}
const HomeFilterTag: React.FC<HomeFilterTagProps> = ({ formSelector }) => {
	const classes = useStyles();
	const locationData = useSelector(
		(state: RootState) => state.LocationData.data
	);
	const [buildingInfo, setBuildingInfo] = useState<BuildingInfo[]>([]);
	const [floorInfo, setFloorInfo] = useState<string[]>([]);

	useEffect(() => {
		let buildingList =
			locationData.find(
				(fac) => fac.facultyName === formSelector.facultySelector
			)?.buildings || [];
		setBuildingInfo(buildingList);
	}, [formSelector.facultySelector, locationData]);

	useEffect(() => {
		let floorList =
			buildingInfo.find((b) => b.buildingName === formSelector.buildingSelector)
				?.floor || [];
		setFloorInfo(floorList);
	}, [formSelector.buildingSelector, buildingInfo]);

	const handleGenderSelectorChange = (value: string) => {
		formSelector.setGenderSelector(value);
	};
	const handleFacultySelectorChange = (value: string) => {
		formSelector.setFacultySelector(value);
		handleBuildingSelectorChange("");
	};
	const handleBuildingSelectorChange = (value: string) => {
		formSelector.setBuildingSelector(value);
		handleFloorSelectorChange("");
	};
	const handleFloorSelectorChange = (value: string) => {
		formSelector.setFloorSelector(value);
	};

	return (
		<Container className={classes.homeFormContainer}>
			{/* ------ Gender Form Control ------ */}
			<FormControl
				variant="outlined"
				className={classes.homeFormControl}
				size="small">
				<InputLabel className={classes.homeFormInputLabel}>Gender</InputLabel>
				<Select
					native
					label="Gender"
					className={classes.homeFormInputLabel}
					value={formSelector.genderSelector}
					onChange={(e) =>
						handleGenderSelectorChange(e.target.value as string)
					}>
					<option
						aria-label="None"
						value=""
						disabled
						defaultValue=""
						style={{ display: "none" }}
					/>
					<option>Male</option>
					<option>Female</option>
					<option>Not Specified</option>
				</Select>
			</FormControl>

			{/* ------ Faculty Form Control ------ */}
			<FormControl
				variant="outlined"
				className={classes.homeFormControl}
				size="small">
				<InputLabel className={classes.homeFormInputLabel}>Faculty</InputLabel>
				<Select
					native
					label="Faculty"
					className={classes.homeFormInputLabel}
					value={formSelector.facultySelector}
					onChange={(e) =>
						handleFacultySelectorChange(e.target.value as string)
					}>
					<option
						aria-label="None"
						value=""
						disabled
						defaultValue=""
						style={{ display: "none" }}
					/>
					{locationData.map((facultyInfo) => (
						<option key={`fac-${facultyInfo.facultyCode}`}>
							{facultyInfo.facultyName}
						</option>
					))}
					<option value="">Any</option>
				</Select>
			</FormControl>

			{/* ------ Building Form Control ------ */}
			<FormControl
				variant="outlined"
				className={classes.homeFormControl}
				size="small"
				disabled={formSelector.facultySelector === "" ? true : false}>
				<InputLabel className={classes.homeFormInputLabel}>Building</InputLabel>
				<Select
					native
					label="Building"
					className={classes.homeFormInputLabel}
					value={formSelector.buildingSelector}
					onChange={(e) =>
						handleBuildingSelectorChange(e.target.value as string)
					}>
					<option
						aria-label="None"
						value=""
						disabled
						defaultValue=""
						style={{ display: "none" }}
					/>
					{buildingInfo.map((buildingInfo) => (
						<option key={`bld-${buildingInfo.buildingName}`}>
							{buildingInfo.buildingName}
						</option>
					))}
					<option value="">Any</option>
				</Select>
			</FormControl>

			{/* ------ Floor Form Control ------ */}
			<FormControl
				variant="outlined"
				className={classes.homeFormControl}
				size="small"
				disabled={formSelector.buildingSelector === "" ? true : false}>
				<InputLabel className={classes.homeFormInputLabel}>Floor</InputLabel>
				<Select
					native
					label="Floor"
					className={classes.homeFormInputLabel}
					value={formSelector.floorSelector}
					onChange={(e) => handleFloorSelectorChange(e.target.value as string)}>
					<option
						aria-label="None"
						value=""
						disabled
						defaultValue=""
						style={{ display: "none" }}
					/>
					{floorInfo.map((floor) => (
						<option key={`flr-${floor}`}>{floor}</option>
					))}
					<option value="">Any</option>
				</Select>
			</FormControl>
		</Container>
	);
};

export default HomeFilterTag;
