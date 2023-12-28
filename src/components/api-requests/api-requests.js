export default class ApiRequests {
    searchMovie(query, page = 1) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    // eslint-disable-next-line max-len
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODA0ZTUyMDNhOTY3YmYyMjY2ZDc0MDYxNDNmMjYzMyIsInN1YiI6IjY1OGE5ZGRiNjhiNzY2NjhmYjJkNjMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnB3xNQtF71RWlnpjbdjEd-M7-wOyy5Y0CDFQTlR8p4',
            },
        };

        return fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            options,
        );
    }
}
