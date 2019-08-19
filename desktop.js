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

		Object.values(_xyz.layers.list).map(layer => {
			console.log(layer);
		});
	}
});