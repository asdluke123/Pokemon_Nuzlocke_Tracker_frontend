import {Link} from 'react-router-dom'

const Nav = ({user,setUser}) =>{
    return(
    <div>
       {user ?(<nav>
                <Link to = '/'>Games</Link>
                <Link to ='/social'>Social</Link>
                <Link to = '/' onClick={() => { 
                    localStorage.clear()
                     setUser()}}>Sign Out</Link>
            </nav> 
            ):(
            <nav>
                <Link to = '/'>Home</Link>
                <Link to ='/social'>Social</Link>
                <Link to = '/login'>Log In</Link>
                <Link to = '/signup'>Sign Up</Link>
            </nav>
            )
       }
    </div>
    )
}
export default Nav