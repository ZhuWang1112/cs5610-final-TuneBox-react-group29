import "./index.css";
import {Navigate} from "react-router-dom";
import {useNavigate} from "react-router";


const UpgradeBanner = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/premium');
    }
    return (
        <div className="promo-container">
            <h2>Limited Time Offer</h2>
            <p>Upgrade to VIP and enjoy high-quality experience</p>
            <button onClick={handleClick}>Upgrade Now</button>
        </div>

    );
}
export default UpgradeBanner;