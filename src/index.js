import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pages from './components/pagination';
import TabsApp from './components/tabs';

import './index.css';
import './reset.css';

class App extends Component {
    state = {
        movies: [],
        pages: 1,
    };

    searchMovie = (query, page = 1) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODA0ZTUyMDNhOTY3YmYyMjY2ZDc0MDYxNDNmMjYzMyIsInN1YiI6IjY1OGE5ZGRiNjhiNzY2NjhmYjJkNjMyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lnB3xNQtF71RWlnpjbdjEd-M7-wOyy5Y0CDFQTlR8p4',
            },
        };

        fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            options,
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({ movies: response.results, pages: response.total_results });
            })
            .catch((err) => console.error(err));
    };

    render() {
        return (
            <div className="page">
                <TabsApp searchMovie={this.searchMovie} />
                <FilmList movies={this.state.movies} />
                <Pages pagesCount={this.state.pages} />
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
