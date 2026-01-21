const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// 1. إعدادات الدخول للجدول (بياناتك جاهزة)
const serviceAccountAuth = new JWT({
  email: 'alqurmani-bot@alqurmani-x.iam.gserviceaccount.com',
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCbkcwggZjAgEAAoIBAQC78fGk0Q1l7vWq\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w9zX2Y5G6zR5k6k8w\n-----END PRIVATE KEY-----\n", 
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('1TFK2GIOvYguI5-lxicQHueeQ7DOzP_bZtsbf6pbcmlc', serviceAccountAuth);

async function startSystem() {
    try {
        console.log("🚀 جاري الاتصال بالجدول لتسجيل البيانات...");
        
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        
        // إضافة السطر في الجدول (مباشرة في أول 4 أعمدة)
        await sheet.addRow([
            new Date().toLocaleString('ar-EG'), 
            "201027834695", // الرقم الحالي
            "تم التشغيل بنجاح (بدون رسالة قصيرة)", 
            "النظام متصل بالكامل وجاهز للعمل"
        ]);

        console.log("✅ مبروك يا إمبراطور! افتح الجدول الآن ستجد السطر ظهر.");
    } catch (e) {
        console.error("❌ عطل في الجدول:", e.message);
    }
}

startSystem();
