import "./index.css";

import Navbar from "../Navbar";

import ContactUs from "../ContactUs";

import { TailSpin } from "react-loader-spinner";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const initilaState = {
	movieDetails: {},
	fetchingStatus: "Initial",
};

const MovieItemDetails = (props) => {
	const [state, setState] = useState(initilaState);

	const renderMovieApi = async () => {
		setState({ ...state, fetchingStatus: "Loading" });

		const { match } = props;
		const { params } = match;
		const { id } = params;

		const token = Cookies.get("jwt_token");

		const url = `https://apis.ccbp.in/movies-app/movies/${id}`;

		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const req = await fetch(url, options);
		if (req.ok) {
			const res = await req.json();

			const data = res.movie_details;

			const updatedData = {
				genres: data.genres.map((each) => {
					return {
						id: each.id,
						name: each.name,
					};
				}),
				similarMovies: data.similar_movies.map((each) => {
					return {
						id: each.id,
						posterPath: each.poster_path,
						title: each.title,
						backdropPath: each.backdrop_path,
					};
				}),
				spokenLanguages: data.spoken_languages.map((each) => {
					return {
						id: each.id,
						englishName: each.english_name,
					};
				}),
				title: data.title,
				voteCount: data.vote_count,
				vouteAverage: data.vote_average,
				releaseDate: data.release_date,
				runtime: data.runtime,
				posterPath: data.poster_path,
				overView: data.overview,
				id: data.id,
				budget: data.budget,
				backDropPath: data.backdrop_path,
				adult: data.adult,
			};
			console.log(updatedData);
			setState({
				...state,
				movieDetails: updatedData,
				fetchingStatus: "Success",
			});
		} else {
			setState({ ...state, fetchingStatus: "Failure" });
		}
	};

	useEffect(() => {
		renderMovieApi();
	}, []);

	const renderLoading = () => (
		<div className="loader-container">
			<TailSpin color="#D81F26" height={50} width={50} />
		</div>
	);

	const renderSuccess = () => {
		return (
			<div className="movie-details">
				<img
					src={state.movieDetails.backDropPath}
					alt={state.movieDetails.id}
					className="movie-img"
				/>
				<div className="bg-container">
					<h1 className="movie-name">{state.movieDetails.title}</h1>
					<div className="movie-top-flex">
						<p className="movie-times">
							{state.movieDetails.runtime} Min
						</p>
						<p className="movie-relase">
							{state.movieDetails.releaseDate}
						</p>
					</div>
					<p className="overview">{state.movieDetails.overView}</p>
					<div className="movie-talks-flex">
						<div className="each-talk">
							<h1 className="title">Genres</h1>
							{state.movieDetails.genres.map((each) => (
								<p className="sub-title">{each.name}</p>
							))}
						</div>
						<div className="each-talk">
							<h1 className="title">Audio Available</h1>
							{state.movieDetails.spokenLanguages.map((each) => (
								<p className="sub-title">{each.englishName}</p>
							))}
						</div>
						<div className="each-talk">
							<h1 className="title">Rating Count</h1>
							<p className="sub-title">
								{state.movieDetails.voteCount}
							</p>
							<div className="each-talk">
								<h1 className="title">Rating Average</h1>
								<p className="sub-title">
									{state.movieDetails.vouteAverage}
								</p>
							</div>
						</div>
						<div className="each-talk">
							<h1 className="title">Budget</h1>
							<p className="sub-title">
								{state.movieDetails.budget}
							</p>
							<div className="each-talk">
								<h1 className="title">Release Data</h1>
								<p className="sub-title">
									{state.movieDetails.releaseDate}
								</p>
							</div>
						</div>
					</div>
					<h1 className="m-title">More Like This</h1>
					<div className="images-card">
						{state.movieDetails.similarMovies.map((each) => (
							<img
								src={each.backdropPath}
								alt={each.id}
								className="each-movie-img"
							/>
						))}
					</div>
				</div>
			</div>
		);
	};

	const renderFailure = () => {};

	const renderMovieData = () => {
		switch (state.fetchingStatus) {
			case "Loading":
				return renderLoading();

			case "Success":
				return renderSuccess();

			case "Failure":
				return renderFailure();

			default:
				break;
		}
	};

	return (
		<div>
			<Navbar />
			{renderMovieData()}
			<ContactUs />
		</div>
	);
};

export default MovieItemDetails;
