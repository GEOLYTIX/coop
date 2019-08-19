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


		const layer_dropdown = _xyz.utils.dropdownCustom({
			entries: Object.values(_xyz.layers.list).filter(layer => { return layer.group && layer.group === 'Locations'}),
			callback: e => { console.log(e.target); }
		});

		document.getElementById('layer_dropdown').appendChild(layer_dropdown);

	}
});