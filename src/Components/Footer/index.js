import { useContext } from "react"
import styled from "styled-components"
import {ThemeContext} from "../ThemeContext/themeContext"

function Footer(){
    const themeContext = useContext(ThemeContext)
    return(
        <FooterContainer className={themeContext.theme}>
            <h4>Copyright &copy; NghiaVT</h4>
            <p>**********@gmail.com</p>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.div`
    width: 100%;
    height: 8vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
`