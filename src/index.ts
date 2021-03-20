
import { Config, TestResult as JestResult } from '@jest/types'
import { Context, Test, TestResult, ReporterOnStartOptions } from '@jest/reporters'
import { TestCaseResult, AggregatedResult } from '@jest/test-result'
import path from 'path'
import fs from 'fs'


class JestZephyrScaleReporter {


    tests: JestResult.AssertionResult[] = []

    constructor(public globalConfig: Config.GlobalConfig, private options: Config.DefaultOptions) {}



    public onRunComplete(context: Set<Context>, results: AggregatedResult) {
        let testResults = this.tests.map(x => this.parseContent(x)).filter(x => x !== null)
        this.writeJson(testResults, "zephyr-report.json")

    }

    public onTestResult(test: Test, testResults: TestResult, runResults: AggregatedResult) {
        this.tests = this.tests.concat(testResults.testResults)
    }

    writeJson(content: any, filename: string) {
        fs.writeFileSync(path.join('./', filename), JSON.stringify({ version: 1, executions: content }))
        console.log("Wrote Zephyr Scale report to " + filename);

    }

    parseContent = (testCase: JestResult.AssertionResult): any => {
        let name = testCase.fullName.trim();
        let testCaseKey = null;
        const matcher = /[A-Z]+-T[0-9]+/
        const matches = name.match(matcher)
        if (matches !== undefined && matches !== null) {
            testCaseKey = matches[0]
            name = name.replace(testCaseKey, "")
            name = name.replace(/\s{2,}/g, ' ')

        }

        if (testCaseKey === null) {
            return null
        }

        return {
            source: name,
            result: testCase.status.charAt(0).toUpperCase() + testCase.status.slice(1),
            testcase: {
                key: testCaseKey
            }
        }
    }

}

export default JestZephyrScaleReporter;