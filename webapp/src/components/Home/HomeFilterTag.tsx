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
		display: "block",
		textAlign: "right",
		paddingLeft: "5px",
		paddingRight: "5px",
	},
	homeFormControl: {
		minWidth: "75px",
		marginLeft: "5px",
		marginBottom: "10px",
		[theme.breakpoints.down("xs")]: {
			maxWidth: "75px",
		},
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
				(fac) => fac.facultyCode === formSelector.facultySelector
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
		formSelector.setGenderSelector(parseInt(value));
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
			<div style={{ padding: "0", display: "inline-block" }}>
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
							value={undefined}
							disabled
							defaultValue="Any"
							style={{ display: "none" }}
						/>
						<option value={1}>Male</option>
						<option value={0}>Female</option>
						<option value={-1}>Any</option>
					</Select>
				</FormControl>
			</div>
			<div
				style={{ padding: "0", display: "inline-block", marginBottom: "20px" }}>
				{/* ------ Faculty Form Control ------ */}
				<FormControl
					variant="outlined"
					className={classes.homeFormControl}
					size="small">
					<InputLabel className={classes.homeFormInputLabel}>
						Faculty
					</InputLabel>
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
							<option
								key={`fac-${facultyInfo.facultyCode}`}
								value={facultyInfo.facultyCode}>
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
					<InputLabel className={classes.homeFormInputLabel}>
						Building
					</InputLabel>
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
						onChange={(e) =>
							handleFloorSelectorChange(e.target.value as string)
						}>
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
			</div>
		</Container>
	);
};

export default HomeFilterTag;
