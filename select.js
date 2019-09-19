function selectArea(_xyz, location) { // selects area from gazetteer

    const xhr = new XMLHttpRequest();

    xhr.open('GET',
        _xyz.host + '/api/location/select/id?' +
        _xyz.utils.paramString({
            locale: _xyz.workspace.locale.key,
            layer: location.layer,
            table: location.table,
            id: location.id,
            token: _xyz.token
        }));

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    let current_area = document.getElementById('current_area');

    xhr.onload = e => {

        if (e.target.status !== 200) return;

        // show headers
        let headers = document.querySelectorAll('div div.headers');
        for (let i = 0; i < headers.length; i++) {
            headers[i].style.display = 'block';
        }

        location.infoj = e.target.response.infoj;
        location.geometry = e.target.response.geomj;

        const _location = _xyz.locations.location(location); // make location

        _xyz.gazetteer.current_location = _location; // make it current

        _xyz.gazetteer.current_location.Marker = _xyz.geom.geoJSON({
            json: {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: _xyz.utils.turf.pointOnFeature(_location.geometry).geometry.coordinates
                }
            },
            style: _xyz.gazetteer.style
        });

        // Create location view.
        _location.view();
        _location.draw(_xyz.gazetteer.style);
        _location.flyTo();

        current_area.classList.add("shaded");
        current_area.appendChild(_location.view.node);
    }

    if (_xyz.gazetteer.current_location) { // deselect previous feature from gazetteer

        _xyz.map.removeLayer(_xyz.gazetteer.current_location.Layer);
        _xyz.map.removeLayer(_xyz.gazetteer.current_location.Marker);

        _xyz.gazetteer.current_location = null;

        // hide previous headers
        let headers = document.querySelectorAll('.grid.tables .headers');
        for (let i = 0; i < headers.length; i++) {
            headers[i].style.display = 'none';
        }

        // remove previous table content
        let tables = document.querySelectorAll('.grid.tables .tabs');
        for (let i = 0; i < tables.length; i++) {
            tables[i].innerHTML = '';
        }

        current_area.classList.remove("shaded");
        current_area.innerHTML = '';
    }

    xhr.send();
}

function selectFromCoreLayer(_xyz, location) { // select feature from the core layer

    const xhr = new XMLHttpRequest();

    xhr.open('GET',
        _xyz.host + '/api/location/select/id?' +
        _xyz.utils.paramString({
            locale: _xyz.workspace.locale.key,
            layer: location.layer,
            table: location.table,
            id: location.id,
            token: _xyz.token
        }));

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.onload = e => {

        if (e.target.status !== 200) return;

        location.infoj = e.target.response.infoj;
        location.geometry = e.target.response.geomj;

        const _location = _xyz.locations.location(location); // make location
        _xyz.locations.current = _location; // make it current

        // Create location view.
        _location.view();
        _location.draw(core_layer_style);

        _xyz.mapview.popup({ // make popup
            latlng: [_location.marker[1], _location.marker[0]],
            content: _location.view.node,
            closeButton: true
        });
    }
    xhr.send();
}