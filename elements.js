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
    const dropdown_1_id = 'xyz_locale_dropdown_1',
          dropdown_2_id = 'xyz_locale_dropdown_2';

    document.getElementById(dropdown_1_id).innerHTML = '';
    document.getElementById(dropdown_2_id).innerHTML = '';

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

            document.getElementById(dropdown_2_id).innerHTML = '';

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
                orderby: "lad_name",
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
                        [each.qid]: each.lad_name
                    });
                });

                const locale_dropdown_2 = _xyz.utils.dropdownCustom({
                    entries: entries,
                    singleSelect: true,
                    placeholder: 'Select Local Authority District',
                    callback: e => {

                        e.stopPropagation();

                        document.querySelector('.gazetteer input').value = '';

                        selectArea(_xyz, {
                            layer: layer.key,
                            table: layer.table,
                            id: e.target.dataset.field
                        });

                        locale_dropdown_2.querySelector('.head').textContent = e.target.textContent;
                    }
                });
                document.getElementById(dropdown_2_id).appendChild(locale_dropdown_2);
            }
            _xhr.send();
        }
    });

    return locale_dropdown_1;
}