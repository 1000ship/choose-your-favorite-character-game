import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export default createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "GmarketSans";
    src: url(./res/fonts/GmarketSansTTFMedium.ttf);
    font-weight: 400;
  }
  @font-face {
    font-family: "GmarketSans";
    src: url(./res/fonts/GmarketSansTTFBold.ttf);
    font-weight: 600;
  }
  @font-face {
    font-family: "GmarketSans";
    src: url(./res/fonts/GmarketSansTTFLight.ttf);
    font-weight: 200;
  }
  a {
      text-decoration: none;
      color: inherit;
  }
  body {
    font-family: "GmarketSans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`
