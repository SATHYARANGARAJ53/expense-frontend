import Image from '../assets/react.svg'
function Header(){
    return (
        <div className="Heading">
            <img src={Image}/>Expense Tracker
            <nav className ="Body">
                <h6>Home</h6>
                <h6>About</h6>
                <h6>ContactUs</h6>
            </nav> 
        </div>
    )
}
export default Header;