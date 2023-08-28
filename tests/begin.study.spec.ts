import BasePage from "../page/base.page";
import { test, expect } from "@playwright/test";
import { StudyBegin } from "../page/study.begin.page";


test.describe('', () => {

    let startLearn: StudyBegin;
    let open: BasePage;
    let name;
    let phone;
    let email;
    let check: any;
    let fieldClass;
    let fieldTerms;

    test.beforeEach(async ({ page }) => {
        open = new BasePage(page);
        await open.openPage();
        startLearn = new StudyBegin(page);
    });


    test('Submit an bid for admission', async ({ page }) => {
        name = await startLearn.inputNameParent('Иван Иванов');
        phone = await startLearn.inputPhoneParent('89211222323');
        email = await startLearn.inputEmailParent('test@mail.ru');

        fieldClass = await startLearn.chooseClassStudent();
        for (let i = 0; i < fieldClass.length; i++) {
            const isEnabled = fieldClass[i];
            if (isEnabled) {
                const button = await startLearn.classStudent.first();
                await button.click();
            }
        }

        fieldTerms = await startLearn.chooseClassStudent();
        for (let i = 0; i < fieldTerms.length; i++) {
            const isEnabled = fieldTerms[i];
            if (isEnabled) {
                const button = await startLearn.classStudent.first();
                await button.click();
            }
        }

        if (name && phone && email && fieldClass && fieldTerms && check) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).toBe(happy);
        }
        else if (name && phone && email && fieldClass && check) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).toBe(happy);
        }
        else if (name && phone && email && fieldClass && fieldTerms) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).not.toBe(happy);
        }
        else if (name && phone && email && fieldTerms && check) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).not.toBe(happy);
        }
        else if (name && phone && fieldClass && fieldTerms && check) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).not.toBe(happy);
        }
        else if (name && email && fieldClass && fieldTerms && check) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).not.toBe(happy);
        }
        else if (phone && email && fieldClass && fieldTerms && check) {
            let bid: any = await startLearn.clickButtonBid();
            let happy = await startLearn.isHappyState();
            expect(bid).not.toBe(happy);
        }

    });
    test('Fill in the parent first and last name', async () => {
        name = await startLearn.inputNameParent('Иван Иванов');
        expect(name).toBe('Иван Иванов');
        name = await startLearn.inputNameParent('Иван');
        expect(name).toBe('Иван');
        name = await startLearn.inputNameParent('Иванов');
        expect(name).toBe('Иванов');
    });

    test('Fill in the parent phone number', async () => {
        phone = await startLearn.inputPhoneParent('89211222323');
        expect(phone).not.toBe(null);
        phone = await startLearn.inputPhoneParent('8921122232333');
        expect(phone).toBe('89211222323');
        phone = await startLearn.inputPhoneParent('7921122232333');
        expect(phone).toBe('79211222323')
        phone = await startLearn.inputPhoneParent('55555555555555555555');
        expect(phone).toBe('55555555555555555555');
        phone = await startLearn.inputPhoneParent('5555555555555555555521');
        expect(phone).toBe('55555555555555555555')
    });

    test('Fill in the parent email', async () => {
        email = await startLearn.inputEmailParent('test@mail.ru');
        expect(email).toBe('test@mail.ru');
        const errorMessageVisible = await startLearn.inputEmailParent('testmail.ru');
        expect(errorMessageVisible).toBeTruthy();
    });

    test('Select class student', async () => {

        const isActive = 'is-open';
        fieldClass = await startLearn.chooseClassStudent();

        for (let i = 0; i < fieldClass.length; i++) {
            const isEnabled = fieldClass[i];
            await expect(isEnabled).toBeTruthy();

            if (isEnabled) {
                const buttons = await startLearn.classStudent.all();
                const button = buttons[i];

                await button.click();
                await expect(await button.getAttribute('class')).toContain(isActive);
            }
        }

    });

    test('Selecet Method Treatment', async () => {
        const isActive = 'is-open';
        fieldTerms = await startLearn.chooseClassStudent();

        for (let i = 0; i < fieldTerms.length; i++) {
            const isEnabled = fieldTerms[i];
            await expect(isEnabled).toBeTruthy();

            if (isEnabled) {
                const buttons = await startLearn.classStudent.all();
                const button = buttons[i];

                await button.click();
                await expect(await button.getAttribute('class')).toContain(isActive);
            }
        }
    });

    test('Check if Request Agreement checkbox is selected', async ({ page }) => {
        check = await startLearn.chooseRequestAgreement();
        await check.check();
        expect(check).toBeChecked()
    });



    test('Open link Request Agreemen', async ({ page }) => {
        await startLearn.clickLinkTermsAgreementt();
        const newPage = await page.waitForEvent('popup');
        expect(newPage.url()).toContain('legal/general');

        await startLearn.clickLinkPersonalData();
        const newPage1 = await page.waitForEvent('popup');
        expect(newPage1.url()).toContain('consent');

        await startLearn.clickLinkPrivacyPolicies();
        const newPage2 = await page.waitForEvent('popup');
        expect(newPage2.url()).toContain('legal/policy');

    }); 
})