module.exports = {
  default: {
    require: ['src/hooks/hooks.ts', 'src/step-definitions/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'json:reports/cucumber-report.json', 'html:reports/report.html'],
    paths: ['src/features/*.feature'],
    tags: '',
  },
}
