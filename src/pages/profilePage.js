import {React} from 'react';
import Typography from '@material-ui/core/Typography';
import {Card, CardContent} from '@material-ui/core';
import { MiniHeader } from './miniHeader';

export const Profile = ({username, setActiveCard}) => {

  return (
      <Card className="new-message-card">
        <MiniHeader title="Your Profile" setActiveCard={setActiveCard} />
        <CardContent style={{textAlign: 'center'}} >
            <Typography variant="h6" color="inherit">
                Username : {username}
            </Typography>
        </CardContent>
    </Card>
  );
}
