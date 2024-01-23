import FilmListItem from '../film-list-item';

import './film-list.css';

// export default class FilmList extends Component {
//     render() {
//         const { movies } = this.props;

//         const items = movies.map((item) => {
//             return <FilmListItem key={item.id} film={item} />;
//         });

//         return <ul className="film-list">{items}</ul>;
//     }
// }

export default function FilmList(props) {
    const { movies, changeRateMovie } = props;

    const items = movies.map((item) => {
        return <FilmListItem key={item.id} film={item} changeRateMovie={changeRateMovie} />;
    });
    return (
        <div>
            <ul className="film-list">{items}</ul>
        </div>
    );
}
