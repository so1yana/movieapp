import { Component } from 'react';
import { Input } from 'antd';

export default class SearchPanel extends Component {
    state = {
        value: '',
    };

    handlerSubmit = (e) => {
        e.preventDefault();
        const query = this.state.value;
        this.props.searchMovie(query, 1);
    };

    render() {
        console.log(this.state.value);
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
