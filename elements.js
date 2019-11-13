function makeLegend(_xyz, layer) { // make legend obvs

    let container_id = 'xyz_legend';

    document.getElementById(container_id).innerHTML = '';

    if (layer.style.theme) {

        document.getElementById(container_id).appendChild(_xyz.utils.wire()
            `<div>${layer.name || ''}`);

        document.getElementById(container_id).appendChild(_xyz.utils.wire()
            `<small>${layer.style.theme.label || ''}`);

        document.getElementById(container_id).appendChild(layer.style.legend);
    }
}

function createRegionList(_xyz) { // create region dropdown

    // selectors
    const dropdown_1_id = 'xyz_locale_dropdown_1';

    document.getElementById(dropdown_1_id).innerHTML = '';
    //document.getElementById(dropdown_2_id).innerHTML = '';

    let locale_dropdown_1 = _xyz.utils.dropdownCustom({
        entries: [
            { "E15000006": "Eastern" },
            { "E15000004": "East Midlands" },
            { "E15000007": "London" },
            { "E15000001": "North East" },
            { "N08000001": "Northern Ireland" },
            { "E15000002": "North West" },
            { "S92000003": "Scotland" },
            { "E15000008": "South East" },
            { "E15000009": "South West" },
            { "W08000001": "Wales" },
            { "E15000005": "West Midlands" },
            { "E15000003": "Yorkshire and The Humber" }
        ],
        singleSelect: true,
        placeholder: 'Select region',
        callback: e => {
            e.stopPropagation();

            document.querySelector('.gazetteer input').value = '';

            //document.getElementById(dropdown_2_id).innerHTML = '';

            locale_dropdown_1.querySelector('.head').textContent = e.target.textContent;

            createSecondaryList(_xyz, {
                layer: "Local Authority",
                table: "Overview",
                label: "lad_name",
                placeholder: "Select Local Authority District",
                target_id: 'xyz_locale_dropdown_2',
                callback: () => {
                    document.querySelector('#xyz_locale_dropdown_3 .head').textContent = "Select Constituency";
                }
            }, e);

            createSecondaryList(_xyz, {
                layer: "Constituencies",
                table: "Overview",
                label: "constituency_name",
                placeholder: "Select Constituency",
                target_id: 'xyz_locale_dropdown_3',
                callback: () => {
                    document.querySelector('#xyz_locale_dropdown_2 .head').textContent = "Select Local Authority District";
                }
            }, e);
        }
    });

    return locale_dropdown_1;
}

function createSecondaryList(_xyz, params, _e){

    document.getElementById(params.target_id).innerHTML = '';

    let layer = _xyz.layers.list[params.layer];

    layer.filter = {};
    layer.filter.current = {};
    layer.filter.current["regioncode"] = {};
    layer.filter.current["regioncode"].match = _e.target.dataset.field;

    const _xhr = new XMLHttpRequest();

    _xhr.open('GET', _xyz.host + '/api/layer/table?' + _xyz.utils.paramString({
        locale: _xyz.workspace.locale.key,
        layer: params.layer,
        table: params.table,
        orderby: params.label,
        filter: JSON.stringify(layer.filter.current),
        token: _xyz.token
    }));

    _xhr.setRequestHeader('Content-Type', 'application/json');
    _xhr.responseType = 'json';

    _xhr.onload = e => {

        if (e.target.status !== 200) return;

        let entries = [];

        e.target.response.forEach(each => {
            entries.push({
                [each.qid]: each[params.label]
            });
        });

        const locale_dropdown = _xyz.utils.dropdownCustom({
            entries: entries,
            singleSelect: true,
            placeholder: params.placeholder,
            callback: __e => {

                __e.stopPropagation();

                document.querySelector('.gazetteer input').value = '';

                selectArea(_xyz, {
                    layer: layer.key,
                    table: layer.table,
                    id: __e.target.dataset.field
                });

                locale_dropdown.querySelector('.head').textContent = __e.target.textContent;

                if(params.callback) params.callback();
            }
        });

        document.getElementById(params.target_id).appendChild(locale_dropdown);
    }

    _xhr.send();
}

function resetList(_xyz, params){

}