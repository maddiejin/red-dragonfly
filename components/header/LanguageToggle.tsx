import { Sheet, Button } from '@mui/joy';

interface LanguageToggleProps {
    language: 'en' | 'zh';
    onLanguageChange: (lang: 'en' | 'zh') => void;
}

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
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