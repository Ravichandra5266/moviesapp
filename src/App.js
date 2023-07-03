import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";

import LoginPage from "./components/LoginPage";

import Home from "./components/Home";

import Profile from "./components/Profile";

import Popular from "./components/Popular";

import MovieItemDetails from "./components/MovieItemDetails";

import ProtectedRoutes from "./components/ProtectedRoutes";

import Context from "./Context/SearchContext";

import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const App = () => {
	const [searchBtn, setSearchBtn] = useState(false);

	const [searchInput, setSearchInput] = useState("");

	const [searchList, setSearchList] = useState([]);

	const onchangeSearch = (value) => {
		setSearchInput(value);
	};

	const onclickActiveSearchBtn = (value) => {
		setSearchBtn(value);
	};

	const getSearchData = async () => {
		if (searchBtn) {
			const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`;
			const token = Cookies.get("jwt_token");
			const options = {
				method: "Get",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const req = await fetch(url, options);
			const res = await req.json();
			setSearchList(res.results);
			console.log(url);
		}
	};

	useEffect(() => {
		getSearchData();
	}, [searchBtn, searchInput]);

	return (
		<Context.Provider
			value={{
				searchListData: searchList,
				activeSearch: searchBtn,
				serachValue: searchInput,
				onclickActiveSearchBtn: onclickActiveSearchBtn,
				onchangeSearch: onchangeSearch,
			}}>
			<Switch>
				<Route exact path="/login" component={LoginPage} />
				<ProtectedRoutes exact path="/" component={Home} />
				<ProtectedRoutes exact path="/account" component={Profile} />
				<ProtectedRoutes exact path="/popular" component={Popular} />
				<ProtectedRoutes
					exact
					path="/movies/:id"
					component={MovieItemDetails}
				/>
			</Switch>
		</Context.Provider>
	);
};
export default App;
