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
	trendingMoviesList: [],
};

const Trending = () => {
	const [trendingMoviesData, setTrendingMoviesData] =
		useState(initialConstantState);

	const getTrendingMoviesListData = async () => {
		setTrendingMoviesData({
			...trendingMoviesData,
			dataFetchStatus: "Loading",
		});

		const url = "https://apis.ccbp.in/movies-app/trending-movies";

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

			setTrendingMoviesData({
				...trendingMoviesData,
				trendingMoviesList: data,
				dataFetchStatus: "Success",
			});
		} else {
			setTrendingMoviesData({
				...trendingMoviesData,
				dataFetchStatus: "Failure",
			});
		}
	};

	useEffect(() => {
		getTrendingMoviesListData();
	}, []);

	const showLoading = () => (
		<div className="loader-container">
			<TailSpin color="#D81F26" height={50} width={50} />
		</div>
	);

	const ShowTrendingData = () => {
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
					{trendingMoviesData.trendingMoviesList.map((each) => {
						return (
							<Link
								key={each.id}
								className="link"
								to={`/movies/${each.id}`}>
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
		getTrendingMoviesListData();
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
		switch (trendingMoviesData.dataFetchStatus) {
			case "Loading":
				return showLoading();

			case "Success":
				return ShowTrendingData();
			case "Failure":
				return showFailure();
			default:
				break;
		}
	};

	return (
		<div className="trending-container">
			<h1 className="trending-heading">Trending Now</h1>
			{getTrendingDisplayData()}
		</div>
	);
};

export default Trending;
