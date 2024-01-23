export default class ApiRequests {
    options = (method, body = null) => {
        console.log(body);
        return {
            method,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    // eslint-disable-next-line max-len
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODA0ZTUyMDNhOTY3YmYyMjY2ZDc0MDYxNDNmMjYzMyIsInN1YiI6IjY1OGE5ZGRiNjhiNzY2NjhmYjJkNjMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnB3xNQtF71RWlnpjbdjEd-M7-wOyy5Y0CDFQTlR8p4',
            },
            body: body !== null ? `{"value":${body}}` : null,
        };
    };

    createGuestSession = async () => {
        const res = await fetch(
            'https://api.themoviedb.org/3/authentication/guest_session/new',
            this.options('GET'),
        )
            .then((response) => response.json())
            .catch(() => 'error');
        return res;
    };

    searchMovie(query, page = 1) {
        return fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            this.options('GET'),
        );
    }

    changeRate(rate, movieId, sessionId) {
        console.log(this.options('POST', rate));
        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`,
            this.options('POST', rate),
        )
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }
}
