import React, { Suspense, ComponentType, LazyExoticComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { ErrorPage } from "../pages/ErrorPage";

function lazyWithDefault<T extends ComponentType>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T> {
    return React.lazy(factory);
}

// Utilisation de React.lazy pour les imports dynamiques
const Slimes = lazyWithDefault(() => import("../pages/Slimes"));
const Food = lazyWithDefault(() => import("../pages/Food"));
const Items = lazyWithDefault(() => import("../pages/Items"));
// const Map = lazyWithDefault(() => import("../pages/Map"));
const Regions = lazyWithDefault(() => import("../pages/Regions"));
const Header = lazyWithDefault(() => import("../pages/Header"));
const Blueprints = lazyWithDefault(() => import("../pages/Blueprints"));
const Buildings = lazyWithDefault(() => import("../pages/Buildings"));

export default function Index() {
    return (
        <BrowserRouter basename="/">
            <NavBar />
            <Suspense fallback={<div>Loading...</div>}>
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
                    <Route path="/map/*" element={<Header />} />
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
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}