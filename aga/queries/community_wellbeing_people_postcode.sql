SELECT 
  a.id,
  a.dd_name,
  null AS backgroundcolour,
  round(a.edu_access_schools * 100) AS edu_access_schools,
  round(a.edu_access_good_schools * 100) AS edu_access_good_schools,
  round(a.edu_access_adult_edu * 100) AS edu_access_adult_edu,
  round(a.edu_access_libraries * 100) AS edu_access_libraries,
  round(a.edu_school_quality * 100) AS edu_school_quality,
  round(a.hea_access_health_services * 100) AS hea_access_health_services,
  round(a.hea_hypertension_heart_failure * 100) AS hea_hypertension_heart_failure,
  round(a.hea_drugs_used_diabetes * 100) AS hea_drugs_used_diabetes,
  round(a.hea_antidepressants * 100) AS hea_antidepressants,
  round(a.hea_obesity * 100) AS hea_obesity,
  round(a.hea_dementia * 100) AS hea_dementia,
  round(a.eco_proximity_work_home * 100) AS eco_proximity_work_home,
  round(a.eco_hours_worked * 100) AS eco_hours_worked,
  round(a.eco_household_income * 100) AS eco_household_income,
  round(a.eco_vacant_commercial_units * 100) AS eco_vacant_commercial_units,
  round(a.eco_free_school_meals * 100) AS eco_free_school_meals,
  round(a.eco_unemployment * 100) AS eco_unemployment
FROM coop.uk_coop_restrict_wellbeing a, geodata.uk_glx_geodata_postal_postcode b
WHERE b.rm_format = '${id}'
AND ST_INTERSECTS(a.geom_4326, b.geom_p_4326)
ORDER BY a.dd_name;
