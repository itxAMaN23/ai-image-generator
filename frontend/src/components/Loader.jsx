import { tailChase } from 'ldrs';

tailChase.register();

const Loader = ({ size = 40, speed = 1.75, color = '#51b8a3' }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <l-tail-chase
                size={size}
                speed={speed}
                color={color}
            ></l-tail-chase>
        </div>
    );
};

export default Loader;