import { Component } from 'react';
import { Pagination } from 'antd';

import './pagination.css';

export default class Pages extends Component {
    changePage = (page) => {
        const { query, searchMovie } = this.props;
        searchMovie(query, page);
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
