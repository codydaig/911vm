const FilterSearchResult = (volunteerList, searchText) => {
  
  return volunteerList
    .filter(volunteer => {
      if ((volunteer["first_name"] && volunteer["last_name"]) && `${volunteer["first_name"]} ${volunteer["last_name"]}`.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if ((volunteer["email_address"] && volunteer["email_address"].toLowerCase().includes(searchText.toLowerCase())) ||
          (volunteer["phone_number"] && volunteer["phone_number"].toLowerCase().includes(searchText.toLowerCase())) ||
          (volunteer.class && volunteer.class.toLowerCase().includes(searchText.toLowerCase()))) {
        return true;
      }
      return false;
    });
};

export default FilterSearchResult;