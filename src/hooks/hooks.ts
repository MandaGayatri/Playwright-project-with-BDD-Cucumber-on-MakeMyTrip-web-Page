import 'dotenv/config'
import { setWorldConstructor, Before, After, AfterStep, setDefaultTimeout, Status, ITestCaseHookParameter } from '@cucumber/cucumber'
import { chromium, Browser, Page } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

setDefaultTimeout(120 * 1000)

const screenshotDir = process.env.SCREENSHOT_DIR || path.join(process.cwd(), 'screenshots')
const videoDir = process.env.VIDEO_DIR || path.join(process.cwd(), 'videos')

export class CustomWorld {
  browser!: Browser
  page!: Page
  productTitle!: string | null
  stepCounter: number
  newPage!: Page

  constructor() {
    this.browser = null!
    this.page = null!
    this.productTitle = null
    this.stepCounter = 0
  }

  async takeScreenshot(page?: Page): Promise<string> {
    const target = page || this.page
    if (!target) return ''
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true })
    }
    this.stepCounter++
    const filename = `step-${String(this.stepCounter).padStart(2, '0')}-${Date.now()}.png`
    const filepath = path.join(screenshotDir, filename)
    await target.screenshot({ path: filepath, fullPage: false })
    return filepath
  }

  async attachVideo(): Promise<string | undefined> {
    if (this.page && this.page.video()) {
      const videoPath = await this.page.video()?.path()
      if (videoPath) return videoPath
    }
    return undefined
  }
}

setWorldConstructor(CustomWorld)

Before({ tags: '@makemytrip' }, async function (this: CustomWorld) {
  const headless = process.env.HEADED !== 'true'
  const baseUrl = process.env.BASE_URL || 'https://www.makemytrip.com'
  const slowMo = parseInt(process.env.SLOW_MO || '0', 10)

  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true })
  }

  this.browser = await chromium.launch({
    headless,
    args: ['--start-maximized', '--disable-blink-features=AutomationControlled'],
  })

  const context = await this.browser.newContext({
    viewport: null,
    recordVideo: { dir: videoDir },
  })
  this.page = await context.newPage()
  await this.page.goto(baseUrl, { waitUntil: 'load' })
  await this.page.evaluate(() => document.documentElement.requestFullscreen()).catch(() => {})
})

Before({ tags: '@bookNow' }, async function (this: CustomWorld) {
  console.log('Running book-now flow with extended timeout')
  setDefaultTimeout(180 * 1000)
})

AfterStep(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED) {
    await this.takeScreenshot()
  }
})

After({ tags: '@makemytrip' }, async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED) {
    await this.takeScreenshot()
    const videoPath = await this.attachVideo()
    if (videoPath) {
      console.log(`Video saved: ${videoPath}`)
    }
  }
  if (this.browser) {
    await this.browser.close()
  }
})
