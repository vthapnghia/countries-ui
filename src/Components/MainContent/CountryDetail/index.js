import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../ThemeContext/themeContext";
import CountryInfo from "./CountryInfo";
import { getCountryByName } from "../../Store/Actions/countriesActions";
import Loading from "../../Loading/Loading";

function CountryDetail() {
  const themeContext = useContext(ThemeContext);
  const slug = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.Countries.country);
  const loading = useSelector((state) => state.Countries.loading);

  useEffect(() => {
    dispatch(getCountryByName(slug.countryName));
  }, [slug.countryName, dispatch]);

  return (
    <Wrapper>
      <div
        className={`go-back-btn ${themeContext.theme}`}
        onClick={() => navigate(-1)}
      >
        Go back
      </div>
      {loading ? (
        <Loading />
      ) : (
        <CountryContainer>
          <div className="flagCountry">
            <img
              src={
                country
                  ? country.flag
                  : "https://via.placeholder.com/300x200?text=Image"
              }
              alt=""
            />
          </div>
          <CountryInfo />
        </CountryContainer>
      )}
    </Wrapper>
  );
}

export default CountryDetail;

const Wrapper = styled.div`
  padding-top: 20px;
  .go-back-btn {
    display: block;
    width: 80px;
    height: 28px;
    line-height: 28px;
    padding: 2px 4px;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    filter: brightness(0.9);
    &:hover {
      filter: brightness(1);
      font-weight: bold;
      cursor: default;
      use-select: none;
    }
  }
`;

const CountryContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
  .flagCountry {
    max-width: 400px;
    width: 100%;
    height: 100%;
    margin-bottom: 12px;
    box-shadow: var(--BoxShadow);
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
