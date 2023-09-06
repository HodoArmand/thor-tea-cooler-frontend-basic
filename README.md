# thor-tea-cooler-frontend-basic
Thor Tea Cooler | Frontend | basic HTML + CSS

This is a simple client webapplication for the [Thor tea Cooler](https://github.com/HodoArmand/thor-tea-cooler) IoT Device's API. The frontend code was built with the traditional HTML5+CSS3+JS ES6 techstack.

![Screenshot - Light mode](https://github.com/HodoArmand/thor-tea-cooler-frontend-basic/blob/main/docs/ttcScreenshotLight.JPG)

![Screenshot - Dark mode](https://github.com/HodoArmand/thor-tea-cooler-frontend-basic/blob/main/docs/ttcScreenshotDark.JPG)

![Screenshot of a configurations page - Light mode](https://github.com/HodoArmand/thor-tea-cooler-frontend-basic/blob/main/docs/ttcScreenshotLightConfig.JPG)

# Build Instructions

The project uses npm build tools for quick development, download and build the public CSS and JS files with:

```
npm run prod
```

# Development tools

All available commands are:


*Build production mode*
```
npm run prod
```
*Build development mode, watch for changes*
```
npm run dev-watch
```
*Build development mode*
```
npm run dev
```
*Build production JS code*
```
npm run js-prod
```

*Build development JS code*
```
npm run js-dev
```

*Build development JS code, watch for changes*
```
npm run js-watch
```

*Build production CSS code*
```
npm run css-prod
```

*Build development CSS code*
```
npm run css-dev
```

*Build development CSS code, watch for changes*
```
npm run css-watch
```

*Clean CSS and JS files*
```
npm run clean
```

*Clean JS files*
```
npm run clean-js
```

*Clean CSS files*
```
npm run clean-css
```

# Libraries used

The project utilizes [npm](https://www.npmjs.com/) for build tools. Styling is build with [tailwindCSS](https://tailwindcss.com/), [SVGInject](https://github.com/iconfu/svg-inject) is used for styleable svg images. Live temperature chart is built with [ChartJS](https://www.chartjs.org/). Promise based async HTTP requests are made with the amazing [Axios HTTP Client library](https://github.com/axios/axios). Free and open source web icons from [Tabler Icons](https://tabler-icons.io/).
