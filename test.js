const { chromium } = require('playwright');
const path = require('path');

async function testWebsite() {
    console.log('Starting Apex Trailers website test...\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const errors = [];
    
    // Collect console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(`Console Error: ${msg.text()}`);
        }
    });
    
    page.on('pageerror', error => {
        errors.push(`Page Error: ${error.message}`);
    });
    
    const basePath = path.dirname(__filename);
    
    const pagesToTest = [
        { name: 'Home Page', file: 'index.html' },
        { name: 'Chillers Page', file: 'chillers.html' },
        { name: 'Single Axle Chiller', file: 'single-axle-chiller.html' },
        { name: 'Double Axle Chiller', file: 'double-axle-chiller.html' },
        { name: 'Freezers Page', file: 'freezers.html' },
        { name: 'Single Axle Freezer', file: 'single-axle-freezer.html' },
        { name: 'Double Axle Freezer', file: 'double-axle-freezer.html' },
        { name: 'About Page', file: 'about.html' },
        { name: 'Contact Page', file: 'contact.html' }
    ];
    
    let passedTests = 0;
    let failedTests = 0;
    
    for (const pageInfo of pagesToTest) {
        try {
            console.log(`Testing: ${pageInfo.name}`);
            
            const filePath = `file://${basePath}/${pageInfo.file}`;
            await page.goto(filePath, { waitUntil: 'networkidle' });
            
            // Check if page loaded successfully
            const title = await page.title();
            console.log(`  ✓ Title: ${title}`);
            
            // Check if key elements exist
            const header = await page.$('.header');
            const footer = await page.$('.footer');
            
            if (header) {
                console.log('  ✓ Header found');
            } else {
                errors.push(`${pageInfo.name}: Header not found`);
            }
            
            if (footer) {
                console.log('  ✓ Footer found');
            } else {
                errors.push(`${pageInfo.name}: Footer not found`);
            }
            
            // Check for navigation
            const navMenu = await page.$('.nav-menu');
            if (navMenu) {
                console.log('  ✓ Navigation menu found');
            } else {
                errors.push(`${pageInfo.name}: Navigation menu not found`);
            }
            
            console.log(`  ✓ ${pageInfo.name} loaded successfully\n`);
            passedTests++;
            
        } catch (error) {
            console.log(`  ✗ ${pageInfo.name} failed: ${error.message}\n`);
            errors.push(`${pageInfo.name}: ${error.message}`);
            failedTests++;
        }
    }
    
    // Test CSS file
    console.log('Testing CSS file...');
    try {
        const cssPath = `file://${basePath}/css/styles.css`;
        await page.goto(cssPath, { waitUntil: 'networkidle' });
        const cssContent = await page.content();
        if (cssContent.length > 100) {
            console.log('  ✓ CSS file accessible\n');
            passedTests++;
        } else {
            errors.push('CSS file appears to be empty or too small');
            failedTests++;
        }
    } catch (error) {
        console.log(`  ✗ CSS test failed: ${error.message}\n`);
        errors.push(`CSS Error: ${error.message}`);
        failedTests++;
    }
    
    // Test JavaScript file
    console.log('Testing JavaScript file...');
    try {
        const jsPath = `file://${basePath}/js/script.js`;
        await page.goto(jsPath, { waitUntil: 'networkidle' });
        const jsContent = await page.content();
        if (jsContent.length > 100) {
            console.log('  ✓ JavaScript file accessible\n');
            passedTests++;
        } else {
            errors.push('JavaScript file appears to be empty or too small');
            failedTests++;
        }
    } catch (error) {
        console.log(`  ✗ JavaScript test failed: ${error.message}\n`);
        errors.push(`JavaScript Error: ${error.message}`);
        failedTests++;
    }
    
    await browser.close();
    
    // Print results
    console.log('═'.repeat(50));
    console.log('TEST RESULTS');
    console.log('═'.repeat(50));
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Total:  ${passedTests + failedTests}`);
    console.log('═'.repeat(50));
    
    if (errors.length > 0) {
        console.log('\nERRORS FOUND:');
        console.log('-'.repeat(50));
        errors.forEach(error => console.log(`  • ${error}`));
        console.log('-'.repeat(50));
        process.exit(1);
    } else {
        console.log('\n✓ All tests passed! Website is working correctly.');
        process.exit(0);
    }
}

testWebsite().catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
});
