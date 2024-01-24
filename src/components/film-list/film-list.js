import FilmListItem from '../film-list-item';

import './film-list.css';

export default function FilmList(props) {
    const { movies, changeRateMovie, getFilmRating } = props;

    const items = movies.map((item) => {
        return (
            <FilmListItem
                key={item.id}
                film={item}
                changeRateMovie={changeRateMovie}
                getFilmRating={getFilmRating}
            />
        );
    });
    return (
        <div>
            <ul className="film-list">{items}</ul>
        </div>
    );
}
