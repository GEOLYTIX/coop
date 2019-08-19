_xyz({
	host: document.head.dataset.dir,
	callback: _xyz => {
		_xyz.mapview.create({
			target: document.getElementById('_map'),
			scrollWheelZoom: true,
			zoomControl: true
		});

		const layer_dropdown_options = [];

		const core_layer_key = 'Wellbeing Index';
		const core_layer_themes = _xyz.layers.list[core_layer_key].style.themes;
		const core_layer_themes_options;

		Object.keys(_xyz.layers.list[core_layer_key].style.themes).map(key => {
			core_layer_themes_options.push(key);
		});

		Object.values(_xyz.layers.list).map(layer => {
			if(layer.group && layer.group === 'Locations'){
				
				layer_dropdown_options.push({
					[layer.key]: layer.name || layer.key
				});
			}
		});

		const core_layer_themes_dropdown = _xyz.utils.dropdownCustom({
			entries: core_layer_themes_options,
			callback: e => {
				console.log(e.target);
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
		document.getElementById('core_layer_themes_dropdown').appendChild(core_layer_themes_dropdown);

	}
});