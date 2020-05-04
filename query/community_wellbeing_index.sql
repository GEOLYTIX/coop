SELECT
  dd_name,
  ind_wellb * 100 AS ind_wellb,
  indeduca * 100 AS indeduca,
  indhealt * 100 AS indhealt,
  indecono * 100 AS indecono,
  indcultu * 100 AS indcultu,
  indtrans * 100 AS indtrans,
  indhousi * 100 AS indhousi,
  indrelat * 100 AS indrelat,
  indequal * 100 AS indequal,
  indvoice * 100 AS indvoice
FROM coop.uk_coop_restrict_wellbeing
WHERE true ${viewport} ${filter} FETCH FIRST 99 ROW ONLY;
