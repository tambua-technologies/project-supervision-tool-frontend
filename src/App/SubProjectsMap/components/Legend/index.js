import React from "react";

import './styles.css';

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

function Legend() {

    const positionClass = POSITION_CLASSES.bottomright
    return (
        <div className='Legend'>
            {
                    <div className={`${positionClass} info legend`} style={{ marginRight: '10px', marginBottom: '20px' }}>
                        <div className="projects-info">
                            <h4>Key</h4>
                            {
                                [
                                    {color: '#199900', code: 'Road'},
                                    {color: '#000080', code: 'Drain'},
                                ].map(({ color, code }, i) =>
                                    <div className="project-legend" key={i}>
                                        <p style={{ backgroundColor: color }} />
                                        <h5>{code}</h5>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
        </div>

    )
}

export default Legend;
