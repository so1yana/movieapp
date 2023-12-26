import { Component } from 'react';
import FilmListItem from '../film-list-item';

import './film-list.css';

export default class FilmList extends Component {
    render() {
        const { movies } = this.props;

        const items = movies.map((item) => {
            return <FilmListItem key={item.id} film={item} />;
        });

        return <ul className="film-list">{items}</ul>;
    }
}
