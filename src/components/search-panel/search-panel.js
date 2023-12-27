import { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

export default class SearchPanel extends Component {
    // eslint-disable-next-line no-console
    myDebounce = debounce((fn) => fn(), 1000);

    handleSearch = (e) => {
        const { searchMovie } = this.props;
        this.myDebounce(() => searchMovie(e.target.value), 1000);
    };

    render() {
        return <Input type="text" onChange={this.handleSearch} placeholder="Type to search..." />;
    }
}
