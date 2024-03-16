import { useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails, Typography, Icon, Link, Stack, SvgIcon, Avatar
} from '@mui/material';
import { TbFileImport, TbSquareLetterM } from 'react-icons/tb';
import { MdChevronRight } from 'react-icons/md';
import { FaRegFilePowerpoint } from 'react-icons/fa';
import NestedAccordion from './NestedAccordion';
import productDetailsNavItems from '../../navigation/vertical/product-details';
import manufacturersNavItems from '../../navigation/vertical/manufacturers';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const DefaultLayoutWithVarticleNav = () => {
    const [expandedPanel, setExpandedPanel] = useState(null);
    const [expandSidebar, setExpandSidebar] = useState(true)
    const navigate = useNavigate()


    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : null);
    };

    const handleNavigate = (route) => {
        navigate(route)
    }

    return (
        <Stack
            sx={{
                width: '260px',
                height: '100%',
                position: 'relative',
                zIndex: 20,
                boxShadow: expandSidebar ? 'none' : '3px 0 10px rgba(0, 0, 0, 0.1)'
                // position: 'fixed',
                // top: 0,
                // left: 0,

            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    padding: '1rem .75rem',
                    margin: '0 .25rem 0 .75rem',
                }}
            >
                <Link
                    variant="h6"
                    color="inherit"
                    underline="none"
                    sx={{
                        display: 'flex',
                        fontWeight: 'bold',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={logo} sx={{ width: 40, height: 40, marginRight: '8px' }} />
                    Buildwise
                </Link>

                <SvgIcon sx={{
                    transform: expandSidebar ? 'rotate(-180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out'
                }}
                    onClick={() => setExpandSidebar((val) => !val)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" role="button" width="1em" height="1em" viewBox="0 0 24 24">
                        <g fill="rgb(var(--v-theme-on-surface))">
                            <path d="M12.53 5.333a1.333 1.333 0 00-1.886 0L4.92 11.057c-.52.52-.52 1.365 0 1.885l5.724 5.724a1.333 1.333 0 101.886-1.885l-3.84-3.839a1.333 1.333 0 010-1.885l3.838-3.839a1.332 1.332 0 000-1.885Z"></path>
                            <path d="m17.31 5.333-5.723 5.724c-.52.52-.52 1.365 0 1.885l5.724 5.724a1.333 1.333 0 101.885-1.885l-3.838-3.839a1.333 1.333 0 010-1.885l3.838-3.839a1.333 1.333 0 00-1.885-1.885Z"></path>
                        </g>
                    </svg>
                </SvgIcon>
            </Stack>

            <Stack
                sx={{
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '.25rem',

                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#f1f1f1',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#f1f1f1',
                    },
                }}
            >
                <Accordion
                    onClick={() => handleNavigate('/importLogs')}
                    expanded={expandedPanel === 'panel1'}
                    onChange={handleChange('panel1')}
                    disableGutters
                    className='active'
                    sx={{

                        boxShadow: 'none',
                        margin: '0 .5rem',

                        '::before': {
                            display: 'none',
                        },
                    }}
                >
                    <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                        <Icon sx={{ marginRight: '8px' }}>
                            <TbFileImport />
                        </Icon>
                        <Typography variant="subtitle1">Import Logs</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: '0', margin: '0' }}>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expandedPanel === 'panel2'}
                    onChange={handleChange('panel2')}
                    disableGutters
                    sx={{
                        boxShadow: 'none',
                        '::before': {
                            display: 'none',
                        },
                        padding: '0 .5rem',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<MdChevronRight />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Icon sx={{ marginRight: '8px' }}>
                            <FaRegFilePowerpoint />
                        </Icon>
                        <Typography variant="subtitle1">Product Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0, margin: 0 }}>
                        {productDetailsNavItems.children.map((item, index) => <NestedAccordion key={index} item={item} index={index} />)}
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    expanded={expandedPanel === 'panel3'}
                    onChange={handleChange('panel3')}
                    disableGutters
                    sx={{
                        boxShadow: 'none',
                        '::before': {
                            display: 'none',
                        },
                        padding: '0 .5rem',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<MdChevronRight />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Icon sx={{ marginRight: '8px' }}>
                            <TbSquareLetterM />
                        </Icon>
                        <Typography variant="subtitle1">Manufacturers</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0, margin: 0 }}>
                        {manufacturersNavItems.children.map((item, index) => <NestedAccordion key={index} item={item} index={index} />)}
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Stack>
    );
};

export default DefaultLayoutWithVarticleNav;
