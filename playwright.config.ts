import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 70 * 1000,
    expect: { timeout: 20000 },
    
    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        viewport: {width:1280, height: 720},
        headless: false,
        actionTimeout: 20*1000,
        navigationTimeout: 20*1000,
        
    },

    projects: [
        {
            name: 'chrome',
            use: {
                headless: true,
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
            },
            
        },
    ],

    workers: 1,
    fullyParallel: true,
    reporter: [
        ['html'],
        ["allure-playwright",
            {
              detail: true,
              outputFolder: "allure-report",
              suiteTitle: true,
            }
        ],
    ],

};

export default config;