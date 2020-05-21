SELECT
 id,
 dd_name,
 round(ind_wellb * 100) AS ind_wellb,
 round(indeduca * 100) AS indeduca,
 round(indhealt * 100) AS indhealt,
 round(indecono * 100) AS indecono,
 round(indcultu * 100) AS indcultu,
 round(indtrans * 100) AS indtrans,
 round(indhousi * 100) AS indhousi,
 round(indrelat * 100) AS indrelat,
 round(indequal * 100) AS indequal,
 round(indvoice * 100) AS indvoice
FROM coop.uk_coop_restrict_wellbeing
WHERE constituency_name ILIKE '${constituency}' ORDER BY dd_name;

/*UNION ALL

SELECT y.* FROM (SELECT st_setsrid(st_point(${lng}, ${lat}), 4326) geom_p) a

CROSS JOIN lateral

(SELECT 
  id,
  dd_name,
  null AS backgroundcolour,
  round(ind_wellb * 100) AS ind_wellb,
  round(indeduca * 100) AS indeduca,
  round(indhealt * 100) AS indhealt,
  round(indecono * 100) AS indecono,
  round(indcultu * 100) AS indcultu,
  round(indtrans * 100) AS indtrans,
  round(indhousi * 100) AS indhousi,
  round(indrelat * 100) AS indrelat,
  round(indequal * 100) AS indequal,
  round(indvoice * 100) AS indvoice
FROM coop.uk_coop_restrict_wellbeing w
ORDER BY w.geom_p_4326 <-> a.geom_p
LIMIT 50) y*/
