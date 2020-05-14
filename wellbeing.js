window.onload = () => _xyz({
  host: '/coop',
  hooks: true,
  locale: 'Wellbeing',
  callback: init
})

function init(_xyz) {

  const layer_wellbeing = _xyz.layers.list['Community Wellbeing'];

  const layer_wellbeing_lad = _xyz.layers.list['Community Wellbeing LAD'];

  _xyz.mapview.create({
    target: document.getElementById('Map'),
    scrollWheelZoom: true,
    zoomControl: true,
    view: {
      lat: _xyz.hooks.current.lat,
      lng: _xyz.hooks.current.lng,
      z: _xyz.hooks.current.z
    }
  });



  _xyz.gazetteer.init({
    group: document.getElementById('Gazetteer'),
    callback: entry => {
      if (entry.source === 'lad') ladFilter(entry.label);
      if (entry.source === 'constituencies') constFilter(entry.label);
    }
  });



  const lad_layer = _xyz.layers.list['Local Authority'];

  const constituencies_layer = _xyz.layers.list['Constituencies'];

  function hideLayer() {
    lad_layer.remove();
    constituencies_layer.remove();
  };

  hideLayer();



  const legend = document.getElementById('Legend');

  function themeSelect(e, theme) {
    const drop = e.target.closest('.btn-drop');
    drop.querySelector('span').textContent = theme[0];
    drop.classList.toggle('active');
    layer_wellbeing.style.theme = theme[1];
    legend.innerHTML = '';
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
    ${Object.entries(layer_wellbeing.style.themes).map(
      theme => _xyz.utils.wire()`
      <li
        onclick=${e => themeSelect(e, theme)}
        ontouchend=${e => themeSelect(e, theme)}
        >${theme[0]}`)}`);

  legend.appendChild(_xyz.layers.view.style.legend(layer_wellbeing));

  layer_wellbeing.L.setOpacity(0.5);
  layer_wellbeing_lad.L.setOpacity(0.5);

  document.getElementById('OpacitySlider').appendChild(_xyz.utils.wire()`
    <div class="input-range">
    <input
      type="range"
      min=0
      value=0.5
      max=1
      step=0.1
      oninput=${e => {
      layer_wellbeing.L.setOpacity(parseFloat(e.target.value));
      layer_wellbeing_lad.L.setOpacity(parseFloat(e.target.value));
    }}>`);

  const layer_labels = _xyz.layers.list['Mapbox Labels'];

  layer_labels.L.setZIndex(1000);

  document.getElementById('LabelsChk').appendChild(_xyz.utils.wire()`
  <label
    style="margin-top: 5px;"
    class="input-checkbox"
    ontouchend=${e => {
      document.getElementById('labelToggle').click();
    }}>
    <input
      id="labelToggle"
      type="checkbox"
      checked=${!!layer_labels.display}
      onchange=${e => {
        if (e.target.checked) return layer_labels.show();
        layer_labels.remove();
    }}>
    </input>
    <div></div><span>Show Labels`)



  const _toggleLegend = e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.closest('.expandable').classList.toggle('not-expanded');
  };

  document.getElementById('toggleLegend').onclick = _toggleLegend;

  document.getElementById('toggleLegend').ontouchend = _toggleLegend;


  const filter_layer = _xyz.layers.list['Community Wellbeing Filter'];

  function dropEvent(e){
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
    <span>none</span>
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

    const xhr = new XMLHttpRequest();

    xhr.open('GET', _xyz.host + '/api/query/get_constituency_from_region?dbs=XYZ&region=' + region)

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = e => {

      document.getElementById('Constituencies').appendChild(_xyz.utils.wire()`
      <div>
        <div style="margin-top: 10px;">Focus Constituency</div>
        <button class="btn-drop">
        <div
          class="head"
          onclick=${e => {
          e.preventDefault();
          e.target.parentElement.classList.toggle('active');
        }}>
          <span>none</span>
          <div class="icon"></div>
        </div>
        <ul>
          ${e.target.response.constituency_name.map(
          constituency => _xyz.utils.wire()`
            <li onclick=${e => {

              document.querySelector('#Lads .head > span').textContent = 'none';

              const drop = e.target.closest('.btn-drop');
              drop.querySelector('span').textContent = constituency;
              drop.classList.toggle('active');

              constFilter(constituency);



            }}>${constituency}`)}`);

    };

    xhr.send();

  }

  function setLAD(region) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', _xyz.host + '/api/query/get_lad_from_region?dbs=XYZ&region=' + region)

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = e => {

      document.getElementById('Lads').appendChild(_xyz.utils.wire()`
      <div>
        <div style="margin-top: 10px;">Focus Local Authority</div>
        <button class="btn-drop">
        <div
          class="head"
          onclick=${e => {
          e.preventDefault();
          e.target.parentElement.classList.toggle('active');
        }}>
          <span>none</span>
          <div class="icon"></div>
        </div>
        <ul>
          ${e.target.response.lad_name.map(
          lad => _xyz.utils.wire()`
            <li onclick=${e => {

              document.querySelector('#Constituencies .head > span').textContent = 'none';
              
              const drop = e.target.closest('.btn-drop');
              drop.querySelector('span').textContent = lad;
              drop.classList.toggle('active');

              ladFilter(lad);

            }}>${lad}`)}`);

    };

    xhr.send();

  }

  function constFilter(constituency) {
    hideLayer();
    constituencies_layer.filter.current = {
      constituency_name: {
        match: constituency
      }
    }

    constituencies_layer.show();

    table_index.query = 'community wellbeing - index constituency';
    table_index.queryparams.constituency = constituency;

    table_people.query = 'community wellbeing - people constituency';
    table_people.queryparams.constituency = constituency;

    table_place.query = 'community wellbeing - place constituency';
    table_place.queryparams.constituency = constituency;

    table_relationships.query = 'community wellbeing - relationships constituency';
    table_relationships.queryparams.constituency = constituency;

    constituencies_layer.zoomToExtent();
  }


  function ladFilter(lad) {
    hideLayer();
    lad_layer.filter.current = {
      lad_name: {
        match: lad
      }
    }

    lad_layer.show();

    table_index.query = 'community wellbeing - index lad';
    table_index.queryparams.lad = lad;

    table_people.query = 'community wellbeing - people lad';
    table_people.queryparams.lad = lad;

    table_place.query = 'community wellbeing - place lad';
    table_place.queryparams.lad = lad;

    table_relationships.query = 'community wellbeing - relationships lad';
    table_relationships.queryparams.lad = lad;

    lad_layer.zoomToExtent();
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

  const locale = document.getElementById('Locale');

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
      strokeWidth: 3
    }

    location.draw();

    locale.innerHTML = '';

    if (!dd_name) return location.flyTo();

    location.view = _xyz.locations.view.infoj(location);

    locale.appendChild(location.view);
  }



  _xyz.hooks.current.locations.forEach(_hook => {

    let hook = _hook.split('!');

    _xyz.locations.select({
      locale: _xyz.workspace.locale.key,
      layer: _xyz.layers.list[decodeURIComponent(hook[0])],
      table: hook[1],
      id: hook[2]
    });
  });

}
