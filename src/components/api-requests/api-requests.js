export default class ApiRequests {
    options = (method = 'GET', body = null) => {
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

    async createGuestSession() {
        const res = await fetch(
            'https://api.themoviedb.org/3/authentication/guest_session/new',
            this.options(),
        )
            .then((response) => response.json())
            .catch(() => 'error');
        return res;
    }

    searchMovie(query, page = 1) {
        return fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            this.options(),
        );
    }

    getRatedMovies = async (page) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/account/20861064/rated/movies?page=${page}&sort_by=created_at.asc`,
            this.options(),
        )
            .then((response) => response.json())
            .catch(() => 'error');

        return res;
    };

    async changeRate(rate, movieId, sessionId) {
        const res = fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`,
            this.options('POST', rate),
        )
            .then((response) => response.json())
            .catch((err) => console.error(err));
        return res;
    }

    async getAllGenres() {
        const res = await fetch(
            'https://api.themoviedb.org/3/genre/movie/list?language=en',
            this.options(),
        )
            .then((response) => response.json())
            .catch((err) => console.error(err));
        return res;
    }
}
