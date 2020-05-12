window.onload = () => _xyz({
  host: '/coop',
  hooks: true,
  locale: 'api',
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

  const locale = document.getElementById('Locale');

  _xyz.gazetteer.init({
    group: document.getElementById('Gazetteer'),
    callback: feature => {

      const xhr = new XMLHttpRequest();

      xhr.open('GET', `${_xyz.host}/api/query/select_ll?lng=${feature.coordinates[0]}&lat=${feature.coordinates[1]}`)
  
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = 'json';
      xhr.onload = e => {

        const response = e.target.response;

        delete response.geomj;


        locale.innerHTML = '';
  
        locale.appendChild(_xyz.utils.wire()`
        <textarea
        value=${JSON.stringify(response, undefined, 2)}
        rows=25>`)
  
      };
  
      xhr.send();
    }
  });

  _xyz.locations.selectCallback = location => {

    location.draw();

    locale.innerHTML = '';

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
