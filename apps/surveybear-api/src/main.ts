import { connect } from '@surveybear/surveybear-lib';
import app from './app';
import * as Sentry from '@sentry/node'


Sentry.init({
  dsn: "https://17205c38a4294b0481a5a2b71e2fea62@o4505385336045568.ingest.sentry.io/4505385466265600",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const port = process.env.PORT || 3333;


//SENTRY
const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    throw Error('Något är fel :o')
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);


//port
try {
  connect().then(() => {
    const server = app.listen(port, () => {
      console.log('running in test branch');
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', () => console.log('error'));
  })
} catch (e) {
  console.log('error');
  throw e;
}
