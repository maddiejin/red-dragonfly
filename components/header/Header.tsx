import { Sheet, Box, Button } from '@mui/joy';
import Image from "next/image";
import UserMenu from './UserMenu';
import { Typography } from "@mui/material";

interface HeaderProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
}

const LanguageToggle = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <Sheet
            variant="soft"
            color="neutral"
            sx={{
                display: 'inline-flex',
                p: 0.5,
                borderRadius: 'lg',
                gap: 0.5,
            }}
        >
            <Button
                variant={language === 'en' ? 'solid' : 'plain'}
                color={language === 'en' ? 'primary' : 'neutral'}
                size="sm"
                onClick={() => onLanguageChange('en')}
                sx = { language === 'en' ? { 
                    bgcolor: '#741111',
                    color: 'white',
                    '&:hover': { bgcolor: '#741111' } 
                } : {} }
            >
                EN
            </Button>
            <Button 
                variant={language === 'zh' ? 'solid' : 'plain'}
                color={language === 'zh' ? 'primary' : 'neutral'}
                size="sm"
                onClick={() => onLanguageChange('zh')}
                sx = { language === 'zh' ? { 
                    bgcolor: '#741111',
                    color: 'white',
                    '&:hover': { bgcolor: '#741111' } 
                } : {} }
            >
                中文
            </Button>
        </Sheet>
  );
}

const Logo = () => {
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
  );
}


export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <Sheet
      component="header"
      variant="outlined"
      sx={{ position: 'sticky', top: 0, zIndex: 50, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          <UserMenu />
        </Box>
      </Box>
    </Sheet>
  );
}
