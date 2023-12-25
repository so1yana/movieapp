import { Component } from 'react';
import { Tabs } from 'antd';
import SearchPanel from '../search-panel/search-panel';

import './tabs.css';

export default class TabsApp extends Component {
    render() {
        const items = [
            {
                key: '1',
                label: 'Search',
                children: <SearchPanel />,
            },
            {
                key: '2',
                label: 'Rated',
            },
        ];

        return (
            <Tabs
                defaultActiveKey="1"
                items={items}
                centered
                style={{
                    marginLeft: 36,
                    marginRight: 36,
                    justifyContent: 'center',
                }}
            />
        );
    }
}
