import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./index.css";

const initialConstantState = {
	dataFetchStatus: "Initial",
	topRatedMoviesList: [],
};

const TopRatedMovies = () => {
	const [topRatedMovies, setTopRatedMovies] = useState(initialConstantState);

	const getTopRatedMoviesListData = async () => {
		setTopRatedMovies({
			...topRatedMovies,
			dataFetchStatus: "Loading",
		});

		const url = "https://apis.ccbp.in/movies-app/top-rated-movies";

		const token = Cookies.get("jwt_token");

		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const req = await fetch(url, options);

		const res = await req.json();

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

			setTopRatedMovies({
				...topRatedMovies,
				topRatedMoviesList: data,
				dataFetchStatus: "Success",
			});
		} else {
			setTopRatedMovies({
				...topRatedMovies,
				dataFetchStatus: "Failure",
			});
		}
	};

	// console.log(topRatedMovies)

	useEffect(() => {
		getTopRatedMoviesListData();
	}, []);

	const showLoading = () => (
		<div className="loader-container">
			<TailSpin color="#D81F26" height={50} width={50} />
		</div>
	);

	const showTopRatedMovies = () => {
		var settings = {
			dots: false,
			infinite: true,
			speed: 500,
			autoplay: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			initialSlide: 0,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		};
		return (
			<div className="slider">
				<Slider {...settings}>
					{topRatedMovies.topRatedMoviesList.map((each) => {
						return (
							<Link
								key={each.id}
								to={`/movies/${each.id}`}
								className="link">
								<div className="slide" key={each.id}>
									<img
										src={each.backdropPath}
										alt={each.title}
										className="slider-img"
									/>
									<p className="trending-movie-name">
										{each.title}
									</p>
								</div>
							</Link>
						);
					})}
				</Slider>
			</div>
		);
	};

	const onclickTry = () => {
		getTopRatedMoviesListData();
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
		switch (topRatedMovies.dataFetchStatus) {
			case "Loading":
				return showLoading();

			case "Success":
				return showTopRatedMovies();
			case "Failure":
				return showFailure();
			default:
				break;
		}
	};

	return (
		<div className="top-rated-movies">
			<h1 className="top-rated-movies-heading">Top Rated</h1>
			{getTrendingDisplayData()}
		</div>
	);
};

export default TopRatedMovies;
