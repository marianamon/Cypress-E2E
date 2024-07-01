const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './cucumber-json',
	reportPath: './cucumber-json',
	metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Cypress e2e'},
            {label: 'Release', value: '0.1.1'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: 'JUL 1fr 2024, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'JUL 1fr 2024, 02:56 PM EST'}
        ]
    }
});