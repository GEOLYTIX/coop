window.onload = () => _xyz({
  //host: 'http://localhost:3000/coop',
  host: 'https://xyz-coop-dev.now.sh/coop',
  hooks: true,
  locale: 'Wellbeing',
  callback: init
})

function init(_xyz) {

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

  const layer_wellbeing = _xyz.layers.list['Community Wellbeing'];

  const lad_layer = _xyz.layers.list['Local Authority'];

  

  const constituencies_layer = _xyz.layers.list['Constituencies'];

  function hideLayer() {

    lad_layer.remove();

    constituencies_layer.remove();

  };

  hideLayer();

  const legend = document.getElementById('Legend');

  document.getElementById('Themes').appendChild(_xyz.utils.wire()`
  <button class="btn-drop">
  <div
    class="head"
    onclick=${e => {
      e.preventDefault();
      e.target.parentElement.classList.toggle('active');
    }}>
    <span>${Object.keys(layer_wellbeing.style.themes)[0]}</span>
    <div class="icon"></div>
  </div>
  <ul>
    ${Object.entries(layer_wellbeing.style.themes).map(
      theme => _xyz.utils.wire()`
      <li onclick=${e => {
          const drop = e.target.closest('.btn-drop');
          drop.querySelector('span').textContent = theme[0];
          drop.classList.toggle('active');
          layer_wellbeing.style.theme = theme[1];
          legend.innerHTML = '';
          legend.appendChild(_xyz.layers.view.style.legend(layer_wellbeing));
          layer_wellbeing.reload();
        }}>${theme[0]}`)}`);

  legend.appendChild(_xyz.layers.view.style.legend(layer_wellbeing));

  const regions = [
    "Scotland",
    "Wales",
    "North East",
    "North West",
    "London",
    "South West",
    "Eastern",
    "Yorkshire and The Humber",
    "West Midlands",
    "East Midlands",
    "Northern Ireland",
    "South East"
  ];

  const filter_layer = _xyz.layers.list['Community Wellbeing Filter'];

  document.getElementById('Regions').appendChild(_xyz.utils.wire()`
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
    ${regions.map(
      region => _xyz.utils.wire()`
      <li onclick=${e => {
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

    xhr.open('GET', _xyz.host + '/api/query/get_constituency_from_region?dbs=XYZ&region='+region)
  
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
              hideLayer();
                const drop = e.target.closest('.btn-drop');
                drop.querySelector('span').textContent = constituency;
                drop.classList.toggle('active');
      
                constituencies_layer.filter.current = {
                  constituency_name: {
                    match: constituency
                  }
                }

                constituencies_layer.show();
      
                constituencies_layer.zoomToExtent();
      
              }}>${constituency}`)}`);

    };
  
    xhr.send();

  }

  function setLAD(region) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', _xyz.host + '/api/query/get_lad_from_region?dbs=XYZ&region='+region)
  
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
              hideLayer();
                const drop = e.target.closest('.btn-drop');
                drop.querySelector('span').textContent = lad;
                drop.classList.toggle('active');
      
                lad_layer.filter.current = {
                  lad_name: {
                    match: lad
                  }
                }

                lad_layer.show();
      
                lad_layer.zoomToExtent();
      
              }}>${lad}`)}`);

    };
  
    xhr.send();

  }

  const table_index = Object.assign(
    layer_wellbeing.dataviews.Index,
    {
      target: document.getElementById('table_index'),
      layer: layer_wellbeing,
      active: true,
      center: true,
      query: 'community wellbeing - index compare',
      queryparams: {}
    });

  delete table_index.viewport;

  _xyz.dataviews.create(table_index);

  const table_people = Object.assign(
    layer_wellbeing.dataviews.People,
    {
      target: document.getElementById('table_people'),
      layer: layer_wellbeing,
      active: true,
      center: true,
      query: 'community wellbeing - people compare',
      queryparams: {}
    });

  delete table_people.viewport;

  _xyz.dataviews.create(table_people);


  const table_place = Object.assign(
    layer_wellbeing.dataviews.Place,
    {
      target: document.getElementById('table_place'),
      layer: layer_wellbeing,
      active: true,
      center: true,
      query: 'community wellbeing - place compare',
      queryparams: {}
    });

  delete table_place.viewport;

  _xyz.dataviews.create(table_place);


  const table_relationships = Object.assign(
    layer_wellbeing.dataviews.Relationships,
    {
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

      table_index.queryparams.loc = dd_name.value;

      table_index.update();

      table_people.queryparams.loc = dd_name.value;

      table_people.update();

      table_place.queryparams.loc = dd_name.value;

      table_place.update();

      table_relationships.queryparams.loc = dd_name.value;

      table_relationships.update();      
  
      location.style = {
        strokeColor: '#FFD60C',
        strokeWidth: 3
      }
  
      location.draw();
  
      locale.innerHTML = '';
  
      locale.appendChild(_xyz.locations.view.infoj(location));
    }    

}
