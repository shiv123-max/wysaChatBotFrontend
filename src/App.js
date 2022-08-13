import { useState, useEffect } from "react";
import "./App.css";
import Screen from "./components/Screen";
import { AiFillSetting } from "react-icons/ai";

function App() {
  const [themes, setThemes] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState({});

  useEffect(() => {
    fetchThemes();
  }, []);

  console.log(selectedTheme);

  const fetchThemes = async () => {
    const res = await fetch("http://localhost:5000/getThemes");
    const themes = await res.json();
    setThemes(themes);
    setSelectedTheme(themes[0]);
    localStorage.getItem("currentTheme") &&
      setSelectedTheme(JSON.parse(localStorage.getItem("currentTheme")));
  };
  return (
    <div style={{ background: selectedTheme.background }} className="App">
      <div className="header">
        <button className="settingsBtn" onClick={() => setClicked(!clicked)}>
          <AiFillSetting />x  
        </button>
        {clicked && (
          <div className="dropDown">
            {themes.map((theme) => {
              return (
                <div
                  onClick={() => {
                    localStorage.setItem("currentTheme", JSON.stringify(theme));
                    setSelectedTheme(theme);
                  }}
                  className="themeItem"
                  key={theme.id}
                >
                  <div
                    style={{ background: theme.bubbleColor }}
                    className="leftThemeItem"
                  >
                    <p>Bubble</p>
                  </div>
                  <div
                    style={{ background: theme.background }}
                    className="rightThemeItem"
                  >
                    <p>Background</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Screen selectedTheme={selectedTheme} />
    </div>
  );
}

export default App;
