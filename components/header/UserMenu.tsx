import { Box, Avatar, Sheet, Button } from '@mui/joy';
import { LogOut, User as UserIcon, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { currentUser } from '../../utils/mockdata';

export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="plain"
        color="neutral"
        onClick={() => setMenuOpen(!menuOpen)}
        sx={{ p: 0.5, minHeight: 'auto', borderRadius: '50%' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={currentUser.profilePic} alt={currentUser.name} size="sm" />
          <ChevronDown size={16} />
        </Box>
      </Button>

      {menuOpen && (
        <>
          <Box sx={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setMenuOpen(false)} />
          <Sheet
            variant="outlined"
            sx={{
              position: 'absolute',
              right: 0,
              mt: 1,
              width: 192,
              borderRadius: 'md',
              py: 0.5,
              zIndex: 20,
              boxShadow: 'lg',
            }}
          >
            <Button variant="plain" color="neutral" sx={{ width: '100%', justifyContent: 'flex-start', px: 2, py: 1, borderRadius: 0 }}>
              <UserIcon size={16} style={{ marginRight: '0.5rem' }} />
              Profile
            </Button>
            <Button variant="plain" color="neutral" sx={{ width: '100%', justifyContent: 'flex-start', px: 2, py: 1, borderRadius: 0 }}>
              <Settings size={16} style={{ marginRight: '0.5rem' }} />
              Settings
            </Button>
            <Button variant="plain" color="danger" sx={{ width: '100%', justifyContent: 'flex-start', px: 2, py: 1, borderRadius: 0 }}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }} />
              Logout
            </Button>
          </Sheet>
        </>
      )}
    </Box>
  );
}
