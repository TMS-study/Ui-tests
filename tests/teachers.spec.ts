import BasePage from "../page/base.page";
import { test, expect } from "@playwright/test";
import { Teachers } from "../page/teachers.page";

test.describe('', () => {
    
    let teach: Teachers;
    let open: BasePage;
    let moveCard1;
    let moveCard2;
    let isActive;
    let clickSlider2;

    test.beforeEach(async ({ page }) => {
        open = new BasePage(page);
        await open.openPage();
        teach = new Teachers(page);
    });
    test('Teachers card is enabled', async () => {
        isActive = 'false';
        moveCard1 = await teach.isTeacherCard1();
        expect(await moveCard1.getAttribute('aria-hidden')).toContain(isActive);
    });

    test('Scroll teacher with the mouse', async () => {
        isActive = 'false';
        moveCard1 = await teach.isTeacherCard1();
        moveCard2 = await teach.isTeacherCard2();
        await moveCard1.dispatchEvent('mousedown');
        await moveCard1.dispatchEvent('mousemove', { x: -100, y: 0 });
        await moveCard1.dispatchEvent('mouseup');
        expect(await moveCard2.getAttribute('aria-hidden')).toContain(isActive);
    });

    test('Scroll teacher with the mouse slider', async () => {
        isActive = 'false';
        clickSlider2 = await teach.clickSlider2();
        moveCard2 = await teach.isTeacherCard2();
        expect(await moveCard2.getAttribute('aria-hidden')).toContain(isActive);
    });
});

