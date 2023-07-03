import Navbar from "../Navbar";
import Trending from "../Trending";
import TopRatedMovies from "../TopRatedMovies";
import Original from "../Original";
import ContactUs from "../ContactUs";
import SearchContext from "../../Context/SearchContext";
import "./index.css";
import { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Home = () => {
	const { activeSearch, serachValue, searchListData } =
		useContext(SearchContext);
	return (
		<div className="home">
			<Navbar />
			{activeSearch ? (
				<>
					<h1 className="s-title">Search Results</h1>
					<div className="search-results-container">
						{searchListData.length > 0 ? (
							searchListData.map((each) => {
								return (
									<Link to={`/movies/${each.id}`}>
										<img
											key={each.id}
											src={each.poster_path}
											alt={each.id}
											className="search-img"
										/>
									</Link>
								);
							})
						) : (
							<div className="search-empty">
								<img
									src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1687947609/Layer_2_dqwf8t.png"
									alt="search empty"
								/>
								<p>
									Your search for {serachValue} did not find
									any matches.
								</p>
							</div>
						)}
					</div>
				</>
			) : (
				""
			)}
			{!activeSearch ? (
				<>
					<Trending />
					<TopRatedMovies />
					<Original />
					<ContactUs />
				</>
			) : (
				""
			)}
		</div>
	);
};
export default Home;
