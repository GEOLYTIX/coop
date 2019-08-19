_xyz({
	host: document.head.dataset.dir,
	callback: _xyz => {
		_xyz.mapview.create({
			target: document.getElementById('_map'),
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
					[layer.key]: layer.name || layer.key
				});
			}
		});

		const layer_dropdown = _xyz.utils.dropdownCustom({
			entries: layer_dropdown_options,
			callback: e => {
				
				Object.values(_xyz.layers.list).map(layer => {
					if(layer.group && layer.group === 'Locations'){
						layer.display = layer.key === e.target.dataset.field  ? true : false;
						layer.get();
					}
				});
				
			}
		});

		document.getElementById('layer_dropdown').appendChild(layer_dropdown);

	}
});