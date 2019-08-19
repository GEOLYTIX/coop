console.log('Hello World');

_xyz({
	host: document.head.dataset.dir,
	callback: _xyz => {
		_xyz.mapview.create({
			target: document.getElementById('Map'),
			scrollWheelZoom: true,
			zoomControl: true,
			btn: {
				Locate: document.getElementById('btnLocate')
			}
		});

		const layer_dropdown_options = [];

		Object.values(_xyz.layers.list).map(layer => {
			if(layer.group && layer.group === 'Locations'){
				layer_dropdown_options.push({
					dataField: layer.key,
					label: layer.name
				});
			}
		});

		const layer_dropdown = _xyz.utils.dropdownCustom({
			entries: layer_dropdown_options,
			callback: e => { console.log(e.target); }
		});

		document.getElementById('layer_dropdown').appendChild(layer_dropdown);

	}
});