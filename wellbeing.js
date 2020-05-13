{
  "templates": {
    "wellbeing": {
      "template": "http://localhost:3000/coop/views/wellbeing.html",
      "_template": "https://api.github.com/repos/GEOLYTIX/coop/contents/wellbeing.html"
    },
    "delineo": {
      "template": "http://localhost:3000/coop/views/delineo.html",
      "_template": "https://api.github.com/repos/GEOLYTIX/coop/contents/delineo.html"
    },
    "community wellbeing - index": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_index.sql"
    },
    "community wellbeing - index compare": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_index_compare.sql"
    },    
    "community wellbeing - people": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_people.sql"
    },
    "community wellbeing - people compare": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_people_compare.sql"
    },      
    "community wellbeing - place": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_place.sql"
    },
    "community wellbeing - place compare": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_place_compare.sql"
    },
    "community wellbeing - relationships": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_relationships.sql"
    },
    "community wellbeing - relationships compare": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_relationships_compare.sql"
    },
    "community wellbeing - chart": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/community_wellbeing_chart.sql"
    },
    "get_lad_from_region": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/get_lad_from_region.sql"
    },
    "get_constituency_from_region": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/get_constituency_from_region.sql"
    },
    "select_ll": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/select_ll.sql",
      "dbs": "XYZ"
    },
    "nnearest_from_ll": {
      "template": "https://api.github.com/repos/GEOLYTIX/coop/contents/query/nnearest_from_ll.sql",
      "dbs": "XYZ"
    }
  },
  "locales": {
    "Wellbeing": {
      "gazetteer": {
        "provider": "GOOGLE",
        "code": "GB",
        "placeholder": "eg. South Tottenham",
        "datasets": [{
          "layer": "Community Wellbeing",
          "table": "coop.uk_coop_restrict_wellbeing",
          "label": "dd_name"
        }]
      },
      "bounds": {
        "north": 67,
        "east": 9,
        "south": 44,
        "west": -16
      },
      "view": {
        "lng": -3,
        "lat": 54
      },
      "maskBounds": true,
      "minZoom": 6,
      "maxZoom": 17,
      "layers": {
        "Mapbox Baselayer": {
          "group": "Base maps",
          "display": true,
          "attribution": {
            "© Mapbox": "https://www.mapbox.com/about/maps",
            "© OpenStreetMap": "http://www.openstreetmap.org/copyright"
          },
          "format": "tiles",
          "URI": "/styles/v1/dbauszus/ciozrimi3002bdsm8bjtn2v1y/tiles/256/{z}/{x}/{y}?&provider=MAPBOX&host=https://api.mapbox.com"
        },
        "HERE Imagery": {
          "group": "Base maps",
          "attribution": {
            "© Here": "https://www.here.com/"
          },
          "format": "tiles",
          "URI": "/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?&provider=HERE&host=https://1.aerial.maps.api.here.com"
        },
        "HERE Hybrid": {
          "group": "Base maps",
          "attribution": {
            "© Here": "https://www.here.com/"
          },
          "format": "tiles",
          "URI": "/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?&provider=HERE&host=https://1.aerial.maps.api.here.com"
        },
        "Zoomstack": {
          "group": "Base maps",
          "attribution": {
              "© Ordanance Survey": "https://ordnancesurvey.co.uk"
          },
          "format": "tiles",
          "URI": "https://api.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Light%203857/{z}/{x}/{y}.png?key=4vmpYY1uFdimsAkyGwuaFbbHEyfvA5Gy"
        },
        "LSOA": {
          "format": "mvt",
          "srid": "3857",
          "geom": "geom_3857_10m",
          "dbs": "XYZ",
          "tables": {
            "12": null,
            "13": "coop.vw_uk_glx_geodata_admin_lsoa"
          }
        },
        "Community Wellbeing": {
          "format": "mvt",
          "display": true,
          "srid": "3857",
          "geom": "geom_3857",
          "dbs": "XYZ",
          "tables": {
            "8": null,
            "9": "coop.uk_coop_restrict_wellbeing"
          },
          "mvt_cache": "coop.uk_coop_restrict_wellbeing__mvt",
          "qID": "id",
          "infoj": [
            {
              "label": "Locale name",
              "field": "dd_name"
            },
            {
              "label": "Community Wellbeing Score",
              "field": "ind_wellb",
              "fieldfx": "ROUND(ind_wellb * 100)",
              "class": "score_value",
              "type": "integer",
              "inline": true
            },
            {
              "type": "dataview",
              "target": "location",
              "query": "community wellbeing - chart",
              "chart": {
                "labels": [
                  "Education",
                  "Health",
                  "Economy",
                  "Culture",
                  "Transport",
                  "Housing",
                  "Relations",
                  "Equality",
                  "Voice"
                ],
                "datasets": [
                  {
                    "fields": [
                      "indeduca",
                      "indhealt",
                      "indecono",
                      "indcultu",
                      "indtrans",
                      "indhousi",
                      "indrelat",
                      "indequal",
                      "indvoice"
                    ],
                    "backgroundColor": [
                      "#238443",
                      "#78c679",
                      "#c2e699",
                      "#0570b0",
                      "#74a9cf",
                      "#bdc9e1",
                      "#cc4c02",
                      "#fe9929",
                      "#fed98e"
                    ]
                  }
                ]
              }
            }
          ],
          "dataviews": {
            "Index": {
              "display": true,
              "query": "community wellbeing - index",
              "viewport": true,
              "selectable": true,
              "columns": [
                {
                  "title": "Locale name",
                  "field": "dd_name"
                },
                {
                  "title": "Wellbeing Score",
                  "field": "ind_wellb"
                },
                {
                  "title": "PEOPLE",
                  "columns": [
                    {
                      "title": "Education",
                      "field": "indeduca"
                    },
                    {
                      "title": "Health",
                      "field": "indhealt"
                    },
                    {
                      "title": "Economy",
                      "field": "indecono"
                    }
                  ]
                },
                {
                  "title": "PLACE",
                  "columns": [
                    {
                      "title": "Culture",
                      "field": "indcultu"
                    },
                    {
                      "title": "Transport",
                      "field": "indtrans"
                    },
                    {
                      "title": "Housing",
                      "field": "indhousi"
                    }
                  ]
                },
                {
                  "title": "RELATIONSHIPS",
                  "columns": [
                    {
                      "title": "Relationships",
                      "field": "indrelat"
                    },
                    {
                      "title": "Equality",
                      "field": "indequal"
                    },
                    {
                      "title": "Voice",
                      "field": "indvoice"
                    }
                  ]
                }
              ]
            },
            "People": {
              "display": true,
              "query": "community wellbeing - people",
              "viewport": true,
              "selectable": true,
              "columns": [
                {
                  "title": "Locale name",
                  "field": "dd_name"
                },
                {
                  "title": "EDUCATION",
                  "columns": [
                    {
                      "title": "Access to schools",
                      "field": "edu_access_schools"
                    },
                    {
                      "title": "Access to good schools",
                      "field": "edu_access_good_schools"
                    },
                    {
                      "title": "Access to adult edutcation",
                      "field": "edu_access_adult_edu"
                    },
                    {
                      "title": "Access to libraries",
                      "field": "edu_access_libraries"
                    },
                    {
                      "title": "School quality",
                      "field": "edu_school_quality"
                    }
                  ]
                },
                {
                  "title": "HEALTH",
                  "columns": [
                    {
                      "title": "Access to health services",
                      "field": "hea_access_health_services"
                    },
                    {
                      "title": "Hypertension and Heart Failure",
                      "field": "hea_hypertension_heart_failure"
                    },
                    {
                      "title": "Drugs used in diabetes",
                      "field": "hea_drugs_used_diabetes"
                    },
                    {
                      "title": "Anti- depressants",
                      "field": "hea_antidepressants"
                    },
                    {
                      "title": "Obesity",
                      "field": "hea_obesity"
                    },
                    {
                      "title": "Dementia",
                      "field": "hea_dementia"
                    }
                  ]
                },
                {
                  "title": "ECONOMY",
                  "columns": [
                    {
                    "title": "Proximity of work to home",
                    "field": "eco_proximity_work_home"
                  },
                  {
                    "title": "Hours worked",
                    "field": "eco_hours_worked"
                  },
                  {
                    "title": "Household Income",
                    "field": "eco_household_income"
                  },
                  {
                    "title": "Vacant commercial units",
                    "field": "eco_vacant_commercial_units"
                  },
                  {
                    "title": "Free school meals",
                    "field": "eco_free_school_meals"
                  },
                  {
                    "title": "Unemployment",
                    "field": "eco_unemployment"
                  }
                ]
                }
              ]
            },
            "Place": {
              "display": true,
              "query": "community wellbeing - place",
              "viewport": true,
              "selectable": true,
              "columns": [
                {
                  "title": "Locale name",
                  "field": "dd_name"
                },
                {
                  "title": "CULTURE",
                  "columns": [
                    {
                      "field": "cul_places_worship",
                      "title": "Places of worship"
                    },
                    {
                      "field": "cul_types_workers",
                      "title": "Types of workers"
                    },
                    {
                      "field": "cul_areas_leisure",
                      "title": "Areas for leisure"
                    },
                    {
                      "field": "cul_museums",
                      "title": "Museums"
                    },
                    {
                      "field": "cul_listed_buildings",
                      "title": "Areas for leisure"
                    }
                  ]
                },
                {
                  "title": "TRANSPORT",
                  "columns": [
                    {
                      "field": "tra_communication_internet",
                      "title": "Internet"
                    },
                    {
                      "field": "tra_public_transport",
                      "title": "Public Transport"
                    }
                  ]
                },
                {
                  "title": "HOUSING",
                  "columns": [
                    {
                      "field": "hou_affordability",
                      "title": "Affordability"
                    },
                    {
                      "field": "hou_overcrowding",
                      "title": "Overcrowding"
                    },
                    {
                      "field": "hou_green_space",
                      "title": "Green Space"
                    },
                    {
                      "field": "hou_public_spaces",
                      "title": "Public spaces"
                    },
                    {
                      "field": "hou_pollution",
                      "title": "Pollution"
                    },
                    {
                      "field": "hou_air_quality",
                      "title": "Pollution"
                    }
                  ]
                }
              ]
            },
            "Relationships": {
              "display": true,
              "query": "community wellbeing - relationships",
              "viewport": true,
              "selectable": true,
              "columns": [
                {
                  "title": "Locale name",
                  "field": "dd_name"
                },
                {
                  "title": "RELATIONSHIPS",
                  "columns": [
                    {
                      "field": "rel_social_spaces",
                      "title": "Social spaces"
                    },
                    {
                      "field": "rel_presence_young",
                      "title": "Presence of young children"
                    },
                    {
                      "field": "rel_one_person_hhd_50plus",
                      "title": "One person household, aged 50+"
                    },
                    {
                      "field": "rel_proximity_work_home",
                      "title": "Proximity of work to home"
                    },
                    {
                      "field": "rel_hhd_churn",
                      "title": "Household churn"
                    },
                    {
                      "field": "rel_lt_health",
                      "title": "Long-term health status"
                    },
                    {
                      "field": "rel_crime",
                      "title": "Crime in the locale"
                    },
                    {
                      "field": "rel_crime_tc",
                      "title": "Crime in town centre"
                    }
                  ]
                },
                {
                  "title": "EQUALITY",
                  "columns": [
                    {
                      "field": "equ_house_price_gap",
                      "title": "House price gap"
                    },
                    {
                      "field": "equ_second_home_own",
                      "title": "Second home ownership"
                    },
                    {
                      "field": "equ_indep_schools",
                      "title": "Independent schools"
                    },
                    {
                      "field": "equ_qualifications",
                      "title": "Qualifications"
                    },
                    {
                      "field": "equ_ethnic_equality",
                      "title": "Ethnic eequality"
                    },
                    {
                      "field": "equ_relative_affluence",
                      "title": "Relative Affluence"
                    },
                    {
                      "field": "equ_lt_security",
                      "title": "Long term security"
                    },
                    {
                      "field": "voi_voter_turnout",
                      "title": "Voter turnout"
                    },
                    {
                      "field": "voi_coop_member_engagement",
                      "title": "Coop member engagement"
                    },
                    {
                      "field": "voi_signing_petitions",
                      "title": "Signing of petitions"
                    }
                  ]
                }
              ]
            }
          },
          "style": {
            "default": {
              "fillColor": "#EEE"
            },
            "highlight": {
              "fillColor": "#FFD60C",
              "strokeWidth": 2
            },
            "themes": {
              "Community Wellbeing Score": {
                "label": "Community Wellbeing Score",
                "type": "graduated",
                "field": "ind_wellb",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              },
              "Education and learning": {
                "label": "Education and learning",
                "type": "graduated",
                "field": "indeduca",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E4F3CB"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#CDE7A7"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#9DCF68"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#6EB733"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#429F09"
                  }
                ]
              },
              "Health": {
                "label": "Health",
                "type": "graduated",
                "field": "indhealt",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E4F3CB"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#CDE7A7"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#9DCF68"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#6EB733"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#429F09"
                  }
                ]
              },
              "Economy, work and employment": {
                "label": "Economy, work and employment",
                "type": "graduated",
                "field": "indecono",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E4F3CB"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#CDE7A7"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#9DCF68"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#6EB733"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#429F09"
                  }
                ]
              },
              "Culture, hertiage and leisure": {
                "label": "Culture, hertiage and leisure",
                "type": "graduated",
                "field": "indcultu",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#d0d1e6"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#a6bddb"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#74a9cf"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#2b8cbe"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#045a8d"
                  }
                ]
              },
              "Transport, mobility and connectivity": {
                "label": "Transport, mobility and connectivity",
                "type": "graduated",
                "field": "indtrans",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#d0d1e6"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#a6bddb"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#74a9cf"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#2b8cbe"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#045a8d"
                  }
                ]
              },
              "Housing, space and environment": {
                "label": "Housing, space and environment",
                "type": "graduated",
                "field": "indtrans",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#d0d1e6"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#a6bddb"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#74a9cf"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#2b8cbe"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#045a8d"
                  }
                ]
              },
              "Relationships and trust": {
                "label": "Relationships and trust",
                "type": "graduated",
                "field": "indrelat",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              },
              "Equality": {
                "label": "Equality",
                "type": "graduated",
                "field": "indequal",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              },
              "Voice and participation": {
                "label": "Voice and participation",
                "type": "graduated",
                "field": "indvoice",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              }
            }
          }
        },
        "Community Wellbeing LAD": {
          "format": "mvt",
          "display": true,
          "srid": "3857",
          "geom": "geom_3857",
          "dbs": "XYZ",
          "tables": {
            "8": "coop.vw_uk_glx_geodata_admin_lad",
            "9": null
          },
          "mvt_cache": "coop.uk_coop_restrict_wellbeing_lad__mvt",
          "qID": "id",
          "infoj": [
            {
              "field": "id"
            },
            {
              "field": "ind_wellb"
            }
          ],
          "style": {
            "default": {
              "fillColor": "#EEE"
            },
            "highlight": {
              "fillColor": "#FFD60C",
              "strokeWidth": 2
            },
            "themes": {
              "Community Wellbeing Score": {
                "label": "Community Wellbeing Score",
                "type": "graduated",
                "field": "ind_wellb",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              },
              "Education and learning": {
                "label": "Education and learning",
                "type": "graduated",
                "field": "indeduca",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E4F3CB"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#CDE7A7"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#9DCF68"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#6EB733"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#429F09"
                  }
                ]
              },
              "Health": {
                "label": "Health",
                "type": "graduated",
                "field": "indhealt",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E4F3CB"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#CDE7A7"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#9DCF68"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#6EB733"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#429F09"
                  }
                ]
              },
              "Economy, work and employment": {
                "label": "Economy, work and employment",
                "type": "graduated",
                "field": "indecono",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E4F3CB"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#CDE7A7"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#9DCF68"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#6EB733"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#429F09"
                  }
                ]
              },
              "Culture, hertiage and leisure": {
                "label": "Culture, hertiage and leisure",
                "type": "graduated",
                "field": "indcultu",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#d0d1e6"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#a6bddb"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#74a9cf"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#2b8cbe"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#045a8d"
                  }
                ]
              },
              "Transport, mobility and connectivity": {
                "label": "Transport, mobility and connectivity",
                "type": "graduated",
                "field": "indtrans",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#d0d1e6"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#a6bddb"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#74a9cf"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#2b8cbe"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#045a8d"
                  }
                ]
              },
              "Housing, space and environment": {
                "label": "Housing, space and environment",
                "type": "graduated",
                "field": "indtrans",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#d0d1e6"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#a6bddb"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#74a9cf"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#2b8cbe"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#045a8d"
                  }
                ]
              },
              "Relationships and trust": {
                "label": "Relationships and trust",
                "type": "graduated",
                "field": "indrelat",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              },
              "Equality": {
                "label": "Equality",
                "type": "graduated",
                "field": "indequal",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              },
              "Voice and participation": {
                "label": "Voice and participation",
                "type": "graduated",
                "field": "indvoice",
                "cat_arr": [
                  {
                    "value": 0,
                    "label": "Less than 40",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#FBCBF0"
                  },
                  {
                    "value": 0.4,
                    "label": "40-50",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#F7A5E5"
                  },
                  {
                    "value": 0.5,
                    "label": "50-60",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#E459CE"
                  },
                  {
                    "value": 0.6,
                    "label": "60-70",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#BD15B8"
                  },
                  {
                    "value": 0.7,
                    "label": "70 or more",
                    "strokeColor": "#FCFCFC",
                    "fillColor": "#770087"
                  }
                ]
              }
            }
          }
        },
        "Community Wellbeing Filter": {
          "format": "mvt",
          "srid": "3857",
          "geom": "geom_3857",
          "dbs": "XYZ",
          "table": "coop.uk_coop_restrict_wellbeing",
          "qID": "id",
          "infoj": [
            {
              "label": "dd_name",
              "field": "dd_name"
            },
            {
              "label": "region",
              "field": "region",
              "filter": {
                "in": [
                  "Scotland",
                  "Wales",
                  "North East",
                  "North West",
                  "London",
                  "South West",
                  "Eastern",
                  "Yorkshire and The Humber",
                  "West Midlands",
                  "East Midlands",
                  "Northern Ireland",
                  "South East"
                ]
              }
            },
            {
              "label": "localename",
              "field": "localename"
            }
          ]
        },
        "Local Authority": {
          "format": "mvt",
          "srid": "3857",
          "geom": "geom_3857_200m",
          "dbs": "XYZ",
          "table": "coop.vw_uk_glx_geodata_admin_lad",
          "infoj": [
            {
              "label": "id",
              "field": "id"
            },
            {
              "label": "lad_name",
              "field": "lad_name",
              "filter": "match"
            },
            {
              "label": "regionname",
              "field": "regionname",
              "filter": {
                "in": [
                  "Scotland",
                  "Wales",
                  "North East",
                  "North West",
                  "London",
                  "South West",
                  "Eastern",
                  "Yorkshire and The Humber",
                  "West Midlands",
                  "East Midlands",
                  "Northern Ireland",
                  "South East"
                ]
              }
            }
          ]
        },
        "Constituencies": {
          "format": "mvt",
          "srid": "3857",
          "geom": "geom_3857",
          "dbs": "XYZ",
          "table": "coop.uk_open_admin_constituencies_regions"
        },
        "Postal Code": {
          "format": "cluster",
          "dbs": "XYZ",
          "geom": "geom_p_4326",
          "table": "geodata.uk_glx_geodata_postal_postcode",
          "cluster_label": "rm_format",
          "cluster_kmeans": 0.05
        },
        "Search Boundaries": {
          "format": "mvt",
          "srid": "3857",
          "geom": "search_geom_3857",
          "dbs": "XYZ",
          "table": "coop.vw_uk_glx_geodata_search"
        },
        "Mapbox Labels": {
          "group": "Base maps",
          "display": true,
          "attribution": {
            "© Mapbox": "https://www.mapbox.com/about/maps",
            "© OpenStreetMap": "http://www.openstreetmap.org/copyright"
          },
          "format": "tiles",
          "URI": "/styles/v1/dbauszus/cj9puo8pr5o0c2sovhdwhkc7z/tiles/256/{z}/{x}/{y}?&provider=MAPBOX&host=https://api.mapbox.com"
        }
      }
    },
    "api": {
      "gazetteer": {
        "provider": "GOOGLE",
        "code": "GB",
        "placeholder": "eg. South Tottenham"
      },
      "bounds": {
        "north": 67,
        "east": 9,
        "south": 44,
        "west": -16
      },
      "view": {
        "lng": -3,
        "lat": 54
      },
      "maskBounds": true,
      "minZoom": 7,
      "maxZoom": 17,
      "layers": {
        "Mapbox Baselayer": {
          "attribution": {
            "© Mapbox": "https://www.mapbox.com/about/maps",
            "© OpenStreetMap": "http://www.openstreetmap.org/copyright"
          },
          "format": "tiles",
          "URI": "/styles/v1/dbauszus/ciozrimi3002bdsm8bjtn2v1y/tiles/256/{z}/{x}/{y}?&provider=MAPBOX&host=https://api.mapbox.com"
        },
        "Zoomstack": {
          "display": true,
          "attribution": {
              "© Ordanance Survey": "https://ordnancesurvey.co.uk"
          },
          "format": "tiles",
          "URI": "https://api.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Light%203857/{z}/{x}/{y}.png?key=4vmpYY1uFdimsAkyGwuaFbbHEyfvA5Gy"
        },
        "locales": {
          "display": true,
          "format": "mvt",
          "srid": "3857",
          "geom": "geom_3857",
          "dbs": "XYZ",
          "__table": "coop.uk_coop_restrict_wellbeing",
          "tables": {
            "8": null,
            "9": "coop.uk_coop_restrict_wellbeing"
          },
          "qID": "id",
          "infoj": [
            {
              "label": "id",
              "field": "id",
              "inline": true
            },
            {
              "label": "localename",
              "field": "localename",
              "inline": true
            },
            {
              "label": "dd_name",
              "field": "dd_name",
              "inline": true
            },
            {
              "label": "region",
              "field": "region",
              "inline": true
            },
            {
              "label": "country",
              "field": "country",
              "inline": true
            },
            {
              "label": "census11pop",
              "field": "census11pop",
              "inline": true
            },
            {
              "label": "census11dwelling",
              "field": "census11dwelling",
              "inline": true
            },
            {
              "label": "urban",
              "field": "urban",
              "inline": true
            },
            {
              "label": "rural",
              "field": "rural",
              "inline": true
            },
            {
              "label": "area_sqm",
              "field": "area_sqm",
              "inline": true
            },
            {
              "label": "indrelat",
              "field": "indrelat",
              "inline": true
            },
            {
              "label": "indequal",
              "field": "indequal",
              "inline": true
            },
            {
              "label": "indvoice",
              "field": "indvoice",
              "inline": true
            },
            {
              "label": "indecono",
              "field": "indecono",
              "inline": true
            },
            {
              "label": "indhealt",
              "field": "indhealt",
              "inline": true
            },
            {
              "label": "indeduca",
              "field": "indeduca",
              "inline": true
            },
            {
              "label": "indcultu",
              "field": "indcultu",
              "inline": true
            },
            {
              "label": "indhousi",
              "field": "indhousi",
              "inline": true
            },
            {
              "label": "indtrans",
              "field": "indtrans",
              "inline": true
            },
            {
              "label": "ind_wellb",
              "field": "ind_wellb",
              "inline": true
            }
          ]
        },
        "Mapbox Labels": {
          "attribution": {
            "© Mapbox": "https://www.mapbox.com/about/maps",
            "© OpenStreetMap": "http://www.openstreetmap.org/copyright"
          },
          "format": "tiles",
          "URI": "/styles/v1/dbauszus/cj9puo8pr5o0c2sovhdwhkc7z/tiles/256/{z}/{x}/{y}?&provider=MAPBOX&host=https://api.mapbox.com"
        }
      }
    }
  }
}
