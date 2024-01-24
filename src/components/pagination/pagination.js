import { Component } from 'react';
import { Pagination } from 'antd';

import './pagination.css';

export default class Pages extends Component {
    changePage = (page) => {
        const { query, searchMovie, showRatedMovies, type } = this.props;
        if (type === 'Search') searchMovie(query, page);
        else if (type === 'Rated') showRatedMovies(page);
    };

    render() {
        const { pagesCount, page } = this.props;
        return (
            <Pagination
                className="pagination"
                defaultCurrent={1}
                current={page}
                total={pagesCount}
                pageSize={20}
                showSizeChanger={false}
                onChange={this.changePage}
            />
        );
    }
}
