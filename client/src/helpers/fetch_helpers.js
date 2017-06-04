const FetchHelpers = {};

FetchHelpers.checkResponse = (response) => {
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response;
};

FetchHelpers.parseJSON = (response) => {
    return response.json();

};

export default FetchHelpers;
