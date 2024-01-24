/* eslint-disable camelcase */
import { Component } from 'react';
import { Card, Flex, Typography, Rate, Space, Tag } from 'antd';
import { format } from 'date-fns';
import { Consumer } from '../movies-genres-context';

import './film-list-item.css';

export default class FilmListItem extends Component {
    reduceText = (text, limit) => {
        text = text.trim();
        const words = text.split(' ');
        let symCount = 0;
        let result = '';
        words.every((word) => {
            for (let i = 0; i < word.length; i++) {
                if (word[i].match(/[a-z]/i)) symCount += 1;
            }
            if (symCount >= limit) {
                return false;
            }
            result += ` ${word}`;
            return true;
        });
        if (symCount < limit) return result.trim();
        return `${result.trim()}...`;
    };

    render() {
        const { film, changeRateMovie, getFilmRating } = this.props;
        const { id, title, overview, vote_average, release_date, poster_path, genre_ids } = film;
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
        const rating = getFilmRating(id);
        const averageRating = vote_average.toFixed(1);
        let ratingColor = '#66E900';
        if (averageRating >= 0 && averageRating < 3) ratingColor = '#E90000';
        else if (averageRating >= 3 && averageRating < 5) ratingColor = '#E97E00';
        else if (averageRating >= 5 && averageRating < 7) ratingColor = '#E9D100';
        let formatedDate;
        try {
            formatedDate = format(release_date, 'MMMM d, Y');
        } catch {
            formatedDate = 'Not released';
        }

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
                        className="card-body"
                        vertical
                        align="flex-start"
                        justify="space-between"
                        style={{ marginLeft: 20, marginTop: 6, marginRight: 9 }}
                    >
                        <Flex className="item-title">
                            <Typography.Title level={3} style={{ marginBottom: 0, fontSize: 20 }}>
                                {this.reduceText(title, 30)}
                            </Typography.Title>
                            <span className="circle-rate" style={{ borderColor: ratingColor }}>
                                {averageRating}
                            </span>
                        </Flex>
                        <span className="film-date">{formatedDate}</span>
                        <Flex>
                            <Consumer>
                                {(response) => {
                                    const genres = genre_ids.map((genre) =>
                                        response.genres.findIndex((elem) => elem.id === genre),
                                    );
                                    const elements = genres.map((genre) => (
                                        <Tag key={response.genres[genre].id}>
                                            {response.genres[genre].name}
                                        </Tag>
                                    ));
                                    return (
                                        <Space className="film-genres" size={[0, 8]}>
                                            {elements}
                                        </Space>
                                    );
                                }}
                            </Consumer>
                        </Flex>
                        <span className="film-description">
                            {overview ? this.reduceText(overview, 160) : 'No description'}
                        </span>
                        <Rate
                            count={10}
                            defaultValue={rating}
                            allowHalf
                            allowClear={false}
                            style={{ height: 35 }}
                            onChange={(value) => changeRateMovie(value, id)}
                        />
                    </Flex>
                </Flex>
            </Card>
        );
    }
}
