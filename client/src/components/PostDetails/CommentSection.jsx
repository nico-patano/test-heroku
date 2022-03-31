import React, {useState} from  'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {
    
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleClick = async() => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        
        //const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));//

        setComments(newComments);
        setComment('');
    };

    return (
       <div>
           <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer} style={{width: '25%'}}>
                <Typography gutterBottom variant ="h5">Comments</Typography>
                {comments?.map((c,i) => (
                    <Typography key={i} gutterBottom variant="subtitle2">
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
            </div>
            {user?.result?.name && (
            <div style={{width: '75%'}}>
            <Typography gutterBottom variant ="h5"> Add a Comment</Typography>   
            <TextField
                fullWidth
                rows={4}
                variant ="outlined"
                label ="type here........."
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />   
            <Button style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant= "contained" color="primary" onClick={handleClick}>
                Post
            </Button>
            </div>
            )}
           </div>
       </div>
    );
};

export default CommentSection;