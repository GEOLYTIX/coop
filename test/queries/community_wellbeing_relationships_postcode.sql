SELECT 
  a.id,
  a.dd_name,
  null AS backgroundcolour,
  round(a.rel_social_spaces * 100) AS rel_social_spaces,
  round(a.rel_presence_young * 100) AS rel_presence_young,
  round(a.rel_one_person_hhd_50plus * 100) AS rel_one_person_hhd_50plus,
  round(a.rel_proximity_work_home * 100) AS rel_proximity_work_home,
  round(a.rel_hhd_churn * 100) AS rel_hhd_churn,
  round(a.rel_lt_health * 100) AS rel_lt_health,
  round(a.rel_crime * 100) AS rel_crime,
  round(a.rel_crime_tc * 100) AS rel_crime_tc,
  round(a.equ_ethnic_equality * 100) AS equ_ethnic_equality,
  round(a.equ_house_price_gap * 100) AS equ_house_price_gap,
  round(a.equ_second_home_own * 100) AS equ_second_home_own,
  round(a.equ_indep_schools * 100) AS equ_indep_schools,
  round(a.equ_qualifications * 100) AS equ_qualifications,
  round(a.equ_relative_affluence * 100) AS equ_relative_affluence,
  round(a.equ_lt_security * 100) AS equ_lt_security,
  round(a.voi_voter_turnout * 100) AS voi_voter_turnout,
  round(a.voi_coop_member_engagement * 100) AS voi_coop_member_engagement,
  round(a.voi_signing_petitions * 100) AS voi_signing_petitions
FROM coop.uk_coop_restrict_wellbeing a, geodata.uk_glx_geodata_postal_postcode b
WHERE b.rm_format = '${id}'
AND ST_INTERSECTS(a.geom_4326, b.geom_p_4326)
ORDER BY a.dd_name;
