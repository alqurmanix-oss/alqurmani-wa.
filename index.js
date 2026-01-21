const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. إعدادات إرسال الرسائل (بياناتك جاهزة)
const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

// 2. مفتاح الدخول لجدول جوجل (مدمج بالكامل)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

// 3. أمر تنفيذ الإرسال والتسجيل في الجدول
async function startSystem() {
    try {
        console.log("🚀 جاري البدء...");
        
        // إرسال SMS لرقمك
        await vonage.sms.send({
            to: "201027834695", 
            from: "AlqurmaniX", 
            text: "نظام القرماني إكس يعمل الآن بنجاح! 👑"
        });
        
        // الكتابة في الجدول
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            'الرقم': "201027834695",
            'التوقيت': new Date().toLocaleString('ar-EG'),
            'الحالة': "تم التشغيل بنجاح"
        });
        
        console.log("✅ اكتملت العملية بنجاح!");
    } catch (e) {
        console.error("❌ خطأ:", e.message);
    }
}

startSystem();
