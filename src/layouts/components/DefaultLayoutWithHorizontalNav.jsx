import { Stack } from "@mui/material"
import ProfileMenu from "./ProfileMenu"

const DefaultLayoutWithHorizontalNav = () => {
    return <>
        <Stack
            component="header"
            alignItems="center"
            direction="row"
            justifyContent='flex-end'
            sx={{
                position: 'sticky',
                top: '0',
                padding: '.5rem',
                zIndex: 10,
                bgcolor: '#fff',
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
            >
                <ProfileMenu />
            </Stack>
        </Stack>
    </>
}

export default DefaultLayoutWithHorizontalNav



