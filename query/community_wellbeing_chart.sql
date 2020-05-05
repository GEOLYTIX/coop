SELECT
  round(indeduca * 100) as indeduca,
  round(indhealt * 100) as indhealt,
  round(indecono * 100) as indecono,
  round(indcultu * 100) as indcultu,
  round(indtrans * 100) as indtrans,
  round(indhousi * 100) as indhousi,
  round(indrelat * 100) as indrelat,
  round(indequal * 100) as indequal,
  round(indvoice * 100) as indvoice
FROM coop.uk_coop_restrict_wellbeing WHERE id = ${id};
