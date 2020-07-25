import React, { useReducer } from 'react'
import './add-photo.styles.scss'
// Components
import Dialog from '../../shared/dialog/dialog.component'
import PhotoUploader from '../../shared/uploader/uploader.component'
import DialogInput from '../../shared/dialog-input/dialog-input.component'
// Services
import { sharePost } from '../../../services/user.services'

const uploadReducer = (state, action) => {
    if (action.type) {
        return { ...state, [action.type]: action.value }
    } else {
        return state
    }
}

const AddPhoto = ({ setShow }) => {
    const [photoForm, setPhotoForm] = useReducer(uploadReducer, { file: null, caption: '' })
    console.log('add photo rendered!')

    const addPhoto = () => {
        var formData = new FormData()
        formData.append('caption', photoForm.caption)
        if (photoForm.file && photoForm.file.length > 0) {
            for(var i = 0; i < photoForm.file.length; i++) {
                console.log(photoForm.file[i])
                formData.append('photos', photoForm.file[i])
            }
        }
        sharePost(formData)
            .then(res => {
                console.log('uploading photo res...', res)
            })
    }
    return (
        <Dialog
            size='md'
            headerText='Add Photo'
            closeText='Cancel'
            submitText='Share'
            handleClose={() => setShow(false)}
            handleSubmit={() => addPhoto()}>
            <PhotoUploader fileUpload={setPhotoForm} multiple={true} />
            <DialogInput placeholder="Caption" captionChange={setPhotoForm} />
        </Dialog>
    )
}

export default React.memo(AddPhoto)