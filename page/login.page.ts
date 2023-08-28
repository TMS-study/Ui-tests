import BasePage from "./base.page";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {
    private readonly buttonEmail: Locator;
    private readonly fieldEmail: Locator;
    private readonly fieldPassword: Locator;
    private readonly buttonFurther: Locator;
    private readonly buttonEnter: Locator;
    private readonly dashboard: Locator;

    constructor(page: Page) {
        super(page);
        this.buttonEmail = page.locator('//button[@data-qa="__authEmailButton"]');
        this.fieldEmail = page.locator('#email');
        this.fieldPassword = page.locator('#password');
        this.buttonFurther = page.getByText("Далее");
        this.buttonEnter = page.locator('#foxNavLoginButton');
        this.dashboard = page.getByText('Задания на сегодня');
    }

    async clickEnter() {
        await this.buttonEnter.click(); 
    }
  
    
    async goLogin() {
        await this.buttonEmail.click()
        await this.fieldEmail.fill("test123@mail.ru");
        await this.fieldPassword.fill("123123");
        await this.buttonFurther.click();
    }


    async isLoggedIn() {
        const dashboardElement = await this.dashboard.first();
        return await dashboardElement.isVisible();
    }
}