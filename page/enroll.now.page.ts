import BasePage from "./base.page";
import { Locator, Page, test } from "@playwright/test";

export class EnrollNow extends BasePage {
    private readonly enrollNow: Locator;
    private readonly contactParent: Locator;

    constructor(page: Page) {
        super(page)
        this.enrollNow = page.getByText('Поступить сейчас');
        this.contactParent = page.getByText('Контактные данные родителя');
    }

    async clickEnrollNow() {
        await this.enrollNow.click();
    }

    async isContactParent() {
        await this.contactParent.isVisible();
    }
}

// Блок самостоятельного поступления