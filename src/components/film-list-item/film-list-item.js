import { Component } from 'react';
import { Card, Flex, Typography, Rate, Space, Tag } from 'antd';

import './film-list-item.css';

export default class FilmListItem extends Component {
    render() {
        const imgSrc =
            'https://m.media-amazon.com/images/M/MV5BYjBjMTgyYzktN2U0Mi00YTJhLThkZDQtZmM1ZDlmNWMwZDQ3XkEyXkFqcGdeQXVyMDU5MDEyMA@@._V1_.jpg';
        const { film } = this.props;
        const { name } = film;

        const cardStyle = {
            width: 450,
            borderRadius: 0,
        };

        return (
            <Card
                bordered={false}
                hoverable
                style={cardStyle}
                bodyStyle={{
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 0,
                    boxShadow: '3px 3px 8px 0 rgba(0, 0, 0, 0.1)',
                }}
            >
                <Flex>
                    <img className="film-image" alt="poster" src={imgSrc} />
                    <Flex
                        vertical
                        align="flex-start"
                        justify="space-between"
                        style={{ marginLeft: 20, marginTop: 6, marginRight: 9 }}
                    >
                        <Flex className="item-title">
                            <Typography.Title level={3} style={{ marginBottom: 0 }}>
                                {name}
                            </Typography.Title>
                            <span className="circle-rate">6.6</span>
                        </Flex>
                        <span className="film-data">March 5, 2020</span>
                        <Flex>
                            <Space size={[0, 8]}>
                                <Tag>Action</Tag>
                                <Tag>Drama</Tag>
                            </Space>
                        </Flex>
                        <span className="film-description">
                            A former basketball all-star, who has lost his wife and family
                            foundation in a struggle with addiction attempts to regain his soul and
                            salvation by becoming the coach of a disparate ethnically mixed high ...
                        </span>
                        <Rate
                            count={10}
                            defaultValue={2.5}
                            allowHalf
                            disabled
                            style={{ height: 35 }}
                        />
                    </Flex>
                </Flex>
            </Card>
        );
    }
}

// export default class FilmListItem extends Component {
//     render() {
//         const imgSrc =
//             'https://m.media-amazon.com/images/M/MV5BYjBjMTgyYzktN2U0Mi00YTJhLThkZDQtZmM1ZDlmNWMwZDQ3XkEyXkFqcGdeQXVyMDU5MDEyMA@@._V1_.jpg';
//         const { film } = this.props;
//         const { name } = film;

//         return (
//             <li className="film-list-item">
//                 <img src={imgSrc} alt="poster" className="film-image" />
//                 <span className="film-name">{name}</span>
//             </li>
//         );
//     }
// }
