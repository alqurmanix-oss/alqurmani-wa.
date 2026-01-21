const { Vonage } = require('@vonage/server-sdk');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const vonage = new Vonage({
  apiKey: "709289da",
  apiSecret: "qWoTUY4uppYZOwQEwvqKu07p9H7RZ8jCwdmo0ukDN4ypYygpn8"
});

const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

async function startSystem() {
    try {
        await vonage.sms.send({
            to: "201027834695", 
            from: "AlqurmaniX", 
            text: "تم الاتصال بنجاح! 👑"
        });
        
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        
        // إضافة البيانات بترتيب الأعمدة (A, B, C, D) مباشرة
        await sheet.addRow([
            new Date().toLocaleString('ar-EG'), 
            "201027834695", 
            "تم التفعيل", 
            "النظام جاهز للـ 10,000 خدمة"
        ]);
        console.log("✅ تم بنجاح!");
    } catch (e) {
        console.error("❌ خطأ:", e.message);
    }
}
startSystem();
