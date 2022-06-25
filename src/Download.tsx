import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRecoilValue } from 'recoil';
import { particDescStateFamily } from './state';

export default function Download() {
  const { playId } = useParams();
  const particDesc = useRecoilValue(particDescStateFamily(playId));

  function handleClick() {
    // eslint-disable-next-line no-console
    console.log({ particDesc });
  }

  return (
    <Tooltip title="Download">
      <span>
        <IconButton onClick={handleClick} disabled={particDesc.length === 0}>
          <FileDownloadIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}
