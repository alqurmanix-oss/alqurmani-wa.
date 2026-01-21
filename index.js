const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. مفاتيح الإمبراطورية
const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

// 2. إعدادات المخزن (الـ 20 بند)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

// 3. أمر التشغيل الآلي
async function startOperation(phone, message, amount) {
    try {
        console.log("🚀 جاري إرسال الرسالة وتسجيل البيانات...");
        await vonage.sms.send({to: phone, from: "AlqurmaniX", text: message});
        
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            'Timestamp': new Date().toLocaleString('ar-EG'),
            'Phone_Number': phone,
            'Action_Type': 'SMS',
            'Payment_Amount': amount,
            'Message_Content': message,
            'Subscription_Status': 'Active',
            'Security_Level': 'Green'
        });
        console.log("✅ تمت بنجاح! راقب الجدول الآن يا إمبراطور.");
    } catch (e) {
        console.error("❌ حدث خطأ:", e);
    }
}

// تنفيذ التجربة فوراً على رقمك
startOperation('201027834695', 'مرحباً بك يا إمبراطور القرماني.. النظام الآن تحت سيطرتك 👑', '0');
