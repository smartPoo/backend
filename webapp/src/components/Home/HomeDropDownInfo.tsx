import React from "react";
import {
	makeStyles,
	Menu,
	Container,
	Grid,
	Typography,
} from "@material-ui/core";
import tissuePapar from "../../assets/tissuepaper.png";
import dustBin from "../../assets/dustbin.png";
import alarm from "../../assets/alarm.png";
import { Toilet } from "../dataInterface";

const useStyles = makeStyles((theme) => ({
	popoverPaper: {
		width: "100%",
		overflow: "hidden",
		[theme.breakpoints.up("lg")]: {
			maxWidth: "1232px",
		},
		"&:hover": {
			cursor: "default",
		},
	},
	dropDownArea: {
		paddingTop: "10px",
		paddingBottom: "10px",
	},
	dropDownIconImg: {
		width: "20px",
		marginRight: "3px",
		[theme.breakpoints.up("md")]: {
			width: "30px",
			marginRight: "10px",
		},
	},
	dropDownIconPart: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	dropDownTextPart: {
		display: "flex",
		alignItems: "center",
	},
	infoMainText: {
		fontSize: "0.7em",
		alignItems: "center",
		[theme.breakpoints.up("md")]: {
			fontSize: "1.2em",
		},
		[theme.breakpoints.down("xs")]: {
			maxWidth: "50px",
		},
	},
	infoSubText: {
		fontSize: "0.6em",
		alignItems: "center",
		[theme.breakpoints.up("md")]: {
			fontSize: "1.2em",
		},
	},
	dropDownWarning: {
		fontSize: "0.6em",
		lineHeight: "1em",
		alignItems: "center",
		color: "red",
		fontWeight: "bold",
		marginTop: "0.3em",
		marginBottom: "0.3em",
		[theme.breakpoints.up("md")]: {
			fontSize: "1.1em",
			lineHeight: "1.1em",
		},
	},
	dropDownWarningContainer: {
		display: "block",
		padding: "0",
		marginLeft: "5px",
	},
}));

interface HomeDropDownInfoProps {
	dropDownInfo: boolean;
	restroomID: string;
	handleClose: () => void;
	toiletList: Toilet[];
}
const HomeDropDownInfo: React.FC<HomeDropDownInfoProps> = ({
	dropDownInfo,
	restroomID,
	handleClose,
	toiletList,
}) => {
	const classes = useStyles();
	return (
		<Menu
			open={dropDownInfo}
			anchorEl={document.getElementById(restroomID)}
			onClose={handleClose}
			PopoverClasses={{ paper: classes.popoverPaper }}
			getContentAnchorEl={null}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			transformOrigin={{ vertical: "top", horizontal: "center" }}
			elevation={1}>
			{/* ------ Toilets Mapping ------ */}
			{toiletList.map((toilet, index) => {
				return (
					<Container
						key={`${restroomID}:${toilet.toilet}`}
						className={classes.dropDownArea}
						style={{
							backgroundColor: index % 2 === 0 ? "#ffffff" : "#f3f3f3",
						}}>
						<Grid container>
							<Grid item xs={2} className={classes.dropDownTextPart}>
								<Typography className={classes.infoMainText}>
									Toilet {toilet.toilet}
								</Typography>
							</Grid>
							<Grid item xs={3} className={classes.dropDownTextPart}>
								<img
									src={tissuePapar}
									alt="tissuePaperIcon"
									className={classes.dropDownIconImg}
								/>
								<Typography className={classes.infoMainText}>
									{toilet.remainingTissue}% <small>Remaining</small>
								</Typography>
							</Grid>
							<Grid item xs={3} className={classes.dropDownTextPart}>
								<img
									src={dustBin}
									alt="dustBinIcon"
									className={classes.dropDownIconImg}
								/>
								<Typography className={classes.infoMainText}>
									{toilet.remainingDustbin}% <small>Remaining</small>
								</Typography>
							</Grid>
							<Grid item xs={4} className={classes.dropDownTextPart}>
								{toilet.issues?.length > 0 ? (
									<img
										src={alarm}
										alt="WarningIcon"
										className={classes.dropDownIconImg}
									/>
								) : null}
								<Container className={classes.dropDownWarningContainer}>
									{/* ------ Issues Mapping ------ */}
									{toilet.issues?.map((issue) => (
										<Typography
											key={`${restroomID}:${toilet.toilet}:${issue}`}
											className={classes.dropDownWarning}>
											{issue}
										</Typography>
									))}
								</Container>
							</Grid>
						</Grid>
					</Container>
				);
			})}
		</Menu>
	);
};

export default HomeDropDownInfo;
