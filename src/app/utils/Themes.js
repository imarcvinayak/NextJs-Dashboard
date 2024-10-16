import themesData from "../data/themes.json";
import themes from '../data/themesPalette.json'
import * as am5 from "@amcharts/amcharts5";

export function theme() {
  // const theme = users.filter(user => user.theme === userTheme)
  const color = [0x087f8c];

  return color;
}

export function selectYourTheme() {
  const themesList = themesData;
  const themes = Object.keys(themesList);
  const color = Object.values(themesList);

  return { themes, color };
}

export function generateColorVariations(baseColor, length) {
  let colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(am5.color(am5.Color.brighten(am5.color(baseColor), i * 0.9)));
  }
  return colors;
}

export function palette() {
    const palettes = themes.themes

    return palettes;
}