import { Tabs } from 'antd';
// import { Component } from 'react';
import SearchPanel from '../search-panel/search-panel';
// import FilmList from '../film-list';

import './tabs.css';

export default function TabsApp(props) {
    // getMovies = async (sessionId) => {
    //     const { getRatedMovies } = this.props;
    //     const res = new Promise((resolve) => {
    //         resolve(getRatedMovies(sessionId));
    //     });
    //     res.then((response) => console.log(response));
    // };

    const { searchMovie, changeTab } = props;
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
            onTabClick={(key) => {
                const tabName = items[key - 1].label;
                changeTab(tabName);
            }}
        />
    );
}
