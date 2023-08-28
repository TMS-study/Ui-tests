import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 60 * 1000,
    expect: { timeout: 20000 },
    
    use: {
        baseURL: process.env.BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        viewport: {width:1800, height: 1024},
        actionTimeout: 60*1000,
        navigationTimeout: 60*1000
    },

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