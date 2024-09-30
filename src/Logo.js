import LogoPicture from "./logo.png"

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