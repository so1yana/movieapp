import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pages from './components/pagination';
import TabsApp from './components/tabs';
import Spinner from './components/spinner';
import Info from './components/info';
import ApiRequests from './components/api-requests';
import ErrorPage from './components/error-page';
import { Provider } from './components/movies-genres-context';

import './index.css';
import './reset.css';

class App extends Component {
    state = {
        query: '',
        movies: [],
        allRatedMovies: [],
        ratedMoviesOnPage: [],
        genres: [],
        currentPage: 1,
        pages: 1,
        pagesForRated: 1,
        currentPageForRated: 1,
        searching: false,
        status: 'Creating guest session',
        sessionId: null,
        currentTab: 'Search',
        hasError: false,
    };

    api = new ApiRequests();

    componentDidMount() {
        const session = new Promise((resolve) => {
            const response = this.api.createGuestSession();
            resolve(response);
        });
        session
            .then((response) => {
                if (response !== 'error') {
                    this.setState({ status: 'Ready', sessionId: response.guest_session_id });
                    this.getGenres();
                } else {
                    this.setState({ status: 'Error' });
                    throw new Error();
                }
            })
            .catch(() => this.setState({ hasError: true }));
    }

    getGenres = () => {
        const genres = new Promise((resolve) => {
            const response = this.api.getAllGenres();
            resolve(response);
        });
        genres.then((response) => {
            this.setState({ genres: response, status: 'Ready' });
            this.getRatedMovies();
        });
    };

    changeTab = (tab) => {
        const { currentTab } = this.state;
        if (currentTab === tab) return;
        if (tab === 'Rated') this.getRatedMovies();
        this.setState({ currentTab: tab });
    };

    searchMovie = (query, page = 1) => {
        const str = query.replace(/\s+/g, '');
        if (str === '') return;
        this.setState({ query, searching: true, movies: [], status: 'Searching' });
        this.api
            .searchMovie(query, page)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    currentPage: response.page,
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
        const { sessionId, currentTab } = this.state;
        this.api.changeRate(rate, movieId, sessionId).then(() => {
            if (currentTab !== 'Rated') this.getRatedMovies();
        });
    };

    getRatedMovies = () => {
        this.setState({ status: 'Getting rated movies' });
        let movies = [];
        let pages = 1;
        const { pagesForRated } = this.state;
        this.api
            .getRatedMovies(1)
            .then((response) => {
                if (response.total_results === pagesForRated) throw new Error('Get out');
                movies = response.results;
                pages = response.total_pages;
                return response;
            })
            .then((response) => {
                if (pages > 1) {
                    for (let i = 2; i <= pages; i++) {
                        this.api
                            .getRatedMovies(i)
                            // eslint-disable-next-line no-loop-func
                            .then((result) => {
                                result.results.map((el) => movies.push(el));
                            })
                            // eslint-disable-next-line no-loop-func
                            .then(() => {
                                this.setState({ allRatedMovies: movies });
                            });
                    }
                }
                return response;
            })
            .then((response) => {
                this.setState({
                    allRatedMovies: movies,
                    pagesForRated: response.total_results,
                    status: 'Ready',
                });
            })
            .then(() => this.getRatedMovies())
            .catch((error) => {
                if (error.message === 'Get out') {
                    this.setState({ status: 'Ready' });
                    this.showRatedMovies(1);
                } else this.setState({ searching: false, status: 'Error on search' });
            });
    };

    showRatedMovies = (page) => {
        const { allRatedMovies } = this.state;
        const startIndex = page * 10 + (page * 10 - 20);

        this.setState({
            currentPageForRated: page,
            ratedMoviesOnPage: allRatedMovies.slice(startIndex, page * 20),
        });
    };

    getFilmRating = (id) => {
        const { allRatedMovies } = this.state;
        const filmIndexInArray = allRatedMovies.findIndex((item) => item.id === id);
        return filmIndexInArray !== -1 ? allRatedMovies[filmIndexInArray].rating : 0;
    };

    check() {
        const { movies, ratedMoviesOnPage, searching, status, currentTab } = this.state;
        if (currentTab === 'Search')
            if (status === 'Nothing was found') return <Info text="Nothing was found..." />;
            else if (status === 'Error on search') {
                return <Info text="Something went wrong..." />;
            } else if (searching) return <Spinner />;
            else if (movies.length > 0) {
                return (
                    <FilmList
                        movies={movies}
                        changeRateMovie={this.changeRateMovie}
                        getFilmRating={this.getFilmRating}
                    />
                );
            } else {
                return null;
            }
        if (currentTab === 'Rated') {
            if (status === 'Getting rated movies') return <Spinner />;
            if (ratedMoviesOnPage.length > 0)
                return (
                    <FilmList
                        movies={ratedMoviesOnPage}
                        changeRateMovie={this.changeRateMovie}
                        getFilmRating={this.getFilmRating}
                    />
                );
        }
        return null;
    }

    render() {
        const {
            currentPage,
            pages,
            pagesForRated,
            currentPageForRated,
            query,
            status,
            sessionId,
            currentTab,
            genres,
            hasError,
        } = this.state;
        if (status === 'Creating guest session') {
            return <Spinner />;
        }

        if (hasError) {
            return <ErrorPage />;
        }

        return (
            <div className="page">
                <Provider value={genres}>
                    <TabsApp searchMovie={this.searchMovie} changeTab={this.changeTab} />
                    {this.check(sessionId)}
                    <Pages
                        type={currentTab}
                        page={currentTab === 'Search' ? currentPage : currentPageForRated}
                        pagesCount={currentTab === 'Search' ? pages : pagesForRated}
                        searchMovie={this.searchMovie}
                        query={query}
                        showRatedMovies={this.showRatedMovies}
                    />
                </Provider>
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
