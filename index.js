const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. بيانات Vonage
const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

// 2. بيانات Google Sheets
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

async function startSystem() {
    try {
        console.log("🚀 محاولة التنفيذ الإمبراطوري...");
        
        // إرسال SMS
        await vonage.sms.send({
            to: "201027834695", 
            from: "AlqurmaniX", 
            text: "مبروك يا إمبراطور! النظام يعمل والجدول يتحدث الآن! 👑"
        });
        
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        
        // تعديل جوهري: الكتابة في الخانات مباشرة بدون الاعتماد على العناوين
        await sheet.addRow([
            new Date().toLocaleString('ar-EG'), // في الخانة A
            "201027834695",                     // في الخانة B
            "تشغيل الفاتيكان ناجح",            // في الخانة C
            "النظام متصل مئة بالمئة"            // في الخانة D
        ]);
        
        console.log("✅ العملية تمت بنجاح ساحق!");
    } catch (e) {
        console.error("❌ الخطأ هو:", e.message);
    }
}

startSystem();
