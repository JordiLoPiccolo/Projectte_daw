import type { ReproCardProps } from "./ReproCardProps";

const ReproCard = ({ trackInfo }: ReproCardProps)=>{
   
   
    return (
        <>
            <h1>Títol: {trackInfo.title}</h1>
            <p>Volum:</p>
           
        </>
    )
}

export default ReproCard;