SELECT
 id,
 dd_name,
 '#FFD60C' AS backgroundcolour,
  round(rel_social_spaces * 100) AS rel_social_spaces,
  round(rel_presence_young * 100) AS rel_presence_young,
  round(rel_one_person_hhd_50plus * 100) AS rel_one_person_hhd_50plus,
  round(rel_proximity_work_home * 100) AS rel_proximity_work_home,
  round(rel_hhd_churn * 100) AS rel_hhd_churn,
  round(rel_lt_health * 100) AS rel_lt_health,
  round(rel_crime * 100) AS rel_crime,
  round(rel_crime_tc * 100) AS rel_crime_tc,
  round(equ_ethnic_equality * 100) AS equ_ethnic_equality,
  round(equ_house_price_gap * 100) AS equ_house_price_gap,
  round(equ_second_home_own * 100) AS equ_second_home_own,
  round(equ_indep_schools * 100) AS equ_indep_schools,
  round(equ_qualifications * 100) AS equ_qualifications,
  round(equ_relative_affluence * 100) AS equ_relative_affluence,
  round(equ_lt_security * 100) AS equ_lt_security,
  round(voi_voter_turnout * 100) AS voi_voter_turnout,
  round(voi_coop_member_engagement * 100) AS voi_coop_member_engagement,
  round(voi_signing_petitions * 100) AS voi_signing_petitions
FROM coop.uk_coop_restrict_wellbeing
WHERE dd_name = '${loc}'

UNION ALL

SELECT 
  id,
  dd_name,
  null AS backgroundcolour,
  round(rel_social_spaces * 100) AS rel_social_spaces,
  round(rel_presence_young * 100) AS rel_presence_young,
  round(rel_one_person_hhd_50plus * 100) AS rel_one_person_hhd_50plus,
  round(rel_proximity_work_home * 100) AS rel_proximity_work_home,
  round(rel_hhd_churn * 100) AS rel_hhd_churn,
  round(rel_lt_health * 100) AS rel_lt_health,
  round(rel_crime * 100) AS rel_crime,
  round(rel_crime_tc * 100) AS rel_crime_tc,
  round(equ_ethnic_equality * 100) AS equ_ethnic_equality,
  round(equ_house_price_gap * 100) AS equ_house_price_gap,
  round(equ_second_home_own * 100) AS equ_second_home_own,
  round(equ_indep_schools * 100) AS equ_indep_schools,
  round(equ_qualifications * 100) AS equ_qualifications,
  round(equ_relative_affluence * 100) AS equ_relative_affluence,
  round(equ_lt_security * 100) AS equ_lt_security,
  round(voi_voter_turnout * 100) AS voi_voter_turnout,
  round(voi_coop_member_engagement * 100) AS voi_coop_member_engagement,
  round(voi_signing_petitions * 100) AS voi_signing_petitions
FROM coop.uk_coop_restrict_wellbeing
WHERE constituency_name = '${constituency}';
