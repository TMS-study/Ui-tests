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
    let classNames;
    let fieldTerms;
    let isSelected: boolean;

    test.beforeEach(async ({ page }) => {
        open = new BasePage(page);
        await open.openPage();
        startLearn = new StudyBegin(page);
    });


    test('Check the Bid if all fields are filled in', async () => {

        check = await startLearn.chooseRequestAgreement();
        await check.check();

        name = await startLearn.inputNameParent('Иван Иванов');
        phone = await startLearn.inputPhoneParent('89211222323');
        email = await startLearn.inputEmailParent('test@mail.ru');

        classNames = ['11 класс'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();

        fieldTerms = await startLearn.chooseMethodTreatment();

        const conditions = name && phone && email && isSelected && fieldTerms && check;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).toBeTruthy();
    });

    test('Check the Bid if all fields are filled in except Method Treatment', async () => {

        check = await startLearn.chooseRequestAgreement();
        await check.check();

        name = await startLearn.inputNameParent('Иван Иванов');
        phone = await startLearn.inputPhoneParent('89211222323');
        email = await startLearn.inputEmailParent('test@mail.ru');

        classNames = ['11 класс'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();

        const conditions = name && phone && email && isSelected && check;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).toBeTruthy();
    });


    test('Check the Bid if all fields are filled in expect Request Agreement', async () => {

        name = await startLearn.inputNameParent('Иван Иванов');
        phone = await startLearn.inputPhoneParent('89211222323');
        email = await startLearn.inputEmailParent('test@mail.ru');

        classNames = ['11 класс'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();

        fieldTerms = await startLearn.chooseMethodTreatment();

        const conditions = name && phone && email && isSelected && fieldTerms;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).not.toBe(true);
    });

    test('Check the Bid if all fields are filled in expect Class', async () => {

        check = await startLearn.chooseRequestAgreement();
        await check.check();

        name = await startLearn.inputNameParent('Иван Иванов');
        phone = await startLearn.inputPhoneParent('89211222323');
        email = await startLearn.inputEmailParent('test@mail.ru');

        fieldTerms = await startLearn.chooseMethodTreatment();

        const conditions = name && phone && email && fieldTerms && check;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).not.toBe(true);
    });
 
    test('Check the Bid if all fields are filled in expect Email', async () => {

        check = await startLearn.chooseRequestAgreement();
        await check.check();

        name = await startLearn.inputNameParent('Иван Иванов');
        phone = await startLearn.inputPhoneParent('89211222323');

        classNames = ['11 класс'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();

        fieldTerms = await startLearn.chooseMethodTreatment();

        const conditions = name && phone && isSelected && fieldTerms && check;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).not.toBe(true);
    });

    test('Check the Bid if all fields are filled in expect Phone', async () => {

        check = await startLearn.chooseRequestAgreement();
        await check.check();

        name = await startLearn.inputNameParent('Иван Иванов');
        email = await startLearn.inputEmailParent('test@mail.ru');

        classNames = ['11 класс'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();

        fieldTerms = await startLearn.chooseMethodTreatment();

        const conditions = name && email && isSelected && fieldTerms && check;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).not.toBe(true);
    });
   
    test('Check the Bid if all fields are filled in expect Name', async () => {

        check = await startLearn.chooseRequestAgreement();
        await check.check();

        email = await startLearn.inputEmailParent('test@mail.ru');
        phone = await startLearn.inputPhoneParent('89211222323');

        classNames = ['11 класс'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();

        fieldTerms = await startLearn.chooseMethodTreatment();

        const conditions =  phone && email && isSelected && fieldTerms && check;
        expect(conditions).toBeTruthy();
        let bid = await startLearn.clickButtonBid();
        await expect(startLearn.isHappyState()).not.toBe(true);
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
        classNames = ['11 класс', '10 класс', '9 класс', '8 класс', '7 класс', '6 класс', '5 класс', '4 класс', '3 класс', '2 класс', 'Дошкольник'];
        await startLearn.selectClasses(classNames);
        isSelected = await startLearn.chooseVisible();
        expect(isSelected).toBeTruthy();
    });

    test('Selecet Method Treatment', async () => {
        fieldTerms = await startLearn.chooseMethodTreatment();
        expect(fieldTerms).toBeTruthy()
    });

    test('Check if Request Agreement checkbox is selected', async () => {
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

    test('test1', async () => {
        const a = await startLearn.chooseMethodTreatment()
        expect(a).toBeTruthy();

    });
})


