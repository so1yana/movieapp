import { Component } from 'react';
import { Card, Flex, Typography, Rate, Space, Tag } from 'antd';

import './film-list-item.css';

export default class FilmListItem extends Component {
    reduceText = (text, limit) => {
        text = text.trim();
        const words = text.split(' ');
        let symCount = 0;
        let result = '';
        for (const word of words) {
            for (let i = 0; i < word.length; i++) {
                if (word[i].match(/[a-z]/i)) symCount += 1;
            }
            if (symCount >= limit) {
                break;
            } else result += ' ' + word;
        }
        console.log(symCount);
        if (symCount < limit) return result.trim();
        else return result.trim() + '...';
    };

    render() {
        const { film } = this.props;
        const { title, overview, vote_average, release_date, poster_path } = film;
        const noPosterImg =
            'https://www.stpgoods.com/media/catalog/product/cache/37beda607054ab849ef979c115630c43/5/4/54163.jpg';
        const filmImg = poster_path
            ? `https://image.tmdb.org/t/p/original/${poster_path}`
            : noPosterImg;

        const cardStyle = {
            height: 280,
            width: 450,
            borderRadius: 0,
        };

        return (
            <Card
                bordered={false}
                hoverable
                style={cardStyle}
                bodyStyle={{
                    height: '100%',
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 0,
                    boxShadow: '3px 3px 8px 0 rgba(0, 0, 0, 0.1)',
                }}
            >
                <Flex>
                    <img className="film-image" alt="poster" src={filmImg} />
                    <Flex
                        vertical
                        align="flex-start"
                        justify="space-between"
                        style={{ marginLeft: 20, marginTop: 6, marginRight: 9 }}
                    >
                        <Flex className="item-title">
                            <Typography.Title level={3} style={{ marginBottom: 0, fontSize: 20 }}>
                                {this.reduceText(title, 30)}
                            </Typography.Title>
                            <span className="circle-rate">{vote_average.toFixed(1)}</span>
                        </Flex>
                        <span className="film-data">{release_date}</span>
                        <Flex>
                            <Space size={[0, 8]}>
                                <Tag>Action</Tag>
                                <Tag>Drama</Tag>
                            </Space>
                        </Flex>
                        <span className="film-description">
                            {overview ? this.reduceText(overview, 160) : 'No description'}
                        </span>
                        <Rate
                            count={10}
                            defaultValue={vote_average}
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
