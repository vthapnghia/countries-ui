import Header from "./Components/Header";
import "./App.css";
import MainContent from "./Components/MainContent";
import styled from "styled-components";
import { ThemeContext } from "./Components/ThemeContext/themeContext";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const themeContext = useContext(ThemeContext);
  return (
    <AppContainer className={themeContext.theme}>
      <Router>
        <Header />
        <ContentContainer>
          <Routes>
            <Route exact path='/' element={<MainContent />}/>
            <Route exact path='/region/:regionName' element={<MainContent />}/>
          </Routes>
        </ContentContainer>
      </Router>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  max-width: 1280px;
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0 12px;
`;
