import { useCallback, useRef } from "react";
import { Portal } from "./modals";
import { Caret } from "../icons/icons";
import { Text } from "./Text";

interface PropsSelect<T> {
    label: string;
    value: T;
}

interface Props<value> {
    selected: string;
    options: Array<PropsSelect<value>>;
    onSelect: (value: PropsSelect<value>) => void;
}

export const SimpleSelect = <T extends Object>({ options, selected, onSelect }: Props<T>) => {
    const select = useRef<HTMLDivElement>(null);
    const dialog = useRef<HTMLDialogElement>(null);


    const onSelectClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const rect = event.currentTarget.getBoundingClientRect();
            if (dialog.current) {
                if (select.current) {
                    select.current.style.top = `${rect.y - rect.height}px`;
                    select.current.style.left = `${rect.x}px`;
                }
                dialog.current.show();
            }
        },
        [dialog.current, select.current],
    )

    const onSelectPageClick = useCallback(
        (value: PropsSelect<T>) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            dialog.current?.close();
            onSelect && onSelect(value);
        },
        [dialog.current],
    )

    return (
        <span className="container-simple-select">
            <div className='select' onClick={onSelectClick}>
                <span className="Title-small">{selected}</span>
                <Caret />
            </div>
            <Portal className='snb' refElement={dialog} onClosed={close => close && dialog.current?.close()}>
                <div ref={select} className='simple-select'>
                    {options.map(option => <button key={option.label} onClick={onSelectPageClick(option)}><Text children={option.label} /></button>)}
                </div>
            </Portal>
        </span>
    )
}
