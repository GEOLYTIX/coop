
SELECT ARRAY(
  SELECT constituency_name 
  FROM coop.vw_uk_glx_geodata_admin_lad 
  WHERE regionname = '${region}'
) AS constituency_name;
