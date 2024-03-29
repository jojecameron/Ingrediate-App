import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = (): JSX.Element => (
  <div id="loading">
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color="success" />
    </Box>
  </div>
);

export default Loading;
