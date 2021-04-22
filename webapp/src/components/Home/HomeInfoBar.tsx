import React, { useState, useEffect } from "react";
import {
	makeStyles,
	Container,
	Grid,
	Typography,
	Theme,
} from "@material-ui/core";
import { ArrowDropDown, FiberManualRecord, Person } from "@material-ui/icons";
import { resToiletData, Toilet } from "../dataInterface";
import HomeDropDownInfo from "./HomeDropDownInfo";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";

interface StyleProps {
	statusColor: string;
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
	infoBar: {
		backgroundColor: "#ffffff",
		height: "50px",
		width: "100%",
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			height: "65px",
		},
		[theme.breakpoints.up("lg")]: {
			height: "80px",
		},
		"&:hover": {
			cursor: "default",
		},
	},
	infoStatusColor: {
		color: ({ statusColor }) => statusColor,
	},
	infoBarGrid: {
		alignItems: "center",
		height: "100%",
	},
	infoBarText: {
		fontSize: "0.7em",
		fontWeight: "normal",
		lineHeight: "1em",
		[theme.breakpoints.up("md")]: {
			fontSize: "1em",
		},
	},
	infoBarIconGrid: {
		display: "flex",
	},
	dropDownArrow: {
		"&:hover": {
			cursor: "pointer",
		},
	},
}));

interface InfoBarProps {
	restroomID: string;
	status: string;
	faculty: string;
	facultyCode: string;
	building: string;
	floor: string;
	gender: number;
	occupancy: string;
}
const InfoBar: React.FC<InfoBarProps> = ({
	restroomID,
	status,
	faculty,
	facultyCode,
	building,
	floor,
	occupancy,
	gender,
}) => {
	const classes = useStyles({
		statusColor: status,
	});

	const [toiletList, setToiletList] = useState<Toilet[]>([]);
	const [receivedToiletData, setReceivedToiletData] = useState<resToiletData>({
		data: [],
	});
	const [dropDownInfo, setDropDownInfo] = useState<boolean>(false);

	useEffect(() => {
		setToiletList(receivedToiletData.data);
	}, [receivedToiletData]);

	const handleClick = (posY: number) => {
		let lowerY = 1 - posY / window.innerHeight;
		if (lowerY < 0.3) {
			scroll.scrollMore(0.3 * window.innerHeight, { duration: 300 });
			setTimeout(() => {
				setDropDownInfo(true);
			}, 320);
		} else {
			setDropDownInfo(true);
		}

		axios({
			method: "GET",
			url: `/api/restroom`,
			params: {
				id: restroomID.substring(1),
			},
		})
			.then((res) => {
				setReceivedToiletData(res.data);
			})
			.catch((e) => {
				return;
			});
	};

	const handleClose = () => {
		setDropDownInfo(false);
	};

	return (
		/* ------ Information Bar ------ */
		<Container id={restroomID} className={classes.infoBar} maxWidth="lg">
			<Grid container spacing={0} className={classes.infoBarGrid}>
				<Grid item xs={1} className={classes.infoBarIconGrid}>
					<FiberManualRecord className={classes.infoStatusColor} />
				</Grid>
				<Grid item xs={5}>
					<Typography
						className={
							classes.infoBarText
						}>{`${faculty}/${building}/Floor ${floor} (${
						gender === 1 ? "M" : "F"
					})`}</Typography>
				</Grid>
				<Grid item xs={1} className={classes.infoBarIconGrid}>
					<Person style={{ color: "#000000" }} />
				</Grid>
				<Grid item xs={4}>
					<Typography className={classes.infoBarText}>
						Occupied: {occupancy}
					</Typography>
				</Grid>
				<Grid item xs={1} className={classes.infoBarIconGrid}>
					<ArrowDropDown
						style={{ color: "#000000" }}
						onClick={(e) => handleClick(e.clientY)}
						className={classes.dropDownArrow}
					/>
				</Grid>
			</Grid>
			{/* ------ DropDownList ------ */}
			<HomeDropDownInfo
				dropDownInfo={dropDownInfo}
				restroomID={restroomID}
				handleClose={handleClose}
				toiletList={toiletList}
			/>
		</Container>
	);
};

export default InfoBar;
