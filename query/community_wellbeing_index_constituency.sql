SELECT a.id,
       a.dd_name,
       round(a.ind_wellb * 100) AS               ind_wellb,
       round(a.indeduca * 100)  AS               indeduca,
       round(a.indhealt * 100)  AS               indhealt,
       round(a.indecono * 100)  AS               indecono,
       round(a.indcultu * 100)  AS               indcultu,
       round(a.indtrans * 100)  AS               indtrans,
       round(a.indhousi * 100)  AS               indhousi,
       round(a.indrelat * 100)  AS               indrelat,
       round(a.indequal * 100)  AS               indequal,
       round(a.indvoice * 100)  AS               indvoice
    FROM
       coop.uk_coop_restrict_wellbeing           a,
       coop.uk_open_admin_constituencies_regions b
    where
       ST_Intersects(b.geom_4326, a.geom_p_4326) AND b.id = ${id} 
       order by dd_name limit 100;