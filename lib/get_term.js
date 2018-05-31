const { shuffle } = require('lodash');
const { random, floor } = Math;

const roll = () => floor(random() * 200);

const getParticipants = () => {
  const participantIds = [
    { participantId: 'participant-45i6jhhls1' },
    { participantId: 'participant-iuh5js77h3' },
    { participantId: 'participant-g4sdfjldsj' },
    { participantId: 'participant-sh58f6gihj' },
    { participantId: 'participant-4dglkd98ss' },
    { participantId: 'participant-s6k67hl5sj' },
  ];
  return participantIds.reduce((accum, { participantId }) => {
    return accum.concat([{ participantId, weight: roll() }]);
  }, []);
};

const getMeetings = () => {
  const meetingIds = [
    { meetingId: 'meeting-45i6jhhls1' },
    { meetingId: 'meeting-iuh5js77h3' },
    { meetingId: 'meeting-g4sdfjldsj' },
    { meetingId: 'meeting-sh58f6gihj' },
    { meetingId: 'meeting-4dglkd98ss' },
    { meetingId: 'meeting-s6k67hl5sj' },
  ];

  return meetingIds.reduce((accum, { meetingId }) => {
    return accum.concat([{ meetingId, weight: roll() }]);
  }, []);
};

const meetings = getMeetings();
const participants = getParticipants();

function getTerm() {
  const meetingses = shuffle(meetings);
  const participantses = shuffle(participants);

  let i = meetingses.length - 1;
  while (i >= 0) {
    const { weight, meetingId } = meetingses[i];
    if (weight > roll()) {
      return {
        meetingId,
        participantId: participantses[i].participantId
      };
    }

    i--;
  }
}

module.exports = { getTerm };
