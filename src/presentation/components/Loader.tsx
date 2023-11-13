import { Text } from "./Text"

const Loader = ({ text, isFetching }: { text?: string, isFetching?: boolean }) => {
    return (
        <span className={`content-loader ${isFetching && 'content-loader-fetching'}`}>
            {isFetching ? <span className="loader-spin" /> : <Radio />}
            {text && <Text variant="Title-small" children={text} />}
        </span>
    )
}

const Load = () => (
    <span className="loader-dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
    </span>
);

const Radio = () => (
    <span style={{ width: '50px', height: '50px' }}>
        <div className="loader-radio" />
    </span>
);

export {
    Loader,
    Load,
    Radio
}