import BasePage from "./base.page";
import { Locator, Page, test } from "@playwright/test";

export class Teachers extends BasePage {
    private readonly teacherCard1: Locator;
    private readonly teacherCard2: Locator;
    private readonly slider1: Locator;
    private readonly slider2: Locator;

    constructor(page: Page) {
        super(page);
        this.teacherCard1 = page.locator('//div[contains(@class, "styled__Root-hmLjco")]//div[@data-index="0"]');
        this.teacherCard2 = page.locator('//div[contains(@class, "styled__Root-hmLjco")]//div[@data-index="1"]');
        this.slider1 = page.locator('//div[contains(@class, "styled__Root-hmLjco")]//button[contains(@class, "styled__Root-eEBHAS")][1]');
        this.slider2 = page.locator('//div[contains(@class, "styled__Root-hmLjco")]//button[contains(@class, "styled__Root-eEBHAS")][2]');
    }

    async isTeacherCard1() {
        const a = await this.teacherCard1.isVisible();
        return a;
    }

    async isTeacherCard2() {
      const b =   await this.teacherCard2.isVisible();
        return b;
    }

    async clickSlider1() {
        const c = await this.slider1.click();
        return c;
    }

    async clickSlider2() {
      const d =  await this.slider2.click();
        return d
    }
}

// Блок учителей