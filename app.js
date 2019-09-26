// to apply on the core layer
const core_layer_style = {
    stroke: true,
    color: '#FFF',
    weight: 3,
    fillColor: '#FFF',
    fillOpacity: 0.2,
    fill: true
}

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

        // get core layer properties
        const core_layer_key = 'Wellbeing Index';
        const core_layer = _xyz.layers.list[core_layer_key];
        const core_layer_themes = _xyz.layers.list[core_layer_key].style.themes;

        // show core layer and make legend
        core_layer.view();
        makeLegend(_xyz, core_layer);

        // make dropdown options
        const layer_dropdown_options = [];
        const core_layer_themes_options = [];

        Object.keys(core_layer.style.themes).map(key => {
            core_layer_themes_options.push(key);
        });

        Object.values(_xyz.layers.list).map(layer => {
            if (layer.group && layer.group === 'Locations') {
                layer_dropdown_options.push({
                    [layer.key]: layer.name || layer.key
                });
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
                makeLegend(_xyz, core_layer);
            }
        });

        // add theme dropdown to DOM
        document.getElementById('core_layer_themes_dropdown').appendChild(core_layer_themes_dropdown);

        // add first locale dropdown
        document.getElementById('xyz_locale_dropdown_1').appendChild(createRegionList(_xyz));

        // intialize gazetteer
        _xyz.gazetteer.init({
            target: document.getElementById('layer_search'),
            callback: () => {
                document.getElementById('xyz_locale_dropdown_1').appendChild(createRegionList(_xyz));
            }
        });

        // remove selected feature from map when popup is closed
        _xyz.map.on('popupclose', () => {
            if (_xyz.locations.current) _xyz.locations.current.remove();
        });

        // create LSOA checkbox
        document.querySelector('#xyz_map_toggles').appendChild(_xyz.utils.wire()
            `
            <table><tr><td col-span=2>
            <label class="checkbox"><small style="vertical-align: super;">Show LSOAs.</small>
            <input type="checkbox"
            onchange=${ e => {

                e.target.checked ? _xyz.layers.list["LSOA"].show() : _xyz.layers.list["LSOA"].remove();

            }}><div class="checkbox_i"></div></td></tr></table>`);

        // select feature
        _xyz.locations.select = location => location.layer === core_layer_key ? selectFromCoreLayer(_xyz, location) : selectArea(_xyz, location);

    }
});