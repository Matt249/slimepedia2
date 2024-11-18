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
        <BrowserRouter basename="/">
            <NavBar />
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/slimepedia" element={<Header />} />
                <Route path="/slimes" element={<Slimes />} />
                <Route path="/slimes/:slime" element={<Slimes />} />
                <Route path="/food" element={<Food />} />
                <Route path="/food/:food" element={<Food />} />
                <Route path="/items/" element={<Items />} />
                <Route path="/items/:tab" element={<Items />} />
                <Route path="/items/:tab/:item" element={<Items />} />
                <Route path="/map/*" element={<Map />} />
                <Route path="/regions" element={<Regions />} />
                <Route path="/regions/:region" element={<Regions />} />
                <Route path="/weather" element={<Header />} />
                <Route path="/blueprints" element={<Blueprints />} />
                <Route path="/blueprints/:tab" element={<Blueprints />} />
                <Route path="/blueprints/:tab/:blueprint" element={<Blueprints />} />
                <Route path="/blueprints/:tab/:blueprint/:tier" element={<Blueprints />} />
                <Route path="/buildings" element={<Buildings />} />
                <Route path="/buildings/:building" element={<Buildings />} />
                <Route path="/buildings/:building/:upgrade" element={<Buildings />} />
            </Routes>
        </BrowserRouter>
    );
}
