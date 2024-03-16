import { Accordion, AccordionSummary, AccordionDetails, Typography, Icon, } from '@mui/material';
import { RxDotFilled } from 'react-icons/rx'
import { MdChevronRight } from 'react-icons/md';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const ProductDetailsNavItems = ({ item, index }) => {
    const navigate = useNavigate()


    if (item.children) {
        // Nested children -> use Accordion
        return <Accordion key={index}
            disableGutters
            sx={{
                boxShadow: 'none',
                '::before': {
                    display: 'none'
                },
            }}>
            <AccordionSummary
                expandIcon={<MdChevronRight />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Icon sx={{ alignSelf: 'center', fontSize: '1.25rem', marginRight: '8px', }}>
                    <RxDotFilled />
                </Icon>
                <Typography variant="subtitle1">
                    {item.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, margin: 0 }}>
                {
                    item.children.map((item, index) => {
                        return <ProductDetailsNavItems key={index} item={item} index={index} />
                    })
                }
            </AccordionDetails>

        </Accordion>
    } else {

        return (
            <Accordion onClick={() => navigate(item.to)} key={index}
                disableGutters
                sx={{
                    boxShadow: 'none',
                    '::before': {
                        display: 'none'
                    },
                    textDecoration: 'none',
                    color: '#000'
                }
                }

            >
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ alignItems: 'center' }}
                >
                    <Icon sx={{ alignSelf: 'center', fontSize: '1.25rem', marginRight: '8px', }}>
                        <RxDotFilled />
                    </Icon>
                    <Typography variant="subtitle1">
                        {item.title}
                    </Typography>
                </AccordionSummary>

            </Accordion >
        );
    }
};


export default ProductDetailsNavItems;
