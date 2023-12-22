import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pagination from './components/pagination';
import SearchPanel from './components/search-panel';
import Tabs from './components/tabs';

import './index.css';
import './reset.css';

class App extends Component {
    render() {
        return (
            <div className="page">
                <Tabs />
                <SearchPanel />
                <FilmList />
                <Pagination />
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
