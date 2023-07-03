import './index.css'

import Navbar from '../Navbar'
import Cookies from 'js-cookie'

const Profile = (props) =>{
    const onclicklogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
    }
    return(
    <div className='pop'> 
        <Navbar/>
        <h1 className='profile-heading'>Account</h1>
        <hr className='hr' />
        <div className='profile-details1'>
            <h1 className='profile-membership'>MemberShip</h1>
            <div>
                <h3>Ravichandra@gmail.com</h3>
                <p>Password:*********</p>
            </div>
        </div>
        <hr className='hr' />
        <div className='profile-details1'>
            <h1 className='profile-membership'>Plan Details</h1>
            <div>
                <h3>Premium</h3>
                <p>Ultra Hd</p>
            </div>
            </div>
            <hr className='hr' />
            <button className='logout' onClick={onclicklogout}>Logout</button>
    </div>
)}

export default Profile