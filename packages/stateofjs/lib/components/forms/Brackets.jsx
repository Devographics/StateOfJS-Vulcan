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

const Brackets = ({ inputProperties, itemProperties, options: _options }) => {
  const { value } = inputProperties;
  const [results, setResults] = useState(isEmpty(value) ? initResults() : value);

  // add index to all options since we use that to keep track of them
  const options = _options.map((o, index) => ({ ...o, index }));

  // to know the current match number, find the first match that is not completed
  // (e.g. has a p1, p2, and winner)
  const currentMatchIndex = results.findIndex((result) => result.length < 3);
  const currentMatch = results[currentMatchIndex];
  // const currentMatch = rounds[currentMatchNumber];

  console.log(`match # ${currentMatchIndex}`);
  console.log('// results');
  console.log(results);

  const pickWinner = (number) => {
    const [p1Index, p2Index] = results[currentMatchIndex];
    const winnerIndex = number === 0 ? p1Index : p2Index;
    const matchResult = [p1Index, p2Index, winnerIndex];

    console.log(`// pickWinner: ${number}`);
    console.log(matchResult);

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

  return (
    <Components.FormItem path={inputProperties.path} label={inputProperties.label} {...itemProperties}>
      <div>
        {currentMatchIndex === -1 ? (
          <BracketOver options={options} results={results} />
        ) : (
          <BracketMatchup options={options} currentMatch={currentMatch} pickWinner={pickWinner} />
        )}
        <BracketResults options={options} results={results} />
      </div>
    </Components.FormItem>
  );
};

const BracketOver = ({ options, results }) => {
  const winner = options[results[results.length - 1][2]];
  return (
    <div>
      Winner: <Components.FormattedMessage id={winner.intlId} />
    </div>
  );
};

const BracketMatchup = ({ options, currentMatch, pickWinner }) => (
  <div>
    <BracketPlayer player={options[currentMatch[0]]} number={0} pickWinner={pickWinner} />
    <div>VS</div>
    <BracketPlayer player={options[currentMatch[1]]} number={1} pickWinner={pickWinner} />
  </div>
);

// a bracket "player" (item you can click to pick a winner)
const BracketPlayer = ({ player = {}, number, pickWinner }) => {
  return (
    <div>
      <Components.Button
        onClick={() => {
          pickWinner(number);
        }}
      >
        <h4>
          <Components.FormattedMessage id={player.intlId} />
        </h4>
        <span>
          <Components.FormattedMessage id={`${player.intlId}.description`} />
        </span>
      </Components.Button>
    </div>
  );
};

// live bracket results
const BracketResults = ({ options, results = [] }) => {
  return (
    <div>
      {results.map((result, index) => (
        <BracketRound options={options} result={result} index={index} key={index} />
      ))}
    </div>
  );
};

// bracket pair
const BracketRound = ({ options, result, index }) => {
  const [p1Index, p2Index, winnerIndex] = result;
  const p1 = options[p1Index];
  const p2 = options[p2Index];
  return (
    <div key={index} style={{ marginBottom: 20 }}>
      <div>Match #{index}</div>
      <div>
        {p1 ? <BracketItem player={p1} isWinner={winnerIndex && p1Index === winnerIndex} /> : <EmptyBracketItem />}
        {p2 ? <BracketItem player={p2} isWinner={winnerIndex && p2Index === winnerIndex} /> : <EmptyBracketItem />}
      </div>
    </div>
  );
};

// bracket result item
const BracketItem = ({ player, isWinner }) => (
  <div style={isWinner ? { fontWeight: 'bold' } : {}}>
    {player.index}. <Components.FormattedMessage id={player.intlId} />
  </div>
);

// empty bracket result item
const EmptyBracketItem = () => <div>...</div>;

export default Brackets;
