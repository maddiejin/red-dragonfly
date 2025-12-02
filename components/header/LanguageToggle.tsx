import { Sheet, Button } from "@mui/joy";

interface LanugageToggleProps {
    language: 'en' | 'zh';
    onLanguageChange: (lang: 'en' | 'zh') => void;
}

export default function LanguageToggle({ language, onLanguageChange }: LanugageToggleProps) {
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
            >
                EN
            </Button>
            <Button 
                variant={language === 'zh' ? 'solid' : 'plain'}
                color={language === 'zh' ? 'primary' : 'neutral'}
                size="sm"
                onClick={() => onLanguageChange('zh')}
            >
                中文
            </Button>
        </Sheet>
    );
}
