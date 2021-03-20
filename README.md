# Installation

```
$ npm install --dev jest-zephyr-scale-reporter
```
or
```
$ yarn add -D jest-zephyr-scale-reporter
```

# Usage

In jest.config.js, add jest-zephyr-scale-reporter to reporters
```
"reporters": [
	"default",
	"jest-zephyr-scale-reporter"
]
```

After running the testsuite, a json file (*zephyr-report.json*) will be written to the folder