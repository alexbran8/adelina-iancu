import LogoPicture from "../../logo.png"
import "./Logo.css"

export const Logo = () =>

    {
        return (
            <div className="logo">
            <img 
                src={LogoPicture} 
                alt="Logo" 
                className="responsive-logo" 
            />
        </div>
        )
    }