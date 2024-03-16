import { Box } from '@mui/material'
import MainRoutes from '../router/MainRoute'
import DefaultLayoutWithHorizontalNav from './components/DefaultLayoutWithHorizontalNav'
import DefaultLayoutWithVarticleNav from './components/DefaultLayoutWithVarticleNav'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DefaultLayout = () => {
    const [showNavbars, setShowNavbars] = useState(true)
    const { pathname } = useLocation()


    useEffect(() => {
        setShowNavbars(pathname !== '/login')
    }, [pathname])


    return <Box
        sx={{
            display: 'flex',
            height: '100vh',
            position: 'fixed',
            top: 0,
            width: '100%'
        }}
    >
        {showNavbars && <DefaultLayoutWithVarticleNav />}
        <Box sx={{
            flexGrow: 1,
            height: '100%',
            overflowY: 'auto'
        }}>
            {showNavbars && <DefaultLayoutWithHorizontalNav />}
            <Box sx={{
                margin: '1rem',
            }}>
                <MainRoutes />
            </Box>
        </Box>
    </Box>
}

export default DefaultLayout