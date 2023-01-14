export var router = (function () {

    "use strict";

    let routes = [];

    function addRoute(route, handler) {
        routes.push({parts: route.split('/'), handler: handler});
    }

    function load(route) {
        window.location.hash = route;
    }

    function start() {

        let path = window.location.hash.substr(1),
            parts = path.split('/'),
            partsLength = parts.length;

        for (let i = 0; i < routes.length; i++) {
            let route = routes[i];
            if (route.parts.length === partsLength) {
                let j;
                let params = [];
                for (j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    $(window).on('hashchange', start);

    return {
        addRoute: addRoute,
        load: load,
        start: start
    };

}());