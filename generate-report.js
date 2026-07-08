const report = require('multiple-cucumber-html-reporter')
const path = require('path')
const fs = require('fs')

const reportDir = path.join(process.cwd(), 'reports')
const jsonFile = path.join(reportDir, 'cucumber-report.json')

if (!fs.existsSync(jsonFile)) {
  console.log('No cucumber-report.json found — skipping report generation')
  process.exit(0)
}

report.generate({
  jsonDir: reportDir,
  reportPath: path.join(reportDir, 'cucumber-html-report'),
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local Machine',
    platform: { name: process.platform },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'MakeMyTrip Flight Booking' },
      { label: 'Execution', value: new Date().toISOString() },
      { label: 'Environment', value: process.env.NODE_ENV || 'staging' },
    ],
  },
  displayDuration: true,
  durationUnits: 's',
})
