
SELECT ARRAY(
  SELECT constituency_name 
  FROM coop.uk_open_admin_constituencies_regions 
  WHERE regionname = '${region}'
) AS constituency_name;
