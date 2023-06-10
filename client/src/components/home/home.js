import { Link } from "react-router-dom";
import './home.css'

function Home(){

    return (
        <div className='buttonContainer'>
        <div>
             <Link to='/newrunner'>
        <input className="homeButton" type='button' value='New Runner'/>
        </Link>

        <Link to='/runner'>
        <input className='homeButton' type='button' value='Training programme' />
        </Link>
        
        </div>
        </div>
    )

}

export default Home;