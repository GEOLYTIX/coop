SELECT ARRAY(
  SELECT lad_name 
  FROM coop.vw_uk_glx_geodata_admin_lad 
  WHERE regionname = '${region}'
  ORDER BY lad_name
) AS lad_name;
