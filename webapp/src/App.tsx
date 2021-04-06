import { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllData, fetchLocationData } from "./redux/action";

function App() {
	const [loading, setLoading] = useState<boolean>(true);

	const dispatch = useDispatch();

	useEffect(() => {
		axios({
			method: "GET",
			url: "https://smart-poo-test-api.herokuapp.com/fullLocationInformation",
		})
			.then((res) => {
				dispatch(fetchLocationData(res.data));
			})
			.catch((e) => {
				return;
			});

		axios({
			method: "GET",
			url: "https://smart-poo-test-api.herokuapp.com/restroomList",
		})
			.then((res) => {
				dispatch(fetchAllData(res.data));
				setLoading(false);
			})
			.catch((e) => {
				return;
			});
	}, [dispatch]);

	return (
		<div className="App">
			<Home loading={loading} />
		</div>
	);
}

export default App;
