import {Pages} from "./app.js";

export function renderHomePage($page) {
    $page.empty();
    $page.load("./views/homepage.html");
}