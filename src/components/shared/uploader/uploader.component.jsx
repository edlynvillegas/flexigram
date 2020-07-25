import React, { useState, useEffect } from 'react'
import './uploader.styles.scss'
// SVGs
import { ReactComponent as PolaroidSVG } from '../../../assets/images/illustrations/polaroid.svg'

const PhotoUploader = ({ fileUpload, multiple }) => {
    console.log('PhotoUploader rendered!')
    const [selectedFile, setSelectedFile] = useState()
    const [isHighlight, setHighlight] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)

    const fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i));
        }
        return array;
    }

    const revokeURL = (list) => URL.revokeObjectURL(list.src)

    const onDragOverHandler = (e) => {
        e.preventDefault();
        setHighlight(true)
    }

    const onDragLeaveHandler = (e) => {
        e.preventDefault();
        setHighlight(false)
    }
    
    const maxSelectFile = event => {
        let files = event.target.files // create file object
        if (files.length > 6) {
            event.target.value = null // discard selected file
            setErrorMsg('Maximum of 6 images only')
            return false;
        }
        return true;
    }

    const checkMimeType = event => {
        //getting file object
        let files = event.target.files 
        //define message container
        let err = 0;
        // list allow mime type
        const types = ['image/png', 'image/jpeg']
        // loop access array
        for(var i = 0; i < files.length; i++) {
            // compare file type find doesn't match
            // eslint-disable-next-line
            if (types.every(type => files[i].type !== type)) {
                err++;
            }
        };

        if (err > 0) { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            setErrorMsg('Accepted formats are: JPEG and PNG')
            return false; 
        }
        return true;
    }

    const onChangeHandler = (e) => {
        if (maxSelectFile(e) && checkMimeType(e)) {
            const files = e.target.files;
            console.log(files)
            const filesArr = fileListToArray(files);
            setSelectedFile(filesArr.map((item, index) => ({id: 'file-'+index, name: item.name, src: URL.createObjectURL(item)})));
            fileUpload({ type: 'file', value: files })
        }
    }

    useEffect(() => {
        if (!selectedFile) return;

        // free memory when ever this component is unmounted
        return () => {
            for (var i = 0; i < selectedFile.length; i++) {
                revokeURL(selectedFile[i])
            }
        }
    }, [selectedFile])
    
    return (
        <>
            <div className="photo-viewer">
                {
                    selectedFile && selectedFile.map(file => <img key={file.id} src={file.src} alt={file.name}/>)
                }
            </div>
            {
                !selectedFile ?
                <div className={`photo-uploader ${isHighlight ? ' highlighted' : ''}`}>
                    <PolaroidSVG />
                    <p>
                        Select or Drop photo here
                        { errorMsg ? <span>({errorMsg})</span> : null}
                    </p>
                    <input type="file" name="file"
                        multiple={multiple}
                        accept="image/*"
                        onChange={onChangeHandler}
                        onDragOver={onDragOverHandler}
                        onDragLeave={onDragLeaveHandler} />
                </div> :
                null
            }
        </>
    )
}

export default React.memo(PhotoUploader)