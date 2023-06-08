import { Link } from "react-router-dom";
import './home.css'

function Home(){

    return (
        <div>
             <Link to='/newrunner'>
        <input className="newRunnerButton" type='button' value='New Runner'/>
        </Link>
        </div>
    )

}

export default Home;