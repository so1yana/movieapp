import { Component } from 'react';
import { Pagination } from 'antd';

import './pagination.css';

export default class Pages extends Component {
    render() {
        return <Pagination className="pagination" defaultCurrent={1} total={8} />;
    }
}
