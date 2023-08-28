
import BasePage from "./base.page";
import { Locator, Page, test } from "@playwright/test";


export class StudyBegin extends BasePage {
    private readonly nameParent: Locator;
    private readonly phoneParent: Locator;
    private readonly emailParent: Locator;
    public readonly classStudent: Locator;
    private readonly methodTreatment: Locator;
    private readonly requestAgreement: Locator;
    private readonly buttonBid: Locator;
    private readonly linkTermsAgreementt: Locator;
    private readonly linkPersonalData: Locator;
    private readonly linkPrivacyPolicies: Locator;
    private readonly errorEmail: Locator;
    private readonly happyState: Locator;

    constructor(page: Page) {
        super(page);
        this.nameParent = page.locator('//input[@placeholder = "Имя и фамилия родителя"]');
        this.phoneParent = page.locator('//input[@placeholder = "Телефон родителя"]');
        this.emailParent = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//input[@placeholder="Электронная почта"]');
        this.classStudent = page.getByText('//form[contains(@class, "styled__Form-cNRRKJ")]//div[contains(@class, "Select--single")]');
        this.methodTreatment = page.getByText('//form[contains(@class, "styled__Form-cNRRKJ")]//div[contains(@class, "Select--single")]');
        this.requestAgreement = page.locator('form').filter({ hasText: 'Класс ученикаУдобный способ общенияПринимаю условия соглашения и даю согласие на' }).locator('g rect')
        this.buttonBid = page.getByText('Оставить заявку');
        this.linkTermsAgreementt = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "условия соглашения")]');
        this.linkPersonalData = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "согласие на обработку")]');
        this.linkPrivacyPolicies = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "политики конфиденциальности")]');
        this.errorEmail = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "Введите почту")]')
        this.happyState = page.locator('//div[@data-qa="request_Styled.Success"]');
    }


    async inputNameParent(name: string) {
        await this.nameParent.fill(name);
        const inputValue = await this.nameParent.inputValue();
        return inputValue;
    };

    async inputPhoneParent(phone: string) {
        await this.phoneParent.fill(phone);

        if ((phone.startsWith('7') || phone.startsWith('8')) && phone.length > 11) {
            phone = phone.slice(0, 11);
        } else if ((!phone.startsWith('7') && !phone.startsWith('8')) && phone.length > 20) {
            phone = phone.slice(0, 20);
        }
        return phone;
    }

    async inputEmailParent(email: string) {
        await this.emailParent.fill(email);
        if (!email.includes('@')) {
            await this.errorEmail.isVisible();
        }
        await this.emailParent.press('Enter');
        return email;
    };

    async chooseClassStudent() {
        const but = this.classStudent.first();
        const buttons = await but.all();
        const isEnabledArray = await Promise.all(buttons.map(async (button) => await button.isEnabled()));
        return isEnabledArray;
    }
    
    async chooseMethodTreatment() {
        const but = this.methodTreatment.last();
        const buttons = await but.all();
        const isEnabledArray = await Promise.all(buttons.map(async (button) => await button.isEnabled()));
        return isEnabledArray;
    };

    async chooseRequestAgreement() {
        const check = await this.requestAgreement
        return check;
    }


    async clickButtonBid() {
        this.buttonBid.click();
        return this.buttonBid;
    };


    async clickLinkTermsAgreementt() {
        this.linkTermsAgreementt.click();
    };


    async clickLinkPersonalData() {
        this.linkPersonalData.click();
    };

    async clickLinkPrivacyPolicies() {
        this.linkPrivacyPolicies.click();
    };

    async isHappyState() {
        this.happyState.isVisible()
        return this.happyState;
    }
}