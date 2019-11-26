import React from 'react';
import ShareTwitter from './ShareTwitter';
import ShareEmail from './ShareEmail';
import ShareFacebook from './ShareFacebook';
import ShareLinkedIn from './ShareLinkedIn';

const ShareSite = () => {
  const link = 'https://survey.stateofjs.com';
  const title = 'The State of JavaScript 2019 Survey';
  const twitterText = `This year's State of JavaScript survey is now open! ${link} #StateOfJS`;
  const subject = 'The State of JavaScript 2019 Survey';
  const body = `This year's State of JavaScript survey is now open! ${link}`;

  return (
    <div className="ShareSite">
      <div className="ShareSite__Content">
        <ShareTwitter text={twitterText}/>
        <ShareFacebook link={link} />
        <ShareLinkedIn link={link} title={title} />
        <ShareEmail subject={subject} body={body} />
      </div>
    </div>
  );
};

export default ShareSite;
