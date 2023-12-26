import { Component } from 'react';
import { Input } from 'antd';

export default class SearchPanel extends Component {
    state = {
        value: '',
    };

    handlerSubmit = (e) => {
        e.preventDefault();
        const { value } = this.state;
        const { searchMovie } = this.props;
        searchMovie(value, 1);
    };

    render() {
        return (
            <form onSubmit={(e) => this.handlerSubmit(e)}>
                <Input
                    onChange={(e) => this.setState({ value: e.target.value })}
                    placeholder="Type to search..."
                />
            </form>
        );
    }
}
