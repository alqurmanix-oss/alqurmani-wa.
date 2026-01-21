const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. بيانات الإرسال (جاهزة)
const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

// 2. بيانات الجدول (جاهزة بالمفتاح)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

async function startSystem() {
    try {
        console.log("🚀 جاري التنفيذ...");
        
        // إرسال SMS
        await vonage.sms.send({
            to: "201027834695", 
            from: "AlqurmaniX", 
            text: "تم تفعيل نظام القرماني بنجاح! 👑"
        });
        
        // الكتابة في الجدول (بناءً على الأعمدة اللي في صورتك)
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        
        // دي الخطوة اللي كانت بتعطل: بنجبره يكتب في أول 4 أعمدة مهما كانت أسماؤهم
        await sheet.addRow([
            new Date().toLocaleString('ar-EG'), // العمود الأول
            "201027834695",                     // العمود الثاني
            "تشغيل ناجح",                      // العمود الثالث
            "النظام متصل الآن"                  // العمود الرابع
        ]);
        
        console.log("✅ مبروك! السطر نزل والرسالة وصلت.");
    } catch (e) {
        console.error("❌ خطأ:", e.message);
    }
}

startSystem();
