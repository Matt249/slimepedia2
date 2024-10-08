import './assets/css/Buildings.css';
import { NavButton } from './NavButton';

export const Buildings = () => {
    return (
        <div className='box-layout buildings-menu'>
            <div className='buildings-list'>
                <div className='building-item'>
                    <img src={require('./assets/buildings/corral.png')} alt='Corral' />
                    <h1>Corral</h1>
                    <div className='upgrade-list'>
                        <NavButton name="High Walls" icon="buildings/corralhighwalls" size='75' />
                        <NavButton name="Air Net" icon="buildings/airnet" size='75' />
                        <NavButton name="Sunlight Shield" icon="buildings/shield" size='75' />
                        <NavButton name="Music Box" icon="buildings/musicbox" size='75' />
                        <NavButton name="Auto-feeder" icon="buildings/feeder" size='75' />
                        <NavButton name="Plort Collector" icon="buildings/collector" size='75' />
                    </div>
                </div>
                <div className='building-item'>
                    <img src={require('./assets/buildings/garden.png')} alt='Garden' />
                    <h1>Corral</h1>
                    <div className='upgrade-list'>
                        <NavButton name="High Walls" icon="buildings/corralhighwalls" size='75' />
                        <NavButton name="Air Net" icon="buildings/airnet" size='75' />
                        <NavButton name="Sunlight Shield" icon="buildings/shield" size='75' />
                        <NavButton name="Music Box" icon="buildings/musicbox" size='75' />
                        <NavButton name="Auto-feeder" icon="buildings/feeder" size='75' />
                        <NavButton name="Plort Collector" icon="buildings/collector" size='75' />
                    </div>
                </div>
                <div className='building-item'>
                    <img src={require('./assets/buildings/corral.png')} alt='Coop' />
                    <h1>Coop</h1>
                    <div className='upgrade-list'>
                        <NavButton name="High Walls" icon="buildings/corralhighwalls" size='75' />
                        <NavButton name="Air Net" icon="buildings/airnet" size='75' />
                        <NavButton name="Sunlight Shield" icon="buildings/shield" size='75' />
                        <NavButton name="Music Box" icon="buildings/musicbox" size='75' />
                        <NavButton name="Auto-feeder" icon="buildings/feeder" size='75' />
                        <NavButton name="Plort Collector" icon="buildings/collector" size='75' />
                    </div>
                </div>

            </div>
            <div>
                <h1>zgeg</h1>
            </div>
        </div>
    );
}