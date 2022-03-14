import { useState } from "react"
export const useToggle = ( initialstate = false) => {
    const [ isEditForm, setIsEditForm] = useState(initialstate);
    const [ visible, setVisible] = useState(initialstate);
    const [ previewOnMap, setPreviewOnMap] = useState(initialstate);
    return  { isEditForm, setIsEditForm, visible, setVisible, previewOnMap, setPreviewOnMap }
}