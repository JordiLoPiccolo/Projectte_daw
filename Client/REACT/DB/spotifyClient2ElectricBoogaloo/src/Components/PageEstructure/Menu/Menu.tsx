import { Link } from "react-router";


const Menu = () => {
    return (
        <nav>
            <Link to="/Play">Reproducció</Link>
            <Link to="/SongManagement">Gestió cancons</Link>
        </nav>
    )
}
export default Menu;