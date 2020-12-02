import React, { useState, useRef } from 'react';
import { getKnowledgeScore } from '../../modules/responses/helpers';
import EntitiesContext from './EntitiesContext';
import get from 'lodash/get';
import CountUp from 'react-countup';
import Confetti from 'react-confetti';
import { Components } from 'meteor/vulcan:core';
import take from 'lodash/take';
import { intlShape } from 'meteor/vulcan:i18n';

const Features = ({ unknownFields, entities, limit }) => {
  const fields = take(unknownFields, limit);

  return (
    <div className="score-features">
      <h4 className="score-features-heading">
        <Components.FormattedMessage id="thanks.learn_more_about" />
      </h4>{' '}
      <div className="score-features-items">
        {fields.map((field, i) => {
          const entity = entities.find((e) => e.id === field.id);
          return entity ? <FeatureItem key={field.id} entity={entity} showComma={i < (fields.length - 1)} /> : null;
        })}.
      </div>
    </div>
  );
};


const FeatureItem = ({entity, showComma}) => {
  const mdnUrl = get(entity, 'mdn.url');
  const TagName = mdnUrl ? 'a' : 'span';

  return (
    <div className="score-feature">
      <TagName
        className="score-feature-name"
        {...(mdnUrl && {
          href: `https://developer.mozilla.org${mdnUrl}`,
          target: '_blank',
          rel: 'norefferer',
        })}>
        {entity.name}
      </TagName>
      {showComma && ', '}
      {/* <p className="score-feature-summary" dangerouslySetInnerHTML={{ __html: get(entity, 'mdn.summary') }} /> */}
    </div>
  );
};
const Score = ({ response, survey }, { intl }) => {
  const containerRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { knowledgeRanking } = response;
  const { known, total, score, unknownFields } = getKnowledgeScore(response, survey);
  const knowledgeRankingFromTop = knowledgeRanking;
  const { imageUrl, name, year, shareUrl, hashtag } = survey;

  const text = intl.formatMessage({ id: 'thanks.share_score_message' }, { score, name, shareUrl, hashtag });

  return (
    <EntitiesContext.Consumer>
      {({ entities }) => (
        <div className="score">
          <div className="score-calculation">
            <div className="score-calcuation-heading">
              <Components.FormattedMessage id="thanks.knowledge_score" />
            </div>
            <div className="score-percent">
              <CountUp
                start={0}
                delay={0.3}
                duration={2}
                end={score}
                onStart={() => {
                  setTimeout(() => {
                    setShowConfetti(true);
                  }, 1200);
                }}
              />
              %
              <div className="score-confetti" ref={containerRef}>
                {showConfetti && (
                  <Confetti
                    width={containerRef.current.offsetWidth}
                    height={containerRef.current.offsetWHeight}
                    recycle={false}
                    numberOfPieces={80}
                    initialVelocityX={5}
                    initialVelocityY={20}
                    confettiSource={{ x: containerRef.current.offsetWidth / 2 - 50, y: 100, w: 100, h: 100 }}
                  />
                )}
              </div>
            </div>
            <div className="score-ratio">
              <Components.FormattedMessage
                id="thanks.score_explanation"
                values={{ known, total, knowledgeRankingFromTop }}
                html={true}
              />
            </div>
            <div className="score-share">
            <Components.Button
              target="_blank"
              href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(text)}`}
            >
              <Components.FormattedMessage id="thanks.share_on_twitter" />
            </Components.Button>
            </div>
            {unknownFields.length > 0 && <Features unknownFields={unknownFields} limit={10} entities={entities} />}
          </div>
        </div>
      )}
    </EntitiesContext.Consumer>
  );
};

Score.contextTypes = {
  intl: intlShape,
};

export default Score;
