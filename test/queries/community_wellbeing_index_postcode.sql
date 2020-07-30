SELECT
  a.id,
  a.dd_name,
  null AS backgroundcolour,
  round(a.ind_wellb * 100) AS ind_wellb,
  round(a.indeduca * 100) AS indeduca,
  round(a.indhealt * 100) AS indhealt,
  round(a.indecono * 100) AS indecono,
  round(a.indcultu * 100) AS indcultu,
  round(a.indtrans * 100) AS indtrans,
  round(a.indhousi * 100) AS indhousi,
  round(a.indrelat * 100) AS indrelat,
  round(a.indequal * 100) AS indequal,
  round(a.indvoice * 100) AS indvoice
FROM coop.uk_coop_restrict_wellbeing a, geodata.uk_glx_geodata_postal_postcode b
WHERE b.rm_format = '${id}'
AND ST_INTERSECTS(a.geom_4326, b.geom_p_4326)
ORDER BY a.dd_name;