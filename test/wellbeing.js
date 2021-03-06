window.onload = () => _xyz({
    host: '/coopwellbeing',
    hooks: true,
    locale: 'Wellbeing',
    callback: init
})

function init(_xyz) {

    const layer_wellbeing = _xyz.layers.list['Community Wellbeing'];

    const layer_wellbeing_lad = _xyz.layers.list['Community Wellbeing LAD'];

    const layer_constituency = _xyz.layers.list['Constituency'];

    const layer_lad = _xyz.layers.list['Local Authority District'];

    const layer_postcode = _xyz.layers.list['Postal Code'];

    const layer_region = _xyz.layers.list['Region'];

    const layer_labels = _xyz.layers.list['Mapbox Labels'];

    const filter_layer = _xyz.layers.list['Community Wellbeing Filter'];

    _xyz.mapview.create({
        target: document.getElementById('map-container'),
        scrollWheelZoom: true,
        zoomControl: {
          target: document.getElementById("map-controls")
        },
        view: {
          lat: 51.5,//_xyz.hooks.current.lat,
          lng: -0.14,//_xyz.hooks.current.lng,
          z: 11//_xyz.hooks.current.z
    }
      });

    _xyz.gazetteer.init({
        group: document.getElementById('Gazetteer'),
        callback: entry => {

            document.getElementById('Tables').style.display = "none";
            
            if (entry.layer === 'Local Authority District') ladFilter(entry.label);
            if (entry.layer === 'Constituency') constFilter(entry.label);
            if (entry.layer === 'Postal Code') postcodeFilter(entry.label);
            if (entry.layer === 'Region') regionFilter(entry.label);
            if (entry.layer === 'Community Wellbeing') {

              _xyz.locations.select({
                locale: 'Wellbeing',
                layer: layer_wellbeing,
                table: layer_wellbeing.table,
                id: entry.id,
                callback: location => {

                  _xyz.locations.view.create(location);
                  location.draw();
                  location.flyTo();
                  location.view = _xyz.locations.view.infoj(location);

                  //document.getElementById('current-area').appendChild(location.view);

                  document.getElementById('table_index').innerHTML = '';
                  _xyz.dataviews.create(Object.assign({}, table_index, {
                    query: 'community wellbeing - index locale', id: entry.label
                  }));

                  document.getElementById('table_people').innerHTML = '';

                  _xyz.dataviews.create(Object.assign({}, table_people, {
                    query: 'community wellbeing - people locale', id: entry.label
                  }));

                  document.getElementById('table_place').innerHTML = '';

                  _xyz.dataviews.create(Object.assign({}, table_place, {
                    query: 'community wellbeing - place locale', id: entry.label
                  }));

                  document.getElementById('table_relationships').innerHTML = '';

                  _xyz.dataviews.create(Object.assign({}, table_relationships, {
                    query: 'community wellbeing - relationships locale', id: entry.label
                  }));

                }
              });

              document.getElementById('Tables').style.display = "block";
            }
        }
    });

    // create LSOA checkbox
    document.getElementById('map-toggles').appendChild(_xyz.utils.wire()`
      <label class="input-checkbox">
      <input type="checkbox" onchange=${
        e => e.target.checked ? _xyz.layers.list["LSOA"].show() : _xyz.layers.list["LSOA"].remove()
      }></input><div></div><span>Show LSOAs.`);

    function hideLayer() {
        layer_lad.remove();
        layer_constituency.remove();
        layer_postcode.remove();
        layer_region.remove();
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

    document.getElementById('Themes').appendChild(_xyz.utils.wire()`
      <button class="btn-drop">
      <div
      class="head"
      onclick=${e => dropEvent(e)}
      ontouchend=${e => dropEvent(e)}>
      <span>${Object.keys(layer_wellbeing.style.themes)[0]}</span>
      <div class="icon"></div>
      </div>
      <ul>
      ${Object.entries(layer_wellbeing.style.themes).map(theme => _xyz.utils.wire()`
        <li onclick=${e => themeSelect(e, theme)} ontouchend=${e => themeSelect(e, theme)}
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

    document.getElementById('Regions').appendChild(_xyz.utils.wire()`
      <button class="btn-drop">
      <div
      class="head"
      onclick=${e => dropEvent(e)}
      ontouchend=${e => dropEvent(e)}>
      <span>Select region</span>
      <div class="icon"></div></div>
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
        ].map(region => _xyz.utils.wire()`
          <li onclick=${e => {

            _xyz.map.getOverlays().getArray().map(overlay => _xyz.map.removeOverlay(overlay));

            _xyz.gazetteer.input.value = '';
            document.getElementById('Tables').style.display = "none";
            document.getElementById('current-area').style.display = "none";

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

      document.getElementById('Tables').style.display = "none";
      document.getElementById('current-area').style.display = "none";

      const xhr = new XMLHttpRequest();

      xhr.open('GET', _xyz.host + '/api/query/get_constituency_from_region2?dbs=XYZ&region=' + region)

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      
      xhr.onload = e => {

        document.getElementById('Constituencies').appendChild(_xyz.utils.wire()`
          <div><button class="btn-drop">
          <div
          class="head"
          onclick=${e => {
            e.preventDefault();
            e.target.parentElement.classList.toggle('active');
          }}>
          <span>Select Constituency</span>
          <div class="icon"></div></div>
          <ul>
          ${Object.values(e.target.response).map(constituency => _xyz.utils.wire()`
            <li onclick=${e => {

              _xyz.map.getOverlays().getArray().map(overlay => _xyz.map.removeOverlay(overlay));

              _xyz.gazetteer.input.value = '';

              document.querySelector('#Lads .head > span').textContent = 'Select Local Authority District';

              const drop = e.target.closest('.btn-drop');

              drop.classList.toggle('active');

              if(constituency.constituency_name === drop.querySelector('span').textContent) return;

              drop.querySelector('span').textContent = constituency.constituency_name;

              constFilter(constituency.constituency_name);
              
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

                  document.getElementById('current-area').appendChild(location.view);
                }
              });

              document.getElementById('Tables').style.display = "block";

            }}>${constituency.constituency_name}`)}`);
      };

      xhr.send();

    }

    function setLAD(region) {

      document.getElementById('Tables').style.display = "none";
      document.getElementById('current-area').style.display = "none";
      
      const xhr = new XMLHttpRequest();
      xhr.open('GET', _xyz.host + '/api/query/get_lad_from_region2?dbs=XYZ&region=' + region)
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      xhr.onload = e => {

        document.getElementById('Lads').appendChild(_xyz.utils.wire()`
          <div><button class="btn-drop">
          <div class="head"
          onclick=${e => {
            e.preventDefault();
            e.target.parentElement.classList.toggle('active');
          }}>
          <span>Select Local Authority District</span>
          <div class="icon"></div>
          </div>
          <ul>
          ${Object.values(e.target.response).map(lad => _xyz.utils.wire()`
            <li onclick=${e => {

              _xyz.map.getOverlays().getArray().map(overlay => _xyz.map.removeOverlay(overlay));

              _xyz.gazetteer.input.value = '';

              document.querySelector('#Constituencies .head > span').textContent = 'Select Constituency';

              const drop = e.target.closest('.btn-drop');

              drop.classList.toggle('active');

              if(lad.lad_search === drop.querySelector('span').textContent) return;

              drop.querySelector('span').textContent = lad.lad_name;

              ladFilter(lad.lad_search);
              
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
            constituency_search: {
                match: constituency
            }
        }

        document.getElementById('Tables').style.display = "block";

        layer_constituency.show();

        layer_constituency.zoomToExtent();

        document.getElementById('table_index').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_index, {
          query: 'community wellbeing - index constituency', id: constituency
        }));

        document.getElementById('table_people').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_people, {
          query: 'community wellbeing - people constituency', id: constituency
        }));

        document.getElementById('table_place').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_place, {
          query: 'community wellbeing - place constituency', id: constituency
        }));

        document.getElementById('table_relationships').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_relationships, {
          query: 'community wellbeing - relationships constituency', id: constituency
        }));
    }

    function ladFilter(lad) {
        
        hideLayer();

        layer_lad.filter.current = {
            lad_search: {
                match: lad
            }
        }

        document.getElementById('Tables').style.display = "block";

        layer_lad.show();

        layer_lad.zoomToExtent();

        document.getElementById('table_index').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_index, {
          query: 'community wellbeing - index lad', id: lad
        }));

        document.getElementById('table_people').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_people, {
          query: 'community wellbeing - people lad', id: lad
        }));

        document.getElementById('table_place').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_place, {
          query: 'community wellbeing - place lad', id: lad
        }));

        document.getElementById('table_relationships').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_relationships, {
          query: 'community wellbeing - relationships lad', id: lad
        }));
        
    }

    function postcodeFilter(postcode) {
        hideLayer();

        layer_postcode.filter.current = {
            rm_format: {
                match: postcode
            }
        }

        document.getElementById('Tables').style.display = "block";

        layer_postcode.show();

        layer_postcode.zoomToExtent();

        document.getElementById('table_index').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_index, {
          query: 'community wellbeing - index postcode', id: postcode
        }));

        document.getElementById('table_people').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_people, {
          query: 'community wellbeing - people postcode', id: postcode
        }));

        document.getElementById('table_place').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_place, {
          query: 'community wellbeing - place postcode', id: postcode
        }));

        document.getElementById('table_relationships').innerHTML = '';

        _xyz.dataviews.create(Object.assign({}, table_relationships, {
          query: 'community wellbeing - relationships postcode', id: postcode
        }));
  
    }

    function regionFilter(region){

      hideLayer();

      layer_region.filter.current = {
            region_search: {
                like: region
            }
        }

      layer_region.show();

      layer_region.zoomToExtent();
    }

    const table_index = Object.assign({}, layer_wellbeing.dataviews.Index, {
      target: document.getElementById('table_index'),
      layer: layer_wellbeing,
      active: true,
      center: true
    });

    const table_people = Object.assign({},layer_wellbeing.dataviews.People, {
      target: document.getElementById('table_people'),
      layer: layer_wellbeing,
      active: true,
      center: true
    });

    const table_place = Object.assign({},layer_wellbeing.dataviews.Place, {
      target: document.getElementById('table_place'),
      layer: layer_wellbeing,
      active: true,
      center: true
    });

    const table_relationships = Object.assign({},layer_wellbeing.dataviews.Relationships, {
      target: document.getElementById('table_relationships'),
      layer: layer_wellbeing,
      active: true,
      center: true
    });

    _xyz.locations.selectCallback = location => {

        location.style = {
            strokeColor: '#FFD60C',
            strokeWidth: 3,
            fillColor: "#FFFFFF",
            fillOpacity: 0.1
        }

        location.draw();

        /*location.Marker = _xyz.mapview.geoJSON({
          geometry: {
            type: 'Point',
            coordinates: location.marker
          },
          zIndex: 2000,
          style: new _xyz.mapview.lib.style.Style({
            image: _xyz.mapview.icon({
              url: "https://raw.githubusercontent.com/GEOLYTIX/MapIcons/master/poi_pin_filled/poi_simple_pin.svg",
              scale: 0.05,
              anchor: [0.5, 1]
            })
          })
        });*/


        location.flyTo();

        location.view = _xyz.locations.view.infoj(location);

        _xyz.mapview.popup.create({
            coords: location.marker,
            content: location.view
        });

        //locale.appendChild(location.view);
    }
}