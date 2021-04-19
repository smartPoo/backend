import { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchAllData, fetchLocationData } from "./redux/action";
import { locationCreator } from "./components/generateFilterTags";

function App() {
	const [loading, setLoading] = useState<boolean>(true);

	const dispatch = useDispatch();

	useEffect(() => {
		axios({
			method: "GET",
			url: "/api/allRestroom",
		})
			.then((res) => {
				dispatch(fetchAllData(res.data));
				let x = locationCreator(res.data.data);
				dispatch(fetchLocationData(x));
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
