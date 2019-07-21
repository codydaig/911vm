import volunteerList from "../../../../../database/dummyOverview.js";
// import volunteerList from "./dummyOverview.js/index.js";

const FilterSearchResult = (searchText, maxResults) => {
  console.log("FSR: ", volunteerList);
    
  return volunteerList
    .filter(volunteer => {
      if (volunteer.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (volunteer.keywords.includes(searchText)) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
};

export default FilterSearchResult;