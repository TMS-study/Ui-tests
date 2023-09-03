
import BasePage from "./base.page";
import { Locator, Page } from "@playwright/test";


export class StudyBegin extends BasePage {
    private readonly nameParent: Locator;
    private readonly phoneParent: Locator;
    private readonly emailParent: Locator;
   
    private readonly requestAgreement: Locator;
    private readonly buttonBid: Locator;
    private readonly linkTermsAgreementt: Locator;
    private readonly linkPersonalData: Locator;
    private readonly linkPrivacyPolicies: Locator;
    private readonly errorEmail: Locator;
    private readonly happyState: Locator;
    private readonly selectArrow: Locator;
    private readonly callMe: Locator;
    private readonly writeMeEmail: Locator;
    private readonly writeMeMessenger: Locator;
    private readonly choosedClass: Locator;


    constructor(page: Page) {
        super(page);
        this.nameParent = page.locator('//input[@placeholder = "Имя и фамилия родителя"]');
        this.phoneParent = page.locator('//input[@placeholder = "Телефон родителя"]');
        this.emailParent = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//input[@placeholder="Электронная почта"]');
        this.selectArrow = page.locator('//span[@class="Select-arrow-zone"]');
        this.requestAgreement = page.locator('form').filter({ hasText: 'Класс ученикаУдобный способ общенияПринимаю условия соглашения и даю согласие на' }).locator('g rect')
        this.buttonBid = page.getByText('Оставить заявку');
        this.linkTermsAgreementt = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "условия соглашения")]');
        this.linkPersonalData = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "согласие на обработку")]');
        this.linkPrivacyPolicies = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "политики конфиденциальности")]');
        this.errorEmail = page.locator('//form[contains(@class, "styled__Form-cNRRKJ")]//*[contains(text(), "Введите почту")]')
        this.happyState = page.locator('//div[@data-qa="request_Styled.Success"]');
        this.callMe = page.getByLabel('Позвоните мне');
        this.writeMeEmail = page.getByLabel('Напишите мне письмо');
        this.writeMeMessenger = page.getByLabel('Напишите мне в WhatsApp или Telegram');
        this.choosedClass = page.locator('//span[@class="Select-value-label"]');
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

    async selectClasses(classNames: string[]) {
        for (const className of classNames) {
            await this.selectArrow.first().click();
            await this.page.getByLabel(className).click();
        }
        return true
    }

    async chooseVisible() {
        const classNum = await this.choosedClass.isVisible()
        return classNum;
    }

    async chooseMethodTreatment() {
        const methods = [this.callMe, this.writeMeEmail, this.writeMeMessenger];
        for (const method of methods) {
            await this.selectArrow.last().click();
            await method.click();
        }
        return true;
    }

    async chooseRequestAgreement() {
        const check = await this.requestAgreement
        return check;
    }

    async clickLinkTermsAgreementt() {
        await this.linkTermsAgreementt.click();
    };


    async clickLinkPersonalData() {
        await this.linkPersonalData.click();
    };

    async clickLinkPrivacyPolicies() {
        await this.linkPrivacyPolicies.click();
    };

    async isHappyState() {
        const happyState = await this.happyState.isVisible();
        //console.log('isHappyState:', happyState); // Добавьте этот вывод
        return happyState;
    }

    async clickButtonBid() {
        const but = await this.buttonBid.click();
        //console.log('clickButtonBid'); // Добавьте этот вывод
        return but
    };
}
