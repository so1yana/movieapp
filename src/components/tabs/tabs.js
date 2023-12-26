import { Tabs } from 'antd';
import SearchPanel from '../search-panel/search-panel';

import './tabs.css';

export default function TabsApp(props) {
    const { searchMovie } = props;

    const items = [
        {
            key: '1',
            label: 'Search',
            children: <SearchPanel searchMovie={searchMovie} />,
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
