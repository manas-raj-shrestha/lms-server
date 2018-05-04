import FCM from 'fcm-node';

let serverKey =
  'AAAAYacP7RA:APA91bHNP8iTpdYP5U9ztDkADwFUzK_qQC3W2HhkMwoTI3RozwJCXzCh3dM9_WzcNS6-rc6uRD_ruMIBrS-ZmXDppRHJtAVtW3fXr6P71OF_hMrhCrqaEAqVs0naCBeMKvpy58FYFEBZ';
let fcm = new FCM(serverKey);

let message = {
  // this may vary according to the message type (single recipient, multicast, topic, et cetera)
  to:
    'fyWNL18XETk:APA91bESKIvWG21e0ki3pl7IIi6orcJ0NVGaghwSMV3I6xVczUsPWXfbcUQuK0H_1U2xJ-q9J8mQaORR0RstSe3f4wAlLbiGd0Yk2e288qKy_s5l9rhonEbIsc99Lf2eGPM2W8SlERMj',

  notification: {
    title: 'Title of your push notification',
    body: 'Body of your push notification'
  },

  data: {
    // you can send only notification or only data(or include both)
    my_key: 'my value',
    my_another_key: 'my another value'
  }
};

export default fcm;
