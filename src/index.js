import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pages from './components/pagination';
import TabsApp from './components/tabs';
import Spinner from './components/spinner';
import Info from './components/info';
import ApiRequests from './components/api-requests';

import './index.css';
import './reset.css';

class App extends Component {
    state = {
        query: '',
        movies: [],
        page: 1,
        pages: 1,
        searching: false,
        status: 'Ready',
    };

    api = new ApiRequests();

    searchMovie = (query, page = 1) => {
        this.setState({ query, searching: true, movies: [] });
        this.api
            .searchMovie(query, page)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    page: response.page,
                    movies: response.results,
                    pages: response.total_results,
                    searching: false,
                    status: 'ok',
                });
            })
            .catch((err) => this.setState({ searching: false, status: err }));
    };

    check() {
        const { movies, searching, status } = this.state;

        if (movies.length > 0) return <FilmList movies={movies} />;
        if (searching) return <Spinner />;
        if (status !== 'ok') {
            if (typeof status === 'object') return <Info text="Something went wrong..." />;
        } else if (status === 'ok' && movies.length === 0)
            return <Info text="Nothing was found..." />;
        return null;
    }

    render() {
        const { page, pages, query } = this.state;

        return (
            <div className="page">
                <TabsApp searchMovie={this.searchMovie} />
                {this.check()}
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
