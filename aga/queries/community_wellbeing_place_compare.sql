SELECT
 id,
 dd_name,
 '#FFD60C' AS backgroundcolour,
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
WHERE dd_name LIKE '${loc}'

UNION ALL

SELECT y.* FROM (SELECT st_setsrid(st_point(${lng}, ${lat}), 4326) geom_p) a

CROSS JOIN lateral

(SELECT 
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
FROM coop.uk_coop_restrict_wellbeing w
ORDER BY w.geom_p_4326 <-> a.geom_p
LIMIT 50) y
