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


export default function index() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/slimes" element={<Slimes />} />
                <Route path="/food" element={<Food />} />
                <Route path="/items" element={<Items />} />
                <Route path="/map" element={<Map />} />
                <Route path="/regions" element={<Regions />} />
                <Route path="/weather" element={<Header dark={false} />} />
                <Route path="/blueprints" element={<Blueprints />} />
                <Route path="/buildings" element={<Buildings />} />
            </Routes>
        </BrowserRouter>
    );
}
