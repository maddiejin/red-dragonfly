import { Box } from "@mui/joy";

export default function Logo() {
    return (
        <Box 
            sx= {{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
            }}
        >  
            <Box 
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: '#2d622f',
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                }} >  🏠 
            </Box>

            <h1 
                className="title-font"
                style={{
                    color: '#2d622f',
                    fontSize: '1.5rem',
                    margin: 0,
                    fontFamily: 'Playball, cursive',
                }}
            >
                Red Dragonfly
            </h1>

        </Box>
    )
}