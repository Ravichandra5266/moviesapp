import React from "react";

const SearchContext = React.createContext({
	searchListData: [],
	activeSearch: false,
	onclickActiveSearchBtn: () => {},
	serachValue: "",
	onchangeSearch: () => {},
});

export default SearchContext;
