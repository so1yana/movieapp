import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import FilmList from './components/film-list';
import Pages from './components/pagination';
import TabsApp from './components/tabs';

import './index.css';
import './reset.css';

class App extends Component {
    render() {
        return (
            <div className="page">
                <TabsApp />
                <FilmList />
                <Pages />
            </div>
        );
    }
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
