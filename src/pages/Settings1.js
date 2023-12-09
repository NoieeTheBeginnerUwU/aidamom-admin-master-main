import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faLock, faLanguage, faQuestionCircle, faComments } from '@fortawesome/free-solid-svg-icons';
import "../App.css"
const Card = ({ children }) => {
  return (
    <div className='card'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        width: '200px',
        backgroundColor: '#f2f2f2',
        borderRadius: '10px',
        margin: '10px',
        padding: '20px',
      }}>
      <div style={{ fontSize: '36px', marginBottom: '10px' }}>
        <FontAwesomeIcon icon={children.icon} />
      </div>
      <span style={{ fontSize: '18px', textAlign: 'center' }}>{children.text}</span>
    </div>
  ); 
};

const Settings = () => {
  const blueTheme = {
    color: 'blue'
  };

  return (
    <div className="app" style={blueTheme}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',height:'100vh',overflow:'hidden' }}>
        <Card className="card">
          {{
            icon: faUser,
            text: 'Account/Profile',
          }}
        </Card>
        <Card className="card">
          {{
            icon: faBell,
            text: 'Notifications',
          }}
        </Card>
        <Card className="card">
          {{
            icon: faLock,
            text: 'Privacy and Security',
          }}
        </Card>
        <Card className="card">
          {{
            icon: faLanguage,
            text: 'General Settings',
          }}
        </Card>
        <Card className="card">
          {{
            icon: faComments,
            text: 'Communication Preferences',
          }}
        </Card>
        <Card className="card">
          {{
            icon: faQuestionCircle,
            text: 'Help and Support',
          }}
        </Card>
      </div>
    </div>
  );
};

export default Settings;