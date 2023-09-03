import BasePage from "./base.page";
import { Locator, Page, test } from "@playwright/test";

export class Teachers extends BasePage {
    private readonly teacherCard1: Locator;
    private readonly teacherCard2: Locator;
   // private readonly slider1: Locator;
    private readonly slider2: Locator;

    constructor(page: Page) {
        super(page);
        this.teacherCard1 = page.locator('//div[@data-index="0"]');
        this.teacherCard2 = page.locator('//div[@data-index="1"]');
        this.slider2 = page.locator('//div[contains(@class, "styled__Root-hmLjco")]//button[contains(@class, "styled__Root-eEBHAS")][2]');
    }

    async isTeacherCard1() {
        
        await this.teacherCard1.nth(0).isVisible({timeout:5000});
        return this.teacherCard1;
    }

    async isTeacherCard2() {
        await this.teacherCard1.nth(1).isVisible({timeout:5000});
        return this.teacherCard2;
    }


    async clickSlider2() {
      
        await this.slider2.click();
    }
}

// Блок учителей