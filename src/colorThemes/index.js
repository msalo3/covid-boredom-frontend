export const lightTheme = (randomize = false) => {
  if (randomize) {
  }
  return {
    "--color-bg": "rgb(239, 251, 255)",
    "--color-off-bg": "rgb(220, 245, 255, 0.4)",
    "--color-text": "#282c34",
    "--color-btn-bg": "#00BDFF",
    "--color-nba-option": "rgb(182, 215, 255, 0.4)",
    "--color-hover-btn-bg": "#97ED4E",
    "--color-hover-border": "#282c34",
    "--color-btn-selected": "#97ED4E",
    "--color-letter-selected": "#282c34",
    "--color-letter-spin": "#3c5d74",
    "--color-redacted": "#97ED4E",
    "--color-menu-icon-hover": "#3c5d74",
    "--color-menu-icon-selected": "#00BDFF",
    "--color-loader-bg": "rgba(136, 136, 136, 0.2)",
    "--color-nba-option-hover": "#00BDFF",
  }
}

export const darkTheme = (randomize = false) => {
  return {
    "--color-bg": "#282c34",
    "--color-text": "#F5F9FF",
    "--color-btn-bg": "#555",
    "--color-nba-option": "#555",
    "--color-hover-btn-bg": "#34425A",
    "--color-btn-selected": "#65ECBA",
    "--color-hover-border": "#97ED4E",
    // Menu
    "--color-menu-icon-hover": "#3da9fc",
    "--color-menu-icon-selected": "#0c969b",
    // Scattergories
    "--color-letter-spin": "#34425A",
    "--color-letter-selected": "#3da9fc",
    "--color-redacted": "#000",
    "--color-loader-bg": "rgba(151, 237, 78, 0.7)",
    "--color-nba-option-hover": "#0c969b",
  }
}
