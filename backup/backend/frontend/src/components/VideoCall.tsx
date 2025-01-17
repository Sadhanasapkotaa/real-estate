import React, { useEffect } from 'react';

const VideoCall = ({ roomName }) => {
    useEffect(() => {
        const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
        const domain = 'meet.jit.si';  // Use your own Jitsi server or a public one like 'meet.jit.si'
        const options = {
            roomName: roomName,
            width: '100%',
            height: '100%',
            parentNode: document.getElementById('jitsi-container'),
        };

        const api = new JitsiMeetExternalAPI(domain, options);

        // Cleanup on component unmount
        return () => {
            api.dispose();
        };
    }, [roomName]);

    return (
        <div id="jitsi-container" style={{ height: '100vh' }}></div>
    );
};

export default VideoCall;