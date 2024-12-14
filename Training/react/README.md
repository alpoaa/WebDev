# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Creating React project: 
npm create vite@latest [project] -- --template react
cd [project]
npm install
npm run dev


JSON- server use:
Place the correct json file to folder root & go to correct folder with cmd
npx json-server --port=3001 --watch db.json
Add it as development dependecy:
npm install json-server --save-dev

Axios install:
(1) install using npm -> go root of project (where is package.json) and perform command on cmd: npm install axios
(2) install it by adding necessary packages straight to package.json file
