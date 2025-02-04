const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./testHelper')

describe('Note app', () => {
    beforeEach(async({ page, request }) => {
        await request.post(process.env.RESET_API)
        await request.post(process.env.USERS_API, {
            data: {
                name: 'Tester',
                username: process.env.TEST_USER,
                password: process.env.TEST_USER_PWD
            }
        })

        await page.goto('/')
    })

    test('front page can be opened', async({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
    })

    test('login form can be opened', async({ page }) => {
        await loginWith(page, process.env.TEST_USER, process.env.TEST_USER_PWD)
        /*
        await page.getByRole('textbox').first().fill('username')
        await page.getByRole('textbox').last().fill('password')
        Or when multiple textboxes:
        const textboxes = await page.getByRole('textbox').all()

        await textboxes[0].fill('username')
        await textboxes[1].fill('password')
        */
        //Use the 'data-testid' id from id-attribute
        

        await expect(page.getByText('Tester logged in')).toBeVisible()
    })

    test('login fails with wrong credentials', async({ page }) => {
        await loginWith(page, 'NotValidUsername', 'NotValidPassword')

        await expect(page.getByText('wrong credentials')).toBeVisible()

        //Using css
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, process.env.TEST_USER, process.env.TEST_USER_PWD)
        })
      
        test('a new note can be created', async ({ page }) => {
        await createNote(page, 'a note created by playwright')
        await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('created notes exists', () => {
            beforeEach(async({ page }) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
            })

            test('importance can be changed', async({ page}) => {
                await page.pause()

                const secondNote        = await page.getByText('second note')
                const secondNoteElement = await secondNote.locator('..')

                await secondNoteElement.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })
        /*
        describe('and several notes exists', () => {
            beforeEach(async ({ page }) => {
              await createNote(page, 'first note', true)
              await createNote(page, 'second note', true)
            })
        
            test('one of those can be made nonimportant', async ({ page }) => {
              const otherNoteElement = await page.getByText('first note')
        
              await otherNoteElement
                .getByRole('button', { name: 'make not important' }).click()
              await expect(otherNoteElement.getByText('make important')).toBeVisible()
            })
        })
        */
    })
})
