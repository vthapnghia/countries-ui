import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./countryInfoStyles.module.scss";
import { ThemeContext } from "../../ThemeContext/themeContext";
import { Link } from "react-router-dom";
import ScrollBar from "react-perfect-scrollbar";

const getLanguages = (country) => {
  let result = "";
  country.languages.forEach((element) => {
    if (result !== "") result = result + "-" + element.name;
    else result += element.name;
  });
  return result;
};
const getCountryNameByCode = async (code) => {
  const result = await axios.get(
    `https://restcountries.com/v2/alpha?codes=${code}`
  );
  return result.data;
};
function CountryInfo() {
  const themeContext = useContext(ThemeContext);
  const country = useSelector((state) => state.Countries.country);
  const [countriesBorder, setCountriesBorder] = useState([]);

  useEffect(() => {
    if (country && country.borders) {
      getCountryNameByCode(country.borders)
        .then((res) => {
          const countryName = res.map((country) => country.name);
          setCountriesBorder(countryName);
        })
        .catch((err) => console.log(err));
    }
  }, [country]);
  return (
    <ScrollBar style={{maxHeight: '70vh', overflow:'hidden'}}>
      <div className={styles.CountryInfo}>
        {country && (
          <>
            <h3 className={styles.countryName}>{country.name}</h3>
            <table>
              <tbody>
                <tr>
                  <td className={styles.countryInfo__title}>Native Name</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {country.nativeName}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Offical</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {country.altSpellings}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Population</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {new Intl.NumberFormat().format(country.population)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Region</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {country.region}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Sub Region</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {country.subregion}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Capital</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {country.capital}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>
                    Top Level Domain
                  </td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {country.topLevelDomain}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Currencies</td>
                  <td>:</td>
                  <td
                    className={styles.countryInfo__value}
                  >{`${country.currencies[0].code} - ${country.currencies[0].name}`}</td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>Languages</td>
                  <td>:</td>
                  <td className={styles.countryInfo__value}>
                    {getLanguages(country)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.countryInfo__title}>
                    Border Countries
                  </td>
                  <td>:</td>
                  <td className={styles.borderList}>
                    {countriesBorder.length > 0 &&
                      countriesBorder.map((country) => (
                        <Link to={`/country/${country}`} key={country}>
                          <div
                            className={clsx(
                              styles.borderItem,
                              themeContext.theme
                            )}
                          >
                            {country}
                          </div>
                        </Link>
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </ScrollBar>
  );
}

export default CountryInfo;
