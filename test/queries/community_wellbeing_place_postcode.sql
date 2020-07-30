SELECT 
  a.id,
  a.dd_name,
  null AS backgroundcolour,
  round(a.cul_places_worship * 100) AS cul_places_worship,
  round(a.cul_types_workers * 100) AS cul_types_workers,
  round(a.cul_areas_leisure * 100) AS cul_areas_leisure,
  round(a.cul_museums * 100) AS cul_museums,
  round(a.cul_listed_buildings * 100) AS cul_listed_buildings,
  round(a.tra_communication_internet * 100) AS tra_communication_internet,
  round(a.tra_public_transport * 100) AS tra_public_transport,
  round(a.hou_affordability * 100) AS hou_affordability,
  round(a.hou_overcrowding * 100) AS hou_overcrowding,
  round(a.hou_green_space * 100) AS hou_green_space,
  round(a.hou_public_spaces * 100) AS hou_public_spaces,
  round(a.hou_pollution * 100) AS hou_pollution,
  round(a.hou_air_quality * 100) AS hou_air_quality
FROM coop.uk_coop_restrict_wellbeing a, geodata.uk_glx_geodata_postal_postcode b
WHERE b.rm_format = '${id}'
AND ST_INTERSECTS(a.geom_4326, b.geom_p_4326)
ORDER BY a.dd_name;
