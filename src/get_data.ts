import moment from 'moment';

interface Unit {
  name: string;
  health: number;
  magic: boolean;
  type: 'infantry' | 'cavalry' | 'leader' | 'magic';
  description: string;
}

function getRandomUnit(): Unit {
  const units: Unit[] = [
    {
      name: 'Dead-Shot',
      health: 2,
      magic: false,
      type: 'infantry',
      description: 'A medium missile unit of the Lava Elf race.'
    },
    {
      name: 'Assassin',
      health: 3,
      magic: false,
      type: 'infantry',
      description: 'A large missile unit of the Lava Elf race.'
    },
    {
      name: 'Spider Rider',
      health: 1,
      magic: false,
      type: 'cavalry',
      description: 'A small cavalry unit of the Lava Elf race.'
    },
    {
      name: 'Lava Elf Sorcerer',
      type: 'magic',
      health: 3,
      magic: true,
      description: 'A powerful sorcerer of the Lava Elf race, capable of casting devastating spells.'
    },
    {
      name: 'Goblin Grunt',
      type: 'infantry',
      health: 1,
      magic: false,
      description: 'A basic infantry unit of the Goblin race.'
    },
    {
      name: 'Goblin Courier',
      type: 'cavalry',
      health: 2,
      magic: false,
      description: 'A fast cavalry unit of the Goblin race.'
    },
    {
      name: 'Goblin Shaman',
      type: 'magic',
      health: 1,
      magic: true,
      description: 'A magic user of the Goblin race.'
    },
    {
      name: 'Goblin Warlord',
      type: 'leader',
      health: 3,
      magic: false,
      description: 'The powerful leader of the Goblin race.'
    }
  ];

  const randomIndex = Math.floor(Math.random() * units.length);
  return units[randomIndex];
}


export function getData(
  args: {
    date: number;
    spread: number;
  },
  someNumber: number
) {
  const { date: argDate, spread: argSpread } = args;

  const SPREAD = argSpread || 500;
  const END_DATE = moment
    .utc()
    .subtract(someNumber - 1, 'week')
    .valueOf();

  let START_DATE: number;
  if (argDate != null) {
    START_DATE = argDate * 1000; // specify as seconds not milliseconds
  } else {
    START_DATE = moment.utc().subtract(someNumber, 'week').valueOf();
  }

  let iterations = SPREAD;
  let time = END_DATE;
  const delta = END_DATE - START_DATE;
  const increment = Math.floor(delta / (SPREAD - 1));

  let output = [];
  while (iterations > 0) {
    output.push(JSON.stringify({ index: {} }));
    output.push(JSON.stringify({
      time: moment.utc(time).format(),
      ...getRandomUnit(),
    }));

    time -= increment;
    iterations--;
  }

  return output;
}
