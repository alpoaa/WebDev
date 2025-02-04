# Testing is done with using the Playwright
# Couple of useful scripts:
# Initialize Playwright:
npm init playwright@latest

# Run tests (can use script straight, check package.json):
playwright test

# Run test report (can use script straight, check package.json):
playwright show-report

# Run specific test with debug mode:
npm test -- -g 'testname' --debug

# Run specific test:
npm test -- -g 'testname'

# Run test generator locally:
npx playwright codegen http://localhost:5173/

# Run tests with ui (can use script straight, check package.json):
npm run test -- --ui

# Run tests with trace viewer (can use script straight, check package.json):
npm run test -- --trace on

# Check the after it's runned:
npx playwright show-report