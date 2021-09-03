/* Initialise the log history & cursor position */
let machineName = 'shine@user ~ # ';
let terminalHistoryLog = [];
let cursorLogPosition = terminalHistoryLog.length;
const userBirthday = '07/12/1998';

/* Set some core DOM items */
let terminalContainer = (currentTerminalDiv = document.getElementsByClassName(
  'terminal-container'
)[0]);
let siteContainer = document.getElementsByClassName('site-container')[0];

/* These count the number of tables of a certain type present in the DOM */
let manTableCount = (expTableCount = skiTableCount = 0);

/* A structure of system commands used for the man pages and valid command list */
const commandData = [
  {
    name: 'ls',
    description:
      'Lists the valid commands that the terminal will accept. Try some out!',
  },
  {
    name: 'about',
    description: 'The whois utility lists general information.',
  },
  {
    name: 'skills',
    description: 'The skills utility lists skills information.',
  },
  {
    name: 'experience',
    description: 'The experience lists professional experience.',
  },
  {
    name: 'projects',
    description: 'Provides a link to the source code for this project.',
  },
  {
    name: 'alive',
    description:
      'The alive utility displays the current time, the' +
      ' length of time the I have been living , the number of users, and ' +
      'the load average of the system over the last 1, 5, and 15 minutes.',
  },
  {
    name: 'history',
    description:
      'The history utility lists all previous commands used within the current terminal session.',
  },
  {
    name: 'man',
    description:
      'The man utility is the command manual and provides a full list of system commands / descriptions.',
  },
  {
    name: 'clear',
    description:
      'The clear utility clears all previous command output and resets the terminal session.',
  },
  {
    name: 'contact',
    description: 'The contact utility provides a contact email address.',
  },
  {
    name: 'exit',
    description: 'The exit utility leaves the terminal session.',
  },
];

const skillsData = [
  {
    name: '• HTML, CSS and Javascript',
  },
  {
    name: '• Flutter',
  },
  {
    name: '• AWS - Ec2, S3, Lightsail'
  },
  {
    name: '• Linux and Git',
  },
  {
    name: '• PostgresQL, MongoDB, ',
  },
  {
    name: '• Python, Django',
  },
  {
    name: '• UI/UX',
  },
];

const experienceData = [
  {
    title: 'Content Creator and Blogger',
    company: 'Nomad Travel Hacker',
    duration: '2020/05 - PRESENT',
    location: 'ASSAM, IN',
  },
//   {
//     title: 'Software Engineer',
//     company: 'AZminds',
//     duration: '2020/06 - PRESENT',
//     location: 'KTM, NP',
//   },
];


// const experienceData = [
//   "<p>Not any as of now.. Will update it from time to time tho.</p>"
// ];

/* Content for the whois command. Designed to be a string of any length */
const whoisContent =
  "<p>Hello there, my name is Shine 👋 I'm a fullstack web developer. Exploring new technologies and making fun projects every single day.</p>";

const githubContent =
  "<p>- 🖥️ zShark - SEO Tool 🎉 -</p>" +
  "<p>Just another super powerful SEO tool. zShark is a tool to analyze any website metrics like DA, PA and backlinks. </p>" +
  '<p>' +
  '<a href="https://github.com/shinebarbhuiya/zShark"target="_blank">' +
  'https://github.com/shinebarbhuiya/zShark</a>' +
  '</p>' +
  '<p>- 🖥️ Whois Lookup Tool 🎉 -</p>' +
  '<p>A tool to check the details of a domain. It can show you the register and registrant details like name, email etc.</p>' +
  '<p>' +
  '<a href="https://github.com/shinebarbhuiya/Whois_Lookup"target="_blank">' +
  'https://github.com/shinebarbhuiya/Whois_Lookup</a>' +
  '</p>' +
  '<p>- 🖥️ Amazon Search Telegram Bot 🎉 -</p>' +
  '<p>This is a telegram bot which can search Amazon products for you. It will give all the top products it can find for the keywork.</p>' +
  '<p>' +
  '<a href="https://github.com/shinebarbhuiya/Amazon-Telegram-Bot"target="_blank">' +
  'https://github.com/shinebarbhuiya/Amazon-Telegram-Bot</a>' +
  '</p>' +
  '<p>- 🖥️ Zee5 Voot Streamer 🎉 -</p>' +
  '<p>Can give you a stream from any link of Zee5. So, basically you can watch everything on Zee5 for free.</p>' +
  '<p>' +
  '<a href="https://github.com/shinebarbhuiya/Zee5_Voot_Streamer"target="_blank">' +
  'https://github.com/shinebarbhuiya/Zee5_Voot_Streamer</a>' +
  '</p>' +
  '<p>- 🖥️ Simple Weather Scrapper 🎉 -</p>' +
  '<p>It is a very simple and easy to use python script which shows the current weather of any location given.</p>' +
  '<p>' +
  '<a href="https://github.com/shinebarbhuiya/Simple_Weather_Scraper"target="_blank">' +
  'https://github.com/shinebarbhuiya/Simple_Weather_Scraper</a>' +
  '</p>' +
  '<p>- 🖥️ Amazon India Price Tracker 🎉 -</p>' +
  "<p>A very simple python program to scrape for Amazon price and email you when the price get's below a certain threshold you provide.</p>" +
  '<p>' +
  '<a href="https://github.com/shinebarbhuiya/Amazon_India_Price_Alert"target="_blank">' +
  'https://github.com/shinebarbhuiya/Amazon_India_Price_Alert</a>' +
  '</p>';

const initialisePage = () => {
  /* Initialises the page. We just sequentially load in the initial page
     elements. We could do this with CSS, but ...here we are) */
  setTimeout(mockLogin, 400);
  setTimeout(mockCommands, 1000);
  setTimeout(loadUserInput, 1400);
  setTimeout(commandListener, 1600);
  setInterval('inputRefocus()', 1800);
};

const inputRefocus = () => {
  /* Refocuses the command line automatically if it falls out of focus */
  let commandLine = document.getElementsByClassName('terminal-input')[0];
  if (document.activeElement !== commandLine) {
    commandLine.focus();
  }
};

const commandListener = () => {
  /* Main command listener - processes and runs the keyboard input */
  let userInput = document.getElementsByClassName('terminal-input')[0];
  userInput.addEventListener('keyup', function (event) {
    /* First, we handle the ArrowUp event (but only if the cursor isn't
         already at the start of the array). Then, we handle the ArrowDown
         event (only if the cursor isn't already at the end of the array). */
    if (event.key === 'ArrowUp' && cursorLogPosition > 1) {
      cursorLogPosition -= 1;
      userInput.value = terminalHistoryLog.slice(cursorLogPosition - 1)[0];
    }
    if (
      event.key === 'ArrowDown' &&
      cursorLogPosition < terminalHistoryLog.length
    ) {
      cursorLogPosition += 1;
      userInput.value = terminalHistoryLog.slice(cursorLogPosition - 1)[0];
    } else if (event.key === 'Enter') {
      /* Otherwise, we handle the keyboard Enter event */
      event.preventDefault();
      /* We need to transform the input for processing, but also
             want to store the raw data for later use */
      let rawInput = userInput.value;
      let cleanedInput = userInput.value.toLowerCase();

      /* We only store non-blanks */
      if (rawInput !== '') {
        terminalHistoryLog.push(rawInput);
        cursorLogPosition = terminalHistoryLog.length + 1;
      }
      /* Before processing input, write to the previous line on the screen */
      setPrevLine(rawInput);

      /* This is the main switch statement takes the cleaned input and
             decides which command to fire */
      switch (cleanedInput) {
        case '':
          /* Do nothing */
          break;
        case 'cd':
          cdPrinter();
          break;
        case 'clear':
          clearTerminal();
          break;
        case 'contact':
          contactPrinter();
          break;
        case 'exit':
          window.open('https://github.com/shinebarbhuiya');
          break;
        case 'experience':
          experiencePrinter(experienceData);
          break;
        case 'miniterm':
        case 'projects':
          githubPrinter();
          break;
        case 'history':
          historyPrinter(terminalHistoryLog);
          break;
        case 'ls':
        case 'help':
          commandPrinter(commandData);
          break;
        case 'man':
          manPrinter(commandData);
          break;
        case 'skills':
          skillsPrinter(skillsData);
          break;
        case 'alive':
          uptimePrinter();
          break;
        case 'about':
          whoisPrinter();
          break;
        default:
          /* Otherwise, the command doesn't exist */
          commandNotFoundPrinter(cleanedInput);
      }

      /* Finally, force a reset and re-focus of terminal input field */
      userInput.value = '';
      userInput.focus();
      terminalContainer.scrollIntoView(false);
    }
  });
};

const setPrevLine = (rawInput) => {
  /* Get the relevant DOM objects, and set the content of the previous
     terminal line */
  let previousLineDiv = document.createElement('div');
  previousLineDiv.innerHTML = machineName + rawInput;
  previousLineDiv.setAttribute('class', 'ag output-row green-hl');
  siteContainer.insertBefore(previousLineDiv, currentTerminalDiv);
};

const uptimePrinter = () => {
  /* Prints how long you've been alive in days since your birthday */
  let duration = new Date(userBirthday);
  let todaysDate = new Date();
  let daysDelta = todaysDate.getTime() - duration.getTime();
  daysDelta = daysDelta / (1000 * 3600 * 24);
  let timeNow = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  /* To display the final uptime */
  let uptimeDiv = document.createElement('p');
  uptimeDiv.setAttribute('class', 'ag output-row');
  uptimeDiv.innerHTML =
    timeNow +
    ' up ' +
    Math.round((daysDelta + Number.EPSILON) * 100) +
    ' days old as of today, 1 user, load averages: 5.24 5.18 5.42';
  siteContainer.insertBefore(uptimeDiv, currentTerminalDiv);
};

const skillsPrinter = (skillsData) => {
  /* Prints a list of skills to screen */
  skiTableCount += 1;

  /* Build title */
  let skillsStart = document.createElement('div');
  skillsStart.setAttribute('class', 'ag output-row');
  skillsStart.innerHTML = ' --- SKILLS --- ';
  siteContainer.insertBefore(skillsStart, currentTerminalDiv);

  /* Build table */
  let skillsTable = document.createElement('table');
  skillsTable.setAttribute(
    'class',
    'skTb' + skiTableCount + ' ag skTable' + ' output-row'
  );
  siteContainer.insertBefore(skillsTable, currentTerminalDiv);

  let skTable = document.getElementsByClassName('skTb' + skiTableCount)[0];
  let tdData = Object.keys(skillsData);
  generateTable(skTable, skillsData);
};

const generateTable = (table, data) => {
  /* Generic table generator for tabular data,
    consumes a data structure and spits out a HTML table.*/
  for (let element of data) {
    let row = table.insertRow();

    for (let key in element) {
      let cell = row.insertCell();
      let textContent = document.createTextNode(element[key]);
      cell.appendChild(textContent);
    }
  }
};

const experiencePrinter = (experienceData) => {
  /* Prints work experiences to the screen. */
  expTableCount += 1;

  /* Build title */
  let expStart = document.createElement('div');
  expStart.setAttribute('class', 'ag output-row');
  expStart.innerHTML = ' --- EXPERIENCE --- ';
  siteContainer.insertBefore(expStart, currentTerminalDiv);

  /* Build table */
  let expTable = document.createElement('table');
  expTable.setAttribute(
    'class',
    'exTb' + expTableCount + ' ag exTable' + ' output-row'
  );
  siteContainer.insertBefore(expTable, currentTerminalDiv);

  let exTable = document.getElementsByClassName('exTb' + expTableCount)[0];
  let tdData = Object.keys(experienceData[0]);
  generateTable(exTable, experienceData);
  siteContainer.insertBefore(exTable, currentTerminalDiv);
};

const manPrinter = (commandData) => {
  /* Prints man-pages to screen */
  manTableCount += 1;

  /* Build title */
  let manStart = document.createElement('div');
  manStart.setAttribute('class', 'ag output-row');
  manStart.innerHTML = ' --- BSD General Commands Manual --- ';
  siteContainer.insertBefore(manStart, currentTerminalDiv);

  /* Build table */
  let manTable = document.createElement('table');
  manTable.setAttribute(
    'class',
    'mnTb' + manTableCount + ' ag mnTable' + ' output-row'
  );
  siteContainer.insertBefore(manTable, currentTerminalDiv);

  let mnTable = document.getElementsByClassName('mnTb' + manTableCount)[0];
  let tdData = Object.keys(experienceData[0]);
  generateTable(mnTable, commandData);
  siteContainer.insertBefore(mnTable, currentTerminalDiv);
};

const whoisPrinter = () => {
  /* Prints 'whois' details to screen */
  let whoisDiv = document.createElement('p');
  whoisDiv.innerHTML = whoisContent;
  whoisDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(whoisDiv, currentTerminalDiv);
};


const githubPrinter = () => {
  /* Prints 'whois' details to screen */
  let githubDiv = document.createElement('p');
  githubDiv.innerHTML = githubContent;
  githubDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(githubDiv, currentTerminalDiv);
};

const cdPrinter = () => {
  /* Prints 'cd' easter egg to screen */
  let cdDiv = document.createElement('p');
  cdDiv.innerHTML =
    "...cd? Where ya gonna change to, kid? This ain't a REAL machine...";
  cdDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(cdDiv, currentTerminalDiv);
};

const commandPrinter = (commandData) => {
  /* Builds a string of available commands and outputs to terminal */
  let commandArray = [];

  commandData.forEach((command) => {
    commandArray.push(command.name);
  });

  let commandString = commandArray.join(', ');
  let lsDiv = document.createElement('div');
  lsDiv.innerHTML = commandString;
  lsDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(lsDiv, currentTerminalDiv);
};

const commandNotFoundPrinter = (userInput, rawInput) => {
  /* We need to create two line outputs to emulate bash (the error is an
     extra line */
  let commandNotFoundDiv = document.createElement('div');
  commandNotFoundDiv.innerHTML = '-bash: ' + rawInput + ': command not found';
  commandNotFoundDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(commandNotFoundDiv, currentTerminalDiv);
};

const contactPrinter = () => {
  /* Prints contact details to screen */
  let contactDiv = document.createElement('div');
  let email = 'shinealom@gmail.com';
  let facebook = '/shinetalented';
  let instagram = '@imshineb';
  contactDiv.innerHTML =
    '📧 <a href="mailto: ' +
    email +
    '?subject=Hello, Shine!" target="_blank">' +
    email +
    '</a> <br>🍪 <a  href="facebook.com/shinetalented">facebook.com/shinetalented</a><br>📷  <a href="instagram.com/imshineb">instagram.com/imshineb</a> ';

  contactDiv.setAttribute('class', 'ag output-row');
  siteContainer.insertBefore(contactDiv, currentTerminalDiv);
};

const historyPrinter = (terminalHistoryLog) => {
  /* Prints terminal history to screen */
  terminalHistoryLog.forEach((entryItem, index) => {
    let historyOutputRow = document.createElement('div');
    historyOutputRow.innerHTML = index + 1 + ' ' + entryItem;
    historyOutputRow.setAttribute('class', 'ag output-row');
    siteContainer.insertBefore(historyOutputRow, currentTerminalDiv);
  });
};

const clearTerminal = () => {
  /* All autogenerated output has the class "ag", so we just delete those */
  let agLines = document.getElementsByClassName('ag');
  while (agLines[0]) {
    agLines[0].parentNode.removeChild(agLines[0]);
  }
  /* Null the count of active tables now in the DOM, cause they're all gone */
  expTableCount = skiTableCount = manTableCount = 0;
};

const mockLogin = () => {
  /* Micro function for mocking the 'login' process, called on first page
     load timer */
  let todaysDate = new Date();
  document.getElementsByClassName('login-time')[0].innerHTML =
    'Last login: ' + todaysDate.toLocaleString() + ' on ttys001';
};

const mockCommands = () => {
  /* Micro function for showing which commands are available, called on
     first page load timer */
  const instructionText =
    "- 💻 'ls' lists valid commands. ⬆️ & ⬇️ arrows" +
    ' cycle command history -';
  document.getElementsByClassName(
    'command-list'
  )[0].innerHTML = instructionText;
};

const loadUserInput = () => {
  /* Colors the terminal input element and creates the input on load */
  terminalContainer.style.backgroundColor = 'rgba(0, 255, 0, 0.06)';
  let userInput = document.createElement('input');
  userInput.setAttribute('type', 'text');
  userInput.setAttribute('class', 'terminal-input');
  userInput.setAttribute('autofocus', 'autofocus');
  document.getElementsByClassName('machine-name')[0].innerHTML = machineName;
  terminalContainer.appendChild(userInput);
};
/* Just calls and runs the whole system :) */
initialisePage();
