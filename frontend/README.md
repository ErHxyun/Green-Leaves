# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Connosoar Frontend

## Overview

Connosoar is a React-based frontend for art asset trading, designed for a clean, mobile-friendly experience using Material UI. The app features a trading dashboard, order flow, user profile management, and a bottom navigation bar.

## Features

- **Trade Dashboard**: Place, review, and confirm orders for art assets.
- **Order Flow**: Custom number pad for entering amounts, order review, and confirmation screens.
- **Profile Page**: View and edit user profile (name, username, bio, email). Changes are reflected in the drawer and profile page.
- **Drawer Navigation**: Accessible via the top-left menu icon, showing account options and profile info.
- **Bottom Navigation Bar**: Quick access to Home, Search, Trade, Market, and Profile. Selected icon turns black.
- **Routing**: `/`, `/trade`, `/trade-details`, `/profile`, `/search`, `/market` routes.

## How to Run

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Current Progress

- Trade dashboard and order flow implemented.
- Editable profile page with live updates.
- Drawer navigation with profile info and actions.
- Responsive bottom navigation bar.
- Routing for all main sections.

## Next Steps

- Connect backend APIs for real trading data.
- Implement portfolio and market pages.
- Add authentication and user management.
- Improve error handling and loading states.

## Folder Structure

- `src/pages/TradeDetails.js`: Main trading/order flow UI
- `src/pages/Profile.js`: User profile and edit functionality
- `src/components/BottomNav.js`: Bottom navigation bar
- `src/App.js`: Routing setup

## Contact

For questions or feedback, please reach out to the project owner.

## Internationalization (i18n)

This app uses `i18next` + `react-i18next` for bilingual support (English/Chinese).

Customize translations:

- Edit locale files: see [src/locales/en/common.json](src/locales/en/common.json) and [src/locales/zh/common.json](src/locales/zh/common.json).
- Add new keys and use them in components via `t('your.key')`.
- Persist toggle: the selected language is saved to `localStorage` and loaded on startup from [src/services/i18n.js](src/services/i18n.js).
- To translate new pages, add keys under logical sections (e.g., `about.title`, `contact.form.submit`) and replace hardcoded strings with `t()`.

Examples:

- In a component: `const { t } = useTranslation();` then `t('nav.home')`.
- Interpolation: `t('impact.count', { count: 132 })` with JSON like `{ "impact": { "count": "{{count}} Children Supported" } }`.
- Plurals: define `impact.count_one` and `impact.count_other` and call `t('impact.count', { count })`.

Files to look at:

- Header toggle: [src/components/SiteHeader.jsx](src/components/SiteHeader.jsx)
- i18n setup: [src/services/i18n.js](src/services/i18n.js)
- Home page strings: [src/pages/Home.js](src/pages/Home.js)

Add another language:

1. Create `src/locales/<lang>/common.json`.
2. Import and register it in `resources` inside [src/services/i18n.js](src/services/i18n.js).
3. Update the toggle UI to show/select the new language.

Optional enhancements:

- Split translations by namespace (e.g., `home.json`, `about.json`) and load per page.
- Auto-detect browser language or region if desired.

---

_This README will be updated as development continues._
