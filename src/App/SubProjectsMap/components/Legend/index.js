import React from "react";
import { LineOutlined } from '@ant-design/icons';

import './styles.css';

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

function Legend({ position, projects }) {

    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomright
    return (
        <div className='Legend'>
            {
                projects ?
                    <div className={`${positionClass} info legend`} style={{ marginRight: '10px', marginBottom: '20px' }}>
                        <h4> Keys </h4>
                        <div className="allocation">
                            <h4>Allocation ($)</h4>
                            <div className='bubble-large' >
                                <div className='bubble-contents'><LineOutlined style={{ fontSize: 28, color: '#989292' }} /><p>800</p></div>
                            </div>
                            <div className='bubble-medium' >
                                <div className='bubble-contents-medium'><LineOutlined style={{ fontSize: 28, color: '#989292' }} /><p>660</p></div>
                            </div>
                            <div className='bubble-small' >
                                <div className='bubble-contents-small'><LineOutlined style={{ fontSize: 28, color: '#989292' }} /><p>400</p></div>
                            </div>
                        </div>
                        <div className="projects-info">
                        <h4>Projects</h4>
                        {
                            projects.map(({ color, code }, i) =>
                                <div className="project-legend" key={i}>
                                    <p style={{ backgroundColor: color }} />
                                    <h5>{code}</h5>
                                </div>
                            )
                        }
                        </div>
                    </div> : ''

            }
        </div>

    )
}

export default Legend;
