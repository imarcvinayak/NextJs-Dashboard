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

export function hexToAdjustedHex(hex, opacity) {
  // Helper function to convert hex code to RGB
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
  }

  // Helper function to convert RGB to hex
  function rgbToHex(r, g, b) {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  // Ensure opacity is between 0 and 1
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be between 0 and 1');
  }

  // Convert hex to RGB
  const { r, g, b } = hexToRgb(hex);

  // Apply opacity (assuming white background for conversion)
  const newR = Math.round((1 - opacity) * 255 + opacity * r);
  const newG = Math.round((1 - opacity) * 255 + opacity * g);
  const newB = Math.round((1 - opacity) * 255 + opacity * b);

  // Convert back to hex
  return rgbToHex(newR, newG, newB);
}

