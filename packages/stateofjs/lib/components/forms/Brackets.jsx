import React, { useState } from 'react';
import { Components } from 'meteor/vulcan:core';
import sampleSize from 'lodash/sampleSize';
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

// match 0 and 1 determine participants in match 4, etc.
const matchTable = {
  0: 4,
  1: 4,
  2: 5,
  3: 5,
  4: 6,
  5: 6,
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

  const pickWinner = (number) => {
    const [p1Index, p2Index] = results[currentMatchIndex];
    const winnerIndex = number === 0 ? p1Index : p2Index;
    const matchResult = [p1Index, p2Index, winnerIndex];

    const newResults = cloneDeep(results);
    newResults[currentMatchIndex] = matchResult;

    // add the winner to the next round using the matchTable to figure out what round that should be.
    // note: no need to do this if this is the last round
    const nextRoundMatchIndex = matchTable[currentMatchIndex];
    if (nextRoundMatchIndex) {
      const nextRoundMatchResult = newResults[nextRoundMatchIndex];
      if (nextRoundMatchResult.length === 0) {
        // no players yet for the next round, put the winner in first position
        nextRoundMatchResult[0] = winnerIndex;
      } else {
        // already one player set for the next round, put the winner in second position
        nextRoundMatchResult[1] = winnerIndex;
      }
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
        <BracketCurrentMatchup {...props} />
        <BracketResults {...props} />
      </div>
    </Components.FormItem>
  );
};

// current X vs Y matchup
const BracketCurrentMatchup = (props) => {
  const { currentMatchIndex, options, results, pickWinner } = props;
  const currentMatch = results[currentMatchIndex];
  return (
    <div className="bracket-top">
      {currentMatchIndex === -1 ? (
        <BracketOver {...props} />
      ) : (
        <div className="bracket-current-matchup">
          <BracketPlayer player={options[currentMatch[0]]} number={0} pickWinner={pickWinner} />
          <div className="bracket-current-matchup-vs">
            <Components.FormattedMessage id="bracket.vs" />
          </div>
          <BracketPlayer player={options[currentMatch[1]]} number={1} pickWinner={pickWinner} />
        </div>
      )}
    </div>
  );
};

// the bracket is over, show the winner
const BracketOver = (props) => {
  const { options, results } = props;
  const winner = options[results[results.length - 1][2]];
  return (
    <div className="bracket-over">
      <h4 className="bracket-winner">
        <Components.FormattedMessage id="bracket.winner" />
        <Components.FormattedMessage id={winner.intlId} />
      </h4>
      <BracketStartOver {...props} />
    </div>
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

// a bracket "player" (item you can click to pick a winner)
const BracketPlayer = ({ player = {}, number, pickWinner }) => {
  return (
    <div className="bracket-player">
      <Components.Button
        onClick={(e) => {
          console.log(e);
          e.target.blur();
          pickWinner(number);
        }}
      >
        <h4 className="bracket-player-name">
          <Components.FormattedMessage id={player.intlId} />
        </h4>
        <span className="bracket-player-description">
          <Components.FormattedMessage id={`${player.intlId}.description`} />
        </span>
      </Components.Button>
    </div>
  );
};

// live bracket results
const BracketResults = ({ options, results = [], currentMatchIndex }) => {
  const props = { options, currentMatchIndex, results };
  return (
    <div className="bracket-results">
      <BracketMatchGroup {...props} matchIndexes={[0, 1]} />
      <BracketMatchGroup {...props} matchIndexes={[4]} />
      <BracketMatchGroup {...props} matchIndexes={[6]} isFinal={true} />
      <BracketMatchGroup {...props} matchIndexes={[5]} />
      <BracketMatchGroup {...props} matchIndexes={[2, 3]} />
    </div>
  );
};

// a match group within the bracket
const BracketMatchGroup = ({ options, results, isFinal, matchIndexes, currentMatchIndex }) => (
  <div className={`bracket-matchgroup bracket-matchgroup-${isFinal ? 'final' : ''}`}>
    {matchIndexes.map((matchIndex) => (
      <BracketMatch
        options={options}
        result={results[matchIndex]}
        matchIndex={matchIndex}
        key={matchIndex}
        isFinal={isFinal}
        isCurrentMatch={matchIndex === currentMatchIndex}
      />
    ))}
  </div>
);

// bracket pair
const BracketMatch = ({ options, result, index, isFinal = false, isCurrentMatch = false }) => {
  const [p1Index, p2Index, winnerIndex] = result;
  const p1 = options[p1Index];
  const p2 = options[p2Index];
  const winner = options[winnerIndex];
  return (
    <div
      key={index}
      className={`bracket-match bracket-match-${isFinal ? 'final' : ''} bracket-match-${
        isCurrentMatch ? 'current' : ''
      }`}
    >
      {p1 ? <BracketItem player={p1} isWinner={winnerIndex && p1Index === winnerIndex} /> : <EmptyBracketItem />}
      {isFinal &&
        (winner ? (
          <BracketItem player={winner} isWinner={true} variant="overall-winner" />
        ) : (
          <EmptyBracketItem variant="overall-winner" />
        ))}
      {p2 ? <BracketItem player={p2} isWinner={winnerIndex && p2Index === winnerIndex} /> : <EmptyBracketItem />}
    </div>
  );
};

// bracket result item
const BracketItem = ({ player, isWinner, variant = '' }) => (
  <div className={`bracket-item bracket-item-${variant} bracket-item-${isWinner ? 'winner' : ''}`}>
    <Components.FormattedMessage id={player.intlId} />
  </div>
);

// empty bracket result item
const EmptyBracketItem = ({ variant = '' }) => (
  <div className={`bracket-item bracket-item-empty bracket-item-empty-${variant}`}>...</div>
);

export default Bracket;
