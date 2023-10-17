import { Text } from "./Text"

export const Loader = ({ text, isFetching }: { text?: string, isFetching?: boolean }) => {
    return (
        <span className="full-flex content-loader">
            {isFetching}
            <span style={{ marginBottom: '2rem' }} className="loader"></span>
            <Text children={text} />
        </span>
    )
}
