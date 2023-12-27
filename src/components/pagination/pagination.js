import { Component } from 'react';
import { Pagination } from 'antd';

import './pagination.css';

export default class Pages extends Component {
    state = {
        currentPage: 1,
    };

    changePage = (page) => {
        this.setState(() => ({ currentPage: page }));
    };

    render() {
        const { pagesCount } = this.props;
        const { currentPage } = this.state;
        return (
            <Pagination
                className="pagination"
                defaultCurrent={1}
                current={currentPage}
                total={pagesCount}
                pageSize={20}
                showSizeChanger={false}
                onChange={this.changePage}
            />
        );
    }
}
