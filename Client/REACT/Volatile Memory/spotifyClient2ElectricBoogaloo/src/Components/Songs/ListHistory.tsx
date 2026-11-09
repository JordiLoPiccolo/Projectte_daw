
import type { HistoryListProps } from "./Types/HistoryListProps";

let History: string[] = [];

const ListHistory = (props: HistoryListProps) => {
    return (
        <>
            {
                props.history.map(
                    (entry, index) => {
                        return (
                            <tr key={`${entry.time}-${entry.title}-${index}`}>
                                <td><b>Títol</b>: {entry.title}</td>
                                <td>{entry.time}</td>
                            </tr>
                        )
                    }
                )
            }
        </>
    )
}

export default ListHistory;