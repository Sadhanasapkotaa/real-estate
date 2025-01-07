import { useRouter } from 'next/router';
import VideoCall from '../../components/VideoCall';

const Room = () => {
    const router = useRouter();
    const { roomName } = router.query;

    return (
        <div>
            <h1>Video Call in Room: {roomName}</h1>
            <VideoCall roomName={roomName} />
        </div>
    );
};

export default Room;
