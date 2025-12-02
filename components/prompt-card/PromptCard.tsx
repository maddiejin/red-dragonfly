import { Prompt } from "@/components/types";
import { Card, Chip, Box } from "@mui/joy";

interface PromptCardProps {
    prompt: Prompt;
}

const tagColors: Record<string, string> = {
    'Family Memories': '#DE1454',
    'Life Updates': '#2114DE',
    'Heritage/History': '#14DE14',
    'Advice/Guidance': '#DECD14',
    'Storytelling': '#14DEDE',
}

const TagChip = ({ tag }: { tag: string }) => (
    <Chip
        size='lg'
        sx={{
            bgcolor: tagColors[tag] || '#ccc',
            color: '#fff',
        }}
    > {tag} 
    </Chip>
);

export default function PromptCard({ prompt }: PromptCardProps) {
    return (
        <Card
            variant="outlined"
            sx={{
                bgcolor: '#f5f5f5',
                border: '3px solid',
                borderColor: '#2d622f',
                borderRadius: 15,
                p: 4,
            }}
            >
                <Box 
                    sx = {{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        justifyContent: 'space-between', 
                        gap: 2, 
                        mb: 2 
                    }}
                >
                <TagChip tag={prompt.tag} />   
                </Box>
                    
                <h2
                    style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.25rem',
                        color: '#333',
                        margin: 0,
                    }}
                >
                    {prompt.text}

                </h2>

            </Card>
    );
}