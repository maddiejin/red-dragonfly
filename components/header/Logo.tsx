import { Box, Typography } from "@mui/material";
import Image from "next/image";

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
                }} >  
                <Image
                    src="/static/hqt.jpg"
                    alt="Logo"
                    width={40}
                    height={40}
                    style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            </Box>

            <Typography
                variant="h1" className="title-font"
            >
                Red Dragonfly
            </Typography>

        </Box>
    )
}