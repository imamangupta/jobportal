export const tests = [
    {
      id: 1,
      title: 'JavaScript Basics',
      description: 'Test your knowledge of JavaScript fundamentals',
      category: 'js',
      timeLimit: 600, // 5 minutes
      questions: [
        {
          id: 1,
          question: 'What is the result of 2 + "2"?',
          options: ['4', '"22"', 'NaN', 'TypeError'],
          correctAnswer: '"22"',
        },
        {
          id: 2,
          question: 'Which method is used to add an element to the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 'push()',
        },
        {
          id: 3,
          question: 'What does the === operator do?',
          options: [
            'Checks for equality, but not type',
            'Checks for equality, including type',
            'Assigns a value to a variable',
            'Compares two variables and returns the larger one',
          ],
          correctAnswer: 'Checks for equality, including type',
        },
        {
          id: 4,
          question: 'Which keyword is used to declare a variable in JavaScript?',
          options: ['var', 'let', 'const', 'All of the above'],
          correctAnswer: 'All of the above',
        },
        {
          id: 5,
          question: 'What is the correct way to write a JavaScript array?',
          options: [
            'var colors = (1:"red", 2:"green", 3:"blue")',
            'var colors = ["red", "green", "blue"]',
            'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
            'var colors = "red", "green", "blue"',
          ],
          correctAnswer: 'var colors = ["red", "green", "blue"]',
        },
        {
          id: 6,
          question: 'Which built-in method sorts the elements of an array?',
          options: ['sort()', 'changeOrder(order)', 'order()', 'None of the above'],
          correctAnswer: 'sort()',
        },
        {
          id: 7,
          question: 'How do you create a function in JavaScript?',
          options: [
            'function myFunction()',
            'def myFunction()',
            'function:myFunction()',
            'create myFunction()',
          ],
          correctAnswer: 'function myFunction()',
        },
        {
          id: 8,
          question: 'Which operator is used to assign a value to a variable?',
          options: ['=', '-', '*', '=='],
          correctAnswer: '=',
        },
        {
          id: 9,
          question: 'What will `typeof NaN` return?',
          options: ['number', 'string', 'undefined', 'object'],
          correctAnswer: 'number',
        },
        {
          id: 10,
          question: 'What is the purpose of the "use strict" statement?',
          options: [
            'Enables ES6 features',
            'Enforces stricter parsing and error handling',
            'Defines a variable strictly',
            'Declares a constant variable',
          ],
          correctAnswer: 'Enforces stricter parsing and error handling',
        },
        {
          id: 11,
          question: 'Which method converts JSON data into a JavaScript object?',
          options: ['JSON.parse()', 'JSON.stringify()', 'JSON.object()', 'JSON.toObject()'],
          correctAnswer: 'JSON.parse()',
        },
        {
          id: 12,
          question: 'What is the correct syntax to print a message in the console?',
          options: ['console.print()', 'console.write()', 'console.log()', 'print.console()'],
          correctAnswer: 'console.log()',
        },
        {
          id: 13,
          question: 'Which of the following is not a JavaScript data type?',
          options: ['Number', 'Boolean', 'Float', 'Undefined'],
          correctAnswer: 'Float',
        },
        {
          id: 14,
          question: 'What is the correct way to create a JavaScript object?',
          options: [
            'var obj = {}',
            'var obj = new Object()',
            'var obj = Object.create()',
            'All of the above',
          ],
          correctAnswer: 'All of the above',
        },
        {
          id: 15,
          question: 'Which statement is used to stop a loop?',
          options: ['break', 'stop', 'exit', 'return'],
          correctAnswer: 'break',
        },
        {
          id: 16,
          question: 'Which keyword refers to the current object in JavaScript?',
          options: ['that', 'self', 'this', 'current'],
          correctAnswer: 'this',
        },
        {
          id: 17,
          question: 'What will `null === undefined` evaluate to?',
          options: ['true', 'false', 'TypeError', 'NaN'],
          correctAnswer: 'false',
        },
        {
          id: 18,
          question: 'What does the `Array.prototype.map()` method do?',
          options: [
            'Mutates the array',
            'Creates a new array with results of calling a function on every element',
            'Adds a new element to the end of an array',
            'Removes the first element from an array',
          ],
          correctAnswer:
            'Creates a new array with results of calling a function on every element',
        },
        {
          id: 19,
          question: 'Which function is used to delay execution of code?',
          options: ['setTimeout()', 'setInterval()', 'clearTimeout()', 'clearInterval()'],
          correctAnswer: 'setTimeout()',
        },
        {
          id: 20,
          question: 'What does the `typeof` operator do?',
          options: [
            'Returns the type of a variable as a string',
            'Changes the type of a variable',
            'Assigns a new type to a variable',
            'Compares types of two variables',
          ],
          correctAnswer: 'Returns the type of a variable as a string',
        },
        {
          id: 21,
          question: 'Which loop is guaranteed to run at least once?',
          options: ['for', 'while', 'do...while', 'forEach'],
          correctAnswer: 'do...while',
        },
        {
          id: 22,
          question: 'Which built-in method removes the last element from an array?',
          options: ['pop()', 'push()', 'shift()', 'unshift()'],
          correctAnswer: 'pop()',
        },
        {
          id: 23,
          question: 'How do you declare a constant in JavaScript?',
          options: ['let', 'var', 'const', 'constant'],
          correctAnswer: 'const',
        },
        {
          id: 24,
          question: 'What does JSON stand for?',
          options: [
            'JavaScript Object Notation',
            'Java Source Object Notation',
            'JavaScript Oriented Notation',
            'JavaScript Output Notation',
          ],
          correctAnswer: 'JavaScript Object Notation',
        },
        {
          id: 25,
          question: 'Which of the following is a primitive data type in JavaScript?',
          options: ['Object', 'Function', 'Boolean', 'Array'],
          correctAnswer: 'Boolean',
        },
      ],
    },
    {
      id: 2,
      title: 'React Fundamentals',
      description: 'Evaluate your understanding of React core concepts',
      category: 'react',
      timeLimit: 600, // 5 minutes
      questions: [
        {
          id: 1,
          question: 'What hook is used to perform side effects in a function component?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correctAnswer: 'useEffect',
        },
        {
          id: 2,
          question: 'What is the virtual DOM?',
          options: [
            'A direct copy of the real DOM',
            'A lightweight copy of the real DOM',
            'A JavaScript object',
            'A browser API',
          ],
          correctAnswer: 'A lightweight copy of the real DOM',
        },
        {
          id: 3,
          question: 'Which of the following is NOT a React Hook?',
          options: ['useCallback', 'useFetch', 'useMemo', 'useRef'],
          correctAnswer: 'useFetch',
        },
        {
          id: 4,
          question: 'What is JSX?',
          options: [
            'A JavaScript extension that allows writing HTML',
            'A new programming language',
            'A template engine for React',
            'A syntax that compiles to HTML',
          ],
          correctAnswer: 'A JavaScript extension that allows writing HTML',
        },
        {
          id: 5,
          question: 'Which hook is used to manage component state?',
          options: ['useEffect', 'useState', 'useMemo', 'useReducer'],
          correctAnswer: 'useState',
        },
        {
          id: 6,
          question: 'What is the purpose of useMemo in React?',
          options: [
            'To memoize a function and prevent unnecessary re-executions',
            'To manage global state',
            'To re-render a component conditionally',
            'To handle side effects',
          ],
          correctAnswer: 'To memoize a function and prevent unnecessary re-executions',
        },
        {
          id: 7,
          question: 'How do you pass props to a child component?',
          options: [
            '<ChildComponent props={value} />',
            '<ChildComponent value={props} />',
            '<ChildComponent propName={value} />',
            '<ChildComponent {props} />',
          ],
          correctAnswer: '<ChildComponent propName={value} />',
        },
        {
          id: 8,
          question: 'What is React Fiber?',
          options: [
            'The reconciliation algorithm in React 16+',
            'A rendering engine used in React',
            'A browser feature',
            'A state management tool',
          ],
          correctAnswer: 'The reconciliation algorithm in React 16+',
        },
        {
          id: 9,
          question: 'What does the useReducer hook do?',
          options: [
            'Manages complex state logic',
            'Dispatches actions in Redux',
            'Optimizes function calls',
            'Handles side effects in components',
          ],
          correctAnswer: 'Manages complex state logic',
        },
        {
          id: 10,
          question: 'What is the purpose of React keys in a list?',
          options: [
            'To identify which items have changed, been added, or removed',
            'To bind data to components',
            'To optimize rendering performance',
            'To manage event handlers',
          ],
          correctAnswer: 'To identify which items have changed, been added, or removed',
        },
        {
          id: 11,
          question: 'What does the context API do in React?',
          options: [
            'Manages component state',
            'Allows passing data down the component tree without props',
            'Handles side effects in functional components',
            'Updates components after rendering',
          ],
          correctAnswer: 'Allows passing data down the component tree without props',
        },
        {
          id: 12,
          question: 'What is the main benefit of using React?',
          options: [
            'Server-side rendering',
            'Faster load times',
            'Component-based architecture',
            'Direct DOM manipulation',
          ],
          correctAnswer: 'Component-based architecture',
        },
        {
          id: 13,
          question: 'Which React hook allows you to reference DOM elements directly?',
          options: ['useState', 'useEffect', 'useRef', 'useReducer'],
          correctAnswer: 'useRef',
        },
        {
          id: 14,
          question: 'How do you trigger a re-render in a React function component?',
          options: [
            'By updating the state or props',
            'By using the reRender() method',
            'By calling the componentDidMount lifecycle method',
            'By using the forceUpdate() function',
          ],
          correctAnswer: 'By updating the state or props',
        },
        {
          id: 15,
          question: 'What is React.Fragment used for?',
          options: [
            'Grouping multiple elements without adding extra nodes to the DOM',
            'Handling fragments of components',
            'Handling dynamic imports',
            'Rendering empty components',
          ],
          correctAnswer: 'Grouping multiple elements without adding extra nodes to the DOM',
        },
        {
          id: 16,
          question: 'Which hook is used to handle performance optimizations in React?',
          options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
          correctAnswer: 'useMemo',
        },
        {
          id: 17,
          question: 'What is React.lazy used for?',
          options: [
            'Deferring state updates',
            'Lazy loading components to improve performance',
            'Adding lazy initialization in components',
            'Deferring component re-renders',
          ],
          correctAnswer: 'Lazy loading components to improve performance',
        },
        {
          id: 18,
          question: 'How do you prevent re-renders in a child component in React?',
          options: [
            'Using React.memo',
            'Using useEffect',
            'Using setState()',
            'Using componentWillUnmount',
          ],
          correctAnswer: 'Using React.memo',
        },
        {
          id: 19,
          question: 'What does ReactDOM.render() do?',
          options: [
            'Updates the entire DOM tree',
            'Renders a React component into the DOM',
            'Removes an element from the DOM',
            'Renders HTML directly',
          ],
          correctAnswer: 'Renders a React component into the DOM',
        },
        {
          id: 20,
          question: 'What is prop drilling in React?',
          options: [
            'Passing props through multiple layers of components',
            'Injecting props via context',
            'Manually drilling into props',
            'Overriding child component props',
          ],
          correctAnswer: 'Passing props through multiple layers of components',
        },
      ],
    },
    
    {
      id: 3,
      title: 'Node.js Essentials',
      description: 'Test your Node.js knowledge and server-side skills',
      category: 'node',
      timeLimit: 600, // 5 minutes
      questions: [
        {
          id: 1,
          question: 'What is the purpose of the `fs` module in Node.js?',
          options: [
            'File system operations',
            'Full stack development',
            'Front-end styling',
            'Function serialization',
          ],
          correctAnswer: 'File system operations',
        },
        {
          id: 2,
          question: 'Which of the following is NOT a core module in Node.js?',
          options: ['http', 'path', 'express', 'crypto'],
          correctAnswer: 'express',
        },
        {
          id: 3,
          question: 'What does the `npm` command stand for?',
          options: [
            'Node Package Manager',
            'New Project Module',
            'Node Project Maker',
            'Node.js Processing Machine',
          ],
          correctAnswer: 'Node Package Manager',
        },
        {
          id: 4,
          question: 'Which command is used to initialize a new Node.js project?',
          options: ['npm start', 'node init', 'npm init', 'node start'],
          correctAnswer: 'npm init',
        },
        {
          id: 5,
          question: 'What does the `module.exports` object do in Node.js?',
          options: [
            'Defines dependencies',
            'Exports functions or objects from a module',
            'Imports other modules',
            'Initializes the server',
          ],
          correctAnswer: 'Exports functions or objects from a module',
        },
        {
          id: 6,
          question: 'Which of the following methods is used to read a file asynchronously in Node.js?',
          options: ['fs.read()', 'fs.readFileSync()', 'fs.readFile()', 'fs.openFile()'],
          correctAnswer: 'fs.readFile()',
        },
        {
          id: 7,
          question: 'What is the purpose of the `Buffer` class in Node.js?',
          options: [
            'To buffer streams of data',
            'To manage binary data directly',
            'To handle network requests',
            'To manage module exports',
          ],
          correctAnswer: 'To manage binary data directly',
        },
        {
          id: 8,
          question: 'Which event is emitted when a Node.js process encounters an uncaught exception?',
          options: ['error', 'uncaughtException', 'exception', 'exit'],
          correctAnswer: 'uncaughtException',
        },
        {
          id: 9,
          question: 'How can you install a package globally using npm?',
          options: ['npm install', 'npm install -g', 'npm global add', 'npm add --global'],
          correctAnswer: 'npm install -g',
        },
        {
          id: 10,
          question: 'Which method is used to create a server in Node.js?',
          options: ['http.createServer()', 'server.create()', 'net.createServer()', 'fs.createServer()'],
          correctAnswer: 'http.createServer()',
        },
        {
          id: 11,
          question: 'What does the `require` function do in Node.js?',
          options: [
            'Creates a new module',
            'Imports modules, JSON, or local files',
            'Defines environment variables',
            'Exports a module',
          ],
          correctAnswer: 'Imports modules, JSON, or local files',
        },
        {
          id: 12,
          question: 'Which statement is true about the Event Loop in Node.js?',
          options: [
            'It blocks I/O operations',
            'It handles asynchronous callbacks',
            'It runs synchronous code only',
            'It manages the DOM',
          ],
          correctAnswer: 'It handles asynchronous callbacks',
        },
        {
          id: 13,
          question: 'What is the default scope of modules in Node.js?',
          options: ['Public', 'Private', 'Global', 'Local'],
          correctAnswer: 'Private',
        },
        {
          id: 14,
          question: 'Which method is used to parse a JSON string into a JavaScript object in Node.js?',
          options: ['JSON.parse()', 'JSON.stringify()', 'parse.JSON()', 'objectify.JSON()'],
          correctAnswer: 'JSON.parse()',
        },
        {
          id: 15,
          question: 'Which of the following is a way to handle errors in Node.js?',
          options: ['try-catch', 'error event', 'callback with error argument', 'All of the above'],
          correctAnswer: 'All of the above',
        },
        {
          id: 16,
          question: 'What does the `process` object provide in Node.js?',
          options: [
            'Access to Node.js processes',
            'Methods for managing file systems',
            'Methods to interact with databases',
            'Access to environment variables and standard streams',
          ],
          correctAnswer: 'Access to environment variables and standard streams',
        },
        {
          id: 17,
          question: 'How do you exit a Node.js process programmatically?',
          options: ['process.stop()', 'exit()', 'process.exit()', 'quit()'],
          correctAnswer: 'process.exit()',
        },
        {
          id: 18,
          question: 'Which HTTP status code represents a successful GET request?',
          options: ['200', '404', '500', '301'],
          correctAnswer: '200',
        },
        {
          id: 19,
          question: 'What is middleware in Node.js?',
          options: [
            'Code that runs between receiving a request and sending a response',
            'A way to connect databases',
            'A method to handle errors',
            'A type of server',
          ],
          correctAnswer: 'Code that runs between receiving a request and sending a response',
        },
        {
          id: 20,
          question: 'Which module is commonly used for testing in Node.js?',
          options: ['Chai', 'Mocha', 'Jest', 'All of the above'],
          correctAnswer: 'All of the above',
        },
      ],
    }
    
  ]