import { Component } from 'react';
import FilmListItem from '../film-list-item';

import './film-list.css';

export default class FilmList extends Component {
    render() {
        const films = [
            { id: 1, name: 'The way back' },
            { id: 2, name: 'The way back' },
            { id: 3, name: 'The way back' },
            { id: 4, name: 'The way back' },
            { id: 5, name: 'The way back' },
            { id: 6, name: 'The way back' },
        ];

        const items = films.map((item) => {
            return <FilmListItem key={item.id} film={item} />;
        });

        return <ul className="film-list">{items}</ul>;
    }
}
