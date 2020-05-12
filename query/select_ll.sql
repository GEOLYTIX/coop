SELECT
  st_asgeojson(geom_4326) AS geomj,
  id,
  localename,
  dd_name,
  region,
  country,
  census11pop,
  census11dwelling,
  urban,
  rural,
  area_sqm,
  indrelat,
  indequal,
  indvoice,
  indecono,
  indhealt,
  indeduca,
  indcultu,
  indhousi,
  indtrans,
  ind_wellb
FROM coop.uk_coop_restrict_wellbeing
WHERE st_dwithin(geom_4326, st_setsrid(st_point(${lng}, ${lat}), 4326),0);
