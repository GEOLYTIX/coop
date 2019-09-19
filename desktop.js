_xyz({
    host: document.head.dataset.dir,
    callback: _xyz => {
        _xyz.mapview.create({
            target: document.getElementById('_map'),
            scrollWheelZoom: true,
            zoomControl: true
        });

        // to apply on search results
        _xyz.gazetteer.style = {
            stroke: true,
            color: "#FFF",
            opacity: 0.3,
            weight: 2,
            fillColor: "#FFF",
            fillOpacity: 0.3,
            fill: true,
            icon: {
                url: "https://raw.githubusercontent.com/GEOLYTIX/MapIcons/master/poi_pin_filled/poi_simple_pin.svg?sanitize=true",
                anchor: [40, 80],
                size: 80
            }
        };

        // to apply on the core layer
        const core_layer_style = {
            stroke: true,
            color: '#FFF',
            weight: 2,
            fillColor: '#FFF',
            fillOpacity: 0.2,
            fill: true
        }

        // get core layer properties
        const core_layer_key = 'Wellbeing Index';
        const core_layer = _xyz.layers.list[core_layer_key];
        const core_layer_themes = _xyz.layers.list[core_layer_key].style.themes;

        // show core layer and make legend
        core_layer.view();
        makeLegend(core_layer);

        // make dropdown options
        const layer_dropdown_options = [];
        const core_layer_themes_options = [];

        Object.keys(core_layer.style.themes).map(key => {
            core_layer_themes_options.push(key);
        });

        Object.values(_xyz.layers.list).map(layer => {
            if (layer.group && layer.group === 'Locations') {
                layer_dropdown_options.push({
                    [layer.key]: layer.name || layer.key });
            }
        });

        // create themes dropdown
        const core_layer_themes_dropdown = _xyz.utils.dropdownCustom({
            entries: core_layer_themes_options,
            singleSelect: true,
            selectedIndex: 0,
            callback: e => {
                e.stopPropagation();
                core_layer_themes_dropdown.querySelector('.head').textContent = e.target.textContent;
                core_layer.style.theme = core_layer.style.themes[e.target.dataset.field];
                core_layer.loaded = false;
                core_layer.get();
                core_layer.view.update();
                makeLegend(core_layer);
            }
        });

        // add theme dropdown to DOM
        document.getElementById('core_layer_themes_dropdown').appendChild(core_layer_themes_dropdown);

        // add first locale dropdown
        document.getElementById('xyz_locale_dropdown_1').appendChild(createRegionList());

        // intialize gazetteer
        _xyz.gazetteer.init({
            target: document.getElementById('layer_search'),
            callback: () => {
                document.getElementById('xyz_locale_dropdown_1').appendChild(createRegionList());
            }
        });

        // remove selected feature from map when popup is closed
        _xyz.map.on('popupclose', () => {
            if (_xyz.locations.current) _xyz.locations.current.remove();
        });

        document.querySelector('#xyz_map_toggles').appendChild(_xyz.utils.wire()`
            <table><tr><td col-span=2>
            <label class="checkbox"><small style="vertical-align: super;">Show LSOAs.</small>
            <input type="checkbox"
            onchange=${ e => {

                e.target.checked ? _xyz.layers.list["LSOA"].show() : _xyz.layers.list["LSOA"].remove();

            }}><div class="checkbox_i"></div></td></tr></table>`);

        // select feature
        _xyz.locations.select = location => location.layer === core_layer_key ? selectFromCoreLayer(location) : selectArea(location);

        // make legend obvs
        function makeLegend(layer) {
            document.getElementById('xyz_legend').innerHTML = '';
            if (layer.style.theme) {
                document.getElementById('xyz_legend').appendChild(_xyz.utils.wire()
                    `<div>${layer.name || ''}`);
                document.getElementById('xyz_legend').appendChild(_xyz.utils.wire()
                    `<small>${layer.style.theme.label || ''}`);
                document.getElementById('xyz_legend').appendChild(layer.style.legend);
            }
        }

        function selectArea(location) { // selects area from gazetteer

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

        function selectFromCoreLayer(location) { // select feature from the core layer

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

        function createRegionList(){

            document.getElementById('xyz_locale_dropdown_1').innerHTML = '';
            document.getElementById('xyz_locale_dropdown_2').innerHTML = '';

            let locale_dropdown_1 = _xyz.utils.dropdownCustom({
                entries: [
                {"E15000006": "Eastern"},
                {"E15000004": "East Midlands"},
                {"E15000007": "London"},
                {"E15000001": "North East"},
                {"N08000001": "Northern Ireland"},
                {"E15000002": "North West"},
                {"S92000003": "Scotland"},
                {"E15000008": "South East"},
                {"E15000009": "South West"},
                {"W08000001": "Wales"},
                {"E15000005": "West Midlands"},
                {"E15000003": "Yorkshire and The Humber"}],
                singleSelect: true,
                placeholder: 'Select region',
                callback: e => {
                    e.stopPropagation();

                    document.querySelector('.gazetteer input').value = '';

                    document.getElementById('xyz_locale_dropdown_2').innerHTML = '';

                    locale_dropdown_1.querySelector('.head').textContent = e.target.textContent;



                    let layer = _xyz.layers.list["Local Authority"];

                    layer.filter = {};
                    layer.filter.current = {};
                    layer.filter.current["regioncode"] = {};
                    layer.filter.current["regioncode"].match = e.target.dataset.field;

                    const _xhr = new XMLHttpRequest();

                    _xhr.open('GET', _xyz.host + '/api/layer/table?' + _xyz.utils.paramString({
                        locale: _xyz.workspace.locale.key,
                        layer: "Local Authority",
                        table: "Overview",
                        filter: JSON.stringify(layer.filter.current),
                        token: _xyz.token
                    }));

                    _xhr.setRequestHeader('Content-Type', 'application/json');
                    _xhr.responseType = 'json';

                    _xhr.onload = e => {

                        if (e.target.status !== 200) return;

                        let entries = [];

                        e.target.response.forEach(each => {
                            entries.push({[each.qid]: each.lad_name});
                        });

                        const locale_dropdown_2 = _xyz.utils.dropdownCustom({
                            entries: entries,
                            singleSelect: true,
                            placeholder: 'Select Local Authority District',
                            callback: e => {

                                e.stopPropagation();

                                document.querySelector('.gazetteer input').value = '';

                                selectArea({
                                    layer: layer.key,
                                    table: layer.table,
                                    id: e.target.dataset.field
                                });

                                locale_dropdown_2.querySelector('.head').textContent = e.target.textContent;
                            }
                        });

                        document.getElementById('xyz_locale_dropdown_2').appendChild(locale_dropdown_2);
                    }
                    _xhr.send();
                }
            });

            return locale_dropdown_1;
        }
    }
});