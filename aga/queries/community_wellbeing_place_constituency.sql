SELECT 
  id,
  dd_name,
  null AS backgroundcolour,
  round(cul_places_worship * 100) AS cul_places_worship,
  round(cul_types_workers * 100) AS cul_types_workers,
  round(cul_areas_leisure * 100) AS cul_areas_leisure,
  round(cul_museums * 100) AS cul_museums,
  round(cul_listed_buildings * 100) AS cul_listed_buildings,
  round(tra_communication_internet * 100) AS tra_communication_internet,
  round(tra_public_transport * 100) AS tra_public_transport,
  round(hou_affordability * 100) AS hou_affordability,
  round(hou_overcrowding * 100) AS hou_overcrowding,
  round(hou_green_space * 100) AS hou_green_space,
  round(hou_public_spaces * 100) AS hou_public_spaces,
  round(hou_pollution * 100) AS hou_pollution,
  round(hou_air_quality * 100) AS hou_air_quality
FROM coop.uk_coop_restrict_wellbeing
WHERE constituency_search = '${id}' ORDER BY dd_name;
