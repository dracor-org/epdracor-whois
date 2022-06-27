import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRecoilValue } from 'recoil';
import { particDescStateFamily, speechesStateFamily } from './state';

export default function DownloadButton() {
  const { playId } = useParams();
  const particDesc = useRecoilValue(particDescStateFamily(playId));
  const speeches = useRecoilValue(speechesStateFamily(playId));

  const filename = `${playId}.json`;

  interface SpeechesMap {
    [id: string]: string[];
  }

  function handleClick() {
    const speechesMap = speeches.reduce((map, speech) => {
      if (speech.id && speech.whos) {
        map[speech.id] = speech.whos;
      }
      return map;
    }, {} as SpeechesMap);

    const json = JSON.stringify(
      {
        particDesc,
        speeches: speechesMap,
      },
      null,
      2
    );

    const url = `data:application/json,${encodeURIComponent(json)}`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <Tooltip title={`Download particDesc (${filename})`}>
      <span>
        <IconButton
          color="inherit"
          onClick={handleClick}
          disabled={particDesc.length === 0}
        >
          <FileDownloadIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}
