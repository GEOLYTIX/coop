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
WHERE dd_name LIKE '${loc}'

UNION ALL

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
WHERE true 
    AND ST_DWithin(
      ST_Transform(
        ST_MakeEnvelope(
          -28850.673877445377,
          6680822.621280611,
          6446.8449202818865,
          6737126.468338449,
          3857
        )
      ,3857),
      geom_3857, 0.00001)  FETCH FIRST 9 ROW ONLY;
