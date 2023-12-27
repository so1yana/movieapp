import './info.css';

export default function Info(props) {
    const { text } = props;
    return <span className="info">{text}</span>;
}
