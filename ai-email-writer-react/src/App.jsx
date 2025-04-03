import { useState } from 'react';
import './App.css';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Card, CardContent } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
        <CardContent>
          <Typography variant='h3' component='h1' gutterBottom color='primary'>
           ✉️ Email Reply Generator
          </Typography>

          <Box sx={{ my: 2 }}>
            <TextField 
              fullWidth
              multiline
              rows={6}
              variant='outlined'
              label='Original Email Content'
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 2, backgroundColor: 'white' }}
            />

            <FormControl fullWidth sx={{ mb: 2, backgroundColor: 'white' }}>
              <InputLabel>Tone (Optional)</InputLabel>
              <Select
                value={tone}
                label='Tone (Optional)'
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='professional'>Professional</MenuItem>
                <MenuItem value='casual'>Casual</MenuItem>
                <MenuItem value='friendly'>Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              startIcon={<SendIcon />}
            >
              {loading ? <CircularProgress size={24} color='inherit' /> : 'Generate Reply'}
            </Button>
          </Box>

          {error && (
            <Typography color='error' sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <Box sx={{ mt: 3 }}>
              <Typography variant='h6' gutterBottom>
                Generated Reply:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant='outlined'
                value={generatedReply}
                inputProps={{ readOnly: true }}
                sx={{ backgroundColor: 'white' }}
              />
              <Button
                variant='outlined'
                sx={{ mt: 2 }}
                startIcon={<ContentCopyIcon />}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                Copy to Clipboard
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;