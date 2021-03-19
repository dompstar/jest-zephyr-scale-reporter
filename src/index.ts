import jest from 'jest'

import { Config, TestResult } from '@jest/types'
class JestZephyrScaleReporter {
    constructor(public globalConfig: Config.GlobalConfig, private options: Config.DefaultOptions) {}

    public onRunComplete(context: any, results: any) {
        console.log(results)

    }
}

export default JestZephyrScaleReporter;