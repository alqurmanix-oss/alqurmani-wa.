const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. مفاتيح Vonage (المحرك)
const vonage = new Vonage({
  apiKey: "709289da", // الـ Key بتاعك
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8" // الـ Secret بتاعك
});

// 2. إعدادات جوجل شيت (المخزن)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: 'هنا سنضع المفتاح السري لجوجل لاحقاً', 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('معرف_الجدول_الخاص_بك', serviceAccountAuth);

// وظيفة السيطرة الشاملة (إرسال وتسجيل)
async function executeOperation(phone, message, amount) {
    try {
        // إرسال SMS
        await vonage.sms.send({to: phone, from: "ALQURMANI", text: message});
        
        // تسجيل في الـ 20 بند
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            Timestamp: new Date().toLocaleString(),
            Phone_Number: phone,
            Action_Type: 'SMS',
            Payment_Amount: amount,
            Message_Content: message,
            Subscription_Status: 'Active',
            Security_Level: 'Green'
            // باقي الـ 20 بند سيتم تعبئتها آلياً
        });
        console.log("تمت العملية وتسجيل البيانات بنجاح!");
    } catch (e) { console.error("خطأ في العملية:", e); }
}

// تجربة التشغيل الأولى
executeOperation('رقمك_هنا', 'مرحباً بك في إمبراطورية القرماني إكس', '0');
