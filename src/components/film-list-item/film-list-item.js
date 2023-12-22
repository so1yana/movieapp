import { Component } from 'react';

import './film-list-item.css';

export default class FilmListItem extends Component {
    render() {
        const imgSrc =
            'https://m.media-amazon.com/images/M/MV5BYjBjMTgyYzktN2U0Mi00YTJhLThkZDQtZmM1ZDlmNWMwZDQ3XkEyXkFqcGdeQXVyMDU5MDEyMA@@._V1_.jpg';
        const { film } = this.props;
        const { name } = film;

        return (
            <li className="film-list-item">
                <img src={imgSrc} alt="poster" className="film-image" />
                <span className="film-name">{name}</span>
            </li>
        );
    }
}
