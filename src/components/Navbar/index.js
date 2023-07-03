import { FaSearch } from "react-icons/fa";

import { GiHamburgerMenu } from "react-icons/gi";

import { Link, NavLink } from "react-router-dom";

import { useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";

import SearchContext from "../../Context/SearchContext";

import { useContext } from "react";

import "./index.css";

const Navbar = () => {
	const [serachIcon, setSearchIcon] = useState(false);

	const { onclickActiveSearchBtn, onchangeSearch } =
		useContext(SearchContext);

	const [ham, setHam] = useState(false);

	const onclickHam = () => {
		setHam(!ham);
	};

	const onclickSearchIcon = () => {
		setSearchIcon(true);
	};

	const showSearchResults = () => {
		onclickActiveSearchBtn(true);
	};

	const onchangeSearchText = (event) => {
		onchangeSearch(event.target.value);
	};

	const onclickSearchOff = () => {
		onclickActiveSearchBtn(false);
	};
	return (
		<nav className="nav-bg-container">
			<div className="sm-nav">
				<div className="sm-flex">
					<Link
						to="/"
						className="nav-logo"
						onClick={onclickSearchOff}>
						<h1 className="nav-logo">MOVIES</h1>
					</Link>
					<div className="sm-flex">
						{serachIcon ? (
							<div className="search-input-container">
								<input
									type="search"
									placeholder="Search Movie"
									className="search-inputEl"
									onChange={onchangeSearchText}
								/>

								<button
									onClick={showSearchResults}
									className="nav-search-input-icon">
									<FaSearch className="search-icons" />
								</button>
							</div>
						) : (
							<button
								className="nav-search-icon"
								onClick={onclickSearchIcon}>
								<FaSearch className="icons" />
							</button>
						)}

						{ham ? (
							<button
								className="nav-ham-icon"
								onClick={onclickHam}>
								<AiOutlineCloseCircle className="icons" />
							</button>
						) : (
							<button
								className="nav-ham-icon"
								onClick={onclickHam}>
								<GiHamburgerMenu className="icons" />
							</button>
						)}
					</div>
				</div>

				{ham ? (
					<ul className="sm-nav-items">
						<NavLink
							activclassname="active"
							exact
							to="/"
							onClick={onclickSearchOff}
							className="nav-link">
							<li>Home</li>
						</NavLink>

						<NavLink
							activclassname="active"
							exact
							to="/popular"
							className="nav-link">
							<li>Popular</li>
						</NavLink>

						<NavLink
							activclassname="active"
							exact
							to="/account"
							className="nav-link">
							<li>Account</li>
						</NavLink>
					</ul>
				) : (
					""
				)}
			</div>

			<div className="lg-nav">
				<Link to="/" className="nav-logo" onClick={onclickSearchOff}>
					<h1 className="nav-logo">MOVIES</h1>
				</Link>
				<div className="lg-flex">
					<div className="lg-nav-items">
						<NavLink
							activclassname="lg-active"
							exact
							to="/"
							onClick={onclickSearchOff}
							className="lg-nav-link">
							<li>Home</li>
						</NavLink>

						<NavLink
							activclassname="lg-active"
							exact
							to="/popular"
							className="lg-nav-link">
							<li>Popular</li>
						</NavLink>
					</div>
					<div className="lg-search-account">
						<div className="lg-search-input-container">
							<input
								type="search"
								placeholder="Search Movie"
								className="search-inputEl"
								onChange={onchangeSearchText}
							/>

							<button
								onClick={showSearchResults}
								className="nav-search-input-icon">
								<FaSearch className="search-icons" />
							</button>
						</div>
						<NavLink
							activclassname="lg-active"
							exact
							to="/account"
							className="lg-nav-link">
							<CgProfile className="lg-profile-icons" />
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
