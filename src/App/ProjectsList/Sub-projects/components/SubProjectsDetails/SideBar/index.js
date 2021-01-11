import React from "react";

const SidebarSection = ({ sub_project }) => {

    return (
        <div>
            <span >
                <h4>Project Id </h4>
                <p>{sub_project ? sub_project?.project_id : 'N/A'}</p>                                                                                                                                                                                                                                                                                                       {/* <p>{sub_project.id}</p> */}
            </span>
            <span >
                <h4>Phase of the sub_project</h4>
                <p>{sub_project?.details ? sub_project?.details.phase.name : 'N/A'}</p>
            </span>

            <span >
                <h4>Supervision Agency</h4>
                <p>{sub_project?.details ? sub_project?.details.supervising_agency.name : "N/A"}</p>                                                                                                                                                                                                                                                                                                       {/* <p>{sub_project.id}</p> */}
            </span>

            <span >
                <h4>Contractors</h4>
                <p>{sub_project?.details ? sub_project?.details.contractor.name : "N/A"}</p>
            </span>
            <span >
                <h4>Actor(LGA)</h4>
                <p>{sub_project?.details ? sub_project?.details.actor.name : "N/A"}</p>
            </span>
            {/* <span >
                <h4>Total sub_project Cost</h4>
                <p>{sub_project?.details ? sub_project?.details.total_project_cost.amount : 'N/A'}</p>
            </span> */}
            <span >
                <h4>Sub project locations</h4>
                {sub_project?.sub_project_locations ? sub_project?.sub_project_locations.map(location => {
                    if (location.level === 'region') {
                        return (
                            <p>-{location.region.name},{location.district.name}</p>
                        )
                    }
                    else {
                        return <p> - {location.district.name}</p>

                    }

                }) : 'N/A'}
            </span>
            <span >
                <h4>Human Resource</h4>
                <p>{sub_project?.details ? sub_project?.details?.human_resource?.quantity : 'N/A'}</p>
            </span>
        </div>

    )
}

export default SidebarSection;