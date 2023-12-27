import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pages from './components/pagination';
import TabsApp from './components/tabs';
import Spinner from './components/spinner';
import Info from './components/info';

import './index.css';
import './reset.css';

class App extends Component {
    state = {
        movies: [],
        pages: 1,
        searching: false,
        status: 'Ready',
    };

    searchMovie = (query, page = 1) => {
        this.setState({ searching: true, movies: [] });

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    // eslint-disable-next-line max-len
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODA0ZTUyMDNhOTY3YmYyMjY2ZDc0MDYxNDNmMjYzMyIsInN1YiI6IjY1OGE5ZGRiNjhiNzY2NjhmYjJkNjMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnB3xNQtF71RWlnpjbdjEd-M7-wOyy5Y0CDFQTlR8p4',
            },
        };

        fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            options,
        )
            .then((response) => response.json())
            .then((response) => {
                this.setState({
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
        const { pages } = this.state;

        return (
            <div className="page">
                <TabsApp searchMovie={this.searchMovie} />
                {this.check()}
                <Pages pagesCount={pages} />
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
