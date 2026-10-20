import Home from "./pages/Home";
export default function App(){const path=window.location.pathname;return <Home initialLang={path.startsWith("/en/")?"en":"id"} initialPath={path}/>}
