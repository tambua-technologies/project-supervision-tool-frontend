
import { Popup, Marker } from "react-leaflet";
import { divIcon } from 'leaflet';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import randomColor from 'randomcolor';
import FieldNotePopupDetail from "./FieldNotePopupDetail";


const fieldNoteData = {
  "type": "FeatureCollection",
  "name": "Mbagala mashineni road field notes",
  "features": [
    {
      "geometry": {
        "coordinates": [
          [
            39.231618,
            -6.426924,
            0
          ],
          [
            39.231746,
            -6.434124,
            0
          ],
          [
            39.232133,
            -6.424124,
            0
          ],
          [
            39.230501,
            -6.430225,
            0
          ]
        ],
        "type": "LineString"
      },
      "properties": {
        "Contact_information": "685887633",
        "Field_Notes": "Road complete",
        "Geospatial_Points": "-6.896924 39.261618 0 0;-6.904124 39.261746 0 0;-6.904124 39.262133 0 0;-6.90225 39.270501 0 0",
        "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpoUmFR5ET6KftjsPKe68SrLL3ZvMm3agwew&usqp=CAU",
        "Your_Full_Name": "Beatrice Mkumbo",
        "today": "2021-04-29"
      },
      "type": "Feature"
    },
    {
      "geometry": {
        "coordinates": [
          [
            39.268441,
            -6.900929,
            0
          ],
          [
            39.267626,
            -6.895646,
            0
          ]
        ],
        "type": "LineString"
      },
      "properties": {
        "Contact_information": "67590772",
        "Field_Notes": "re-allocate contractors",
        "Geospatial_Points": "-6.900929 39.268441 0 0;-6.895646 39.267626 0 0",
        "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNAhyUqN8VEEBgWO5x9rPgKgXlyYc-6m6Fw&usqp=CAU",
        "Your_Full_Name": "Edric Shoo",
        "today": "2021-04-29"
      },
      "type": "Feature"
    },
    {
      "geometry": {
        "coordinates": [
          [
            39.204926,
            -6.789378,
            0
          ],
          [
            39.202566,
            -6.791509,
            0
          ],
          [
            39.202995,
            -6.793202,
            0
          ],
          [
            39.208767,
            -6.794992,
            0
          ],
          [
            39.211385,
            -6.79186,
            0
          ],
          [
            39.209583,
            -6.789282,
            0
          ],
          [
            39.206471,
            -6.789473,
            0
          ]
        ],
        "type": "LineString"
      },
      "properties": {
        "Contact_information": "2323232",
        "Field_Notes": "Hatuwatakiiii",
        "Geospatial_Points": "-6.789378 39.204926 0 0;-6.791509 39.202566 0 0;-6.793202 39.202995 0 0;-6.794992 39.208767 0 0;-6.79186 39.211385 0 0;-6.789282 39.209583 0 0;-6.789473 39.206471 0 0",
        "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwy5ZB6_2vih7u79GZW07nZ2cGaXOCuwI9Jg&usqp=CAU",
        "Your_Full_Name": "CCM Oyeeeee",
        "today": "2021-04-30"
      },
      "type": "Feature"
    }
  ]
}

class FieldNotePoints extends Component {

  static propTypes = {
    features: PropTypes.array.isRequired,
  }
  render() {
    const { features } = fieldNoteData;
    const color = randomColor();

    return (
      <>
        {
          features.length > 0 ? features.map(({ geometry, properties }) => {
            const polygon = turf.pointOnFeature(geometry);
            const { geometry: geoRef } = polygon

            var customizedFieldNoteIcon = divIcon({
              className: 'fieldNoteIcon',
              html: `<div style='background-color:${color}' 
                   class='fieldMarker'></div>
                   <img src=${properties.Image}
                         class='awesome'>`,
              iconSize: [30, 42]
            });

            return (
              <Marker
                position={[geoRef.coordinates[1], geoRef.coordinates[0]]}
                icon={customizedFieldNoteIcon}
              >
                <Popup  >
                  <FieldNotePopupDetail features={features} />
                  </Popup>
              </Marker>
            );
          }) : ''
        }
      </>);
  }
}


export default FieldNotePoints;
