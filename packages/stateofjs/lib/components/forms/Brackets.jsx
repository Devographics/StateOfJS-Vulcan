import React, { useState } from 'react';
import { Components } from 'meteor/vulcan:core';
import sampleSize from 'lodash/sampleSize';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { intlShape } from 'meteor/vulcan:i18n';

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

let restarts = 0;

const Bracket = ({ inputProperties, itemProperties, options: _options, updateCurrentValues, path }) => {
  const { value } = inputProperties;
  const [results, setResults] = useState(isEmpty(value) ? initResults() : value);

  // add index to all options since we use that to keep track of them
  const options = _options.map((o, index) => ({ ...o, index }));

  // to know the current match number, find the first match that is not completed
  // (e.g. has a p1, p2, and winner)
  const currentMatchIndex = results.findIndex((result) => result.length < 3);

  const startOver = () => {
    restarts++;
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
    updateCurrentValues({ [path]: newResults });
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
        <BracketResults {...props} />
      </div>
    </Components.FormItem>
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
      <p class="visually-hidden">{isOverallWinner ? `Result` : `Round ${level}`}</p>
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
  const { options, result, index, isOverallWinner = false, isCurrentMatch = false } = props;
  const [p1Index, p2Index, winnerIndex] = result;
  const p1 = options[p1Index];
  const p2 = options[p2Index];
  const winner = options[winnerIndex];
  // disable the buttons if
  // A) player 1 is not defined yet
  // B) player 2 is not defined yet
  // C) a winner has already been picked (except for overall winner)
  const isDisabled = isNil(result[0]) || isNil(result[1]) || (!isNil(result[2]) && !isOverallWinner);

  const p = {
    ...props,
    isDisabled,
  };

  return isOverallWinner ? (
    <fieldset key={index} className={`bracket-match bracket-match-${isCurrentMatch ? 'current' : ''}`}>
      {/* <legend className="visually-hidden"><Components.FormattedMessage id={winner?.intlId} /></legend> */}
      <BracketItem {...p} playerIndex={0} player={winner} isOverallWinner={true} />
    </fieldset>
  ) : (
    <fieldset key={index}  className={`bracket-match bracket-match-${isCurrentMatch ? 'current' : ''}`}>
      {/* <legend className="visually-hidden"><Components.FormattedMessage id={p1?.intlId} /> vs. <Components.FormattedMessage id={p2?.intlId} /></legend> */}
      <BracketItem {...p} playerIndex={0} player={p1} isWinner={!isNil(winnerIndex) && p1Index === winnerIndex} />
      <div className="bracket-spacer" />
      <BracketItem {...p} playerIndex={1} player={p2} isWinner={!isNil(winnerIndex) && p2Index === winnerIndex} />
    </fieldset>
  );
};

// bracket result item
const BracketItem = (props) => {
  const { player, isDisabled = false, isWinner, isOverallWinner, results, level } = props;

  const classnames = ['bracket-item'];

  // if this is the item located in the last position of the last match, it's the champion
  const isChampion = player && player.index === results?.[6]?.[2];

  // after first round every player has won at least a match
  const isDefending = player && level > 1;

  const isActive = !isDisabled;

  // is this the overall winner of the whole bracket?
  if (isOverallWinner) classnames.push('bracket-item-overall-winner');

  // is this the winner of the current match?
  if (isWinner) classnames.push('bracket-item-winner');

  // is this item disabled?
  if (isDisabled) classnames.push('bracket-item-disabled');

  // is this item active?
  if (isActive) classnames.push('bracket-item-active');

  // is this a defending item? (meaning it won its previous match)
  if (isDefending) classnames.push('bracket-item-defending');

  // is this the champion item? (meaning it won the whole bracket)
  if (isChampion) classnames.push('bracket-item-champion');

  return player ? (
    <div className={classnames.join(' ')}>
      <div className="bracket-item-inner">
        {isOverallWinner ? <BracketItemOverallWinner {...props} /> : <BracketItemButton {...props} />}
      </div>
    </div>
  ) : (
    <EmptyBracketItem classnames={classnames} />
  );
};

const BracketItemButton = (props, { intl }) => {
  const { isDisabled, pickWinner, matchIndex, playerIndex, result } = props;
  console.log(props);
  return (
    <div className="bracket-item-button btn btn-primary">
      <input 
        type="radio" 
        name={`match-index-${result.join('_')}-${matchIndex}-${restarts}`} 
        id={`bracket-item-${props.player.intlId}-${restarts}`} 
        key={`bracket-item-${props.player.intlId}-${restarts}`} 
        disabled={isDisabled}
        className="bracket-item-radio"
        onChange={() => {
          pickWinner(matchIndex, playerIndex);
        }}
      />
      <BracketItemLabel {...props} />
    </div>

  );
};

const BracketItemLabel = ({ player }, { intl }) => {
  const description = intl.formatMessage({ id: `${player.intlId}.description` });
  return (
    <>
    <label className="bracket-item-label" htmlFor={`bracket-item-${player.intlId}-${restarts}`} >
      <Components.FormattedMessage className="bracket-item-name" id={player.intlId} />
    </label>
    {description && description.length && (
      <Components.TooltipTrigger
        trigger={
          <div className="bracket-item-details-trigger" title={intl.formatMessage({ id: 'forms.clear_field' })}>
            <span>?</span>
          </div>
        }
      >
        <div className="bracket-item-details">
          <Components.FormattedMessage id={description} />
        </div>
      </Components.TooltipTrigger>
    )}
    </>
  );
};

BracketItemLabel.contextTypes = {
  intl: intlShape,
};

const BracketItemOverallWinner = (props) => (
  <div className="bracket-item-button bracket-item-button-overall-winner">
    <BracketItemLabel {...props} />
    <BracketStartOver {...props} />
  </div>
);

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

// empty bracket result item
const EmptyBracketItem = ({ classnames }) => (
  <div className={[...classnames, 'bracket-item-empty'].join(' ')}>
    <div className="bracket-item-inner">
      <span aria-hidden="true">...</span>
      <span class="visually-hidden"><Components.FormattedMessage id="bracket.empty_bracket" /></span>
    </div>
  </div>
);

export default Bracket;
