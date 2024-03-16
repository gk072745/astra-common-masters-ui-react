import { IconButton, Tooltip } from '@mui/material'
import { MdDownload } from 'react-icons/md'
import { getSampleFileData, downloadSampleFileData } from '../stores/sampleFile'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const SampleFileBtn = ({ tableName = '' }) => {
    const sampleFile = useSelector((store) => store.sampleFileReducer.sampleFile)
    const dispatch = useDispatch()


    const handleDownloadSampleFile = async () => {
        await dispatch(downloadSampleFileData(sampleFile?.fileUrl))
    }

    const handleGetSampleFile = async () => {
        await dispatch(getSampleFileData({ tableName: tableName }))
    }

    useEffect(() => {
        handleGetSampleFile()
    }, [tableName])

    return (
        <>
            <Tooltip title="Download Sample File">
                <IconButton onClick={handleDownloadSampleFile}>
                    <MdDownload />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default SampleFileBtn