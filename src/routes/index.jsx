import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Slimes } from "../pages/Slimes";
import { NavBar } from "../components/NavBar";
import { Food } from "../pages/Food";
import { Items } from "../pages/Items";
import { Map } from "../pages/Map";
import { Regions } from "../pages/Regions";
import { Header } from "../components/Header";
import { Blueprints } from "../pages/Blueprints";
import { Buildings } from "../pages/Buildings";
import { slimeNames } from "../text/slimes";
import { foodNames } from "../text/food";
import { resourcesNames } from "../text/resources";
import { toyNames } from "../text/toys";
import { RegAndRanchIds } from "../text/regions";


export default function index() {
    return (
        <BrowserRouter basename="/">
            <NavBar />
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/slimepedia" element={<Header />} />
                <Route path="/slimes" element={<Slimes />} />
                {slimeNames.map((slime) => (<Route key={slime} path={`/slimes/${slime}`} element={<Slimes slime={slime} />} />))}
                <Route path="/food" element={<Food />} />
                {foodNames.map((food) => (<Route key={food} path={`/food/${food}`} element={<Food food={food} />} />))}
                <Route path="/resources" element={<Items tab='resources' />} />
                <Route path="/toys" element={<Items tab='toys' />} />
                {resourcesNames.map((resource) => (<Route key={resource} path={`/resources/${resource}`} element={<Items item={resource} tab='resources' />} />))}
                {toyNames.map((toy) => (<Route key={toy} path={`/toys/${toy}`} element={<Items item={toy} tab='toys' />} />))}
                <Route path="/map" element={<Map />} />
                <Route path="/regions" element={<Regions />} />
                {RegAndRanchIds.map((region) => (<Route key={region} path={`/regions/${region}`} element={<Regions region={region} />} />))}
                <Route path="/weather" element={<Header />} />
                <Route path="/blueprints" element={<Blueprints />} />
                <Route path="/buildings" element={<Buildings />} />
            </Routes>
        </BrowserRouter>
    );
}
