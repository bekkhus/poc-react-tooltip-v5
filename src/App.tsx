import './App.css'
import "react-tooltip/dist/react-tooltip.css";
import StandardTooltip from './components/StandardTooltip';
import LargeClickableTooltip from './components/LargeClickableTooltip';

const listItems: string[] = [
  'Max',
  'Ivan',
  'Sviat',
  'Arsham',
  'Markus',
  'Igor',
  'Filip',
  'Lana',
]

const App = () => {
  const renderList = () => (
    listItems.map(item => (
      <div id={`tooltip-${item}`} className='listItem' key={item}>
        <p>{item}</p>
        <LargeClickableTooltip anchorId={`tooltip-${item}`} place='left' offset={20} positionStrategy="fixed">
          <p id={`inner-tooltip-${item}`}>
            With react-tooltip and the prop <b>positionStrategy='fixed'</b> the tooltip is visible regardless of parent <b>overflow</b> and <b>position</b> values!
            <StandardTooltip anchorId={`inner-tooltip-${item}`} place='top' positionStrategy='fixed'>
              Inner tooltip also visible with <b>positionStrategy='fixed'</b>
            </StandardTooltip>
          </p>
          <p>
            With <b>delayHide={100}</b>, <b>delayShow={100}</b> and <b>clickable=true</b> the tooltip has a quite satisfying "persistent on hover"-feature.
          </p>
          <div style={{ textAlign: "start" }}>
            <b>TODO:</b>
            <ul>
              <li>A link as the tooltip anchor element.</li>
              <li>Fetch dependant tooltip</li>
            </ul>
          </div>
        </LargeClickableTooltip>
      </div>
    ))
  );

  return (
    <>
      <main>
        <section>
          <p id="standard-tooltip">Hover me!</p>
          <StandardTooltip anchorId='standard-tooltip' place='top'>
            Standard tooltip!
          </StandardTooltip>
        </section>
        <section />
      </main>
      <div className='rightSidebar surface'>
        <div className='list'>
          {renderList()}
        </div>
      </div>
    </>
  );
}

export default App
