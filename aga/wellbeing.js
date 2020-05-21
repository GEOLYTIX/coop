window.onload = () => _xyz({
    host: '/coop',
    //hooks: true,
    locale: 'Wellbeing',
    callback: init
})



function init(_xyz) {

    const layer_wellbeing = _xyz.layers.list['Community Wellbeing'];

    const layer_wellbeing_lad = _xyz.layers.list['Community Wellbeing LAD'];

    const layer_constituency = _xyz.layers.list['Constituency'];

    const layer_lad = _xyz.layers.list['Local Authority District'];

    const layer_postcode = _xyz.layers.list['Postal Code'];

    const layer_labels = _xyz.layers.list['Mapbox Labels'];

    const filter_layer = _xyz.layers.list['Community Wellbeing Filter'];

    _xyz.mapview.create({
        target: document.getElementById('map-container'),
        scrollWheelZoom: true,
        zoomControl: {
          target: document.getElementById("map-controls")
        }
        /*,
            view: {
              lat: _xyz.hooks.current.lat,
              lng: _xyz.hooks.current.lng,
              z: _xyz.hooks.current.z
            }*/
    });

    _xyz.gazetteer.init({
        group: document.getElementById('Gazetteer'),
        callback: entry => {

            document.getElementById('Tables').style.display = "none";
            
            if (entry.layer === 'Local Authority District') ladFilter(entry.label);
            if (entry.layer === 'Constituency') constFilter(entry.label);
            if (entry.layer === 'Postal Code') postcodeFilter(entry.label);
        }
    });

    // create LSOA checkbox
    document.getElementById('map-toggles').appendChild(_xyz.utils.wire()
        `
    <label class="input-checkbox">
    <input 
    type="checkbox"
    onchange=${
      e => e.target.checked ? _xyz.layers.list["LSOA"].show() : _xyz.layers.list["LSOA"].remove()
    }></input><div></div><span>Show LSOAs.`);

    function hideLayer() {
        layer_lad.remove();
        layer_constituency.remove();
    };

    hideLayer();

    const legend = document.getElementById('Legend');

    function themeSelect(e, theme) {
        const drop = e.target.closest('.btn-drop');
        drop.querySelector('span').textContent = theme[0];
        drop.classList.toggle('active');
        layer_wellbeing.style.theme = theme[1];
        legend.innerHTML = '';
        legend.appendChild(_xyz.utils.wire()
            `<div>${theme[0]}`)
        legend.appendChild(_xyz.layers.view.style.legend(layer_wellbeing));
        layer_wellbeing.reload();
    }

    document.getElementById('Themes').appendChild(_xyz.utils.wire()
        `
  <button class="btn-drop">
  <div
    class="head"
    onclick=${e => dropEvent(e)}
    ontouchend=${e => dropEvent(e)}>
    <span>${Object.keys(layer_wellbeing.style.themes)[0]}</span>
    <div class="icon"></div>
  </div>
  <ul>
    ${Object.entries(layer_wellbeing.style.themes).map(
      theme => _xyz.utils.wire()`
      <li
        onclick=${e => themeSelect(e, theme)}
        ontouchend=${e => themeSelect(e, theme)}
        >${theme[0]}`)}`);

    legend.appendChild(_xyz.layers.view.style.legend(layer_wellbeing));

    layer_labels.L.setZIndex(1000);

    function dropEvent(e) {
        if (e.target.parentElement.classList.contains('active')) {
            return e.target.parentElement.classList.remove('active');
        }
        [...document.querySelectorAll('.btn-drop')].forEach(
            drop => drop.classList.remove('active'))
        e.preventDefault();
        e.stopPropagation();
        e.target.parentElement.classList.add('active');
    }

    document.getElementById('Regions').appendChild(_xyz.utils.wire()
        `
  <button class="btn-drop">
  <div
    class="head"
    onclick=${e => dropEvent(e)}
    ontouchend=${e => dropEvent(e)}>
    <span>Select region</span>
    <div class="icon"></div>
  </div>
  <ul>
    ${[
      "East Midlands",
      "Eastern",
      "London",
      "North East",
      "North West",
      "Northern Ireland",
      "Scotland",
      "South East",
      "South West",
      "Wales",
      "West Midlands",
      "Yorkshire and The Humber"
    ].map(
      region => _xyz.utils.wire()`
      <li onclick=${e => {

          _xyz.gazetteer.input.value = '';
          document.getElementById('Tables').style.display = "none";

          table_index.query = 'community wellbeing - index compare';
          table_people.query = 'community wellbeing - people compare';
          table_place.query = 'community wellbeing - place compare';
          table_relationships.query = 'community wellbeing - relationships compare';

          hideLayer();
          document.getElementById('Lads').innerHTML = '';
          document.getElementById('Constituencies').innerHTML = '';

          const drop = e.target.closest('.btn-drop');
          drop.querySelector('span').textContent = region;
          drop.classList.toggle('active');

          document.getElementById('alt-info').style.display = "block";

          setLAD(region);

          setConstituency(region);

          filter_layer.filter.current = {
            region: {
              match: region
            }
          }

          filter_layer.zoomToExtent();

        }}>${region}`)}`);

    function setConstituency(region) {

        //document.getElementById('Tables').style.display = "none";

        const xhr = new XMLHttpRequest();

        xhr.open('GET', _xyz.host + '/api/query/get_constituency_from_region2?dbs=XYZ&region=' + region)

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.onload = e => {

            document.getElementById('Constituencies').appendChild(_xyz.utils.wire()
                `
      <div>
        <button class="btn-drop">
        <div
          class="head"
          onclick=${e => {
          e.preventDefault();
          e.target.parentElement.classList.toggle('active');
        }}>
          <span>Select Constituency</span>
          <div class="icon"></div>
        </div>
        <ul>
          ${Object.values(e.target.response).map(
          constituency => _xyz.utils.wire()`
            <li onclick=${e => {

              _xyz.gazetteer.input.value = '';
              
              document.querySelector('#Lads .head > span').textContent = 'Select Local Authority District';

              const drop = e.target.closest('.btn-drop');
              drop.querySelector('span').textContent = constituency.constituency_name;
              drop.classList.toggle('active');

              //constFilter(constituency.name);
              document.getElementById('Tables').style.display = "block";
              document.getElementById('current-area').style.display = "block";
              
              _xyz.locations.select({
                locale: 'Wellbeing',
                layer: layer_constituency,
                table: layer_constituency.table,
                id: constituency.id,
                callback: location => {

                  _xyz.locations.view.create(location);

                  location.draw();

                  location.flyTo();
                  
                  location.view = _xyz.locations.view.infoj(location);

                  console.log(location.view);

                  document.getElementById('current-area').appendChild(location.view);
                }
              });



            }}>${constituency.constituency_name}`)}`);

        };

        xhr.send();

    }

    function setLAD(region) {

        //document.getElementById('Tables').style.display = "none";

        const xhr = new XMLHttpRequest();

        xhr.open('GET', _xyz.host + '/api/query/get_lad_from_region2?dbs=XYZ&region=' + region)

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.onload = e => {

          console.log(e.target.response);

            document.getElementById('Lads').appendChild(_xyz.utils.wire()
                `
      <div>
        <button class="btn-drop">
        <div
          class="head"
          onclick=${e => {
          e.preventDefault();
          e.target.parentElement.classList.toggle('active');
        }}>
          <span>Select Local Authority District</span>
          <div class="icon"></div>
        </div>
        <ul>
          ${Object.values(e.target.response).map(
          lad => _xyz.utils.wire()`
            <li onclick=${e => {

              _xyz.gazetteer.input.value = '';

              document.querySelector('#Constituencies .head > span').textContent = 'Select Constituency';
              
              const drop = e.target.closest('.btn-drop');
              drop.querySelector('span').textContent = lad.lad_name;
              drop.classList.toggle('active');

              //ladFilter(lad);
              document.getElementById('Tables').style.display = "block";
              document.getElementById('current-area').style.display = "block";
              
              _xyz.locations.select({
                locale: 'Wellbeing',
                layer: layer_lad,
                table: layer_lad.table,
                id: lad.id,
                callback: location => {

                  _xyz.locations.view.create(location);

                  location.draw();

                  location.flyTo();
                  
                  location.view = _xyz.locations.view.infoj(location);

                  console.log(location.view);

                  document.getElementById('current-area').appendChild(location.view);
                }
              });

            }}>${lad.lad_name}`)}`);

        };

        xhr.send();

    }

    function constFilter(constituency) {
        hideLayer();

        layer_constituency.filter.current = {
            constituency_name: {
                match: constituency
            }
        }

        document.getElementById('Tables').style.display = "block";

        layer_constituency.show();

        table_index.query = 'community wellbeing - index constituency';
        table_index.queryparams.constituency = constituency;

        table_people.query = 'community wellbeing - people constituency';
        table_people.queryparams.constituency = constituency;

        table_place.query = 'community wellbeing - place constituency';
        table_place.queryparams.constituency = constituency;

        table_relationships.query = 'community wellbeing - relationships constituency';
        table_relationships.queryparams.constituency = constituency;

        layer_constituency.zoomToExtent();
    }


    function ladFilter(lad) {
        hideLayer();

        layer_lad.filter.current = {
            lad_name: {
                match: lad
            }
        }

        //document.getElementById('Tables').style.display = "block";

        layer_lad.show();

        table_index.query = 'community wellbeing - index lad';
        table_index.queryparams.lad = lad;

        table_people.query = 'community wellbeing - people lad';
        table_people.queryparams.lad = lad;

        table_place.query = 'community wellbeing - place lad';
        table_place.queryparams.lad = lad;

        table_relationships.query = 'community wellbeing - relationships lad';
        table_relationships.queryparams.lad = lad;

        layer_lad.zoomToExtent();
    }

    function postcodeFilter(postcode) {
        hideLayer();

        layer_postcode.filter.current = {
            rm_format: {
                match: postcode
            }
        }

        //document.getElementById('Tables').style.display = "block";

        layer_postcode.show();

        table_index.query = 'community wellbeing - index postcode';
        table_index.queryparams.postcode = postcode;

        table_people.query = 'community wellbeing - people postcode';
        table_people.queryparams.postcode = postcode;

        table_place.query = 'community wellbeing - place postcode';
        table_place.queryparams.postcode = postcode;

        table_relationships.query = 'community wellbeing - relationships postcode';
        table_relationships.queryparams.postcode = postcode;

        layer_postcode.zoomToExtent();
    }

    const table_index = Object.assign(layer_wellbeing.dataviews.Index, {
        target: document.getElementById('table_index'),
        layer: layer_wellbeing,
        active: true,
        center: true,
        query: 'community wellbeing - index compare',
        queryparams: {}
    });

    delete table_index.viewport;

    _xyz.dataviews.create(table_index);

    const table_people = Object.assign(layer_wellbeing.dataviews.People, {
        target: document.getElementById('table_people'),
        layer: layer_wellbeing,
        active: true,
        center: true,
        query: 'community wellbeing - people compare',
        queryparams: {}
    });

    delete table_people.viewport;

    _xyz.dataviews.create(table_people);

    const table_place = Object.assign(layer_wellbeing.dataviews.Place, {
        target: document.getElementById('table_place'),
        layer: layer_wellbeing,
        active: true,
        center: true,
        query: 'community wellbeing - place compare',
        queryparams: {}
    });

    delete table_place.viewport;

    _xyz.dataviews.create(table_place);

    const table_relationships = Object.assign(layer_wellbeing.dataviews.Relationships, {
        target: document.getElementById('table_relationships'),
        layer: layer_wellbeing,
        active: true,
        center: true,
        query: 'community wellbeing - relationships compare',
        queryparams: {}
    });

    delete table_relationships.viewport;

    _xyz.dataviews.create(table_relationships);

    //const locale = document.getElementById('Locale');

    _xyz.locations.selectCallback = location => {

        const dd_name = location.infoj.find(entry => entry.field === 'dd_name');

        if (dd_name) {

            table_index.queryparams.loc = dd_name.value;

            table_index.update();

            table_people.queryparams.loc = dd_name.value;

            table_people.update();

            table_place.queryparams.loc = dd_name.value;

            table_place.update();

            table_relationships.queryparams.loc = dd_name.value;

            table_relationships.update();

        }

        location.style = {
            strokeColor: '#FFD60C',
            strokeWidth: 3,
            fillColor: "#FFFFFF",
            fillOpacity: 0.1
        }

        location.draw();

        location.Marker = _xyz.mapview.geoJSON({
          geometry: {
            type: 'Point',
            coordinates: location.marker
          },
          zIndex: 2000,
          style: new _xyz.mapview.lib.style.Style({
            image: _xyz.mapview.icon({
              url: "https://raw.githubusercontent.com/GEOLYTIX/MapIcons/master/poi_pin_filled/poi_simple_pin.svg",
              scale: 0.25,
              anchor: [0.5, 1]
            })
          })
        });

        //locale.innerHTML = '';

        if (!dd_name) return location.flyTo();

        location.view = _xyz.locations.view.infoj(location);

        _xyz.mapview.popup.create({
            coords: location.marker,
            content: location.view
        });

        //locale.appendChild(location.view);
    }



    /*_xyz.hooks.current.locations.forEach(_hook => {

      let hook = _hook.split('!');

      _xyz.locations.select({
        locale: _xyz.workspace.locale.key,
        layer: _xyz.layers.list[decodeURIComponent(hook[0])],
        table: hook[1],
        id: hook[2]
      });
    });*/

}