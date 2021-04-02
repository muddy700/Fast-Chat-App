import {React, useEffect, useState} from 'react'
import {HomeHeader } from './homeHeader'
import '../cssFiles/homePage.css';
import {Card, Grid, TextField, Button} from '@material-ui/core';
import {Container, Avatar, CardHeader
export const messageForm = () => {
    return (
        <div>
            <Grid item className="left-card">
                    <Card >
                        <CardHeader title={username} style={{textAlign: 'center', backgroundColor: 'teal'}}></CardHeader>
                        <CardContent style={{textAlign: 'center'}} >
                            <form className="" noValidate autoComplete="off">
                                <TextField  id="outlined-basic" name="destination" onChange={handleFormChanges} className="form-input" label="Receiver" variant="outlined" />
                                <TextField
                                 style={{marginTop: 20}} 
                                 id="outlined-basic" 
                                 name="content"
                                 className="form-input"
                                 label="Content" 
                                 variant="outlined"
                                 multiline
                                 rows={5}
                                 onChange={handleFormChanges}
                                 // error
                                 // helperText="Error Message" 

                                />
                                <Button style={{marginTop: 20}} onClick={sendMessage} variant="contained" color="primary" className="form-input" href="" > Send </Button>
                            </form>

                        </CardContent>
                    </Card>
                </Grid>
            
        </div>
    )
}
