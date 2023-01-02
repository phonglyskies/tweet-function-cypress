describe('tweet function', () => {
  beforeEach(() => {
    cy.LoginAndGoToHome(
      Cypress.env('twitterUsername'),
      Cypress.env('twitterPassword')
    )
  })

  it('TW-1  Verify tweet function handles tweets with less than 280 characters and more than 0 character', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'tweet with in 0 to 279'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-2	Verify tweet function handles tweets with equal 280 characters', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character tweet with 280 character amaze'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-3	Verify tweet function handles tweets with more than 280 characters', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay tweet fn is okay"'
      )
      cy.get(el.tweetButton).should('have.attr', 'aria-disabled', 'true')
    })
  })
  it('TW-4	Verify tweet function handles tweets with special characters', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type('using special á / é')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-5	Verify tweet function handles tweets with hashtags', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type('#okay #hny ')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-6	Verify tweet function handles tweets with mentions', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        '@Twitter test mention!'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-7	Verify tweet function handles tweets with links', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'tweet with link, https://google.com'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-8	Verify tweet function handles tweets with a combination of hashtags, mentions, and links', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        '#okay #hny @Twitter test mention! tweet with link, https://google.com'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-9	Verify tweet function handles tweets with a combination of special characters and emoji', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        '😄😃😀 using special characters like á or é'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-10	Verify tweet function handles empty tweets', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetButton).should('have.attr', 'aria-disabled', 'true')
    })
  })
  it('TW-11	Verify tweet function handles tweets with only spaces', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(' ')
      cy.get(el.tweetButton).should('have.attr', 'aria-disabled', 'true')
    })
  })
  it('TW-12	Verify tweet function handles tweets with very long words', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Thequickbrownfoxjumpsoverthelazydog'
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-13	Verify tweet function handles tweets in multiple languages', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type('english ภาษาไทย')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-14	Verify tweet function handles tweet same context in recently', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type('same same')
      cy.get(el.tweetButton).click()
      cy.wait(3000)
      cy.get(el.tweetTextArea, { timeout: 100000 }).type('same same')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Whoops! You already said that.')
    })
  })
  it('TW-15	Verify tweet function handles tweets with media attachments; 1 image - PNG', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
        ],
        { force: true }
      )
      cy.wait(2000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-16	Verify tweet function handles tweets with media attachments; 4 images - PNG', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
        ],
        { force: true }
      )
      cy.wait(2000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-17	Verify tweet function handles tweets with media attachments; 5 images - PNG', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
        ],
        { force: true }
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Please choose either 1 GIF or up to 4 photos.')
    })
  })
  it('TW-18	Verify tweet function handles tweets with media attachments; 1 image - JPEG', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
        ],
        { force: true }
      )
      cy.wait(2000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-19	Verify tweet function handles tweets with media attachments; 4 images - JPEG', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
        ],
        { force: true }
      )
      cy.wait(2000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-20	Verify tweet function handles tweets with media attachments; 5 images - JPEG', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
          {
            contents: 'cypress/fixtures/img/j1.jpg',
          },
        ],
        { force: true }
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Please choose either 1 GIF or up to 4 photos.')
    })
  })
  it('TW-21	Verify tweet function handles tweets with media attachments; 1 image - GIF', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/g1.gif',
          },
        ],
        { force: true }
      )
      cy.wait(2000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-22	Verify tweet function handles tweets with media attachments; 4 images - GIF', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/g1.gif',
          },
          {
            contents: 'cypress/fixtures/img/g1.gif',
          },
          {
            contents: 'cypress/fixtures/img/g1.gif',
          },
          {
            contents: 'cypress/fixtures/img/g1.gif',
          },
        ],
        { force: true }
      )
      cy.wait(2000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Please choose either 1 GIF or up to 4 photos.')
    })
  })
  it.skip('TW-23	Verify tweet function handles tweets with media attachments; 1 video - MP4', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/v1.mp4',
          },
        ],
        { force: true }
      )
      cy.wait(10000)
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert, { timeout: 30000 })
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-24	Verify tweet function handles tweets with media attachments; 2 videos - MP4', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/v1.mp4',
          },
          {
            contents: 'cypress/fixtures/img/v1.mp4',
          },
        ],
        { force: true }
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Please choose either 1 GIF or up to 4 photos.')
    })
  })
  it('TW-25	Verify tweet function handles tweets with multiple image type attachments', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.mediaInput).selectFile(
        [
          {
            contents: 'cypress/fixtures/img/p1.png',
          },
          {
            contents: 'cypress/fixtures/img/v1.mp4',
          },
        ],
        { force: true }
      )
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Please choose either 1 GIF or up to 4 photos.')
    })
  })
  it('TW-26	Verify tweet function handles tweet polls with two options', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer? #OptionA or #OptionB?'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('OptionA')
      cy.get(el.poolChoice2).type('OptionB')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-27	Verify tweet function handles tweet polls with more than two options', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer?'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('OptionA')
      cy.get(el.poolChoice2).type('OptionB')
      cy.get(el.addMorePollChoice).click()
      cy.get(el.poolChoice3).type('OptionC')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-28	Verify tweet function handles tweet polls with empty options', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer? emp'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('OptionA')
      cy.get(el.tweetButton).should('have.attr', 'aria-disabled', 'true')
    })
  })
  it('TW-29	Verify tweet function handles tweet polls with options that are too long', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer? long'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('OptionAReallyLongLongLongLongLongLongLong  ')
      cy.get(el.poolChoice2).type('OptionB')
      cy.get(el.poolChoice1).should('have.value', 'OptionAReallyLongLongLong')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-30	Verify tweet function handles tweet polls with special characters in the options', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer? #óptionA  or #óptionB?'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('óptionA')
      cy.get(el.poolChoice2).type('óptionB')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-31	Verify tweet function handles tweet polls with a combination of special characters and emoji in the options', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer? 😄'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('😄OptionA')
      cy.get(el.poolChoice2).type('😄OptionB')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
  it('TW-32	Verify tweet function handles tweet polls in multiple languages', () => {
    cy.fixture('elements').then((el) => {
      cy.get(el.tweetTextArea, { timeout: 100000 }).type(
        'Which of these do you prefer? ไทย Option'
      )
      cy.get(el.pollIcon).click()
      cy.get(el.poolChoice1).type('ภาษาไทยOptionA')
      cy.get(el.poolChoice2).type('ภาษาไทยOptionB')
      cy.get(el.tweetButton).click()
      cy.get(el.toastAlert)
        .should('be.visible')
        .should('contain.text', 'Your Tweet was sent.')
    })
  })
})
