import { Text } from "./Text"

export const Loader = ({ text, isFetching }: { text?: string, isFetching?: boolean }) => {
    return (
        <span className="full-flex content-loader">
            {isFetching}
            {/* <span style={{ marginBottom: '2rem' }} className="loader"></span> */}
            <div className="packman"></div>
            <Text children={text} />
        </span>
    )
}

export const Packman = () => {
    return (
        <div className="packman"></div>
    )
}
