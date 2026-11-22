import asyncio
from playwright.async_api import async_playwright
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1080,'height':1920})
        await pg.goto('file://'+__import__('os').getcwd()+'/cover.html'); await pg.wait_for_timeout(800)
        await pg.screenshot(path='cover.png'); await b.close()
asyncio.run(m())
