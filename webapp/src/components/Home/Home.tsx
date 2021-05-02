import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import HomeContent from "./HomeContent";
import { FullData, FormSelectorState } from "../dataInterface";
import { homeNearestFiltered, homeListFiltered } from "./homeFiltered";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";

const theme = createMuiTheme({
	palette: {
		background: {
			default: "#F1FFFF",
		},
	},
});

interface HomeProps {
	loading: boolean;
}
const Home: React.FC<HomeProps> = ({ loading }) => {
	const params = new URLSearchParams(useLocation().search);
	const locationData = useSelector(
		(state: RootState) => state.LocationData.data
	);
	var facInit = params.get("faculty");
	var bldInit = params.get("building");
	var flrInit = params.get("floor");
	const allData = useSelector((state: RootState) => state.AllData);
	const [fullData, setFullData] = useState<FullData>({
		NearestData: [],
		ListData: [],
	});
	const [genderSelector, setGenderSelector] = useState<number>(-1);

	const [facultySelector, setFacultySelector] = useState<string>(facInit || "");
	const [buildingSelector, setBuildingSelector] = useState<string>(
		bldInit || ""
	);
	const [floorSelector, setFloorSelector] = useState<string>(flrInit || "");

	const formSelector: FormSelectorState = {
		genderSelector,
		setGenderSelector,
		facultySelector,
		setFacultySelector,
		buildingSelector,
		setBuildingSelector,
		floorSelector,
		setFloorSelector,
	};

	useEffect(() => {
		setFullData(() => {
			return {
				NearestData:
					facultySelector === ""
						? []
						: homeNearestFiltered(
								allData.data,
								genderSelector,
								facultySelector,
								buildingSelector,
								floorSelector
						  ),
				ListData: homeListFiltered(
					allData.data,
					genderSelector,
					facultySelector,
					buildingSelector,
					floorSelector
				),
			};
		});
	}, [
		loading,
		allData,
		genderSelector,
		facultySelector,
		buildingSelector,
		floorSelector,
		locationData,
	]);

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<HomeContent
				nearestData={fullData.NearestData}
				listData={fullData.ListData}
				formSelector={formSelector}
				loading={loading}
			/>
		</MuiThemeProvider>
	);
};

export default Home;
