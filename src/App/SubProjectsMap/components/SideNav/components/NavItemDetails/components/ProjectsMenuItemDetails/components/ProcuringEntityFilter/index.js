import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import CheckBoxGroupFilter from "../../../../../../../../../components/CheckBoxGroupFilter";

const prepareFilterItems = (items) => items.map(({ name, id, projects_count }) => ({
    title: name,
    value: name,
    total_count: projects_count,
    id
}));

const ProcuringEntityPackageFilter = ({ procuringEntityPackage, setProcuringEntityFilter }) => {


    const [procuringEntitiesIds, setProcuringEntitiesId] = useState([]);
    useEffect(() => {
        setProcuringEntityFilter(procuringEntitiesIds.join(','));
    }, [procuringEntitiesIds]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleOnclickFilterItem = (package_id) => {
        if (procuringEntitiesIds.includes(package_id)) {
            const filterUncheckedItem = procuringEntitiesIds.filter((i) => i !== package_id);
            setProcuringEntitiesId(filterUncheckedItem);
        }
        else {
            setProcuringEntitiesId([...procuringEntitiesIds, package_id]);
        }

    }

    const procuringEntitiesData = procuringEntityPackage.length > 0 ? prepareFilterItems(procuringEntityPackage) : [];

    return (
        <CheckBoxGroupFilter
            items={procuringEntitiesData}
            itemsPerPage={5}
            // filterTitle={`Procuring Entity Package`}
            // filterClass={`projectFilter`}
            handleFilter={handleOnclickFilterItem}
            projectFilterClass="procuringFilter"
        />
    )
}

export default ProcuringEntityPackageFilter;

ProcuringEntityPackageFilter.propTypes = {
    procuringEntityPackage: PropTypes.array.isRequired
}
