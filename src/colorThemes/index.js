export const lightTheme = (randomize = false) => {
  if (randomize) {
  }
  return {
    "--color-bg": "rgb(239, 251, 255)",
    "--color-text": "#282c34",
    "--color-btn-bg": "#00BDFF",
    "--color-off-bg": "rgb(220, 245, 255, 0.4)",
    "--color-hover-btn-bg": "#97ED4E",
    "--color-btn-selected": "#97ED4E",
    "--color-hover-border": "#282c34",
    // Menu
    "--color-menu-icon": "#282c34",
    "--color-menu-icon-hover": "#00BDFF",
    "--color-menu-icon-selected": "#ffc5b2",
    // Scattergories
    "--color-letter-selected": "#282c34",
    "--color-letter-spin": "#3c5d74",
    "--color-redacted": "#97ED4E",
    // NBA
    "--color-loader-bg": "rgba(136, 136, 136, 0.2)",
    "--color-nba-option": "rgb(182, 215, 255, 0.4)",
    "--color-nba-option-hover": "#00BDFF",
    // Pulse
    "--color-pulse": "rgba(151,237,78,1)",
    "--color-pulse-one": "rgba(0, 0, 0, 0.7)",
    "--color-pulse-two": "rgba(0, 0, 0, 0)",
    "--color-pulse-three": "rgba(0, 0, 0, 0)",
  }
}

export const darkTheme = (randomize = false) => {
  return {
    "--color-bg": "#282c34",
    "--color-text": "#F5F9FF",
    "--color-btn-bg": "#555",
    "--color-off-bg": "#555",
    "--color-hover-btn-bg": "#34425A",
    "--color-btn-selected": "#65ECBA",
    "--color-hover-border": "#97ED4E",
    // Menu
    "--color-menu-icon": "#F5F9FF",
    "--color-menu-icon-hover": "#3da9fc",
    "--color-menu-icon-selected": "#0c969b",
    // Scattergories
    "--color-letter-spin": "#34425A",
    "--color-letter-selected": "#3da9fc",
    "--color-redacted": "#000",
    // NBA
    "--color-loader-bg": "rgba(151, 237, 78, 0.7)",
    "--color-nba-option": "#555",
    "--color-nba-option-hover": "#0c969b",
    // Pulse
    "--color-pulse": "rgba(101, 236, 186, 1)",
    "--color-pulse-one": "rgba(245, 249, 255, 1)",
    "--color-pulse-two": "rgba(245, 249, 255, 0.7)",
    "--color-pulse-three": "rgba(245, 249, 255, 1)",
  }
}
