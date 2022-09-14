import {Link} from 'react-router-dom'

const Nav = ({user,setUser}) =>{
    return(
    <div>
       {user ?(<nav>
        
                <Link to = '/'>Games</Link>
                <Link to ='/social'>Social</Link>
                <div>
                    <Link to = '/' onClick={() => { 
                        localStorage.clear()
                        setUser()}}>Sign Out</Link>
                </div>
            </nav> 
            ):(
            <nav>
                <Link to = '/'>Home</Link>
                <Link to ='/social'>Social</Link>
                <div>
                    <Link to = '/login'>Log In</Link>
                    <Link to = '/signup'>Sign Up</Link>
                </div>
            </nav>
            )
       }
    </div>
    )
}
export default Nav