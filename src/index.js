import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pages from './components/pagination';
import TabsApp from './components/tabs';
import Spinner from './components/spinner';
import Info from './components/info';
import ApiRequests from './components/api-requests';
import ErrorPage from './components/error-page';

import './index.css';
import './reset.css';

class App extends Component {
    state = {
        query: '',
        movies: [],
        page: 1,
        pages: 1,
        searching: false,
        status: 'Creating guest session',
        sessionId: null,
    };

    api = new ApiRequests();

    searchMovie = (query, page = 1) => {
        const str = query.replace(/\s+/g, '');
        if (str === '') return;
        this.setState({ query, searching: true, movies: [], status: 'Searching' });
        this.api
            .searchMovie(query, page)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    page: response.page,
                    movies: response.results,
                    pages: response.total_results,
                    searching: false,
                });
                if (response.total_results === 0) this.setState({ status: 'Nothing was found' });
                else this.setState({ status: 'ok' });
            })
            .catch(() => this.setState({ searching: false, status: 'Error on search' }));
    };

    changeRateMovie = (rate, movieId) => {
        const { sessionId } = this.state;
        this.api.changeRate(rate, movieId, sessionId);
    };

    check() {
        const { movies, searching, status } = this.state;
        if (movies.length > 0)
            return <FilmList movies={movies} changeRateMovie={this.changeRateMovie} />;
        if (searching) return <Spinner />;
        if (status === 'Error on search') {
            return <Info text="Something went wrong..." />;
        }
        if (status === 'Nothing was found') return <Info text="Nothing was found..." />;
        return null;
    }

    render() {
        const { page, pages, query, status, sessionId } = this.state;
        console.log(status);
        if (status === 'Creating guest session') {
            const res = new Promise((resolve) => {
                const response = this.api.createGuestSession();
                resolve(response);
            });
            res.then((response) => {
                if (response !== 'error') {
                    this.setState({ status: 'Ready', sessionId: response.guest_session_id });
                } else this.setState({ status: 'Error' });
            });
            return <Spinner />;
        }

        if (status === 'Error') {
            return <ErrorPage />;
        }

        return (
            <div className="page">
                <TabsApp searchMovie={this.searchMovie} />
                {this.check(sessionId)}
                <Pages
                    page={page}
                    pagesCount={pages}
                    searchMovie={this.searchMovie}
                    query={query}
                />
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
