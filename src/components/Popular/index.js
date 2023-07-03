import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import Navbar from "../Navbar";

import ContactUs from "../ContactUs";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./index.css";

const initialConstantState = {
	dataFetchStatus: "Initial",
	popularMoviesList: [],
	noOfPages: 0,
	activePage: 1,
};

const Popular = () => {
	const [populatMovies, setPopularMovies] = useState(initialConstantState);

	const getPopularMovies = async () => {
		setPopularMovies({
			...populatMovies,
			dataFetchStatus: "Loading",
		});

		const url = `https://apis.ccbp.in/movies-app/popular-movies`;

		const token = Cookies.get("jwt_token");

		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const req = await fetch(url, options);

		const res = await req.json();

		// console.log(res);

		if (req.ok) {
			const data = res.results.map((each) => {
				return {
					id: each.id,
					backdropPath: each.backdrop_path,
					title: each.title,
					posterPath: each.poster_path,
					overview: each.overview,
				};
			});

			setPopularMovies({
				...populatMovies,
				popularMoviesList: data,
				dataFetchStatus: "Success",
			});
		} else {
			setPopularMovies({
				...populatMovies,
				dataFetchStatus: "Failure",
			});
		}
	};

	useEffect(() => {
		getPopularMovies();
	}, []);

	const showLoading = () => (
		<div className="loader-container">
			<TailSpin color="#D81F26" height={50} width={50} />
		</div>
	);

	const showPopulatMovies = () => (
		<div className="popular-container">
			{populatMovies.popularMoviesList.map((each) => (
				<Link
					key={each.id}
					to={`/movies/${each.id}`}
					className="popular">
					<div key={each.id}>
						<img
							src={each.backdropPath}
							alt={each.title}
							className="popular-img"
						/>
						<p className="popular-title">{each.title}</p>
					</div>
				</Link>
			))}
		</div>
	);

	const onclickTry = () => {
		getPopularMovies();
	};

	const showFailure = () => (
		<div className="failure-container">
			<img
				src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1687947600/alert-triangle_ut6nxs.png"
				alt="failure"
				className="failure-img"
			/>
			<p className="failuer-title">
				Something Went Wrong Please Try Again
			</p>
			<button className="failuer-btn" onClick={onclickTry}>
				Try Again
			</button>
		</div>
	);

	const getTrendingDisplayData = () => {
		switch (populatMovies.dataFetchStatus) {
			case "Loading":
				return showLoading();

			case "Success":
				return showPopulatMovies();

			case "Failure":
				return showFailure();

			default:
				break;
		}
	};

	return (
		<div className="popular-movies">
			<Navbar />
			<h1 className="popular-heading">Popular</h1>
			{getTrendingDisplayData()}
			<ContactUs />
		</div>
	);
};

export default Popular;
