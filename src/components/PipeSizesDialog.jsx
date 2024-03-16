import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { useState } from 'react'

const PipeSizesDialog = ({ items, unitType, selected, handleSubmit, handleClose }) => {
    const [selectedSizes, setSelectedSizes] = useState(selected)


    const closeClicked = () => {
        handleClose()
    }

    const submitClicked = () => {
        handleSubmit(selectedSizes)
    }

    const handleChange = (_id) => {
        setSelectedSizes((prev) => {
            const index = prev.indexOf(_id);
            const newArray = [...prev];
            if (index !== -1) {
                newArray.splice(index, 1);
            } else {
                newArray.push(_id);
            }
            return newArray;
        });
    };

    const sortByKey = (items) => {
        const key = unitType === 'mm' ? 'metricDisplayText' : 'imperialDisplayText'

        return items.sort((a, b) => {

            const valueA = typeof a[key] === 'string' ? Number(a[key]) : a[key]
            const valueB = typeof b[key] === 'string' ? Number(b[key]) : b[key]

            if (valueA < valueB) {
                return -1
            } else if (valueA > valueB) {
                return 1
            } else {
                return 0
            }
        })
    }

    return <>
        <Card sx={{ padding: '1rem', overflowY: 'auto' }} >

            <div className="header-wrapper">
                <div className="header">
                    <Typography variant='h5'>
                        Select Pipe Sizes ({unitType})
                    </Typography>
                </div>
            </div>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    width: '625px'
                }}>

                {
                    sortByKey(items).map(({
                        _id, metricDisplayText, imperialDisplayText
                    }) => {
                        return <FormControlLabel
                            key={_id}
                            control={
                                <Checkbox onChange={() => handleChange(_id)} checked={selectedSizes.includes(_id)} />}
                            label={unitType == 'mm' ? metricDisplayText : imperialDisplayText}
                        />

                    })
                }
            </Box>

            <div className="buttons-wrapper">
                <Button onClick={closeClicked}>
                    Cancle
                </Button>
                <Button onClick={submitClicked}>
                    Submit
                </Button>
            </div >
        </Card >
    </>

}

export default PipeSizesDialog