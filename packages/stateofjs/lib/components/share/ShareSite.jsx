import React from 'react';
import ShareTwitter from './ShareTwitter';
import ShareEmail from './ShareEmail';
import ShareFacebook from './ShareFacebook';
import ShareLinkedIn from './ShareLinkedIn';
import { intlShape } from 'meteor/vulcan:i18n';


const ShareSite = ({ survey }, { intl }) => {
  const { name, year, hashtag } = survey;
  const surveyName = `${name} ${year}`;
  const link = 'https://survey.stateofjs.com';
  const values = { surveyName, link };
  const title = intl.formatMessage({ id: 'general.share_subject' }, values);
  const body = intl.formatMessage({ id: 'general.share_text' }, values);
  const twitterText = body + `#${hashtag}`;

  return (
    <div className="ShareSite">
      <div className="ShareSite__Content">
        <ShareTwitter text={twitterText}/>
        <ShareFacebook link={link} />
        <ShareLinkedIn link={link} title={title} />
        <ShareEmail subject={title} body={body} />
      </div>
    </div>
  );
};

ShareSite.contextTypes = {
  intl: intlShape,
};

export default ShareSite;
