import { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

export default class SearchPanel extends Component {
    myDebounce = debounce((fn) => fn(), 1000);

    handleSearch = (e) => {
        const { searchMovie } = this.props;
        this.myDebounce(() => searchMovie(e.target.value));
    };

    render() {
        return <Input type="text" onChange={this.handleSearch} placeholder="Type to search..." />;
    }
}
