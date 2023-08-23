import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Back() {

    return (
        <header className="container_header">
            <nav className="content_nav">
                <div className="content_back">
                    <Link to='/home'>
                        <FaArrowCircleLeft
                            color='green'
                            size={35}
                        />
                    </Link>
                </div>
            </nav>
        </header>
    );
}
