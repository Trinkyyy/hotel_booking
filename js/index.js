document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        searchParams.append(key, value);
    }
    const queryString = searchParams.toString();
    // Redirect to the search results page with the query string
    window.location.href = `search-results.html?${queryString}`;
});