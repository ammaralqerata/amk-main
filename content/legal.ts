import type { Locale } from "@/i18n/routing";

// Privacy policy and terms for AMK Publisher, the private tool that posts our own videos to our own
// Instagram and YouTube accounts. Google and Meta link to these pages from their consent screens.

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const CONTACT = "ammaralqerata@gmail.com";

export const PRIVACY: Record<Locale, LegalDoc> = {
  ar: {
    metaTitle: "سياسة الخصوصية",
    metaDescription: "كيف تتعامل أداة AMK Publisher مع بيانات حسابات يوتيوب وإنستغرام المربوطة بها.",
    eyebrow: "قانوني",
    title: "سياسة الخصوصية",
    intro:
      "توضّح هذه الصفحة كيف تتعامل أداة «AMK Publisher» مع البيانات. الأداة داخلية يستخدمها عمّار القيراطه فقط لنشر فيديوهاته على حساباته وقنواته الخاصة على يوتيوب وإنستغرام، ولا تُقدَّم كخدمة لأي شخص آخر.",
    updated: "آخر تحديث: 31 تشرين الأول 2026",
    sections: [
      {
        heading: "البيانات التي نصل إليها",
        body: [
          "يوتيوب (عبر YouTube API Services): اسم القناة ومعرّفها وعدد مشتركيها وفيديوهاتها، وصلاحية رفع فيديوهات جديدة إلى القناة.",
          "إنستغرام (عبر Instagram API من Meta): اسم المستخدم وعدد المتابعين والمنشورات، وصلاحية نشر ريلز ومنشورات على الحساب.",
          "لا نصل إلى بيانات المشاهدين أو المتابعين، ولا إلى الرسائل الخاصة أو كلمات المرور.",
        ],
      },
      {
        heading: "كيف نستخدمها",
        body: [
          "نستخدم هذه الصلاحيات فقط لرفع الفيديوهات التي يجهّزها صاحب القناة، مع عنوانها ووصفها، وللتأكد من أن الربط ما زال يعمل.",
          "لا نستخدم البيانات للإعلانات أو التحليل أو بيعها أو تدريب أي نموذج ذكاء اصطناعي.",
        ],
      },
      {
        heading: "التخزين والحماية",
        body: [
          "رموز الوصول التي تعطيها Google وMeta تُحفظ على جهاز صاحب الأداة فقط، ولا تُرفع إلى أي خادم أو قاعدة بيانات خارجية.",
          "الفيديوهات تُرسل مباشرة من الجهاز إلى يوتيوب وإنستغرام، ولا نحتفظ بنسخة منها في أي مكان آخر.",
        ],
      },
      {
        heading: "المشاركة",
        body: ["لا نشارك أي بيانات مع أي طرف ثالث. البيانات تنتقل فقط بين جهاز صاحب الأداة وGoogle وMeta."],
      },
      {
        heading: "سحب الصلاحية وحذف البيانات",
        body: [
          "يمكن سحب صلاحية الأداة في أي وقت من إعدادات حساب Google: https://myaccount.google.com/permissions ومن إنستغرام: الإعدادات ← التطبيقات والمواقع الإلكترونية.",
          `عند سحب الصلاحية أو طلب الحذف عبر ${CONTACT} نحذف الرموز المحفوظة خلال 7 أيام.`,
        ],
      },
      {
        heading: "خدمات Google وYouTube",
        body: [
          "تستخدم الأداة YouTube API Services. باستخدامها فإنك توافق على شروط خدمة يوتيوب: https://www.youtube.com/t/terms",
          "وتنطبق سياسة خصوصية Google: https://policies.google.com/privacy",
          "استخدام الأداة للمعلومات التي تصلها من Google API يلتزم بسياسة بيانات المستخدم لخدمات Google API، بما فيها شروط الاستخدام المحدود (Limited Use).",
        ],
      },
      { heading: "التواصل", body: [`لأي سؤال عن الخصوصية: ${CONTACT}`] },
    ],
  },
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: "How the AMK Publisher tool handles data from the YouTube and Instagram accounts connected to it.",
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro:
      "This page explains how “AMK Publisher” handles data. AMK Publisher is an internal tool used only by Ammar Kerata to publish his own videos to his own YouTube channels and Instagram accounts. It is not offered as a service to anyone else.",
    updated: "Last updated: October 31, 2026",
    sections: [
      {
        heading: "Data we access",
        body: [
          "YouTube (through YouTube API Services): the channel name, ID, subscriber and video counts, and permission to upload new videos to that channel.",
          "Instagram (through Meta’s Instagram API): the username, follower and post counts, and permission to publish Reels and posts to that account.",
          "We do not access viewers’ or followers’ data, private messages, or passwords.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "These permissions are used only to upload videos prepared by the account owner, with their title and description, and to check that the connection still works.",
          "We do not use the data for advertising or analytics, we do not sell it, and we do not use it to train any AI model.",
        ],
      },
      {
        heading: "Storage and security",
        body: [
          "Access tokens issued by Google and Meta are stored only on the tool owner’s own computer. They are never uploaded to any server or external database.",
          "Videos are sent directly from that computer to YouTube and Instagram. We keep no copy anywhere else.",
        ],
      },
      {
        heading: "Sharing",
        body: ["We do not share any data with third parties. Data only moves between the tool owner’s computer, Google and Meta."],
      },
      {
        heading: "Revoking access and deleting data",
        body: [
          "You can revoke the tool’s access at any time from your Google Account at https://myaccount.google.com/permissions and on Instagram under Settings → Apps and websites.",
          `After access is revoked, or on a deletion request to ${CONTACT}, stored tokens are deleted within 7 days.`,
        ],
      },
      {
        heading: "Google and YouTube services",
        body: [
          "The tool uses YouTube API Services. By using it you agree to the YouTube Terms of Service: https://www.youtube.com/t/terms",
          "The Google Privacy Policy applies: https://policies.google.com/privacy",
          "AMK Publisher’s use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
        ],
      },
      { heading: "Contact", body: [`Privacy questions: ${CONTACT}`] },
    ],
  },
};

export const TERMS: Record<Locale, LegalDoc> = {
  ar: {
    metaTitle: "شروط الاستخدام",
    metaDescription: "شروط استخدام موقع عمّار القيراطه وأداة النشر AMK Publisher.",
    eyebrow: "قانوني",
    title: "شروط الاستخدام",
    intro: "باستخدامك لهذا الموقع أو لأداة «AMK Publisher» فإنك توافق على هذه الشروط.",
    updated: "آخر تحديث: 31 تشرين الأول 2026",
    sections: [
      {
        heading: "الموقع",
        body: [
          "المحتوى المعروض هنا من فيديوهات وتصاميم وإضافات هو من أعمال عمّار القيراطه، ولا يجوز إعادة نشره كعمل خاص بك دون إذن.",
          "الإضافات المجانية تُقدَّم كما هي، دون أي ضمان.",
        ],
      },
      {
        heading: "أداة AMK Publisher",
        body: [
          "أداة داخلية لنشر فيديوهات صاحبها على قنواته وحساباته فقط، وليست خدمة عامة.",
          "يلتزم استخدامها بشروط خدمة يوتيوب (https://www.youtube.com/t/terms) وشروط منصة Meta.",
          "صاحب الحساب مسؤول عن المحتوى الذي ينشره عبر الأداة.",
        ],
      },
      { heading: "التواصل", body: [`لأي سؤال: ${CONTACT}`] },
    ],
  },
  en: {
    metaTitle: "Terms of Service",
    metaDescription: "Terms of use for Ammar Kerata’s website and the AMK Publisher tool.",
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "By using this website or the “AMK Publisher” tool you agree to these terms.",
    updated: "Last updated: October 31, 2026",
    sections: [
      {
        heading: "The website",
        body: [
          "The videos, designs and plugins shown here are the work of Ammar Kerata and may not be republished as your own without permission.",
          "Free plugins are provided as is, without any warranty.",
        ],
      },
      {
        heading: "AMK Publisher",
        body: [
          "An internal tool that publishes its owner’s videos to the owner’s own channels and accounts only. It is not a public service.",
          "Its use follows the YouTube Terms of Service (https://www.youtube.com/t/terms) and Meta’s Platform Terms.",
          "The account owner is responsible for the content published through the tool.",
        ],
      },
      { heading: "Contact", body: [`Questions: ${CONTACT}`] },
    ],
  },
};
