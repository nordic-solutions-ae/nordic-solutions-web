import type { Locale } from '$lib/modules/i18n';

export type LegalDocumentKey = 'privacy' | 'terms';

export type LegalSection = {
	id: string;
	heading: string;
	paragraphs: string[];
	bullets?: string[];
};

export type LegalDocument = {
	key: LegalDocumentKey;
	locale: Locale;
	eyebrow: string;
	title: string;
	description: string;
	intro: string;
	effectiveDate: string;
	updatedLabel: string;
	sections: LegalSection[];
};

const effectiveDate = '27 July 2026';

const englishDocuments: Record<LegalDocumentKey, LegalDocument> = {
	privacy: {
		key: 'privacy',
		locale: 'en',
		eyebrow: 'Privacy',
		title: 'Privacy Policy',
		description: 'How Nordic Solutions handles information submitted through this website.',
		intro:
			'This Privacy Policy explains how Nordic Solutions LLC handles information when you visit this website or contact us through the website form.',
		effectiveDate,
		updatedLabel: `Effective ${effectiveDate}`,
		sections: [
			{
				id: 'who-we-are',
				heading: '1. Who we are',
				paragraphs: [
					'Nordic Solutions LLC is the operator of this website. Our business address is Tawazun Industrial Park, P.O. Box 3640, Abu Dhabi, United Arab Emirates.',
					'For privacy questions or requests, contact info@nordicsolutions.ae.'
				]
			},
			{
				id: 'information-we-collect',
				heading: '2. Information we collect',
				paragraphs: [
					'The website contact form may collect the following information when you choose to submit it:'
				],
				bullets: [
					'Name',
					'Work email address',
					'Organization, if provided',
					'Your message or project enquiry'
				]
			},
			{
				id: 'how-we-use-information',
				heading: '3. How we use information',
				paragraphs: ['We use submitted information to:'],
				bullets: [
					'Respond to an enquiry and continue a requested business conversation',
					'Understand the scope, timing, and contact details relevant to the enquiry',
					'Protect the form and website from abuse',
					'Comply with applicable legal or regulatory obligations'
				]
			},
			{
				id: 'delivery-and-sharing',
				heading: '4. Delivery and sharing',
				paragraphs: [
					'When you submit the form, the message is sent to info@nordicsolutions.ae using the website hosting and mail transport needed to deliver it. We do not sell submitted contact information.',
					'Information may be accessible to service providers that host, secure, or deliver the website and its messages, and to people within Nordic Solutions who need it to respond to the enquiry.'
				]
			},
			{
				id: 'retention-and-security',
				heading: '5. Retention and security',
				paragraphs: [
					'The website does not store contact submissions in a database or local application log. Delivered correspondence may remain in the company mailbox for as long as needed to manage the relationship, meet legal obligations, or resolve disputes.',
					'The form applies validation and rate limiting. Short-lived hashed IP counters are used to limit repeated submissions and are not part of the public page content. No security measure can guarantee absolute protection.'
				]
			},
			{
				id: 'cookies-and-tracking',
				heading: '6. Cookies and tracking',
				paragraphs: [
					'The current website does not use non-essential analytics, advertising pixels, or marketing cookies. Browser and hosting features that are strictly necessary to deliver the site may still process basic technical request information.'
				]
			},
			{
				id: 'your-choices',
				heading: '7. Your choices and rights',
				paragraphs: [
					'Depending on applicable law, you may ask us to access, correct, delete, restrict, or otherwise explain our handling of personal information. Contact info@nordicsolutions.ae and describe your request. We may need to verify your identity before acting on it.'
				]
			},
			{
				id: 'changes-and-contact',
				heading: '8. Changes and contact',
				paragraphs: [
					'We may update this policy when the website, contact process, or legal requirements change. The effective date at the top of this page identifies the current version.',
					'Questions about this policy can be sent to info@nordicsolutions.ae.'
				]
			}
		]
	},
	terms: {
		key: 'terms',
		locale: 'en',
		eyebrow: 'Legal',
		title: 'Terms of Use',
		description: 'Terms that apply when you use the Nordic Solutions website.',
		intro:
			'These Terms of Use set the basic conditions for using the Nordic Solutions website and its contact form.',
		effectiveDate,
		updatedLabel: `Effective ${effectiveDate}`,
		sections: [
			{
				id: 'website-purpose',
				heading: '1. Website purpose',
				paragraphs: [
					'This website presents Nordic Solutions LLC, its capabilities, and ways to make an initial enquiry. Website information is general and does not create a proposal, engagement, warranty, or other binding commitment unless the parties agree separately in writing.'
				]
			},
			{
				id: 'acceptable-use',
				heading: '2. Acceptable use',
				paragraphs: ['You agree to use the website lawfully and not to:'],
				bullets: [
					'Attempt to gain unauthorised access to the website, endpoint, or hosting environment',
					"Submit malicious code, unlawful material, or another person's information without permission",
					"Interfere with availability, security, or another visitor's use of the website",
					'Use the contact form for unsolicited bulk messages or automated abuse'
				]
			},
			{
				id: 'intellectual-property',
				heading: '3. Intellectual property',
				paragraphs: [
					'Unless stated otherwise, the website design, text, branding, and other materials are owned by or used with permission by Nordic Solutions LLC. You may view the website for legitimate business or informational purposes. You may not reproduce, modify, distribute, or commercially exploit its content without permission, except where applicable law allows it.'
				]
			},
			{
				id: 'submissions',
				heading: '4. Enquiries and submissions',
				paragraphs: [
					'You are responsible for providing accurate information that you are authorised to share. Submitting an enquiry does not guarantee a response, availability, acceptance of work, or formation of a contract.',
					'Personal information submitted through the form is handled as described in the Privacy Policy.'
				]
			},
			{
				id: 'availability-and-liability',
				heading: '5. Availability and liability',
				paragraphs: [
					'We aim to keep the website available and accurate, but the website may be changed, interrupted, or unavailable without notice. To the extent permitted by applicable law, Nordic Solutions LLC is not responsible for indirect loss arising from use of, or reliance on, the website. Nothing in these terms excludes liability that cannot lawfully be excluded.'
				]
			},
			{
				id: 'external-services',
				heading: '6. External services',
				paragraphs: [
					"The website may refer to contact channels or services operated by third parties. Their availability and terms are outside Nordic Solutions' control, and you should review their own policies before using them."
				]
			},
			{
				id: 'law-and-changes',
				heading: '7. Governing law and changes',
				paragraphs: [
					'These website terms are intended to be governed by the applicable laws of the United Arab Emirates and the Emirate of Abu Dhabi, subject to any mandatory rules that apply.',
					'We may update these terms when the website or its use changes. The effective date at the top of this page identifies the current version. Questions can be sent to info@nordicsolutions.ae.'
				]
			}
		]
	}
};

const arabicDocuments: Record<LegalDocumentKey, LegalDocument> = {
	privacy: {
		key: 'privacy',
		locale: 'ar',
		eyebrow: 'الخصوصية',
		title: 'سياسة الخصوصية',
		description: 'كيف تتعامل Nordic Solutions مع المعلومات المقدمة عبر هذا الموقع.',
		intro:
			'توضح سياسة الخصوصية هذه كيفية تعامل Nordic Solutions LLC مع المعلومات عند زيارة الموقع أو التواصل معنا عبر النموذج.',
		effectiveDate,
		updatedLabel: `سارية من ${effectiveDate}`,
		sections: [
			{
				id: 'who-we-are',
				heading: '1. من نحن',
				paragraphs: [
					'تدير Nordic Solutions LLC هذا الموقع. عنوان العمل هو مجمع توازن الصناعي، ص.ب. 3640، أبوظبي، الإمارات العربية المتحدة.',
					'للاستفسارات أو الطلبات المتعلقة بالخصوصية، تواصل عبر info@nordicsolutions.ae.'
				]
			},
			{
				id: 'information-we-collect',
				heading: '2. المعلومات التي نجمعها',
				paragraphs: ['قد يجمع نموذج التواصل المعلومات التالية عند اختيارك إرساله:'],
				bullets: [
					'الاسم',
					'عنوان بريد العمل',
					'اسم المؤسسة إذا تم تقديمه',
					'الرسالة أو الاستفسار عن المشروع'
				]
			},
			{
				id: 'how-we-use-information',
				heading: '3. كيفية استخدام المعلومات',
				paragraphs: ['نستخدم المعلومات المقدمة من أجل:'],
				bullets: [
					'الرد على الاستفسار ومتابعة التواصل التجاري المطلوب',
					'فهم النطاق والتوقيت وبيانات الاتصال المرتبطة بالاستفسار',
					'حماية النموذج والموقع من إساءة الاستخدام',
					'الامتثال للالتزامات القانونية أو التنظيمية المعمول بها'
				]
			},
			{
				id: 'delivery-and-sharing',
				heading: '4. الإرسال والمشاركة',
				paragraphs: [
					'عند إرسال النموذج، يتم إرسال الرسالة إلى info@nordicsolutions.ae باستخدام الاستضافة وخدمة البريد اللازمة للتسليم. لا نبيع بيانات الاتصال المقدمة.',
					'قد تكون المعلومات متاحة لمزودي الخدمات الذين يستضيفون الموقع أو يؤمنونه أو يرسلون رسائله، ولأعضاء Nordic Solutions الذين يحتاجون إليها للرد على الاستفسار.'
				]
			},
			{
				id: 'retention-and-security',
				heading: '5. الاحتفاظ والأمان',
				paragraphs: [
					'لا يخزن الموقع طلبات التواصل في قاعدة بيانات أو سجل تطبيق محلي. قد تبقى المراسلات المسلّمة في صندوق بريد الشركة للمدة اللازمة لإدارة العلاقة أو الوفاء بالالتزامات القانونية أو حل النزاعات.',
					'يطبق النموذج التحقق وتحديد معدل الطلبات. وتستخدم عدادات قصيرة الأجل لعناوين IP مجزأة للحد من الطلبات المتكررة ولا تظهر ضمن محتوى الصفحات العامة. ولا يمكن لأي إجراء أمني ضمان حماية مطلقة.'
				]
			},
			{
				id: 'cookies-and-tracking',
				heading: '6. ملفات الارتباط والتتبع',
				paragraphs: [
					'لا يستخدم الموقع الحالي تحليلات غير ضرورية أو وحدات إعلانية أو ملفات ارتباط تسويقية. وقد تعالج خصائص المتصفح والاستضافة الضرورية لتقديم الموقع بعض معلومات الطلب التقنية الأساسية.'
				]
			},
			{
				id: 'your-choices',
				heading: '7. اختياراتك وحقوقك',
				paragraphs: [
					'بحسب القانون المعمول به، قد تطلب الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها أو تقييد استخدامها أو توضيح طريقة التعامل معها. أرسل طلبك إلى info@nordicsolutions.ae، وقد نحتاج إلى التحقق من هويتك قبل اتخاذ الإجراء.'
				]
			},
			{
				id: 'changes-and-contact',
				heading: '8. التغييرات والتواصل',
				paragraphs: [
					'قد نحدّث هذه السياسة عند تغيير الموقع أو طريقة التواصل أو المتطلبات القانونية. يوضح تاريخ السريان أعلى الصفحة النسخة الحالية.',
					'يمكن إرسال الأسئلة المتعلقة بهذه السياسة إلى info@nordicsolutions.ae.'
				]
			}
		]
	},
	terms: {
		key: 'terms',
		locale: 'ar',
		eyebrow: 'قانوني',
		title: 'شروط الاستخدام',
		description: 'الشروط التي تنطبق عند استخدام موقع Nordic Solutions.',
		intro:
			'تحدد شروط الاستخدام هذه القواعد الأساسية لاستخدام موقع Nordic Solutions ونموذج التواصل الخاص به.',
		effectiveDate,
		updatedLabel: `سارية من ${effectiveDate}`,
		sections: [
			{
				id: 'website-purpose',
				heading: '1. غرض الموقع',
				paragraphs: [
					'يعرض هذا الموقع Nordic Solutions LLC وقدراتها وطرق إرسال الاستفسار الأولي. المعلومات عامة ولا تنشئ عرضاً أو تكليفاً أو ضماناً أو التزاماً ملزماً آخر ما لم يتفق الطرفان على ذلك كتابةً.'
				]
			},
			{
				id: 'acceptable-use',
				heading: '2. الاستخدام المقبول',
				paragraphs: ['توافق على استخدام الموقع بصورة قانونية، وألا تقوم بما يلي:'],
				bullets: [
					'محاولة الوصول غير المصرح به إلى الموقع أو نقطة الاتصال أو بيئة الاستضافة',
					'إرسال برمجيات ضارة أو مواد غير قانونية أو معلومات تخص شخصاً آخر دون إذنه',
					'تعطيل التوافر أو الأمان أو استخدام زائر آخر للموقع',
					'استخدام نموذج التواصل لإرسال رسائل جماعية غير مرغوبة أو إساءة آلية'
				]
			},
			{
				id: 'intellectual-property',
				heading: '3. الملكية الفكرية',
				paragraphs: [
					'ما لم يذكر خلاف ذلك، فإن تصميم الموقع ونصوصه وعلامته التجارية ومواده الأخرى مملوكة لـ Nordic Solutions LLC أو مستخدمة بإذن. يجوز لك الاطلاع على الموقع لأغراض تجارية أو معلوماتية مشروعة، ولا يجوز نسخ محتواه أو تعديله أو توزيعه أو استغلاله تجارياً دون إذن، إلا إذا سمح القانون المعمول به بذلك.'
				]
			},
			{
				id: 'submissions',
				heading: '4. الاستفسارات والمعلومات المقدمة',
				paragraphs: [
					'أنت مسؤول عن تقديم معلومات دقيقة ومصرح لك بمشاركتها. لا يضمن إرسال الاستفسار الرد أو التوافر أو قبول العمل أو نشوء عقد.',
					'تتم معالجة المعلومات الشخصية المقدمة عبر النموذج وفقاً لسياسة الخصوصية.'
				]
			},
			{
				id: 'availability-and-liability',
				heading: '5. التوافر والمسؤولية',
				paragraphs: [
					'نسعى إلى إبقاء الموقع متاحاً ودقيقاً، لكن قد يتم تغييره أو إيقافه أو عدم توفره دون إشعار. إلى الحد الذي يسمح به القانون، لا تتحمل Nordic Solutions LLC المسؤولية عن الخسائر غير المباشرة الناتجة عن استخدام الموقع أو الاعتماد عليه. ولا تستبعد هذه الشروط أي مسؤولية لا يجوز استبعادها قانوناً.'
				]
			},
			{
				id: 'external-services',
				heading: '6. الخدمات الخارجية',
				paragraphs: [
					'قد يشير الموقع إلى قنوات تواصل أو خدمات تديرها جهات أخرى. ويكون توافرها وشروطها خارج سيطرة Nordic Solutions، وينبغي مراجعة سياساتها قبل استخدامها.'
				]
			},
			{
				id: 'law-and-changes',
				heading: '7. القانون والتغييرات',
				paragraphs: [
					'يقصد أن تخضع شروط الموقع للقوانين المعمول بها في دولة الإمارات العربية المتحدة وإمارة أبوظبي، مع مراعاة أي قواعد إلزامية واجبة التطبيق.',
					'قد نحدّث هذه الشروط عند تغيير الموقع أو طريقة استخدامه. يوضح تاريخ السريان أعلى الصفحة النسخة الحالية. ترسل الأسئلة إلى info@nordicsolutions.ae.'
				]
			}
		]
	}
};

export const getLegalDocument = (key: LegalDocumentKey, locale: Locale): LegalDocument =>
	(locale === 'ar' ? arabicDocuments : englishDocuments)[key];

export const getLegalPath = (key: LegalDocumentKey, locale: Locale): string =>
	locale === 'ar' ? `/ar/${key}` : `/${key}`;

export const legalLinkLabels = {
	en: { privacy: 'Privacy Policy', terms: 'Terms of Use' },
	ar: { privacy: 'سياسة الخصوصية', terms: 'شروط الاستخدام' }
} as const;
