import "./FooterContainer.css"

const FooterContainer = () => {

    return (
        <div className="footer-container">
            <a className="footer-link" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
            <p className="footer-text"><a className="footer-link" href="/AeroSure/about" >Disclaimer</a></p>
            <p className="footer-text">© 2023 Mahzabin, Daniel & Michael.</p>
        </div>
    )
}

export default FooterContainer