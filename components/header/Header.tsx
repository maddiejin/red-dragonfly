import { Sheet, Box, Button } from '@mui/joy';
import UserMenu from './UserMenu';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <Sheet
      component="header"
      variant="outlined"
      sx={{ position: 'sticky', top: 0, zIndex: 50, borderLeft: 'none', borderRight: 'none', borderTop: 'none', bgcolor: '#fff' }}
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
