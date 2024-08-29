import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const ProfileCard = ({
  name,
  avatarSrc,
  description,
  linkedinUrl,
  githubUrl,
  avatarRotation = -3
}) => (
  <Card sx={{ 
    width: 275,
    height: 550,
    display: 'flex',
    flexDirection: 'column', 
  }}>
    <Avatar 
      alt={name} 
      src={avatarSrc}
      sx={{ 
        width: '12rem', 
        height: '12rem',
        transform: `rotate(${avatarRotation}deg)`,
        mt: 3,
        alignSelf: 'center',
      }}
    />
    <CardContent sx={{ flex: 1 }}>
      <Typography 
        gutterBottom 
        variant="h5" 
        component="div" 
        sx={{ textAlign: 'center' }}
      >
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    {(linkedinUrl || githubUrl) && (
      <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        {linkedinUrl && (
          <IconButton
            size="large"
            color="inherit"
            aria-label="linkedin"
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              transform: "scale(1.8)",
              ':hover': { backgroundColor: 'transparent' }
            }}
          >
            <LinkedInIcon />
          </IconButton>
        )}
        {githubUrl && (
          <IconButton
            size="large"
            color="inherit"
            aria-label="github"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              transform: "scale(1.6)",
              ':hover': { backgroundColor: 'transparent' }
            }}
          >
            <GitHubIcon />
          </IconButton>
        )}
      </CardActions>
    )}
  </Card>
);

export default function Avatars() {
  return (
    <Stack direction="row" spacing={15} justifyContent="center">
      <ProfileCard 
        name="Jason Lin" 
        avatarSrc="/jason_avatar.png"
        description="I’m a junior at the University of Michigan, majoring in Computer Science with minors in Electrical Engineering and Statistics. I do computers, and coding is my passion. I’m on the lookout for internship opportunities where I can put my skills to the test, work on exciting projects, and learn a lot along the way."
        linkedinUrl="https://www.linkedin.com/in/jason-lin129"
        githubUrl="https://github.com/Shashhhh"
        avatarRotation={-3}
      />
      <ProfileCard 
        name="Thomas King" 
        avatarSrc="/TJKing.jpg"
        description="Hi, I am a senior at Saint Louis University studying Marketing and Data Analytics. I am a driven sales professional with a freshperspective on sales automation and a deep passion for innovation. With several year of experience in software sales, I'e recongized the overwhelming potential of AI in ehancing "
        linkedinUrl="https://www.linkedin.com/in/thomasj-king"
        avatarRotation={0}
      />
    </Stack>
  );
}
