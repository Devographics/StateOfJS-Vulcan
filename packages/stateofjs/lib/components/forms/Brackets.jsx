import React, { useState } from 'react';
import { Components } from 'meteor/vulcan:core';
import sampleSize from 'lodash/sampleSize';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

const sampleSizeAndRemove = (array, n) => {
  const sample = sampleSize(array, n);
  const remaining = array.filter((a) => !sample.includes(a));
  return [sample, remaining];
};

const pickTwo = (array) => sampleSizeAndRemove(array, 2);

const initResults = () => {
  let zeroToSeven = [0, 1, 2, 3, 4, 5, 6, 7];
  // 4 x first round matches + 2 x second round matches + 1 third round match = 7 total matches
  const matchCount = 7;
  const results = [];
  for (let i = 0; i < matchCount; i++) {
    const [sample, remaining] = pickTwo(zeroToSeven);
    zeroToSeven = remaining;
    results[i] = sample;
  }
  return results;
};

// match 0 determines first participant of match 4, match
// 1 determines second participant of match 4, etc.
const matchTable = {
  0: [4, 0],
  1: [4, 1],
  2: [5, 0],
  3: [5, 1],
  4: [6, 0],
  5: [6, 1],
};

const Bracket = ({ inputProperties, itemProperties, options: _options }) => {
  const { value } = inputProperties;
  const [results, setResults] = useState(isEmpty(value) ? initResults() : value);

  // add index to all options since we use that to keep track of them
  const options = _options.map((o, index) => ({ ...o, index }));

  // to know the current match number, find the first match that is not completed
  // (e.g. has a p1, p2, and winner)
  const currentMatchIndex = results.findIndex((result) => result.length < 3);

  const startOver = () => {
    setResults(initResults());
  };

  const pickWinner = (matchIndex, playerIndex) => {
    const [p1Index, p2Index] = results[matchIndex];
    const winnerIndex = playerIndex === 0 ? p1Index : p2Index;
    const matchResult = [p1Index, p2Index, winnerIndex];

    const newResults = cloneDeep(results);
    newResults[matchIndex] = matchResult;

    // add the winner to the next round using the matchTable to figure out what round that should be.
    // note: no need to do this if this is the last round
    if (matchTable[matchIndex]) {
      const [nextRoundMatchIndex, nextRoundPlayerIndex] = matchTable[matchIndex];
      const nextRoundMatchResult = newResults[nextRoundMatchIndex];
      nextRoundMatchResult[nextRoundPlayerIndex] = winnerIndex;
    }
    setResults(newResults);
  };

  const props = {
    options,
    results,
    currentMatchIndex,
    pickWinner,
    startOver,
  };

  return (
    <Components.FormItem path={inputProperties.path} label={inputProperties.label} {...itemProperties}>
      <div className="bracket">
        <BracketStartOver {...props} />
        <BracketResults {...props} />
      </div>
    </Components.FormItem>
  );
};

// start over
const BracketStartOver = ({ startOver }) => {
  return (
    <Components.Button
      className="bracket-startover"
      onClick={() => {
        startOver();
      }}
    >
      <Components.FormattedMessage id="bracket.start_over" />
    </Components.Button>
  );
};

// live bracket results
const BracketResults = (props) => {
  return (
    <div className="bracket-results">
      <BracketMatchGroup {...props} matchIndexes={[0, 1, 2, 3]} level={1} />
      <BracketMatchGroup {...props} matchIndexes={[4, 5]} level={2} />
      <BracketMatchGroup {...props} matchIndexes={[6]} level={3} />
      <BracketMatchGroup {...props} matchIndexes={[6]} isOverallWinner={true} level={4} />
    </div>
  );
};

// a match group within the bracket
const BracketMatchGroup = (props) => {
  const { results, isOverallWinner, matchIndexes, currentMatchIndex, level } = props;
  return (
    <div
      className={`bracket-matchgroup bracket-matchgroup-level${level} bracket-matchgroup-${
        isOverallWinner ? 'overall-winner' : ''
      }`}
    >
      {matchIndexes.map((matchIndex) => (
        <BracketMatch
          {...props}
          result={results[matchIndex]}
          matchIndex={matchIndex}
          key={matchIndex}
          isCurrentMatch={matchIndex === currentMatchIndex}
        />
      ))}
    </div>
  );
};

// bracket pair; or single winner
const BracketMatch = (props) => {
  const { options, result, index, isOverallWinner = false, isCurrentMatch = false, level } = props;
  const [p1Index, p2Index, winnerIndex] = result;
  const p1 = options[p1Index];
  const p2 = options[p2Index];
  const winner = options[winnerIndex];
  // after first round every player has won at least a match
  const isDefending = level > 1;
  // disable the buttons if
  // A) player 1 is not defined yet
  // B) player 2 is not defined yet
  // C) a winner has already been picked
  const isDisabled = isNil(result[0]) || isNil(result[1]) || !isNil(result[2]);

  const p = {
    ...props,
    isDefending,
    isDisabled,
  };

  return isOverallWinner ? (
    <div key={index} className={`bracket-match bracket-match-${isCurrentMatch ? 'current' : ''}`}>
      {winner ? <BracketItem {...p} playerIndex={0} player={winner} isDefending={true} isOverallWinner={true} /> : <EmptyBracketItem />}
    </div>
  ) : (
    <div key={index} className={`bracket-match bracket-match-${isCurrentMatch ? 'current' : ''}`}>
      {p1 ? (
        <BracketItem {...p} playerIndex={0} player={p1} isWinner={!isNil(winnerIndex) && p1Index === winnerIndex} />
      ) : (
        <EmptyBracketItem />
      )}
      <div className="bracket-spacer" />
      {p2 ? (
        <BracketItem {...p} playerIndex={1} player={p2} isWinner={!isNil(winnerIndex) && p2Index === winnerIndex} />
      ) : (
        <EmptyBracketItem />
      )}
    </div>
  );
};


// bracket result item
const BracketItem = ({
  player,
  matchIndex,
  playerIndex,
  isDisabled = false,
  isWinner,
  isOverallWinner,
  isDefending,
  pickWinner,
}) => {

  const classnames = ['bracket-item'];
  if (isOverallWinner) classnames.push('bracket-item-overall-winner');
  if (isWinner) classnames.push('bracket-item-winner');
  if (isDisabled) classnames.push('bracket-item-disabled');
  if (isDefending) classnames.push('bracket-item-defending');

  return (
    <div className={classnames.join(' ')}>
      <div className="bracket-item-inner">
        <Components.Button
          disabled={isDisabled}
          onClick={() => {
            pickWinner(matchIndex, playerIndex);
          }}
        >
          <Components.FormattedMessage className="bracket-item-name" id={player.intlId} />
          <Components.FormattedMessage className="bracket-item-description" id={`${player.intlId}.description`} />
        </Components.Button>
      </div>
    </div>
  );
};

// empty bracket result item
const EmptyBracketItem = () => (
  <div className="bracket-item bracket-item-empty">
    <div className="bracket-item-inner">
      <span>...</span>
    </div>
  </div>
);

export default Bracket;


// // overall winner
// const BracketOverallWinner = ({ winner }) => {
//   return winner ? (
//     <div className="bracket-item bracket-item-overall-winner">
//       <div className="bracket-item-inner">
//         <Components.Button>
//           <Components.FormattedMessage id={winner.intlId} />
//           <Components.FormattedMessage className="bracket-item-description" id={`${winner.intlId}.description`} />
//         </Components.Button>
//       </div>
//     </div>
//   ) : (
//     <EmptyBracketItem variant="overall-winner" />
//   );
// };

// // current X vs Y matchup
// const BracketCurrentMatchup = (props) => {
//   const { currentMatchIndex, options, results, pickWinner } = props;
//   const currentMatch = results[currentMatchIndex];
//   return (
//     <div className="bracket-top">
//       {currentMatchIndex === -1 ? (
//         <BracketOver {...props} />
//       ) : (
//         <div className="bracket-current-matchup">
//           <BracketPlayer
//             player={options[currentMatch[0]]}
//             number={0}
//             pickWinner={pickWinner}
//             currentMatchIndex={currentMatchIndex}
//           />
//           <div className="bracket-current-matchup-vs">
//             <Components.FormattedMessage id="bracket.vs" />
//           </div>
//           <BracketPlayer
//             player={options[currentMatch[1]]}
//             number={1}
//             pickWinner={pickWinner}
//             currentMatchIndex={currentMatchIndex}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // the bracket is over, show the winner
// const BracketOver = (props) => {
//   const { options, results } = props;
//   const winner = options[results[results.length - 1][2]];
//   return (
//     <div className="bracket-over">
//       <h4 className="bracket-winner">
//         <Components.FormattedMessage id="bracket.winner" />
//         <Components.FormattedMessage id={winner.intlId} />
//       </h4>
//       <BracketStartOver {...props} />
//     </div>
//   );
// };

// // a bracket "player" (item you can click to pick a winner)
// const BracketPlayer = ({ player = {}, number, pickWinner, currentMatchIndex }) => {
//   return (
//     <div className="bracket-player">
//       <Components.Button
//         onClick={(e) => {
//           console.log(e);
//           e.target.blur();
//           pickWinner(currentMatchIndex, number);
//         }}
//       >
//         <h4 className="bracket-player-name">
//           <Components.FormattedMessage id={player.intlId} />
//         </h4>
//         <span className="bracket-player-description">
//           <Components.FormattedMessage id={`${player.intlId}.description`} />
//         </span>
//       </Components.Button>
//     </div>
//   );
// };
