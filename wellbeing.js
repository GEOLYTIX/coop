window.onload = () => _xyz({
  host: 'http://localhost:3000/coop',
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

  const locale = document.getElementById('Locale');

  _xyz.locations.selectCallback = location => {

    location.style = {
      strokeColor: '#00FF01',
      strokeWidth: 2
    }

    location.draw();

    locale.innerHTML = '';

    locale.appendChild(_xyz.locations.view.infoj(location));

  }

  _xyz.dataviews.create(Object.assign(
    {
      target: document.getElementById('table_index'),
      layer: layer_wellbeing
    },
    layer_wellbeing.dataviews.Index));

  _xyz.dataviews.create(Object.assign(
    {
      target: document.getElementById('table_people'),
      layer: layer_wellbeing
    },
    layer_wellbeing.dataviews.People));

  _xyz.dataviews.create(Object.assign(
    {
      target: document.getElementById('table_place'),
      layer: layer_wellbeing
    },
    layer_wellbeing.dataviews.Place));

  _xyz.dataviews.create(Object.assign(
    {
      target: document.getElementById('table_relationships'),
      layer: layer_wellbeing
    },
    layer_wellbeing.dataviews.Relationships));

}
