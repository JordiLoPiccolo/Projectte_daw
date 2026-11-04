
import type { HistoryListProps } from "./Types/HistoryListProps";

let History: string[] = [];

const ListHistory = (props: HistoryListProps) => {

    History.push(props.Historytrack);
    return (
        <>
            {
                History.map(

                    (t: string) => {
                        return (
                            <>
                                <tr>
                                    <td><b>Títol</b>: {t}</td>
                                    <td>{new Date().toTimeString().slice(0, 8)}</td>
                                </tr>
                            </>
                        )

                    }

                )
            }
        </>
    )
}

export default ListHistory;