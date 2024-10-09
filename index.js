import { getPlatformProxy } from 'wrangler';

getPlatformProxy().then(proxy => console.log(proxy));

process.on('uncaughtException', error => {
  console.error('Oops! An uncaughtException occurred:', error);
})

process.on('unhandledRejection', error => {
  console.error('Oops! An unhandledRejection occurred:', error);
})

throw Error('This is an error');
